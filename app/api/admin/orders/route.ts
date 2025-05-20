import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real app, this would call the admin microservice
    // which would get data from the order service
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

    return NextResponse.json(mockOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
