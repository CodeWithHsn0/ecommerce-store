"use client"
import { useState } from "react"
import { Filter, ArrowUpDown, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { GlobalLoading } from "../global-loading"
import { ProductCard } from "@/components/product-card"

const categories = [
  { id: 1, name: "Clothing", slug: "clothing" },
  { id: 2, name: "Electronics", slug: "electronics" },
  { id: 3, name: "Home & Kitchen", slug: "home" },
  { id: 4, name: "Beauty", slug: "beauty" },
  { id: 5, name: "Sports", slug: "sports" },
  { id: 6, name: "Accessories", slug: "accessories" },
]

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    discount: 20,
    discountedPrice: 79.99,
    rating: 4,
    reviewCount: 120,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
    category: "Electronics",
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
    category: "Clothing",
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
    category: "Electronics",
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
    category: "Home & Kitchen",
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
    category: "Home & Kitchen",
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
    category: "Electronics",
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
    category: "Home & Kitchen",
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
    category: "Electronics",
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
    category: "Accessories",
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
    category: "Electronics",
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
    category: "Electronics",
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
    category: "Sports",
    stock: 51,
    featured: false,
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortOrder, setSortOrder] = useState("featured")
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory !== "all" && product.category?.toLowerCase() !== selectedCategory) {
      return false
    }

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by rating
    if (selectedRatings.length > 0 && !selectedRatings.includes(product.rating)) {
      return false
    }

    return true
  })

  // Sort products based on selected sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return -1 // Assuming newest would be at the top
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.id - b.id // Default sort by id (featured)
    }
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) => {
      if (prev.includes(rating)) {
        return prev.filter((r) => r !== rating)
      } else {
        return [...prev, rating]
      }
    })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
  }

  const handleResetFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
    setPriceRange([0, 500])
    setSelectedRatings([])
    setSortOrder("featured")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalLoading />

      <div className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Browse our collection of products</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
                          <h3 className="text-sm font-medium">Categories</h3>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`category-${category.id}`}
                                  checked={selectedCategory === category.slug}
                                  onCheckedChange={() => handleCategoryChange(category.slug)}
                                />
                                <label
                                  htmlFor={`category-${category.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Price Range</h3>
                          <div className="space-y-4">
                            <Slider
                              defaultValue={priceRange}
                              max={1000}
                              step={10}
                              value={priceRange}
                              onValueChange={handlePriceRangeChange}
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-sm">${priceRange[0]}</span>
                              <span className="text-sm">${priceRange[1]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Rating</h3>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`rating-${rating}`}
                                  checked={selectedRatings.includes(rating)}
                                  onCheckedChange={() => handleRatingChange(rating)}
                                />
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
                          <Button variant="outline" onClick={handleResetFilters}>
                            Reset
                          </Button>
                          <Button>Apply Filters</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
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
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                  <Button className="mt-4" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </motion.div>

            {sortedProducts.length > 0 && (
              <motion.div
                className="flex justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
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
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

