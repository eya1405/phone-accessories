import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/order-service")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model("Order", orderSchema)

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
})

const Cart = mongoose.model("Cart", cartSchema)

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]

    // Verify token with Auth service
    const response = await fetch("http://auth-service:3001/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()

    if (!data.valid) {
      return res.status(401).json({ message: "Invalid token" })
    }

    req.user = data.user
    next()
  } catch (error) {
    console.error("Auth error:", error)
    res.status(401).json({ message: "Unauthorized" })
  }
}

// Cart Routes
app.get("/api/cart", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) {
      cart = { userId: req.user.id, items: [] }
    }

    res.json(cart.items)
  } catch (error) {
    console.error("Error fetching cart:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/cart", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body

    // In a real app, you would fetch product details from the catalog service
    const productDetails = {
      productId,
      name: `Product ${productId}`,
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
    }

    let cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [
          {
            productId,
            name: productDetails.name,
            price: productDetails.price,
            quantity,
            image: productDetails.image,
          },
        ],
      })
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId === productId)

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({
          productId,
          name: productDetails.name,
          price: productDetails.price,
          quantity,
          image: productDetails.image,
        })
      }

      cart.updatedAt = Date.now()
    }

    await cart.save()

    res.status(201).json(cart.items)
  } catch (error) {
    console.error("Error adding to cart:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.patch("/api/cart/:itemId", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body
    const productId = req.params.itemId

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" })
    }

    const cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    cart.items[itemIndex].quantity = quantity
    cart.updatedAt = Date.now()

    await cart.save()

    res.json(cart.items[itemIndex])
  } catch (error) {
    console.error("Error updating cart item:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/api/cart/:itemId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.itemId

    const cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId !== productId)
    cart.updatedAt = Date.now()

    await cart.save()

    res.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Error removing cart item:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Order Routes
app.post("/api/orders", verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body

    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
    })

    await order.save()

    // Clear the user's cart after successful order
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [], updatedAt: Date.now() })

    res.status(201).json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create sample cart data
const createSampleCartData = async () => {
  try {
    const count = await Cart.countDocuments()
    if (count > 0) return

    const sampleCart = new Cart({
      userId: "123456789",
      items: [
        {
          productId: "1",
          name: "Premium Silicone Case for iPhone 14",
          price: 49.99,
          quantity: 2,
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          productId: "3",
          name: "Tempered Glass Screen Protector",
          price: 29.99,
          quantity: 1,
          image: "/placeholder.svg?height=300&width=300",
        },
      ],
    })

    await sampleCart.save()
    console.log("Sample cart data created")
  } catch (error) {
    console.error("Error creating sample cart data:", error)
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`)
  createSampleCartData()
})
