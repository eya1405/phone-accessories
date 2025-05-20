"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = async () => {
    try {
      // In a real app, this would call the favorites microservice
      const response = await fetch(`/api/favorites${isFavorite ? `/${product.id}` : ""}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: !isFavorite ? JSON.stringify({ productId: product.id }) : undefined,
      })

      if (!response.ok) {
        throw new Error(`Failed to ${isFavorite ? "remove from" : "add to"} favorites`)
      }

      setIsFavorite(!isFavorite)
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? "This item has been removed from your favorites"
          : "This item has been added to your favorites",
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "There was a problem updating your favorites. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addToCart = async () => {
    try {
      // In a real app, this would call the order microservice
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      if (response.ok) {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        })
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "There was a problem adding this item to your cart",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square overflow-hidden">
              {/* Use the web image URL directly */}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                }}
              />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-white/80 hover:bg-white/90"
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">Toggle favorite</span>
          </Button>
        </div>
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium hover:underline">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          {/* Display price in TND */}
          <p className="mt-2 font-bold">{product.price.toFixed(2)} TND</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={addToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
