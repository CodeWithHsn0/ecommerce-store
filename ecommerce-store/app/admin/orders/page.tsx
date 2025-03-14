"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Package,
  Users,
  DollarSign,
  BarChart2,
  Settings,
  LogOut,
  Search,
  Eye,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalLoading } from "@/app/global-loading"

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredOrders =
    filterStatus === "all" ? orders : orders.filter((order) => order.status.toLowerCase() === filterStatus)

  return (
    <div className="flex min-h-screen">
      <GlobalLoading />

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
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
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
                  placeholder="Search orders..."
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
              <h1 className="text-3xl font-bold">Orders</h1>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Orders
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((order) => order.status === "Processing").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((order) => order.status === "Delivered").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Order List</h2>
                  <p className="text-sm text-muted-foreground">Manage your customer orders</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="w-full appearance-none bg-background pl-8 sm:w-[250px]"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Processing"
                                  ? "secondary"
                                  : order.status === "Shipped"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedOrder && (
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                                  <DialogDescription>View and manage order information</DialogDescription>
                                </DialogHeader>
                                <Tabs defaultValue="details">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="items">Items</TabsTrigger>
                                    <TabsTrigger value="customer">Customer</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="details" className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="text-sm font-medium">Order ID</h3>
                                        <p className="text-sm">{selectedOrder.id}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Date</h3>
                                        <p className="text-sm">{selectedOrder.date}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Status</h3>
                                        <Badge
                                          variant={
                                            selectedOrder.status === "Delivered"
                                              ? "default"
                                              : selectedOrder.status === "Processing"
                                                ? "secondary"
                                                : selectedOrder.status === "Shipped"
                                                  ? "outline"
                                                  : "destructive"
                                          }
                                        >
                                          {selectedOrder.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Payment Method</h3>
                                        <p className="text-sm">{selectedOrder.paymentMethod}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium">Shipping Address</h3>
                                      <p className="text-sm">{selectedOrder.shippingAddress.name}</p>
                                      <p className="text-sm">{selectedOrder.shippingAddress.street}</p>
                                      <p className="text-sm">
                                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                                        {selectedOrder.shippingAddress.zip}
                                      </p>
                                      <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Shipping:</span>
                                        <span>${selectedOrder.shipping.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Tax:</span>
                                        <span>${selectedOrder.tax.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between font-medium">
                                        <span>Total:</span>
                                        <span>${selectedOrder.total.toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="items" className="py-4">
                                    <div className="space-y-4">
                                      {selectedOrder.items.map((item: any, index: number) => (
                                        <div key={index} className="flex gap-4 border-b pb-4">
                                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                            <img
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.name}
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                          <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between text-base font-medium">
                                              <h3>{item.name}</h3>
                                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                              <p>Qty {item.quantity}</p>
                                              <p>
                                                {item.color}, {item.size}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="customer" className="py-4">
                                    <div className="space-y-4">
                                      <div>
                                        <h3 className="text-sm font-medium">Customer Name</h3>
                                        <p className="text-sm">{selectedOrder.customer}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Email</h3>
                                        <p className="text-sm">{selectedOrder.email}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Phone</h3>
                                        <p className="text-sm">{selectedOrder.phone}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Customer Since</h3>
                                        <p className="text-sm">{selectedOrder.customerSince}</p>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Order History</h3>
                                        <p className="text-sm">{selectedOrder.orderCount} orders</p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                                <DialogFooter className="flex justify-between">
                                  <Select defaultValue={selectedOrder.status.toLowerCase()}>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="shipped">Shipped</SelectItem>
                                      <SelectItem value="delivered">Delivered</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <div className="flex gap-2">
                                    <Button variant="outline">Print Invoice</Button>
                                    <Button>Update Order</Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
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
const orders = [
  {
    id: "ORD-12345",
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    date: "March 15, 2023",
    status: "Delivered",
    items: [
      {
        name: "Wireless Bluetooth Headphones",
        quantity: 1,
        price: 79.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Smart Watch Series 5",
        quantity: 1,
        price: 169.99,
        color: "Silver",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 249.98,
    shipping: 0,
    tax: 20.0,
    total: 269.98,
    paymentMethod: "Credit Card (Visa ****4567)",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    customerSince: "January 2022",
    orderCount: 5,
  },
  {
    id: "ORD-12346",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(987) 654-3210",
    date: "February 28, 2023",
    status: "Processing",
    items: [
      {
        name: "Premium Cotton T-Shirt",
        quantity: 2,
        price: 29.99,
        color: "Blue",
        size: "M",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Stainless Steel Water Bottle",
        quantity: 1,
        price: 24.99,
        color: "Silver",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 84.97,
    shipping: 5.99,
    tax: 7.29,
    total: 98.25,
    paymentMethod: "PayPal",
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    customerSince: "March 2021",
    orderCount: 8,
  },
  {
    id: "ORD-12347",
    customer: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "(555) 123-4567",
    date: "January 10, 2023",
    status: "Delivered",
    items: [
      {
        name: "Kitchen Blender Pro",
        quantity: 1,
        price: 79.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 79.99,
    shipping: 0,
    tax: 6.4,
    total: 86.39,
    paymentMethod: "Credit Card (Mastercard ****8901)",
    shippingAddress: {
      name: "Robert Johnson",
      street: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zip: "60007",
      country: "United States",
    },
    customerSince: "November 2022",
    orderCount: 2,
  },
  {
    id: "ORD-12348",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(444) 555-6666",
    date: "March 22, 2023",
    status: "Shipped",
    items: [
      {
        name: "Wireless Charging Pad",
        quantity: 1,
        price: 39.99,
        color: "White",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Smartphone Holder Stand",
        quantity: 2,
        price: 19.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 49.99,
        color: "Blue",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 129.96,
    shipping: 4.99,
    tax: 10.8,
    total: 145.75,
    paymentMethod: "Apple Pay",
    shippingAddress: {
      name: "Emily Davis",
      street: "321 Maple Road",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    customerSince: "August 2020",
    orderCount: 12,
  },
  {
    id: "ORD-12349",
    customer: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(777) 888-9999",
    date: "March 18, 2023",
    status: "Processing",
    items: [
      {
        name: "Ergonomic Office Chair",
        quantity: 1,
        price: 249.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Desk Lamp",
        quantity: 1,
        price: 45.99,
        color: "Silver",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Wireless Keyboard",
        quantity: 1,
        price: 59.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 355.97,
    shipping: 0,
    tax: 28.48,
    total: 384.45,
    paymentMethod: "Credit Card (Amex ****7654)",
    shippingAddress: {
      name: "Michael Brown",
      street: "555 Cedar Lane",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "United States",
    },
    customerSince: "May 2021",
    orderCount: 4,
  },
  {
    id: "ORD-12350",
    customer: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "(222) 333-4444",
    date: "March 25, 2023",
    status: "Cancelled",
    items: [
      {
        name: "Fitness Tracker Band",
        quantity: 1,
        price: 89.99,
        color: "Black",
        size: "One Size",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    subtotal: 89.99,
    shipping: 4.99,
    tax: 7.6,
    total: 102.58,
    paymentMethod: "Credit Card (Visa ****2345)",
    shippingAddress: {
      name: "Sarah Wilson",
      street: "888 Birch Avenue",
      city: "Denver",
      state: "CO",
      zip: "80201",
      country: "United States",
    },
    customerSince: "February 2023",
    orderCount: 1,
  },
]

