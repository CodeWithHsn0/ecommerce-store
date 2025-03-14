import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

// Categories data
const categories = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    description: "Stylish and comfortable clothing for all occasions",
    image: "/placeholder.svg?height=300&width=300&text=Clothing",
  },
  {
    id: 2,
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "/placeholder.svg?height=300&width=300&text=Electronics",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home",
    description: "Everything you need for your home and kitchen",
    image: "/placeholder.svg?height=300&width=300&text=Home",
  },
  {
    id: 4,
    name: "Beauty",
    slug: "beauty",
    description: "Beauty and personal care products",
    image: "/placeholder.svg?height=300&width=300&text=Beauty",
  },
  {
    id: 5,
    name: "Sports",
    slug: "sports",
    description: "Sports equipment and fitness gear",
    image: "/placeholder.svg?height=300&width=300&text=Sports",
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    description: "Stylish accessories to complete your look",
    image: "/placeholder.svg?height=300&width=300&text=Accessories",
  },
]

export default function CategoriesPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center gap-2 text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <div className="group relative overflow-hidden rounded-lg border h-full">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-xl mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Browse {category.name}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

