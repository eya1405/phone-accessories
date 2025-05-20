import { NextResponse } from "next/server"

// Mock favorites data for preview
const mockFavorites = [
  {
    id: "fav-1",
    userId: "user123",
    productId: "1",
    name: "Premium Silicone Case for iPhone 14",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cases",
  },
  {
    id: "fav-3",
    userId: "user123",
    productId: "3",
    name: "Tempered Glass Screen Protector",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Screen Protectors",
  },
  {
    id: "fav-5",
    userId: "user123",
    productId: "5",
    name: "Phone Stand with MagSafe",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
]

export async function GET() {
  try {
    // In a real app, this would call the favorites microservice
    // with proper authentication
    return NextResponse.json(mockFavorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId } = body

    // Find the product in our mock data
    const product = {
      id: productId,
      name: `Product ${productId}`,
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    }

    // Create a new favorite
    const newFavorite = {
      id: `fav-${product.id}`,
      userId: "user123",
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }

    return NextResponse.json(newFavorite, { status: 201 })
  } catch (error) {
    console.error("Error adding favorite:", error)
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}
