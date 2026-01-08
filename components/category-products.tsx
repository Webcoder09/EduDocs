"use client"

import { useState } from "react"
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, getAllProducts, categoryExists } from "@/lib/products"
import Link from "next/link"

const subjects = [
  "Tarix",
  "Iqtisodiyot",
  "Huquqshunoslik",
  "Pedagogika",
  "Psixologiya",
  "Informatika",
  "Matematika",
  "Fizika",
  "Kimyo",
  "Biologiya",
]

interface Props {
  slug: string
  categoryName: string
}

export function CategoryProducts({ slug, categoryName }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const categoryProducts = categoryExists(slug) ? getProductsByCategory(slug) : []
  const allProducts = slug === "all" ? getAllProducts() : categoryProducts

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !selectedSubject || p.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const productsPerPage = 10
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  if (allProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{categoryName}</h1>
        <p className="text-gray-500 mb-8">Bu kategoriyada hozircha mahsulotlar mavjud emas</p>
        <Link href="/">
          <Button className="bg-emerald-500 hover:bg-emerald-600">Bosh sahifaga qaytish</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-500">{filteredProducts.length} ta mahsulot topildi</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="flex-1"
          />
          <Button variant="outline" className="gap-2 shrink-0 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Subject Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => {
              setSelectedSubject(null)
              setCurrentPage(1)
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              !selectedSubject ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Barchasi
          </button>
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => {
                setSelectedSubject(subject)
                setCurrentPage(1)
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedSubject === subject
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Hech qanday mahsulot topilmadi</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let page: number
            if (totalPages <= 5) {
              page = i + 1
            } else if (currentPage <= 3) {
              page = i + 1
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i
            } else {
              page = currentPage - 2 + i
            }
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                {page}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
