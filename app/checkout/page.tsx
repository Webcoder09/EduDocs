"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, CreditCard, Shield, Zap, CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

type PaymentMethod = "uzcard" | "click" | "payme"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("uzcard")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [purchasedItems, setPurchasedItems] = useState<typeof items>([])

  const { items, total, serviceFee, grandTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login?redirect=/checkout")
    return null
  }

  if (items.length === 0 && !isComplete) {
    router.push("/")
    return null
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setPurchasedItems([...items])
    setIsProcessing(false)
    setIsComplete(true)
    clearCart()
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/files/edudocs-sample.pdf"
    link.download = "edudocs-document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Nav */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 h-16 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Bosh sahifa</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">To'lov tasdiqlandi!</h1>
            <p className="text-gray-500 mb-8">Xaridingiz muvaffaqiyatli amalga oshirildi</p>

            <div className="bg-white rounded-xl border p-6 mb-6">
              <h3 className="font-semibold mb-4">Sotib olingan mahsulotlar</h3>
              <div className="space-y-3">
                {purchasedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-10 rounded overflow-hidden shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <span className="text-sm text-gray-700 line-clamp-1 flex-1">{item.title}</span>
                    <Button
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0 gap-1"
                      onClick={handleDownload}
                    >
                      <Download className="w-3 h-3" />
                      Yuklab olish
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={() => router.push("/")} className="w-full">
              Bosh sahifaga qaytish
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Orqaga</span>
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <h1 className="text-xl font-bold">To'lov</h1>
          <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-0.5 rounded-full">{items.length} ta</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{items.length} ta mahsulot</h2>
              <Link href="/cart" className="text-emerald-600 text-sm hover:underline">
                Tahrirlash
              </Link>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-4 border-b">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.fileType}</p>
                  </div>
                  <p className="text-emerald-600 font-semibold shrink-0">{item.price.toLocaleString()} so'm</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sayt xizmat haqi uchun:</span>
                <span>{serviceFee.toLocaleString()} so'm (10%)</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Jami narx</span>
                <span className="text-emerald-600">{grandTotal.toLocaleString()} so'm</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl border p-6">
            {/* Payment Methods */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("uzcard")}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === "uzcard" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                  <div className="w-8 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    H
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("click")}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === "click" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                }`}
              >
                <div className="w-16 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold mx-auto">
                  CLICK
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("payme")}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === "payme" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                }`}
              >
                <div className="w-16 h-5 bg-cyan-400 rounded flex items-center justify-center text-white text-xs font-bold mx-auto">
                  Payme
                </div>
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Karta raqami</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amal qilish muddati</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Tekshirilmoqda...
                  </span>
                ) : (
                  "Karta orqali to'lash"
                )}
              </Button>

              <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                To'lov xavfsiz va shifrlangan SSL protokol orqali amalga oshiriladi
              </p>
            </form>

            {/* Trust Badges */}
            <div className="flex justify-center gap-8 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs text-gray-600">Xavfsiz</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs text-gray-600">Tez</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs text-gray-600">Ishonchli</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
