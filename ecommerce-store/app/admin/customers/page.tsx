"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Users, DollarSign, BarChart2, Settings, LogOut, Search, Eye, Mail, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function AdminCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : customers

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
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/orders">
              <DollarSign className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
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
                  placeholder="Search customers..."
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
              <h1 className="text-3xl font-bold">Customers</h1>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Email All Customers
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers (30 days)</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$89.45</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Customer List</h2>
                  <p className="text-sm text-muted-foreground">Manage your customers</p>
                </div>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full appearance-none bg-background pl-8 sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>${customer.spent.toFixed(2)}</TableCell>
                        <TableCell>{customer.joined}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(customer)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              {selectedCustomer && (
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Customer Details</DialogTitle>
                                    <DialogDescription>View and manage customer information</DialogDescription>
                                  </DialogHeader>
                                  <Tabs defaultValue="profile">
                                    <TabsList className="grid w-full grid-cols-3">
                                      <TabsTrigger value="profile">Profile</TabsTrigger>
                                      <TabsTrigger value="orders">Orders</TabsTrigger>
                                      <TabsTrigger value="addresses">Addresses</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="profile" className="space-y-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src={selectedCustomer.avatar || "/placeholder.svg"}
                                            alt={selectedCustomer.name}
                                          />
                                          <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-lg font-medium">{selectedCustomer.name}</h3>
                                          <p className="text-sm text-muted-foreground">
                                            Customer since {selectedCustomer.joined}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h3 className="text-sm font-medium">Email</h3>
                                          <p className="text-sm">{selectedCustomer.email}</p>
                                        </div>
                                        <div>
                                          <h3 className="text-sm font-medium">Phone</h3>
                                          <p className="text-sm">{selectedCustomer.phone}</p>
                                        </div>
                                        <div>
                                          <h3 className="text-sm font-medium">Total Orders</h3>
                                          <p className="text-sm">{selectedCustomer.orders}</p>
                                        </div>
                                        <div>
                                          <h3 className="text-sm font-medium">Total Spent</h3>
                                          <p className="text-sm">${selectedCustomer.spent.toFixed(2)}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h3 className="text-sm font-medium">Notes</h3>
                                        <p className="text-sm">{selectedCustomer.notes || "No notes available."}</p>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="orders" className="py-4">
                                      <div className="space-y-4">
                                        {selectedCustomer.orderHistory ? (
                                          selectedCustomer.orderHistory.map((order: any) => (
                                            <div key={order.id} className="flex justify-between border-b pb-2">
                                              <div>
                                                <p className="font-medium">{order.id}</p>
                                                <p className="text-sm text-muted-foreground">{order.date}</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-medium">${order.total.toFixed(2)}</p>
                                                <p className="text-sm text-muted-foreground">{order.status}</p>
                                              </div>
                                            </div>
                                          ))
                                        ) : (
                                          <p className="text-sm text-muted-foreground">No order history available.</p>
                                        )}
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="addresses" className="py-4">
                                      <div className="space-y-4">
                                        {selectedCustomer.addresses ? (
                                          selectedCustomer.addresses.map((address: any, index: number) => (
                                            <div key={index} className="border rounded-md p-3">
                                              <div className="flex justify-between">
                                                <p className="font-medium">{address.type}</p>
                                                {address.default && (
                                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                    Default
                                                  </span>
                                                )}
                                              </div>
                                              <p className="text-sm">{address.name}</p>
                                              <p className="text-sm">{address.street}</p>
                                              <p className="text-sm">
                                                {address.city}, {address.state} {address.zip}
                                              </p>
                                              <p className="text-sm">{address.country}</p>
                                            </div>
                                          ))
                                        ) : (
                                          <p className="text-sm text-muted-foreground">No addresses available.</p>
                                        )}
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                  <DialogFooter>
                                    <div className="flex gap-2">
                                      <Button variant="outline">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Email Customer
                                      </Button>
                                      <Button>Edit Customer</Button>
                                    </div>
                                  </DialogFooter>
                                </DialogContent>
                              )}
                            </Dialog>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
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
const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    orders: 5,
    spent: 549.95,
    joined: "Jan 15, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Prefers email communication. Interested in electronics products.",
    orderHistory: [
      { id: "ORD-12345", date: "Mar 15, 2023", total: 269.98, status: "Delivered" },
      { id: "ORD-11234", date: "Feb 02, 2023", total: 89.99, status: "Delivered" },
      { id: "ORD-10987", date: "Dec 10, 2022", total: 129.99, status: "Delivered" },
      { id: "ORD-10456", date: "Oct 25, 2022", total: 59.99, status: "Delivered" },
    ],
    addresses: [
      {
        type: "Shipping",
        default: true,
        name: "John Doe",
        street: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      {
        type: "Billing",
        default: true,
        name: "John Doe",
        street: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(987) 654-3210",
    orders: 8,
    spent: 782.45,
    joined: "Mar 22, 2021",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "VIP customer. Always leaves positive reviews.",
    orderHistory: [
      { id: "ORD-12346", date: "Feb 28, 2023", total: 98.25, status: "Processing" },
      { id: "ORD-11567", date: "Jan 15, 2023", total: 145.75, status: "Delivered" },
      { id: "ORD-11123", date: "Dec 05, 2022", total: 199.99, status: "Delivered" },
    ],
    addresses: [
      {
        type: "Shipping",
        default: true,
        name: "Jane Smith",
        street: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zip: "90001",
        country: "United States",
      },
      {
        type: "Billing",
        default: true,
        name: "Jane Smith",
        street: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zip: "90001",
        country: "United States",
      },
    ],
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "(555) 123-4567",
    orders: 2,
    spent: 149.98,
    joined: "Nov 10, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(444) 555-6666",
    orders: 12,
    spent: 1245.67,
    joined: "Aug 05, 2020",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(777) 888-9999",
    orders: 4,
    spent: 567.89,
    joined: "May 18, 2021",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "(222) 333-4444",
    orders: 1,
    spent: 102.58,
    joined: "Feb 27, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.m@example.com",
    phone: "(111) 222-3333",
    orders: 6,
    spent: 678.45,
    joined: "Apr 12, 2021",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.t@example.com",
    phone: "(999) 888-7777",
    orders: 3,
    spent: 345.67,
    joined: "Jul 30, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

