"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/products"

interface CartContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: number
  serviceFee: number
  grandTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => sum + item.price, 0)
  const serviceFee = Math.round(total * 0.1)
  const grandTotal = total + serviceFee

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, serviceFee, grandTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
