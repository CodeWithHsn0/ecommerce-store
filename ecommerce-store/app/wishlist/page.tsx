"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Helper function to get product images
const getProductImage = (productName: string) => {
  // Map product names to specific images
  const productImageMap: Record<string, string> = {
    "Wireless Bluetooth Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
    "Premium Cotton T-Shirt":
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
    "Smart Watch Series 5": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop",
    "Ergonomic Office Chair":
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&auto=format&fit=crop",
    "Stainless Steel Water Bottle":
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop",
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Default fallback
  return `/placeholder.svg?height=400&width=400&text=${productName.replace(/ /g, "+")}`
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <span>{wishlistItems.length} items</span>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-medium">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Items added to your wishlist will appear here.</p>
          <Link href="/products">
            <Button className="mt-6">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="h-full overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={getProductImage(item.name) || "/placeholder.svg"}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-500 hover:bg-white/80"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {item.discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500">-{item.discount}%</Badge>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.discount > 0 ? (
                    <>
                      <span className="font-bold">${item.discountedPrice.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  )}
                </div>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Update the wishlist item images to use placeholder images that will definitely work

const initialWishlistItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    discount: 20,
    discountedPrice: 79.99,
    rating: 4,
    reviewCount: 120,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discount: 0,
    discountedPrice: 29.99,
    rating: 5,
    reviewCount: 86,
    image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 199.99,
    discount: 15,
    discountedPrice: 169.99,
    rating: 4,
    reviewCount: 56,
    image: "/placeholder.svg?height=400&width=400&text=Smart+Watch",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 249.99,
    discount: 10,
    discountedPrice: 224.99,
    rating: 4,
    reviewCount: 38,
    image: "/placeholder.svg?height=400&width=400&text=Office+Chair",
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    discount: 0,
    discountedPrice: 24.99,
    rating: 5,
    reviewCount: 92,
    image: "/placeholder.svg?height=400&width=400&text=Water+Bottle",
  },
]

