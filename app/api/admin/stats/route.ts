import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real app, this would call the admin microservice
    // which would aggregate data from other services
    const mockStats = {
      totalProducts: 24,
      totalOrders: 18,
      totalUsers: 42,
      revenue: 3749.95,
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}
