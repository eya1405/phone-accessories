import { NextResponse } from "next/server"

// Mock product data for preview
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
  {
    id: "5",
    name: "Phone Stand with MagSafe",
    category: "Accessories",
    price: 39.99,
    stock: 15,
  },
  {
    id: "6",
    name: "10,000mAh Power Bank",
    category: "Power Banks",
    price: 89.99,
    stock: 20,
  },
  {
    id: "7",
    name: "Car Phone Mount",
    category: "Car Accessories",
    price: 34.99,
    stock: 30,
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 129.99,
    stock: 12,
  },
]

export async function GET() {
  try {
    // In a real app, this would call the admin microservice
    // which would get data from the catalog service
    return NextResponse.json(mockProducts)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
