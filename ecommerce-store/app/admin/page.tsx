"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Users, DollarSign, BarChart2, Settings, LogOut, Plus, Search, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Make sure the export is correct
export default function AdminDashboard() {
  const [products, setProducts] = useState(sampleProducts)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    stock: 0,
    featured: false,
    image: "/placeholder.svg?height=400&width=400",
  })

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      discountedPrice: newProduct.discount > 0 ? newProduct.price * (1 - newProduct.discount / 100) : newProduct.price,
      rating: 0,
      reviewCount: 0,
    }

    setProducts([...products, productToAdd])
    setIsAddProductOpen(false)
    setNewProduct({
      id: 0,
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      stock: 0,
      featured: false,
      image: "/placeholder.svg?height=400&width=400",
    })
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalCustomers = customers.length
  const lowStockProducts = products.filter((product) => product.stock < 10).length

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold">ShopHub Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
            <Link href="/admin/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/orders">
              <DollarSign className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/customers">
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium md:hidden">ShopHub Admin</h2>
            <div className="ml-auto flex items-center gap-4">
              <div className="relative w-full max-w-sm hidden md:flex">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Products</h1>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new product. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="home">Home & Kitchen</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discount">Discount (%)</Label>
                        <Input
                          id="discount"
                          type="number"
                          value={newProduct.discount || ""}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, discount: Number.parseFloat(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Switch
                          id="featured"
                          checked={newProduct.featured}
                          onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="/placeholder.svg?height=400&width=400"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct}>Save Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lowStockProducts}</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Product List</h2>
                  <p className="text-sm text-muted-foreground">Manage your products</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 md:w-[300px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <span>{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category || "Uncategorized"}</TableCell>
                        <TableCell>
                          {product.discount > 0 ? (
                            <div>
                              <span className="font-medium">${product.discountedPrice.toFixed(2)}</span>
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>{product.stock || "N/A"}</TableCell>
                        <TableCell>
                          {product.stock > 0 ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Out of Stock
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    discount: 20,
    discountedPrice: 79.99,
    rating: 4,
    reviewCount: 120,
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Sports",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 9,
    featured: true,
  },
]

const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2023",
    status: "Delivered",
    total: 249.98,
  },
  {
    id: "ORD-12346",
    date: "February 28, 2023",
    status: "Processing",
    total: 84.97,
  },
  {
    id: "ORD-12347",
    date: "January 10, 2023",
    status: "Delivered",
    total: 79.99,
  },
  {
    id: "ORD-12348",
    date: "March 22, 2023",
    status: "Shipped",
    total: 129.99,
  },
  {
    id: "ORD-12349",
    date: "March 18, 2023",
    status: "Processing",
    total: 349.97,
  },
]

const customers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", orders: 5, spent: 549.95 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", orders: 3, spent: 324.97 },
  { id: 3, name: "Robert Johnson", email: "robert.j@example.com", orders: 2, spent: 149.98 },
  { id: 4, name: "Emily Davis", email: "emily.d@example.com", orders: 7, spent: 789.93 },
  { id: 5, name: "Michael Brown", email: "michael.b@example.com", orders: 1, spent: 79.99 },
]

