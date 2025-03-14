"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowRight, Star, ShoppingCart, TrendingUp, Check, Clock, Truck } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { GlobalLoading } from "./global-loading"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalLoading />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-background overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {isLoaded && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 2 }}
                    className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-primary/10 blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute bottom-10 right-10 w-48 md:w-96 h-48 md:h-96 rounded-full bg-primary/20 blur-3xl"
                  />
                </>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary border-primary/20">
                      <TrendingUp className="mr-1 h-3 w-3" /> New Collection 2023
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="text-3xl sm:text-4xl font-bold tracking-tighter xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Discover Amazing Products at Unbeatable Prices
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground text-sm md:text-base lg:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Shop the latest trends in fashion, electronics, home decor, and more. Free shipping on orders over
                    $50.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/products">
                    <Button size="lg" className="group w-full sm:w-auto">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Categories
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-muted rounded-xl overflow-hidden shadow-xl mt-6 lg:mt-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-xl">
                          <motion.img
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"
                            alt="Summer Collection"
                            width={800}
                            height={500}
                            className="aspect-[16/9] object-cover w-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-xl">
                          <motion.img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
                            alt="New Arrivals"
                            width={800}
                            height={500}
                            className="aspect-[16/9] object-cover w-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-xl">
                          <motion.img
                            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=800&auto=format&fit=crop"
                            alt="Special Offers"
                            width={800}
                            height={500}
                            className="aspect-[16/9] object-cover w-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section - NEW */}
        <section className="w-full py-8 md:py-12 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On all orders over $50. International shipping available.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">All products undergo rigorous quality control checks.</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer service team is available around the clock.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  All transactions are secure and encrypted for your safety.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-8 md:py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
                <p className="max-w-[700px] text-sm md:text-base text-muted-foreground">
                  Browse our wide selection of products across various categories
                </p>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 md:mt-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.div key={category.id} variants={item}>
                  <Link href={`/categories/${category.slug}`}>
                    <motion.div
                      className="group relative overflow-hidden rounded-lg shadow-lg"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={getCategoryImage(category.slug)}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="aspect-square object-cover transition-transform group-hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3 sm:p-6">
                        <div>
                          <h3 className="text-white font-medium text-base sm:text-xl">{category.name}</h3>
                          <motion.div
                            className="h-0.5 w-0 bg-primary mt-2"
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
                <p className="max-w-[700px] text-sm md:text-base text-muted-foreground">
                  Check out our most popular items handpicked for you
                </p>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 md:mt-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <Link href={`/products/${product.id}`}>
                    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                      <Card className="h-full overflow-hidden group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative aspect-square overflow-hidden">
                          <motion.img
                            src={getProductImage(product.name, product.category)}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          {product.discount > 0 && (
                            <Badge className="absolute top-2 left-2 bg-primary">-{product.discount}%</Badge>
                          )}
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <h3 className="font-medium text-base sm:text-lg line-clamp-1">{product.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 sm:w-4 h-3 sm:h-4 ${
                                      i < product.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 fill-gray-300"
                                    }`}
                                  />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {product.discount > 0 ? (
                              <>
                                <span className="font-bold text-sm sm:text-base">
                                  ${product.discountedPrice.toFixed(2)}
                                </span>
                                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-sm sm:text-base">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <Button size="sm" className="rounded-full text-xs">
                            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Add
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center mt-8 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link href="/products">
                <Button variant="outline" className="group">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="w-full py-12 md:py-24 bg-primary/5 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
                    Limited Time
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Special Offer</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get 20% off on all electronics this week. Use code{" "}
                    <span className="font-bold text-primary">TECH20</span> at checkout.
                  </p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/categories/electronics">
                    <Button size="lg" className="group">
                      Shop Electronics
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-background rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=800&auto=format&fit=crop"
                  alt="Special offer"
                  width={800}
                  height={400}
                  className="aspect-[2/1] object-cover w-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trending Products - NEW */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <Badge className="px-3 py-1 text-sm bg-primary/20 text-primary border-primary/20">
                  <TrendingUp className="mr-1 h-3 w-3" /> Hot Items
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">Trending Now</h2>
                <p className="max-w-[700px] text-sm md:text-base text-muted-foreground">
                  Discover what's popular with our customers this season
                </p>
              </div>
            </motion.div>

            <div className="mt-8 md:mt-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {trendingProducts.map((product) => (
                    <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                      <Link href={`/products/${product.id}`}>
                        <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                          <Card className="h-full overflow-hidden group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <div className="relative w-full h-full">
                                <motion.img
                                  src={getProductImage(product.name, product.category)}
                                  alt={product.name}
                                  className="object-cover w-full h-full transition-transform absolute inset-0 z-10"
                                  whileHover={{ scale: 1.05, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                                <motion.img
                                  src={getProductImage(product.name + " alt", product.category)}
                                  alt={`${product.name} alternate view`}
                                  className="object-cover w-full h-full transition-transform absolute inset-0"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              {product.discount > 0 && (
                                <Badge className="absolute top-2 left-2 bg-primary">-{product.discount}%</Badge>
                              )}
                              {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>}
                            </div>
                            <CardContent className="p-3 sm:p-4">
                              <h3 className="font-medium text-base sm:text-lg line-clamp-1">{product.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 sm:w-4 h-3 sm:h-4 ${
                                          i < product.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300 fill-gray-300"
                                        }`}
                                      />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {product.discount > 0 ? (
                                  <>
                                    <span className="font-bold text-sm sm:text-base">
                                      ${product.discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-bold text-sm sm:text-base">${product.price.toFixed(2)}</span>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="p-3 sm:p-4 pt-0 flex justify-end">
                              <Button size="sm" className="rounded-full">
                                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                Add
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} variants={item}>
                  <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                    <Card className="h-full border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <blockquote className="mt-4 flex-1">
                          <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                        </blockquote>
                        <div className="flex items-center gap-4 mt-6">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brands Section - NEW */}
        <section className="w-full py-8 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                  Trusted by Brands Worldwide
                </h2>
                <p className="max-w-[700px] text-sm md:text-base text-muted-foreground">
                  We partner with the best brands to bring you quality products
                </p>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-8 md:mt-12">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={getBrandLogo(brand) || "/placeholder.svg"}
                    alt={`${brand} logo`}
                    className="h-12 md:h-16 object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {isLoaded && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 2 }}
                    className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl"
                  />
                </>
              )}
            </div>

            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated</h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter to receive updates on new products, special offers, and more.
                </p>
              </div>
              <motion.div
                className="w-full max-w-md space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary" className="group">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/80">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Download App Section - NEW */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
                    Mobile App
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop On The Go</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Download our mobile app for a seamless shopping experience. Get exclusive app-only deals and faster
                    checkout.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button className="flex items-center gap-2 h-14 px-6">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.954 11.616L15.911 8.659L6.36 3.29C5.727 2.923 4.97 2.87 4.311 3.241L12.954 11.616Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.415 15.045L19.489 13.247C20.029 12.931 20.372 12.414 20.457 11.827C20.541 11.24 20.35 10.65 19.932 10.232L16.415 13.749V15.045Z"
                        fill="currentColor"
                      />
                      <path
                        d="M4.1 3.799C3.94 4.071 3.852 4.387 3.852 4.723V19.276C3.852 19.612 3.94 19.928 4.1 20.2L12.954 11.616L4.1 3.799Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.954 11.616L4.311 20.758C4.97 21.129 5.727 21.076 6.36 20.709L15.911 15.34L12.954 12.383V11.616Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-base font-medium">Google Play</span>
                    </div>
                  </Button>
                  <Button className="flex items-center gap-2 h-14 px-6">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14.941 1.5C16.0072 1.5 17.0301 1.97411 17.7802 2.7242C18.5303 3.47428 19.0044 4.49716 19.0044 5.56337V18.4366C19.0044 19.5028 18.5303 20.5257 17.7802 21.2758C17.0301 22.0259 16.0072 22.5 14.941 22.5H9.05898C7.99277 22.5 6.96989 22.0259 6.21981 21.2758C5.46972 20.5257 4.99561 19.5028 4.99561 18.4366V5.56337C4.99561 4.49716 5.46972 3.47428 6.21981 2.7242C6.96989 1.97411 7.99277 1.5 9.05898 1.5H14.941Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.75C12.4142 18.75 12.75 18.4142 12.75 18C12.75 17.5858 12.4142 17.25 12 17.25C11.5858 17.25 11.25 17.5858 11.25 18C11.25 18.4142 11.5858 18.75 12 18.75Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-base font-medium">App Store</span>
                    </div>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative mx-auto max-w-[350px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=300&auto=format&fit=crop"
                  alt="Mobile app screenshot"
                  className="rounded-[40px] shadow-xl border-8 border-foreground/10"
                />
                <div className="absolute -bottom-6 -right-6 -z-10 h-[350px] w-[350px] rounded-full bg-primary/10 blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Helper function to get category images
const getCategoryImage = (slug: string) => {
  switch (slug) {
    case "clothing":
      return "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=300&auto=format&fit=crop"
    case "electronics":
      return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=300&auto=format&fit=crop"
    case "home":
      return "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=300&auto=format&fit=crop"
    case "beauty":
      return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop"
    default:
      return `/placeholder.svg?height=300&width=300&text=${slug}`
  }
}

// Helper function to get product images
const getProductImage = (productName: string, category = "") => {
  // Map product names to specific images
  const productImageMap: Record<string, string> = {
    "Wireless Bluetooth Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
    "Smart Watch Series 5": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop",
    "Fitness Tracker Band":
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=400&auto=format&fit=crop",
    "Coffee Maker": "https://images.unsplash.com/photo-1570087935869-9da023a88cdc?q=80&w=400&auto=format&fit=crop",
    "Wireless Earbuds Pro":
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=400&auto=format&fit=crop",
    "Smart Home Speaker":
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=400&auto=format&fit=crop",
    "Premium Yoga Mat": "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=400&auto=format&fit=crop",
    "Stainless Steel Cookware Set":
      "https://images.unsplash.com/photo-1584990347449-a43d8ded05d3?q=80&w=400&auto=format&fit=crop",
    "Portable Power Bank":
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=400&auto=format&fit=crop",
  }

  // Return specific image if available
  if (productName in productImageMap) {
    return productImageMap[productName]
  }

  // Otherwise return category-based image
  if (category.toLowerCase().includes("electronics")) {
    return "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("home") || category.toLowerCase().includes("kitchen")) {
    return "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("clothing")) {
    return "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("beauty")) {
    return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("sports")) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop"
  } else if (category.toLowerCase().includes("accessories")) {
    return "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop"
  }

  // Handle alternate views
  if (productName.includes(" alt")) {
    const baseName = productName.replace(" alt", "")
    // Return a different image for the same product
    if (baseName.toLowerCase().includes("wireless")) {
      return "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("smart")) {
      return "https://images.unsplash.com/photo-1544117519-31a4a39696b6?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("yoga")) {
      return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("cookware")) {
      return "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=400&auto=format&fit=crop"
    } else if (baseName.toLowerCase().includes("power")) {
      return "https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=400&auto=format&fit=crop"
    } else {
      // Return a different category image
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop"
    }
  }

  // Default fallback
  return `/placeholder.svg?height=400&width=400&text=${productName.replace(/ /g, "+")}`
}

// Helper function to get brand logos
const getBrandLogo = (brand: string) => {
  const brandLogoMap: Record<string, string> = {
    Samsung: "https://images.unsplash.com/photo-1662947995689-b354a0f1a3b3?q=80&w=200&auto=format&fit=crop",
    Apple: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&auto=format&fit=crop",
    Sony: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=200&auto=format&fit=crop",
    LG: "https://images.unsplash.com/photo-1622959588758-1308355918a2?q=80&w=200&auto=format&fit=crop",
    Nike: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop",
    Adidas: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=200&auto=format&fit=crop",
    Philips: "https://images.unsplash.com/photo-1608528577891-eb055944d2e5?q=80&w=200&auto=format&fit=crop",
    Dyson: "https://images.unsplash.com/photo-1626806787461-102c1a7f1c62?q=80&w=200&auto=format&fit=crop",
  }

  return brandLogoMap[brand] || `/placeholder.svg?height=60&width=120&text=${brand}`
}

const categories = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    image: "/placeholder.svg?height=300&width=300&text=Clothing",
  },
  {
    id: 2,
    name: "Electronics",
    slug: "electronics",
    image: "/placeholder.svg?height=300&width=300&text=Electronics",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home",
    image: "/placeholder.svg?height=300&width=300&text=Home",
  },
  {
    id: 4,
    name: "Beauty",
    slug: "beauty",
    image: "/placeholder.svg?height=300&width=300&text=Beauty",
  },
]

const featuredProducts = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
  },
]

const trendingProducts = [
  {
    id: 21,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    discount: 15,
    discountedPrice: 127.49,
    rating: 5,
    reviewCount: 87,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 22,
    name: "Smart Home Speaker",
    price: 199.99,
    discount: 0,
    discountedPrice: 199.99,
    rating: 4,
    reviewCount: 63,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 23,
    name: "Premium Yoga Mat",
    price: 59.99,
    discount: 10,
    discountedPrice: 53.99,
    rating: 5,
    reviewCount: 42,
    image: "/placeholder.svg?height=400&width=400",
    category: "Sports",
    isNew: false,
  },
  {
    id: 24,
    name: "Stainless Steel Cookware Set",
    price: 249.99,
    discount: 20,
    discountedPrice: 199.99,
    rating: 4,
    reviewCount: 31,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    isNew: false,
  },
  {
    id: 25,
    name: "Portable Power Bank",
    price: 49.99,
    discount: 0,
    discountedPrice: 49.99,
    rating: 4,
    reviewCount: 58,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    isNew: true,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Verified Buyer",
    content:
      "I've been shopping here for years and the quality of products never disappoints. The customer service is exceptional!",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Verified Buyer",
    content:
      "Fast shipping and the products are exactly as described. Will definitely be ordering again in the future.",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Verified Buyer",
    content:
      "The variety of products is amazing and the prices are very competitive. My go-to online store for all my shopping needs.",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
  },
]

const brands = ["Samsung", "Apple", "Sony", "LG", "Nike", "Adidas", "Philips", "Dyson"]

