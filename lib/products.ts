export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  subject: string
  image: string
  pages: number
  fileSize: string
  fileType: string
  author: string
  tags: string[]
}

const subjects = [
  "Tarix",
  "Iqtisodiyot",
  "Huquqshunoslik",
  "Pedagogika",
  "Psixologiya",
  "Informatika",
  "Matematika",
  "Fizika",
  "Kimyo",
  "Biologiya",
]

const categorySlugMap: Record<string, string> = {
  "diplom-ishlari": "diplom-ishlari",
  "amaliy-ishlar": "amaliy-ishlar",
  "mustaqil-ishlar": "mustaqil-ishlar",
  taqdimotlar: "taqdimotlar",
  referatlar: "referatlar",
  "kurs-ishlari": "kurs-ishlari",
  blankalar: "blankalar",
  "biznes-rejalar": "biznes-rejalar",
  "elektron-kitoblar": "elektron-kitoblar",
  statistika: "statistika",
  "namunaviy-hujjatlar": "namunaviy-hujjatlar",
  maqola: "maqola",
}

const categoryTitles: Record<string, string[]> = {
  "diplom-ishlari": [
    "O'zbekistonda demokratik jamiyat asoslarining shakllanishi",
    "Kichik biznesni rivojlantirish yo'llari",
    "Zamonaviy ta'lim tizimining xususiyatlari",
    "Bank tizimida moliyaviy tahlil",
    "Korxonalarda marketing strategiyasi",
    "Soliq tizimini takomillashtirish",
    "Xalqaro savdo munosabatlari",
    "Mehnat bozorini tartibga solish",
    "Investitsiya muhitini yaxshilash",
    "Raqamli iqtisodiyotga o'tish",
  ],
  "amaliy-ishlar": [
    "Statistik ma'lumotlarni tahlil qilish",
    "Buxgalteriya hisobotlarini tuzish",
    "Marketing tadqiqotlari o'tkazish",
    "Biznes-reja tuzish asoslari",
    "Moliyaviy hisob-kitoblar",
    "Korxona faoliyatini baholash",
    "Kadrlar bo'limi hujjatlari",
    "Soliq hisobotlarini tayyorlash",
    "Audit tekshiruvini o'tkazish",
    "Loyiha boshqaruvi asoslari",
  ],
  "mustaqil-ishlar": [
    "Makroiqtisodiy tahlil usullari",
    "Menejment asoslari",
    "Marketing kommunikatsiyalari",
    "Moliya bozorlari",
    "Bank operatsiyalari",
    "Sug'urta faoliyati",
    "Logistika asoslari",
    "Elektron tijorat",
    "Xalqaro moliya",
    "Korporativ boshqaruv",
  ],
  taqdimotlar: [
    "O'zbekiston iqtisodiyoti haqida",
    "Zamonaviy texnologiyalar",
    "Ekologik muammolar va yechimlar",
    "Globallashuv jarayonlari",
    "Innovatsion loyihalar",
    "Raqamli transformatsiya",
    "Startup ekotizimi",
    "Yashil iqtisodiyot",
    "Sun'iy intellekt",
    "Kelajak kasblar",
  ],
  referatlar: [
    "O'zbekiston tarixi",
    "Jahon iqtisodiyoti",
    "Huquq asoslari",
    "Falsafa tarixi",
    "Sotsiologiya asoslari",
    "Psixologiya asoslari",
    "Pedagogika nazariyasi",
    "Ekologiya va tabiat",
    "Madaniyatshunoslik",
    "Siyosatshunoslik",
  ],
  "kurs-ishlari": [
    "Moliyaviy menejment asoslari",
    "Buxgalteriya hisobi nazariyasi",
    "Marketing strategiyalari",
    "Inson resurslari boshqaruvi",
    "Operatsion menejment",
    "Strategik rejalashtirish",
    "Xalqaro biznes",
    "Korxona iqtisodiyoti",
    "Innovatsiya menejmenti",
    "Raqamli marketing",
  ],
  blankalar: [
    "Mehnat shartnomasi namunasi",
    "Buyruq blankasi",
    "Tushuntirish xati",
    "Ariza namunasi",
    "Ishdan bo'shatish buyrug'i",
    "Ta'til buyrug'i",
    "Ish haqi vedomosti",
    "Hisobot shakli",
    "Dalolatnoma namunasi",
    "Protokol blankasi",
  ],
  "biznes-rejalar": [
    "Kafe ochish biznes rejasi",
    "Onlayn do'kon loyihasi",
    "Fermer xo'jaligi biznes reja",
    "IT kompaniya loyihasi",
    "Restoran biznes rejasi",
    "Klinika ochish loyihasi",
    "Ta'lim markazi biznes reja",
    "Turizm agentligi loyihasi",
    "Ishlab chiqarish biznes reja",
    "Logistika kompaniyasi",
  ],
  "elektron-kitoblar": [
    "Menejment asoslari",
    "Marketing bo'yicha qo'llanma",
    "Moliya nazariyasi",
    "Buxgalteriya hisobi",
    "Iqtisodiyot asoslari",
    "Huquqshunoslik asoslari",
    "Psixologiya kitobi",
    "Pedagogika qo'llanma",
    "Informatika darsligi",
    "Matematika qo'llanma",
  ],
  statistika: [
    "Aholi statistikasi",
    "Iqtisodiy statistika",
    "Sanoat statistikasi",
    "Qishloq xo'jaligi statistika",
    "Savdo statistikasi",
    "Ta'lim statistikasi",
    "Sog'liqni saqlash statistika",
    "Moliya statistikasi",
    "Mehnat statistikasi",
    "Demografik ko'rsatkichlar",
  ],
  "namunaviy-hujjatlar": [
    "Shartnoma namunasi",
    "Kelishuv protokoli",
    "Tijorat taklifi",
    "Hisobot namunasi",
    "Taqdimot shabloni",
    "Loyiha hujjati",
    "Texnik topshiriq",
    "Smetа namunasi",
    "Dalolatnoma shakli",
    "Ishonch varaqasi",
  ],
  maqola: [
    "Iqtisodiy islohotlar haqida",
    "Ta'lim tizimi tahlili",
    "Raqamlashtirish jarayoni",
    "Innovatsion rivojlanish",
    "Ijtimoiy siyosat",
    "Ekologik muammolar",
    "Globallashuv ta'siri",
    "Milliy iqtisodiyot",
    "Xalqaro hamkorlik",
    "Kelajak istiqbollari",
  ],
}

function getImageForProduct(category: string, index: number): string {
  const imagePrefix: Record<string, string> = {
    "diplom-ishlari": "diplom",
    "amaliy-ishlar": "amaliy",
    "mustaqil-ishlar": "mustaqil",
    taqdimotlar: "taqdimot",
    referatlar: "referat",
    "kurs-ishlari": "kurs",
    blankalar: "blanka",
    "biznes-rejalar": "biznes",
    "elektron-kitoblar": "kitob",
    statistika: "statistika",
    "namunaviy-hujjatlar": "hujjat",
    maqola: "maqola",
  }
  const prefix = imagePrefix[category] || "diplom"
  return `/images/${prefix}-${index + 1}.jpg`
}

function generateProducts(category: string): Product[] {
  const titles = categoryTitles[category] || categoryTitles["diplom-ishlari"]

  return titles.map((title, index) => {
    const subject = subjects[index % subjects.length]
    const price = Math.floor(Math.random() * 15000) + 5000
    const pages = Math.floor(Math.random() * 50) + 20
    const fileSize = `${(Math.random() * 2 + 0.5).toFixed(2)} MB`
    const fileTypes = [".docx", ".pptx", ".pdf", ".xlsx"]

    return {
      id: `${category}-${index + 1}`,
      title,
      description: `${title} mavzusida professional darajada tayyorlangan ilmiy ish. ${subject} sohasida keng qamrovli ma'lumotlar.`,
      price,
      category,
      subject,
      image: getImageForProduct(category, index),
      pages,
      fileSize,
      fileType: fileTypes[index % fileTypes.length],
      author: "EduDocs",
      tags: [subject.toLowerCase(), category.replace("-", " "), "ilmiy ish"],
    }
  })
}

const allProducts: Product[] = [
  ...generateProducts("diplom-ishlari"),
  ...generateProducts("amaliy-ishlar"),
  ...generateProducts("mustaqil-ishlar"),
  ...generateProducts("taqdimotlar"),
  ...generateProducts("referatlar"),
  ...generateProducts("kurs-ishlari"),
  ...generateProducts("blankalar"),
  ...generateProducts("biznes-rejalar"),
  ...generateProducts("elektron-kitoblar"),
  ...generateProducts("statistika"),
  ...generateProducts("namunaviy-hujjatlar"),
  ...generateProducts("maqola"),
]

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id)
}

export function getAllProducts(): Product[] {
  return allProducts
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.subject.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.includes(lowerQuery)),
  )
}

export function categoryExists(slug: string): boolean {
  return Object.keys(categoryTitles).includes(slug) || Object.keys(categorySlugMap).includes(slug)
}
