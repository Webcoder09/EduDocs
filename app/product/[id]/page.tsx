import { notFound } from "next/navigation"
import { getProductById, getProductsByCategory } from "@/lib/products"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { ProductCard } from "@/components/product-card"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const similarProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 10)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500">
            <a href="/" className="hover:text-emerald-600">
              Bosh sahifa
            </a>
            <span className="mx-2">/</span>
            <a href={`/category/${product.category}`} className="hover:text-emerald-600 capitalize">
              {product.category.replace("-", " ")} | {product.subject}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 line-clamp-1">{product.title}</span>
          </nav>
        </div>
      </div>

      <ProductDetail product={product} />

      {/* Similar Products */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">O'xshash mahsulotlar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
