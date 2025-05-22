"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Tipe data untuk item wishlist
type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  temperature?: number
  category?: string
  stock?: boolean
  description?: string
  unit?: string
  discount?: number
}

// Tipe data untuk context
type WishlistContextType = {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
  getItemCount: () => number
}

// Membuat context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Provider component
export function WishlistProvider({ children }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Error parsing wishlist data:", error)
        setItems([])
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex >= 0) {
        // Item already exists, don't add it again
        return prevItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, item]
      }
    })
  }

  // Remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Check if item is in wishlist
  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setItems([])
  }

  // Get total number of items in wishlist
  const getItemCount = () => {
    return items.length
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getItemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// Hook untuk menggunakan wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext)

  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }

  return context
}
