import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="container mx-auto px-4 py-8">Yuklanmoqda...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  )
}
