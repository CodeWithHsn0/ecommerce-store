"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Helper function to get product images
const getProductImage = (productName: string, category = "", product: { image?: string } = {}) => {
  // Map product names to specific images
  const productImageMap: Record<string, string> = {
    "Wireless Bluetooth Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
    "Premium Cotton T-Shirt":
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
    "Smart Watch Series 5": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop",
    "Kitchen Blender Pro":
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=400&auto=format&fit=crop",
    "Ergonomic Office Chair":
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&auto=format&fit=crop",
    "Smartphone Holder Stand":
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
    "Stainless Steel Water Bottle":
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop",
    "Wireless Charging Pad":
      "https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=400&auto=format&fit=crop",
    "Leather Wallet": "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&auto=format&fit=crop",
    "Fitness Tracker Band":
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=400&auto=format&fit=crop",
    "Portable Bluetooth Speaker":
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400&auto=format&fit=crop",
    "Yoga Mat": "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=400&auto=format&fit=crop",
    "Coffee Maker": "https://images.unsplash.com/photo-1570087935869-9da023a88cdc?q=80&w=400&auto=format&fit=crop",
    "Wireless Mouse": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400&auto=format&fit=crop",
    "Desk Lamp": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop",
    Backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop",
    Sunglasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop",
    "Wireless Keyboard": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
    "Air Purifier": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=400&auto=format&fit=crop",
    "Digital Camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Otherwise return category-based image
  if (category?.toLowerCase().includes("electronics")) {
    return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("home") || category?.toLowerCase().includes("kitchen")) {
    return "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("clothing")) {
    return "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("beauty")) {
    return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("sports")) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("accessories")) {
    return "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop"
  }

  // Handle alternate views
  if (productName.includes(" alt")) {
    const baseName = productName.replace(" alt", "")
    // Return a different image for the same product
    if (baseName.toLowerCase().includes("wireless")) {
      return "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("smart")) {
      return "https://images.unsplash.com/photo-1544117519-31a4a39696b6?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("yoga")) {
      return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("cookware")) {
      return "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("power")) {
      return "https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=400&auto=format&fit=crop"
    } else {
      // Return a different category image
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop"
    }
  }

  // Default fallback
  return product.image || `/placeholder.svg?height=400&width=400&text=${productName.replace(/ /g, "+")}`
}

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    discount: number
    discountedPrice: number
    rating: number
    reviewCount: number
    image: string
    category?: string
    stock?: number
    featured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <Card className="h-full overflow-hidden group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative aspect-square overflow-hidden">
            <div className="relative w-full h-full">
              <motion.img
                src={getProductImage(product.name, product.category, product)}
                alt={product.name}
                className="object-cover w-full h-full absolute inset-0 z-10"
                animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img
                src={getProductImage(product.name + " alt", product.category, product)}
                alt={`${product.name} alternate view`}
                className="object-cover w-full h-full absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.div
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg h-8 w-8 sm:h-10 sm:w-10">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg h-8 w-8 sm:h-10 sm:w-10">
                      <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg h-8 w-8 sm:h-10 sm:w-10">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quick View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-primary text-xs">-{product.discount}%</Badge>
            )}
          </div>
          <CardContent className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-lg line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </CardContent>
          <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <span className="font-bold text-sm sm:text-base">${product.discountedPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-bold text-sm sm:text-base">${product.price.toFixed(2)}</span>
              )}
            </div>
            <Button size="sm" className="rounded-full text-xs h-8 px-3">
              Add
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

