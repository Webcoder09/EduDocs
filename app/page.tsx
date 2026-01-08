import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesGrid } from "@/components/categories-grid"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoriesGrid />
      <ProductsSection title="Diplom ishlari" category="diplom-ishlari" badge="MASHHUR" />
      <ProductsSection title="Amaliy ishlar" category="amaliy-ishlar" />
      <ProductsSection title="Mustaqil ishlar" category="mustaqil-ishlar" />
      <ProductsSection title="Taqdimotlar" category="taqdimotlar" />
      <ProductsSection title="Referatlar" category="referatlar" />
      <Footer />
    </main>
  )
}
