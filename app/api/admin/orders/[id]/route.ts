import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Mock order data for preview
    const order = {
      id,
      customer: "John Doe",
      email: "john.doe@example.com",
      date: new Date().toLocaleDateString(),
      status: "Processing",
      paymentStatus: "Paid",
      total: 129.97,
      items: [
        {
          id: "item1",
          productId: "1",
          name: "Premium Silicone Case for iPhone 14",
          price: 49.99,
          quantity: 2,
          subtotal: 99.98,
        },
        {
          id: "item2",
          productId: "3",
          name: "Tempered Glass Screen Protector",
          price: 29.99,
          quantity: 1,
          subtotal: 29.99,
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        address: "123 Main St",
        city: "Tunis",
        postalCode: "1000",
        phone: "+216 12 345 678",
      },
      shippingCost: 7.99,
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { status, paymentStatus } = body

    // In a real app, this would update the order in the database
    const updatedOrder = {
      id,
      status: status || "Processing",
      paymentStatus: paymentStatus || "Pending",
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
