import Link from "next/link"
import {
  Monitor,
  Presentation,
  FileText,
  GraduationCap,
  FileSpreadsheet,
  Briefcase,
  BookOpen,
  BarChart3,
  PenTool,
  FileCheck,
} from "lucide-react"

const categories = [
  { name: "Taqdimotlar", icon: Presentation, gradient: "from-emerald-400 to-teal-500" },
  { name: "Kurs ishlari", icon: Monitor, gradient: "from-teal-400 to-cyan-500" },
  { name: "Mustaqil ishlar", icon: FileText, gradient: "from-blue-400 to-indigo-500" },
  { name: "Diplom ishlari", icon: GraduationCap, gradient: "from-indigo-400 to-purple-500" },
  { name: "Blankalar", icon: FileSpreadsheet, gradient: "from-purple-400 to-violet-500" },
  { name: "Biznes rejalar", icon: Briefcase, gradient: "from-pink-400 to-rose-500" },
  { name: "Elektron kitoblar", icon: BookOpen, gradient: "from-rose-400 to-pink-500" },
  { name: "Statistika", icon: BarChart3, gradient: "from-orange-400 to-red-500" },
  { name: "Namunaviy hujjatlar", icon: FileCheck, gradient: "from-cyan-400 to-teal-500" },
  { name: "Maqola", icon: PenTool, gradient: "from-teal-400 to-emerald-500" },
]

export function CategoriesGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                className={`group relative bg-gradient-to-br ${cat.gradient} rounded-2xl p-6 text-white transition-transform hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm">{cat.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
