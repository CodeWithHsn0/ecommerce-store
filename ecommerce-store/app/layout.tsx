"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Search, Menu, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { GlobalLoading } from "./global-loading"
import "./globals.css"
import { initAnalytics } from "@/lib/firebase"

// Categories data
const categories = [
  { id: 1, name: "Clothing", slug: "clothing" },
  { id: 2, name: "Electronics", slug: "electronics" },
  { id: 3, name: "Home & Kitchen", slug: "home" },
  { id: 4, name: "Beauty", slug: "beauty" },
  { id: 5, name: "Sports", slug: "sports" },
  { id: 6, name: "Accessories", slug: "accessories" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Initialize Firebase Analytics
    initAnalytics()
  }, [])

  // Optimize the navigation handling to be more direct and immediate
  const handleNavigation = (path: string) => {
    // Close the menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // For hash links, just use direct navigation
    if (path.includes("#")) {
      window.location.href = path
      return
    }

    // For regular links, use direct location change with no delay
    window.location.href = path
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Global Loading Component */}
        <GlobalLoading />

        {/* Header */}
        <motion.header
          className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200 ${
            isScrolled ? "shadow-md" : ""
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container flex h-14 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-4 md:gap-10">
              <a
                href="/"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/")
                }}
              >
                <motion.span
                  className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ShopHub
                </motion.span>
              </a>
              <nav className="hidden md:flex gap-4 lg:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <a
                    href="/products"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/products")
                    }}
                  >
                    All Products
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <a
                    href="/categories"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/categories")
                    }}
                  >
                    Categories
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <a
                    href="/about"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/about")
                    }}
                  >
                    About
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <a
                    href="/contact"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/contact")
                    }}
                  >
                    Contact
                  </a>
                </motion.div>
              </nav>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "300px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SearchBar setSearchOpen={setSearchOpen} />
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                      <Search className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/wishlist"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/wishlist")
                }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-xs">
                      3
                    </Badge>
                  </Button>
                </motion.div>
              </a>
              <a
                href="/cart"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/cart")
                }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-xs">
                      2
                    </Badge>
                  </Button>
                </motion.div>
              </a>
              <a
                href="/account"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/account")
                }}
                className="hidden sm:block"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </a>
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80vw] max-w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      ShopHub
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <SearchBar isMobile={true} />
                    <nav className="flex flex-col gap-4 mt-6">
                      <a
                        href="/"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/")
                        }}
                      >
                        Home
                      </a>
                      <a
                        href="/products"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/products")
                        }}
                      >
                        All Products
                      </a>
                      <a
                        href="/categories"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/categories")
                        }}
                      >
                        Categories
                      </a>
                      <a
                        href="/about"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/about")
                        }}
                      >
                        About
                      </a>
                      <a
                        href="/contact"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/contact")
                        }}
                      >
                        Contact
                      </a>
                      <a
                        href="/admin"
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/admin")
                        }}
                      >
                        Admin
                      </a>

                      <div className="px-3 py-2">
                        <h3 className="mb-2 px-4 text-sm font-medium">Shop by Category</h3>
                        {categories.map((category) => (
                          <a
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="w-full block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavigation(`/categories/${category.slug}`)
                            }}
                          >
                            {category.name}
                          </a>
                        ))}
                      </div>

                      <div className="px-3 py-2">
                        <h3 className="mb-2 px-4 text-sm font-medium">My Account</h3>
                        <a
                          href="/account"
                          className="w-full block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavigation("/account")
                          }}
                        >
                          Profile
                        </a>
                        <a
                          href="/wishlist"
                          className="w-full block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavigation("/wishlist")
                          }}
                        >
                          Wishlist
                        </a>
                        <a
                          href="/cart"
                          className="w-full block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavigation("/cart")
                          }}
                        >
                          Cart
                        </a>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="md:hidden container py-2">
            <SearchBar isMobile={true} />
          </div>
        </motion.header>

        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
