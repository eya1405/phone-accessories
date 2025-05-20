import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define the categories with images and descriptions
const categories = [
  {
    id: "cases",
    name: "Cases",
    description: "Protect your phone with stylish and durable cases",
    image: "/placeholder.svg?height=400&width=600",
    count: 24,
  },
  {
    id: "chargers",
    name: "Chargers",
    description: "Fast charging solutions for all your devices",
    image: "/placeholder.svg?height=400&width=600",
    count: 18,
  },
  {
    id: "screen-protectors",
    name: "Screen Protectors",
    description: "Keep your screen safe from scratches and cracks",
    image: "/placeholder.svg?height=400&width=600",
    count: 12,
  },
  {
    id: "audio",
    name: "Audio",
    description: "Headphones, earbuds, and speakers for premium sound",
    image: "/placeholder.svg?height=400&width=600",
    count: 15,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Essential accessories to enhance your phone experience",
    image: "/placeholder.svg?height=400&width=600",
    count: 30,
  },
  {
    id: "power-banks",
    name: "Power Banks",
    description: "Portable power solutions for on-the-go charging",
    image: "/placeholder.svg?height=400&width=600",
    count: 10,
  },
  {
    id: "car-accessories",
    name: "Car Accessories",
    description: "Phone mounts, chargers, and more for your vehicle",
    image: "/placeholder.svg?height=400&width=600",
    count: 8,
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Browse Categories</h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Explore our wide range of phone accessories by category
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/products?category=${category.name}`}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                <p className="mt-2 text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
