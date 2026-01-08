"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, ChevronDown, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  "Taqdimotlar",
  "Kurs ishlari",
  "Mustaqil ishlar",
  "Diplom ishlari",
  "Blankalar",
  "Biznes rejalar",
  "Elektron kitoblar",
  "Statistika",
  "Maqola",
  "Plakatlar",
  "Loyihalar",
  "Ijodiy Ishlar",
  "Amaliy ishlar",
  "Dasturlash tillari",
  "Namunaviy hujjatlar",
  "O'quv qo'llanmalar",
  "Tarqatma materiallar",
  "Dars ishlanmalar",
  "Testlar",
  "Referatlar",
  "Ixtiro patenti",
  "Dissertatsiya ishlari",
  "Labaratoriya Ishlari",
]

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">EduDocs</span>
          </Link>

          {/* Katalog Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 shrink-0">
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline">Katalog</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} asChild>
                  <Link href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`} className="cursor-pointer">
                    {cat}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Qanday mahsulot izlamoqdasiz?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.phone}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">{user.phone}</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/purchases">Sotib olinganlar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <X className="w-4 h-4 mr-2" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Kirish</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
