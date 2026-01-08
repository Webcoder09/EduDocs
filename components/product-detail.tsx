"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Share2, FileText, HardDrive, File, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import type { Product } from "@/lib/products"

interface Props {
  product: Product
}

export function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const previewImages = [
    product.image,
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${product.title} page 2`)}`,
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${product.title} page 3`)}`,
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${product.title} page 4`)}`,
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${product.title} page 5`)}`,
  ]

  const handleBuyNow = () => {
    addItem(product)
    if (!user) {
      router.push(`/login?redirect=/checkout`)
    } else {
      router.push("/checkout")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] bg-white rounded-2xl border overflow-hidden">
            <Image
              src={previewImages[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {previewImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                  selectedImage === idx ? "border-emerald-500" : "border-gray-200"
                }`}
              >
                <Image src={img || "/placeholder.svg"} alt={`Preview ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="font-semibold text-gray-900 mb-2">Mahsulot tavsifi</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>

            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Teglar</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Info & Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded mb-4">
              PREMIUM CONTENT
            </span>
            <h1 className="text-xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-emerald-600 mb-6">
              {product.price.toLocaleString()} <span className="text-lg font-normal text-gray-500">so'm</span>
            </p>

            <div className="space-y-3">
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 text-base gap-2"
                onClick={() => addItem(product)}
              >
                <ShoppingCart className="w-5 h-5" />
                Savatga qo'shish
              </Button>
              <Button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white h-12 text-base gap-2"
                onClick={handleBuyNow}
              >
                Hoziroq xarid qilish
              </Button>
              <Button variant="outline" className="w-full h-12 text-base gap-2 bg-transparent" disabled>
                <Share2 className="w-5 h-5" />
                Ulashish
              </Button>
            </div>
          </div>

          {/* File Info */}
          <div className="bg-white rounded-xl p-6 border space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Betlar soni</p>
                <p className="font-semibold text-gray-900">{product.pages} ta</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fayl hajmi</p>
                <p className="font-semibold text-gray-900">{product.fileSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fayl turi</p>
                <p className="font-semibold text-emerald-600">{product.fileType}</p>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{product.author}</p>
                <p className="text-sm text-emerald-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                  Tasdiqlangan sotuvchi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
