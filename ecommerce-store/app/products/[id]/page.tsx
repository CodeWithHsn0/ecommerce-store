"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Star, Truck, ArrowLeft, Check, Info } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlobalLoading } from "@/app/global-loading"

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
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Otherwise return category-based image
  if (category?.toLowerCase().includes("electronics")) {
    return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("home") || category?.toLowerCase().includes("kitchen")) {
    return "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("clothing")) {
    return "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("beauty")) {
    return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("sports")) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop"
  } else if (category?.toLowerCase().includes("accessories")) {
    return "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop"
  }

  // Default fallback
  return `/placeholder.svg?height=400&width=400&text=${productName.replace(/ /g, "+")}`
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("m")
  const [selectedColor, setSelectedColor] = useState("black")
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)

  const product = getProductById(Number.parseInt(params.id))

  if (!product) {
    return <div className="container py-10">Product not found</div>
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    // In a real app, you would add the product to a cart state or context
    setAddedToCart(true)

    // Reset the notification after 3 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  const handleBuyNow = () => {
    // Add to cart and redirect to checkout
    handleAddToCart()
    router.push("/cart")
  }

  const toggleWishlist = () => {
    setAddedToWishlist(!addedToWishlist)
  }

  return (
    <div className="container py-10">
      <GlobalLoading />

      <Link href="/products" className="flex items-center gap-2 text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      {addedToCart && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Added to cart!</AlertTitle>
          <AlertDescription>
            {product.name} has been added to your cart.{" "}
            <Link href="/cart" className="font-medium underline">
              View cart
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl border">
                      <motion.img
                        src={
                          index === 0
                            ? getProductImage(product.name, product.category)
                            : `https://images.unsplash.com/photo-${1550000000000 + index * 10000}-${Math.floor(Math.random() * 1000000)}?q=80&w=600&auto=format&fit=crop`
                        }
                        alt={`${product.name} - Image ${index + 1}`}
                        className="aspect-square object-cover w-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-md border w-20 h-20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={
                    index === 0
                      ? getProductImage(product.name, product.category)
                      : `https://images.unsplash.com/photo-${1550000000000 + index * 10000}-${Math.floor(Math.random() * 1000000)}?q=80&w=80&auto=format&fit=crop`
                  }
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {product.discount > 0 && <Badge className="mb-2 bg-red-500">-{product.discount}% OFF</Badge>}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold">${product.discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <RadioGroup
                  defaultValue="black"
                  id="color"
                  className="flex gap-2"
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="black" className="peer sr-only" />
                    <Label
                      htmlFor="black"
                      className="h-8 w-8 rounded-full bg-black border border-gray-200 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="white" id="white" className="peer sr-only" />
                    <Label
                      htmlFor="white"
                      className="h-8 w-8 rounded-full bg-white border border-gray-200 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
                    <Label
                      htmlFor="blue"
                      className="h-8 w-8 rounded-full bg-blue-500 border border-gray-200 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                    />
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size" className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="secondary" size="lg" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button
                  variant={addedToWishlist ? "default" : "outline"}
                  size="icon"
                  className={`h-12 w-12 ${addedToWishlist ? "bg-red-500 hover:bg-red-600 text-white border-red-500" : ""}`}
                  onClick={toggleWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm">In stock - ready to ship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">30-day returns policy</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed
                euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              </p>
              <ul>
                <li>Feature 1: Lorem ipsum dolor sit amet</li>
                <li>Feature 2: Consectetur adipiscing elit</li>
                <li>Feature 3: Sed euismod, nisl vel ultricies lacinia</li>
                <li>Feature 4: Nisl nisl aliquam nisl, eu aliquam nisl</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Dimensions</h3>
                  <p className="text-sm text-muted-foreground">10 x 5 x 2 inches</p>
                </div>
                <div>
                  <h3 className="font-medium">Weight</h3>
                  <p className="text-sm text-muted-foreground">0.5 lbs</p>
                </div>
                <div>
                  <h3 className="font-medium">Materials</h3>
                  <p className="text-sm text-muted-foreground">Premium quality materials</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Warranty</h3>
                  <p className="text-sm text-muted-foreground">1 year limited warranty</p>
                </div>
                <div>
                  <h3 className="font-medium">Package Contents</h3>
                  <p className="text-sm text-muted-foreground">1 x Product, 1 x Manual, 1 x Warranty Card</p>
                </div>
                <div>
                  <h3 className="font-medium">Country of Origin</h3>
                  <p className="text-sm text-muted-foreground">Made in USA</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-sm">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              <Separator />

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 fill-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{review.content}</p>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    src={getProductImage(product.name)}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {product.discount > 0 ? (
                      <>
                        <span className="font-bold">${product.discountedPrice.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get product by ID
function getProductById(id: number) {
  return products.find((product) => product.id === id) || null
}

// Sample data
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
    category: "electronics",
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
    category: "kitchen",
  },
]

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "January 15, 2023",
    content:
      "This product exceeded my expectations. The quality is excellent and it works perfectly. Highly recommend!",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "December 3, 2022",
    content:
      "Great product for the price. The only reason I'm giving 4 stars instead of 5 is because the delivery was a bit delayed.",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  },
  {
    id: 3,
    name: "Robert Johnson",
    rating: 5,
    date: "November 18, 2022",
    content: "Absolutely love this! It's exactly what I was looking for and the quality is top-notch.",
    avatar: "/placeholder.svg?height=40&width=40&text=RJ",
  },
]

const relatedProducts = [
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
    category: "kitchen",
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
  },
]

