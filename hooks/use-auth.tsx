"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  phone: string
}

interface AuthContextType {
  user: User | null
  login: (phone: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("user")
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setIsLoading(false)
  }, [])

  const login = (phone: string) => {
    const newUser = { phone }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
