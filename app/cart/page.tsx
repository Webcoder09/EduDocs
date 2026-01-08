"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CartPage() {
  const { items, removeItem, total, serviceFee, grandTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
    } else {
      router.push("/checkout")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Savatcha</h1>
          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-sm">{items.length} ta</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Savatcha bo'sh</h2>
            <p className="text-gray-500 mb-6">Mahsulotlar qo'shing va xarid qiling</p>
            <Link href="/">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Xarid qilish</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-emerald-600 line-clamp-2">{item.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.fileType} • {item.pages} bet
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-emerald-600">{item.price.toLocaleString()} so'm</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600 mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h2 className="font-semibold mb-4">Buyurtma</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mahsulotlar ({items.length})</span>
                    <span>{total.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Xizmat haqi (10%)</span>
                    <span>{serviceFee.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Jami</span>
                    <span className="text-emerald-600">{grandTotal.toLocaleString()} so'm</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white">
                  Rasmiylashtirish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
