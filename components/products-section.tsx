import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory } from "@/lib/products"

interface ProductsSectionProps {
  title: string
  category: string
  badge?: string
}

export function ProductsSection({ title, category, badge }: ProductsSectionProps) {
  const products = getProductsByCategory(category).slice(0, 10)

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {badge && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">{badge}</span>}
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <Link href={`/category/${category}`}>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 gap-1">
              Barchasi
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
