import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId

    // In a real app, this would call the favorites microservice
    // to delete the favorite with proper authentication

    return NextResponse.json({ message: "Favorite removed successfully" })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId

    // In a real app, this would check if the product is in the user's favorites
    const isFavorite = ["1", "3", "5"].includes(productId)

    return NextResponse.json({ isFavorite })
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return NextResponse.json({ error: "Failed to check favorite status" }, { status: 500 })
  }
}
