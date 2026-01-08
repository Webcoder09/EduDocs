"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PurchasesPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login?redirect=/purchases")
    return null
  }

  // Demo purchases - in real app would come from database
  const purchases: any[] = []

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Sotib olinganlar</h1>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hali xarid qilmadingiz</h2>
            <p className="text-gray-500 mb-6">Mahsulotlarni sotib oling va bu yerda ko'ring</p>
            <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Xarid qilish
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase, idx) => (
              <div key={idx} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-medium">{purchase.title}</h3>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Yuklab olish
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
