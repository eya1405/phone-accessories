import { NextResponse } from "next/server"

// Mock cart data for preview
const mockCartItems = [
  {
    id: "cart1",
    userId: "user123",
    productId: "1",
    name: "Premium Silicone Case for iPhone 14",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 2,
  },
  {
    id: "cart2",
    userId: "user123",
    productId: "3",
    name: "Tempered Glass Screen Protector",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 1,
  },
]

export async function GET() {
  try {
    // In a real app, this would call the order microservice
    return NextResponse.json(mockCartItems)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body

    // Create a new cart item
    const newCartItem = {
      id: `cart-${Date.now()}`,
      userId: "user123",
      productId,
      name: `Product ${productId}`,
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      quantity,
    }

    return NextResponse.json(newCartItem, { status: 201 })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
