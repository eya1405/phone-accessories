require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const realisticProducts = require("./realistic-products")

const app = express()
const PORT = process.env.PORT || 3002

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/catalog-service")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Product = mongoose.model("Product", productSchema)

// Routes
app.get("/api/products", async (req, res) => {
  try {
    const { category, search } = req.query

    const filter = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" }
    }

    const products = await Product.find(filter)

    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category")
    res.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Admin route to add a new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Admin route to update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        stock,
        updatedAt: Date.now(),
      },
      { new: true },
    )

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Admin route to delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create realistic products
const createRealisticProducts = async () => {
  try {
    const count = await Product.countDocuments()
    if (count > 0) {
      // Delete existing products to update with new ones
      await Product.deleteMany({})
      console.log("Existing products deleted")
    }

    await Product.insertMany(realisticProducts)
    console.log("Realistic products created successfully")
  } catch (error) {
    console.error("Error creating realistic products:", error)
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Catalog service running on port ${PORT}`)
  createRealisticProducts()
})
