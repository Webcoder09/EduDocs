import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryProducts } from "@/components/category-products"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryProducts slug={slug} categoryName={categoryName} />
      <Footer />
    </main>
  )
}
