import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EduDocs</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Kurs ishlari, diplom hamda dissertatsiyalarni professional darajada, sifatli tarzda platformamiz orqali
              toping.
            </p>
          </div>

          {/* Kategoriyalar */}
          <div>
            <h4 className="font-semibold mb-4">Kategoriyalar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/category/diplom-ishlari" className="hover:text-emerald-400">
                  Diplom ishlari
                </Link>
              </li>
              <li>
                <Link href="/category/kurs-ishlari" className="hover:text-emerald-400">
                  Kurs ishlari
                </Link>
              </li>
              <li>
                <Link href="/category/taqdimotlar" className="hover:text-emerald-400">
                  Taqdimotlar
                </Link>
              </li>
              <li>
                <Link href="/category/referatlar" className="hover:text-emerald-400">
                  Referatlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Bog'lanish */}
          <div>
            <h4 className="font-semibold mb-4">Bog'lanish</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+998 99 999 99 99</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>info@edudocs.uz</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Toshkent, O'zbekiston</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EduDocs. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
