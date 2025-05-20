require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/auth-service")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)

// Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/auth/verify", (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(401).json({ valid: false, message: "No token provided" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    res.json({
      valid: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    res.status(401).json({ valid: false, message: "Invalid token" })
  }
})

// Create a few sample users on startup
const createSampleUsers = async () => {
  try {
    // Check if users already exist
    const count = await User.countDocuments()
    if (count > 0) return

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    })

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10)
    const user = new User({
      name: "Test User",
      email: "user@example.com",
      password: userPassword,
      role: "user",
    })

    await Promise.all([admin.save(), user.save()])
    console.log("Sample users created")
  } catch (error) {
    console.error("Error creating sample users:", error)
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`)
  createSampleUsers()
})
