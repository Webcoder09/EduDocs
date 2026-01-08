"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-medium text-emerald-600">
            {product.fileType}
          </div>
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <FileText className="w-3 h-3" />
          <span>{product.pages} bet</span>
          <span>•</span>
          <span>{product.fileSize}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-emerald-600 font-bold">{product.price.toLocaleString()} so'm</span>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-emerald-50 hover:text-emerald-600"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
