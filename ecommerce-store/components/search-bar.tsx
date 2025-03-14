"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample product data for search
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Electronics",
    image: "/placeholder.svg?height=80&width=80&text=Headphones",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    image: "/placeholder.svg?height=80&width=80&text=T-Shirt",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 169.99,
    category: "Electronics",
    image: "/placeholder.svg?height=80&width=80&text=Smart+Watch",
  },
  {
    id: 4,
    name: "Kitchen Blender Pro",
    price: 79.99,
    category: "Home & Kitchen",
    image: "/placeholder.svg?height=80&width=80&text=Blender",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 224.99,
    category: "Home & Kitchen",
    image: "/placeholder.svg?height=80&width=80&text=Office+Chair",
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    category: "Home & Kitchen",
    image: "/placeholder.svg?height=80&width=80&text=Water+Bottle",
  },
  {
    id: 7,
    name: "Fitness Tracker Band",
    price: 80.99,
    category: "Electronics",
    image: "/placeholder.svg?height=80&width=80&text=Fitness+Tracker",
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 103.99,
    category: "Home & Kitchen",
    image: "/placeholder.svg?height=80&width=80&text=Coffee+Maker",
  },
  {
    id: 9,
    name: "Leather Wallet",
    price: 49.99,
    category: "Accessories",
    image: "/placeholder.svg?height=80&width=80&text=Wallet",
  },
  {
    id: 10,
    name: "Smartphone Holder Stand",
    price: 19.99,
    category: "Electronics",
    image: "/placeholder.svg?height=80&width=80&text=Phone+Stand",
  },
]

interface SearchBarProps {
  isMobile?: boolean
  setSearchOpen?: (open: boolean) => void
}

export function SearchBar({ isMobile = false, setSearchOpen }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof sampleProducts>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearching(false)
        if (setSearchOpen) {
          setSearchOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setSearchOpen])

  // Handle search
  useEffect(() => {
    if (query.length >= 1) {
      // Filter products based on query (case insensitive)
      const filtered = sampleProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsSearching(true)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`)
      setIsSearching(false)
      if (setSearchOpen) {
        setSearchOpen(false)
      }
      setQuery("")
    }
  }

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`)
    setIsSearching(false)
    if (setSearchOpen) {
      setSearchOpen(false)
    }
    setQuery("")
  }

  return (
    <div ref={searchContainerRef} className={`relative ${isMobile ? "w-full" : "w-full max-w-[300px]"}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 pr-8 h-9 sm:h-10 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            autoComplete="off"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 sm:h-10 w-9 sm:w-10"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isSearching && results.length > 0 && (
          <motion.div
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-lg border bg-background shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-h-[300px] sm:max-h-[400px] overflow-auto p-2">
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-1">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-md p-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-md object-cover"
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-xs sm:text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="font-medium text-xs sm:text-sm">${product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t p-2">
              <p className="text-xs text-muted-foreground">Press Enter to see all results</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={handleSearch} className="h-7 text-xs">
                      View All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>See all search results</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

