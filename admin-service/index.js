import "dotenv/config"
import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3004

// Middleware
app.use(cors())
app.use(express.json())

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
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

    if (!data.valid || data.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    req.user = data.user
    next()
  } catch (error) {
    console.error("Auth error:", error)
    res.status(401).json({ message: "Unauthorized" })
  }
}

// Admin Routes
app.get("/api/admin/stats", verifyAdminToken, async (req, res) => {
  try {
    // In a real app, this would aggregate data from other services
    const mockStats = {
      totalProducts: 24,
      totalOrders: 18,
      totalUsers: 42,
      revenue: 3749.95,
    }

    res.json(mockStats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/products", verifyAdminToken, async (req, res) => {
  try {
    // In a real app, this would fetch from the catalog service
    const mockProducts = [
      {
        id: "1",
        name: "Premium Silicone Case for iPhone 14",
        category: "Cases",
        price: 49.99,
        stock: 25,
      },
      {
        id: "2",
        name: "20W Fast Charger for Samsung",
        category: "Chargers",
        price: 79.99,
        stock: 18,
      },
      {
        id: "3",
        name: "Tempered Glass Screen Protector",
        category: "Screen Protectors",
        price: 29.99,
        stock: 42,
      },
      {
        id: "4",
        name: "Wireless Earbuds",
        category: "Audio",
        price: 149.99,
        stock: 10,
      },
    ]

    res.json(mockProducts)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/admin/orders", verifyAdminToken, async (req, res) => {
  try {
    // In a real app, this would fetch from the order service
    const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

    const mockOrders = Array.from({ length: 10 }).map((_, index) => {
      const id = `ORD-${1000 + index}`
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))

      return {
        id,
        customer: `Customer ${index + 1}`,
        date: date.toLocaleDateString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        total: Math.floor(Math.random() * 500) + 50,
      }
    })

    res.json(mockOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Admin service running on port ${PORT}`)
})
