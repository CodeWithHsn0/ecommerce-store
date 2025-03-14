import Link from "next/link"
import { Filter, ArrowUpDown, Search, Heart, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Helper function to get product images
const getProductImage = (productName: string, category = "") => {
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
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Otherwise return category-based image
  if (category.toLowerCase().includes("electronics")) {
    return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("home")) {
    return "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("clothing")) {
    return "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("beauty")) {
    return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("sports")) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("accessories")) {
    return "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop"
  }

  // Default fallback
  const product = { image: "" } // Provide a default value for product
  return product.image || `/placeholder.svg?height=400&width=400&text=${productName.replace(/ /g / g, "+")}`
}

// Sample data for all products
const allProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    discount: 20,
    discountedPrice: 79.99,
    rating: 4,
    reviewCount: 120,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
    category: "electronics",
    stock: 45,
    featured: true,
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
    category: "clothing",
    stock: 120,
    featured: false,
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
    category: "electronics",
    stock: 18,
    featured: true,
  },
  {
    id: 4,
    name: "Kitchen Blender Pro",
    price: 79.99,
    discount: 0,
    discountedPrice: 79.99,
    rating: 3,
    reviewCount: 42,
    image: "/placeholder.svg?height=400&width=400&text=Blender",
    category: "home",
    stock: 32,
    featured: false,
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
    category: "home",
    stock: 15,
    featured: false,
  },
  {
    id: 6,
    name: "Smartphone Holder Stand",
    price: 19.99,
    discount: 0,
    discountedPrice: 19.99,
    rating: 4,
    reviewCount: 65,
    image: "/placeholder.svg?height=400&width=400&text=Phone+Stand",
    category: "electronics",
    stock: 78,
    featured: false,
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
    category: "home",
    stock: 54,
    featured: false,
  },
  {
    id: 8,
    name: "Wireless Charging Pad",
    price: 39.99,
    discount: 25,
    discountedPrice: 29.99,
    rating: 3,
    reviewCount: 28,
    image: "/placeholder.svg?height=400&width=400&text=Charging+Pad",
    category: "electronics",
    stock: 23,
    featured: false,
  },
  {
    id: 9,
    name: "Leather Wallet",
    price: 49.99,
    discount: 0,
    discountedPrice: 49.99,
    rating: 4,
    reviewCount: 45,
    image: "/placeholder.svg?height=400&width=400&text=Wallet",
    category: "accessories",
    stock: 67,
    featured: false,
  },
  {
    id: 10,
    name: "Fitness Tracker Band",
    price: 89.99,
    discount: 10,
    discountedPrice: 80.99,
    rating: 4,
    reviewCount: 73,
    image: "/placeholder.svg?height=400&width=400&text=Fitness+Tracker",
    category: "electronics",
    stock: 29,
    featured: true,
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    discount: 15,
    discountedPrice: 50.99,
    rating: 4,
    reviewCount: 61,
    image: "/placeholder.svg?height=400&width=400&text=Speaker",
    category: "electronics",
    stock: 42,
    featured: false,
  },
  {
    id: 12,
    name: "Yoga Mat",
    price: 29.99,
    discount: 0,
    discountedPrice: 29.99,
    rating: 5,
    reviewCount: 38,
    image: "/placeholder.svg?height=400&width=400&text=Yoga+Mat",
    category: "sports",
    stock: 51,
    featured: false,
  },
  {
    id: 13,
    name: "Coffee Maker",
    price: 129.99,
    discount: 20,
    discountedPrice: 103.99,
    rating: 4,
    reviewCount: 52,
    image: "/placeholder.svg?height=400&width=400&text=Coffee+Maker",
    category: "home",
    stock: 19,
    featured: true,
  },
  {
    id: 14,
    name: "Wireless Mouse",
    price: 34.99,
    discount: 0,
    discountedPrice: 34.99,
    rating: 4,
    reviewCount: 47,
    image: "/placeholder.svg?height=400&width=400&text=Mouse",
    category: "electronics",
    stock: 63,
    featured: false,
  },
  {
    id: 15,
    name: "Desk Lamp",
    price: 45.99,
    discount: 10,
    discountedPrice: 41.39,
    rating: 4,
    reviewCount: 29,
    image: "/placeholder.svg?height=400&width=400&text=Desk+Lamp",
    category: "home",
    stock: 37,
    featured: false,
  },
  {
    id: 16,
    name: "Backpack",
    price: 79.99,
    discount: 15,
    discountedPrice: 67.99,
    rating: 5,
    reviewCount: 83,
    image: "/placeholder.svg?height=400&width=400&text=Backpack",
    category: "accessories",
    stock: 48,
    featured: true,
  },
  {
    id: 17,
    name: "Sunglasses",
    price: 129.99,
    discount: 25,
    discountedPrice: 97.49,
    rating: 4,
    reviewCount: 41,
    image: "/placeholder.svg?height=400&width=400&text=Sunglasses",
    category: "accessories",
    stock: 26,
    featured: false,
  },
  {
    id: 18,
    name: "Wireless Keyboard",
    price: 59.99,
    discount: 0,
    discountedPrice: 59.99,
    rating: 4,
    reviewCount: 37,
    image: "/placeholder.svg?height=400&width=400&text=Keyboard",
    category: "electronics",
    stock: 31,
    featured: false,
  },
  {
    id: 19,
    name: "Air Purifier",
    price: 199.99,
    discount: 10,
    discountedPrice: 179.99,
    rating: 5,
    reviewCount: 28,
    image: "/placeholder.svg?height=400&width=400&text=Air+Purifier",
    category: "home",
    stock: 14,
    featured: true,
  },
  {
    id: 20,
    name: "Digital Camera",
    price: 349.99,
    discount: 15,
    discountedPrice: 297.49,
    rating: 4,
    reviewCount: 35,
    image: "/placeholder.svg?height=400&width=400&text=Camera",
    category: "electronics",
    stock: 9,
    featured: true,
  },
]

// Categories data
const categories = [
  { id: 1, name: "Clothing", slug: "clothing" },
  { id: 2, name: "Electronics", slug: "electronics" },
  { id: 3, name: "Home & Kitchen", slug: "home" },
  { id: 4, name: "Beauty", slug: "beauty" },
  { id: 5, name: "Sports", slug: "sports" },
  { id: 6, name: "Accessories", slug: "accessories" },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Find the category by slug
  const category = categories.find((cat) => cat.slug === slug)

  // Filter products by category
  const products = allProducts.filter((product) => product.category === slug)

  // If category doesn't exist, show a message
  if (!category) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Category Not Found</h1>
        <p className="mb-6">The category you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button>View All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4">
            <Link href="/products" className="flex items-center gap-2 text-sm mb-2 hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to all products
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground">Browse our collection of {category.name.toLowerCase()} products</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="w-full pl-8" />
                </div>
                <div className="flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                      <SheetHeader>
                        <SheetTitle>Filter Products</SheetTitle>
                        <SheetDescription>Narrow down products by applying filters</SheetDescription>
                      </SheetHeader>
                      <div className="py-6 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Price Range</h3>
                          <div className="space-y-4">
                            <Slider defaultValue={[0, 500]} max={1000} step={10} />
                            <div className="flex items-center justify-between">
                              <span className="text-sm">$0</span>
                              <span className="text-sm">$1000</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Rating</h3>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <Checkbox id={`rating-${rating}`} />
                                <label
                                  htmlFor={`rating-${rating}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  <div className="flex items-center">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < rating
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300 fill-gray-300"
                                          }`}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                      ))}
                                    <span className="ml-1">& Up</span>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline">Reset</Button>
                          <Button>Apply Filters</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground mb-6">We couldn't find any products in this category.</p>
                <Link href="/products">
                  <Button>View All Products</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="h-full overflow-hidden group">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={getProductImage(product.name, product.category) || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-primary">-{product.discount}%</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < product.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 fill-gray-300"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {product.discount > 0 ? (
                            <>
                              <span className="font-bold">${product.discountedPrice.toFixed(2)}</span>
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <Button size="sm">Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="flex justify-center mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

