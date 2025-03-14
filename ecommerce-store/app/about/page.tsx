"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, MapPin, Phone, Mail, Clock, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalLoading } from "../global-loading"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story")

  // Simplified animation variants with reduced complexity
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1
        delayChildren: 0.1, // Reduced from 0.3
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 }, // Reduced y from 20 to 10
    show: { opacity: 1, y: 0 },
  }

  // Improved navigation handling
  const handleNavigation = (path: string) => {
    // If it's a hash link (like /about#team), extract the hash
    if (path.includes("#")) {
      const [pagePath, hash] = path.split("#")

      // Navigate to the page first (if needed)
      if (window.location.pathname !== pagePath) {
        // Use direct location change for hash navigation
        window.location.href = path
        return
      } else {
        // If we're already on the page, just scroll to the element
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
        return
      }
    }

    // For regular links, use direct location change to avoid loading screen
    window.location.href = path
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalLoading />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-primary/10 to-background overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 10 }} // Reduced y from 20 to 10
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} // Reduced from 0.5
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              About <span className="gradient-text">ShopHub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to make shopping simpler, more enjoyable, and more affordable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/products")
                  }}
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/contact")
                  }}
                >
                  Contact Us
                </a>
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 5 }} // Reduced from y: 10
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }} // Reduced from 0.8, 0.5
              className="flex justify-center mt-16"
            >
              <Button
                variant="ghost"
                size="icon"
                className="animate-bounce rounded-full"
                onClick={() => {
                  document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section - Simplified animations */}
      <section id="content-section" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="story" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="story">Our Story</TabsTrigger>
              <TabsTrigger value="mission">Mission & Values</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="contact">Visit Us</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={activeTab === "story" ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                  <div className="space-y-4">
                    <p>
                      Founded in 2018, ShopHub started as a small online store with a vision to create a seamless
                      shopping experience for customers worldwide. What began as a passion project in a small apartment
                      has now grown into a global e-commerce platform serving thousands of customers.
                    </p>
                    <p>
                      Our founder, Alex Chen, recognized the challenges people faced while shopping online - complicated
                      interfaces, unreliable product information, and poor customer service. This motivated Alex to
                      build a platform that addressed these pain points and put customer satisfaction at the center of
                      everything.
                    </p>
                    <p>
                      Over the years, we've expanded our product offerings from just electronics to include fashion,
                      home goods, beauty products, and much more. Despite our growth, we've stayed true to our core
                      values of quality, transparency, and customer-first approach.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href="/products">
                      <Button>
                        Explore Our Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  animate={activeTab === "story" ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="ShopHub journey"
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="mission" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={activeTab === "mission" ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-4">Mission & Values</h2>
                  <div className="space-y-4">
                    <p>
                      At ShopHub, our mission is to make quality products accessible to everyone while creating a
                      shopping experience that's enjoyable, transparent, and reliable.
                    </p>
                    <p>
                      We believe that shopping should be more than just a transaction—it should be an experience that
                      leaves you satisfied and eager to return.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-4">Core Values</h3>
                  <motion.div
                    className="space-y-4"
                    variants={container}
                    initial="hidden"
                    animate={activeTab === "mission" ? "show" : "hidden"}
                  >
                    {[
                      {
                        title: "Customer First",
                        desc: "Every decision we make starts with the question: 'How does this benefit our customers?'",
                      },
                      {
                        title: "Quality Assurance",
                        desc: "We carefully vet all products to ensure they meet our high standards.",
                      },
                      {
                        title: "Transparency",
                        desc: "Clear pricing, honest product descriptions, and open communication about our business practices.",
                      },
                      {
                        title: "Sustainability",
                        desc: "Committed to reducing our environmental impact through eco-friendly practices.",
                      },
                      {
                        title: "Innovation",
                        desc: "Constantly improving our platform and offerings to better serve our customers.",
                      },
                    ].map((value, index) => (
                      <motion.div key={index} variants={item} className="flex gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{value.title}</h4>
                          <p className="text-muted-foreground">{value.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                <motion.div
                  className="rounded-xl overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  animate={activeTab === "mission" ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="ShopHub mission"
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={activeTab === "team" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                  <p className="text-muted-foreground">
                    Our diverse team of passionate individuals work together to bring you the best shopping experience.
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  variants={container}
                  initial="hidden"
                  animate={activeTab === "team" ? "show" : "hidden"}
                >
                  {[
                    {
                      name: "Alex Chen",
                      role: "Founder & CEO",
                      image:
                        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "Sarah Johnson",
                      role: "Chief Product Officer",
                      image:
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "Michael Rodriguez",
                      role: "CTO",
                      image:
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "Emily Wong",
                      role: "Head of Customer Service",
                      image:
                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "David Park",
                      role: "Marketing Director",
                      image:
                        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "Priya Sharma",
                      role: "Lead Designer",
                      image:
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "James Wilson",
                      role: "Operations Manager",
                      image:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      name: "Lisa Chen",
                      role: "Financial Controller",
                      image:
                        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                    },
                  ].map((member, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="overflow-hidden hover-card">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-medium text-lg">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="text-center mt-12">
                  <p className="mb-4 text-muted-foreground">Want to join our team?</p>
                  <Button asChild>
                    <Link href="/contact">
                      View Career Opportunities
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="contact" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={activeTab === "contact" ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-4">Visit Our Stores</h2>
                  <p className="mb-6">
                    We have physical locations where you can experience our products firsthand and get personalized
                    assistance from our team of experts.
                  </p>

                  <div className="space-y-6">
                    <div className="p-6 rounded-xl border bg-card shadow-sm">
                      <h3 className="text-xl font-bold mb-3">New York Flagship Store</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p>123 Broadway Avenue</p>
                            <p>New York, NY 10001</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <p>(212) 555-1234</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <p>nyc@shophub.com</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p>Monday - Saturday: 10AM - 8PM</p>
                            <p>Sunday: 11AM - 6PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border bg-card shadow-sm">
                      <h3 className="text-xl font-bold mb-3">San Francisco Store</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p>456 Market Street</p>
                            <p>San Francisco, CA 94103</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <p>(415) 555-6789</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <p>sf@shophub.com</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p>Monday - Saturday: 10AM - 8PM</p>
                            <p>Sunday: 11AM - 6PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link href="/contact">
                        <Button>
                          Contact Us
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-xl overflow-hidden h-[500px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={activeTab === "contact" ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="ShopHub store interior"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">ShopHub by the Numbers</h2>
            <p className="text-muted-foreground">Our growth journey reflected in numbers that tell our story.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { stat: "5+ Years", desc: "In Business" },
              { stat: "50,000+", desc: "Happy Customers" },
              { stat: "10,000+", desc: "Products Available" },
              { stat: "99%", desc: "Customer Satisfaction" },
            ].map((item, index) => (
              <motion.div key={index} variants={item} className="p-6 rounded-xl bg-card border shadow-sm">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{item.stat}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied customers who have made ShopHub their go-to shopping destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

