"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check, ShieldCheck, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlobalLoading } from "../global-loading"

// Helper function to get product images
const getProductImage = (productName: string) => {
  // Map product names to specific images
  const productImageMap: Record<string, string> = {
    "Wireless Bluetooth Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop",
    "Premium Cotton T-Shirt":
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop",
    "Smart Watch Series 5": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop",
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Default fallback
  return `/placeholder.svg?height=200&width=200`
}

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    saveAddress: false,
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    saveCard: false,
  })

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setShippingInfo({
      ...shippingInfo,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const nextStep = () => setStep(step + 1)

  const prevStep = () => setStep(step - 1)

  const handleStateChange = (value: string) => {
    setShippingInfo({
      ...shippingInfo,
      state: value,
    })
  }

  const handleCountryChange = (value: string) => {
    setShippingInfo({
      ...shippingInfo,
      country: value,
    })
  }

  const validateShippingForm = () => {
    // Basic validation
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip
    ) {
      return false
    }
    return true
  }

  const validatePaymentForm = () => {
    // Basic validation
    if (!paymentInfo.cardName || !paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvc) {
      return false
    }

    // Card number should be 16 digits
    if (paymentInfo.cardNumber.replace(/\s/g, "").length !== 16) {
      return false
    }

    // Expiry should be in MM/YY format
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!expiryPattern.test(paymentInfo.expiry)) {
      return false
    }

    // CVC should be 3 or 4 digits
    if (!/^\d{3,4}$/.test(paymentInfo.cvc)) {
      return false
    }

    return true
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShippingForm()) {
      nextStep()
    } else {
      setPaymentError("Please fill in all required fields")
      setTimeout(() => setPaymentError(""), 3000)
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePaymentForm()) {
      nextStep()
    } else {
      setPaymentError("Please enter valid payment information")
      setTimeout(() => setPaymentError(""), 3000)
    }
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setPaymentError("")

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/checkout/success")
      }, 2000)
    }, 2000)
  }

  const subtotal = 279.97
  const shipping = 0
  const tax = 22.4
  const total = subtotal + shipping + tax

  return (
    <div className="container py-10">
      <GlobalLoading />

      <Link href="/cart" className="flex items-center gap-2 text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {paymentError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      {paymentSuccess && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Payment Successful!</AlertTitle>
          <AlertDescription>Your order has been placed. Redirecting to confirmation page...</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {step > 1 ? <Check className="h-4 w-4" /> : 1}
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <Separator className="flex-1 mx-4" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {step > 2 ? <Check className="h-4 w-4" /> : 2}
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <Separator className="flex-1 mx-4" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Review</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card>
              <form onSubmit={handleShippingSubmit}>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      placeholder="Apt 4B"
                      value={shippingInfo.apartment}
                      onChange={handleShippingInfoChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={shippingInfo.state} onValueChange={handleStateChange}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="il">Illinois</SelectItem>
                          <SelectItem value="pa">Pennsylvania</SelectItem>
                          <SelectItem value="oh">Ohio</SelectItem>
                          <SelectItem value="ga">Georgia</SelectItem>
                          <SelectItem value="nc">North Carolina</SelectItem>
                          <SelectItem value="mi">Michigan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code *</Label>
                      <Input
                        id="zip"
                        name="zip"
                        placeholder="10001"
                        value={shippingInfo.zip}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={shippingInfo.country} onValueChange={handleCountryChange}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveAddress"
                      name="saveAddress"
                      checked={shippingInfo.saveAddress}
                      onCheckedChange={(checked) =>
                        setShippingInfo({ ...shippingInfo, saveAddress: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="saveAddress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    Continue to Payment
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <form onSubmit={handlePaymentSubmit}>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date (MM/YY) *</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={paymentInfo.expiry}
                            onChange={handlePaymentInfoChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC *</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={paymentInfo.cvc}
                            onChange={handlePaymentInfoChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveCard"
                          name="saveCard"
                          checked={paymentInfo.saveCard}
                          onCheckedChange={(checked) =>
                            setPaymentInfo({ ...paymentInfo, saveCard: checked as boolean })
                          }
                        />
                        <label
                          htmlFor="saveCard"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Save this card for future payments
                        </label>
                      </div>
                      <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <p className="text-sm text-muted-foreground">
                          Your payment information is secure and encrypted
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="pt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                        <Button type="button">Continue with PayPal</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="apple" className="pt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">You will be redirected to Apple Pay to complete your payment.</p>
                        <Button type="button">Continue with Apple Pay</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={prevStep}>
                    Back
                  </Button>
                  <Button type="submit">Review Order</Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p>
                      {shippingInfo.address}
                      {shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}
                    </p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state.toUpperCase()} {shippingInfo.zip}
                    </p>
                    <p>
                      {shippingInfo.country === "us"
                        ? "United States"
                        : shippingInfo.country === "ca"
                          ? "Canada"
                          : shippingInfo.country === "uk"
                            ? "United Kingdom"
                            : shippingInfo.country === "au"
                              ? "Australia"
                              : shippingInfo.country}
                    </p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      {paymentInfo.cardNumber &&
                        `${paymentInfo.cardNumber.substring(0, 4)} **** **** ${paymentInfo.cardNumber.slice(-4)}`}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded overflow-hidden">
                          <img
                            src={getProductImage(item.name) || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.color}, {item.size} x {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={handlePlaceOrder} disabled={isProcessing || paymentSuccess}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data
const orderItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    quantity: 1,
    color: "Black",
    size: "One Size",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    color: "Blue",
    size: "M",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 169.99,
    quantity: 1,
    color: "Silver",
    size: "One Size",
    image: "/placeholder.svg?height=200&width=200",
  },
]

