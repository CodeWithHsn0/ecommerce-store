import { ShoppingCart } from "lucide-react"
import { Button } from "./button"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  showCart?: boolean
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({
  title = "No items found",
  description = "Try adjusting your search or filters",
  showCart = true,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        {showCart ? (
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-karolina-grabowska-5650028.jpg-b6OdygM0fRRPzEG5SqHCAqa17qgYrU.jpeg"
            alt="Empty shopping cart"
            className="w-full max-w-[200px] h-auto mx-auto mb-8"
          />
        ) : (
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
        )}
        <h2 className="mt-4 text-lg font-medium">{title}</h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
        {action && (
          <Link href={action.href}>
            <Button className="mt-6">{action.label}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

