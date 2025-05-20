import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { itemId: string } }) {
  try {
    const itemId = params.itemId
    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
    }

    // In a real app, this would call the order microservice
    // to update the cart item quantity

    return NextResponse.json({ id: itemId, quantity }, { status: 200 })
  } catch (error) {
    console.error("Error updating quantity:", error)
    return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  try {
    const itemId = params.itemId

    // In a real app, this would call the order microservice
    // to remove the item from the cart

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 })
  } catch (error) {
    console.error("Error removing item from cart:", error)
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { itemId: string } }) {
  try {
    const itemId = params.itemId

    // Mock cart item for preview
    const cartItem = {
      id: itemId,
      userId: "user123",
      productId: "1",
      name: "Premium Silicone Case for iPhone 14",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      quantity: 2,
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error("Error fetching cart item:", error)
    return NextResponse.json({ error: "Failed to fetch cart item" }, { status: 500 })
  }
}
