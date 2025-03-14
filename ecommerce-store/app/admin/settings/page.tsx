"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Users, DollarSign, BarChart2, Settings, LogOut, Save, Globe, CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlobalLoading } from "@/app/global-loading"

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "ShopHub",
    storeEmail: "info@shophub.com",
    storePhone: "(555) 123-4567",
    storeAddress: "123 Commerce Street, New York, NY 10001",
    currency: "usd",
    taxRate: "7.5",
    enableReviews: true,
    enableWishlist: true,
    enableGuestCheckout: true,
    lowStockThreshold: "10",
    orderEmailNotifications: true,
    stockEmailNotifications: true,
    reviewEmailNotifications: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setStoreSettings({
      ...storeSettings,
      [field]: value,
    })
  }

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
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/customers">
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
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
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Settings</h1>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Basic information about your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        value={storeSettings.storeName}
                        onChange={(e) => handleChange("storeName", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="storeEmail">Store Email</Label>
                        <Input
                          id="storeEmail"
                          type="email"
                          value={storeSettings.storeEmail}
                          onChange={(e) => handleChange("storeEmail", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storePhone">Store Phone</Label>
                        <Input
                          id="storePhone"
                          value={storeSettings.storePhone}
                          onChange={(e) => handleChange("storePhone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeAddress">Store Address</Label>
                      <Textarea
                        id="storeAddress"
                        value={storeSettings.storeAddress}
                        onChange={(e) => handleChange("storeAddress", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Settings</CardTitle>
                    <CardDescription>Configure regional settings for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                          value={storeSettings.currency}
                          onValueChange={(value) => handleChange("currency", value)}
                        >
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxRate">Tax Rate (%)</Label>
                        <Input
                          id="taxRate"
                          value={storeSettings.taxRate}
                          onChange={(e) => handleChange("taxRate", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Store Features</CardTitle>
                    <CardDescription>Enable or disable store features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Product Reviews</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to leave reviews on products</p>
                      </div>
                      <Switch
                        checked={storeSettings.enableReviews}
                        onCheckedChange={(checked) => handleChange("enableReviews", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Wishlist</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to save products to a wishlist</p>
                      </div>
                      <Switch
                        checked={storeSettings.enableWishlist}
                        onCheckedChange={(checked) => handleChange("enableWishlist", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Guest Checkout</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to checkout without creating an account
                        </p>
                      </div>
                      <Switch
                        checked={storeSettings.enableGuestCheckout}
                        onCheckedChange={(checked) => handleChange("enableGuestCheckout", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Configure payment methods for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <CreditCard className="h-6 w-6" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Credit Card</p>
                        <p className="text-sm text-muted-foreground">Accept payments via credit card</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <Globe className="h-6 w-6" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">PayPal</p>
                        <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <Globe className="h-6 w-6" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Apple Pay</p>
                        <p className="text-sm text-muted-foreground">Accept payments via Apple Pay</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Methods</CardTitle>
                    <CardDescription>Configure shipping methods for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Standard Shipping</p>
                        <p className="text-sm text-muted-foreground">3-5 business days</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input className="w-20" defaultValue="5.99" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Express Shipping</p>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input className="w-20" defaultValue="14.99" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Free Shipping</p>
                        <p className="text-sm text-muted-foreground">For orders over $50</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input className="w-20" defaultValue="50" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Configure email notifications for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Order Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications for new orders</p>
                      </div>
                      <Switch
                        checked={storeSettings.orderEmailNotifications}
                        onCheckedChange={(checked) => handleChange("orderEmailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Low Stock Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications when products are low in stock
                        </p>
                      </div>
                      <Switch
                        checked={storeSettings.stockEmailNotifications}
                        onCheckedChange={(checked) => handleChange("stockEmailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Review Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for new product reviews
                        </p>
                      </div>
                      <Switch
                        checked={storeSettings.reviewEmailNotifications}
                        onCheckedChange={(checked) => handleChange("reviewEmailNotifications", checked)}
                      />
                    </div>
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input
                        id="lowStockThreshold"
                        value={storeSettings.lowStockThreshold}
                        onChange={(e) => handleChange("lowStockThreshold", e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when product stock falls below this number
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Configure security settings for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <div className="pt-4">
                      <Button>
                        <Lock className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

