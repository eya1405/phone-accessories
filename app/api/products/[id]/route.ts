import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Mock product data for preview
    const product = {
      id,
      name: `Product ${id}`,
      description:
        "This is a detailed product description that explains all the features and benefits of this amazing product.",
      price: 49.99,
      category: "Accessories",
      image: "/placeholder.svg?height=600&width=600",
      stock: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
