"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Trash2 } from "lucide-react"

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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // In a real app, this would call the favorites microservice
        const response = await fetch("/api/favorites")

        if (!response.ok) {
          throw new Error(`Failed to fetch favorites: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setFavorites(data)
      } catch (error) {
        console.error("Error fetching favorites:", error)
        toast({
          title: "Error",
          description: "There was a problem loading your favorites. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const removeFavorite = async (productId: string) => {
    try {
      // In a real app, this would call the favorites microservice
      const response = await fetch(`/api/favorites/${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to remove favorite: ${response.status} ${response.statusText}`)
      }

      setFavorites(favorites.filter((product) => product.id !== productId))
      toast({
        title: "Removed from favorites",
        description: "This item has been removed from your favorites",
      })
    } catch (error) {
      console.error("Error removing favorite:", error)
      toast({
        title: "Error",
        description: "There was a problem removing this item from your favorites. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addToCart = async (productId: string) => {
    try {
      // In a real app, this would call the order microservice
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (response.ok) {
        const product = favorites.find((p) => p.id === productId)
        toast({
          title: "Added to cart",
          description: `${product?.name} has been added to your cart`,
        })
      } else {
        throw new Error("Failed to add to cart")
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        <div className="flex items-center justify-center h-64">
          <p>Loading your favorites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">You don&apos;t have any favorites yet</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium hover:underline">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="mt-2 font-bold">{product.price.toFixed(2)} TND</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button onClick={() => addToCart(product.id)} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" onClick={() => removeFavorite(product.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from favorites</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
