"use client"

import { useSearchParams } from "next/navigation"
import { searchProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Search } from "lucide-react"

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = searchProducts(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Qidiruv natijalari: "{query}"</h1>
        <p className="text-gray-500">{results.length} ta mahsulot topildi</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h2>
          <p className="text-gray-500">Boshqa so'zlar bilan qidirib ko'ring</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
