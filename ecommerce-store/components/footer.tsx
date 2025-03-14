"use client"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  // Optimize the navigation handling in the footer as well
  // Replace the entire handleNavigation function with this optimized version:

  const handleNavigation = (path: string) => {
    // For hash links, just use direct navigation
    if (path.includes("#")) {
      window.location.href = path
      return
    }

    // For regular links, use direct location change with no delay
    window.location.href = path
  }

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <a
              href="/"
              className="inline-block mb-4"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
            >
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                ShopHub
              </span>
            </a>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and exceptional
              service.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/products")
                  }}
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/categories")
                  }}
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/categories/clothing"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/categories/clothing")
                  }}
                >
                  Clothing
                </a>
              </li>
              <li>
                <a
                  href="/categories/electronics"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/categories/electronics")
                  }}
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="/categories/home"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/categories/home")
                  }}
                >
                  Home & Kitchen
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Account</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/account"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/account")
                  }}
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/wishlist")
                  }}
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/cart")
                  }}
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="/account/orders"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/account/orders")
                  }}
                >
                  Order History
                </a>
              </li>
              <li>
                <a
                  href="/account/settings"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/account/settings")
                  }}
                >
                  Account Settings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/about")
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/contact")
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/terms")
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/privacy")
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/about#team"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/about#team")
                  }}
                >
                  Our Team
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Subscribe to our newsletter</span>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="w-full sm:w-auto" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

