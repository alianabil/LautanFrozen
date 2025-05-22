"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Tipe data untuk user
type User = {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  address?: string
  memberSince?: string
}

// Tipe data untuk context
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
  logout: () => void
}

// Membuat context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cek apakah user sudah login saat aplikasi dimuat
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Dalam aplikasi nyata, kita akan melakukan API call untuk validasi token
        // Untuk demo, kita akan menggunakan localStorage
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fungsi login
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Dalam aplikasi nyata, kita akan melakukan API call ke server
      // Untuk demo, kita akan mencoba mengambil user dari localStorage jika sudah pernah mendaftar
      const usersStr = localStorage.getItem("registeredUsers")
      const users = usersStr ? JSON.parse(usersStr) : []

      const foundUser = users.find((u) => u.email === email)

      // Jika user ditemukan dan password cocok (dalam aplikasi nyata, password harus di-hash)
      if (foundUser && foundUser.password === password) {
        // Hapus password dari data user sebelum disimpan ke state
        const { password, ...userData } = foundUser

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return
      }

      // Jika tidak ditemukan, gunakan data demo
      if (email === "demo@example.com" && password === "password") {
        const userData: User = {
          id: "user-1",
          name: "Demo User",
          email: "demo@example.com",
          phone: "+62 812-3456-7890",
          avatar: "/placeholder.svg?height=200&width=200",
          address: "Jl. Merdeka No. 123, Jakarta Selatan",
          memberSince: "Mei 2023",
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return
      }

      // Jika tidak ditemukan dan bukan demo, throw error
      throw new Error("Email atau password salah")
    } catch (error: any) {
      console.error("Login error:", error)
      throw new Error(error.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi register
  const register = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true)

    try {
      // Cek apakah email sudah terdaftar
      const usersStr = localStorage.getItem("registeredUsers")
      const users = usersStr ? JSON.parse(usersStr) : []

      if (users.some((u) => u.email === email)) {
        throw new Error("Email sudah terdaftar")
      }

      // Buat data user baru
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        password, // Dalam aplikasi nyata, password harus di-hash
        avatar: "/placeholder.svg?height=200&width=200",
        address: "",
        memberSince: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      }

      // Simpan ke daftar users
      users.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(users))

      // Hapus password dari data user sebelum disimpan ke state
      const { password: _, ...userData } = newUser

      // Simpan user ke state dan localStorage
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error: any) {
      console.error("Registration error:", error)
      throw new Error(error.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi update profile
  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true)

    try {
      if (!user) throw new Error("User not authenticated")

      // Update user data
      const updatedUser = { ...user, ...userData }

      // Update di localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update di daftar users
      const usersStr = localStorage.getItem("registeredUsers")
      if (usersStr) {
        const users = JSON.parse(usersStr)
        const userIndex = users.findIndex((u) => u.id === user.id)

        if (userIndex !== -1) {
          // Pastikan password tidak hilang
          const password = users[userIndex].password
          users[userIndex] = { ...updatedUser, password }
          localStorage.setItem("registeredUsers", JSON.stringify(users))
        }
      }

      // Update state
      setUser(updatedUser)
    } catch (error: any) {
      console.error("Update profile error:", error)
      throw new Error(error.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook untuk menggunakan auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
