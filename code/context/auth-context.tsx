"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type UserRole = "driver" | "guardian" | null

interface AuthContextType {
  currentUser: { name: string; id: string; role: UserRole } | null
  isAuthenticated: boolean
  login: (userId: string, userName: string, role: UserRole) => void
  logout: () => void
  register: (userId: string, userName: string, email: string, role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ name: string; id: string; role: UserRole } | null>(null)

  const login = (userId: string, userName: string, role: UserRole) => {
    setCurrentUser({ id: userId, name: userName, role })
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const register = (userId: string, userName: string, email: string, role: UserRole) => {
    // In production, this would call a backend API to create the user
    // For now, we'll automatically log them in after registration
    setCurrentUser({ id: userId, name: userName, role })
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
