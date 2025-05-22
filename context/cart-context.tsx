"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/types/product"

// Tipe data untuk item keranjang
type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  temperature?: number
  category?: string
  unit?: string
  discount?: number
}

// Tipe data untuk context
type CartContextType = {
  items: CartItem[]
  addToCart: (item: CartItem | Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

// Membuat context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider component
export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        setItems([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Add item to cart
  const addToCart = (item: CartItem | Product) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      // Ensure item has quantity property
      const itemWithQuantity = {
        ...item,
        quantity: (item as CartItem).quantity || 1,
      }

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += itemWithQuantity.quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, itemWithQuantity as CartItem]
      }
    })
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
  }

  // Get total number of items in cart
  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // Get subtotal price
  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.price
      const discount = item.discount || 0
      const discountedPrice = price * (1 - discount / 100)
      return total + discountedPrice * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook untuk menggunakan cart context
export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}
