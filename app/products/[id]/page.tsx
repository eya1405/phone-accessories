"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { featuredProducts } from "@/lib/data"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data)

        // Check if product is in favorites
        const favResponse = await fetch(`/api/favorites/${params.id}`)
        if (favResponse.ok) {
          const favData = await favResponse.json()
          setIsFavorite(favData.isFavorite)
        }

        // Get related products (in a real app, this would be based on category or recommendations)
        // For now, we'll just use some of the featured products
        setRelatedProducts(featuredProducts.slice(0, 4))
      } catch (error) {
        console.error("Error fetching product:", error)
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value)
    }
  }

  const addToCart = async () => {
    if (!product) return

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add to cart")
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "There was a problem adding this item to your cart",
        variant: "destructive",
      })
    }
  }

  const toggleFavorite = async () => {
    if (!product) return

    try {
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
        description: "There was a problem updating your favorites",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-bold">{product.price.toFixed(2)} TND</p>
            <p className="mt-1 text-sm text-muted-foreground">Tax included. Shipping calculated at checkout.</p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Description</h3>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm">In stock: {product.stock} units available</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1" onClick={addToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" onClick={toggleFavorite}>
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium">Product Specifications</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Material</span>
                  <span>Premium Quality</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Warranty</span>
                  <span>1 Year</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Product ID</span>
                  <span>{product.id}</span>
                </li>
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <p className="mt-2 text-muted-foreground">
                We offer fast and reliable shipping across Tunisia. Orders are typically processed within 24 hours and
                delivered within 2-3 business days.
              </p>
              <h3 className="mt-4 text-lg font-medium">Return Policy</h3>
              <p className="mt-2 text-muted-foreground">
                If you're not completely satisfied with your purchase, you can return it within 30 days for a full
                refund. The product must be in its original condition and packaging.
              </p>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Great product!</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    By Ahmed S. on <time dateTime="2023-04-15">April 15, 2023</time>
                  </p>
                  <p className="mt-2">
                    This is exactly what I was looking for. Great quality and fast shipping. Would definitely recommend!
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Good value</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    By Fatima L. on <time dateTime="2023-03-22">March 22, 2023</time>
                  </p>
                  <p className="mt-2">
                    The product is good quality for the price. Delivery was quick and the packaging was secure.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden">
              <Link href={`/products/${relatedProduct.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${relatedProduct.id}`}>
                  <h3 className="font-medium hover:underline">{relatedProduct.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{relatedProduct.category}</p>
                <p className="mt-2 font-bold">{relatedProduct.price.toFixed(2)} TND</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
