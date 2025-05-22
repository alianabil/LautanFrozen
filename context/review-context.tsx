"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

export type Review = {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: Date
  helpful: number
  verified: boolean
}

type ReviewContextType = {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
  getProductReviews: (productId: string) => Review[]
  getUserReviews: (userId: string) => Review[]
  updateReview: (id: string, updates: Partial<Omit<Review, "id" | "date">>) => void
  deleteReview: (id: string) => void
  markHelpful: (id: string) => void
  getAverageRating: (productId: string) => number
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const { toast } = useToast()

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews")
    if (savedReviews) {
      try {
        // Parse dates back to Date objects
        const parsed = JSON.parse(savedReviews)
        const withDates = parsed.map((r: any) => ({
          ...r,
          date: new Date(r.date),
        }))
        setReviews(withDates)
      } catch (error) {
        console.error("Failed to parse reviews from localStorage:", error)
      }
    } else {
      // Add some initial reviews for demo purposes
      const initialReviews: Review[] = [
        {
          id: "1",
          productId: "1",
          userId: "user1",
          userName: "Budi Santoso",
          rating: 5,
          comment: "Udang sangat segar dan packaging-nya bagus, tetap beku sampai rumah!",
          date: new Date(Date.now() - 604800000), // 1 week ago
          helpful: 12,
          verified: true,
        },
        {
          id: "2",
          productId: "1",
          userId: "user2",
          userName: "Siti Rahayu",
          rating: 4,
          comment: "Rasanya enak, tapi ukurannya sedikit lebih kecil dari yang saya harapkan.",
          date: new Date(Date.now() - 1209600000), // 2 weeks ago
          helpful: 5,
          verified: true,
        },
        {
          id: "3",
          productId: "2",
          userId: "user3",
          userName: "Ahmad Hidayat",
          rating: 5,
          comment: "Fillet ikannya tebal dan tidak berbau amis. Sangat memuaskan!",
          date: new Date(Date.now() - 2592000000), // 1 month ago
          helpful: 8,
          verified: true,
        },
      ]
      setReviews(initialReviews)
    }
  }, [])

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  const addReview = (review: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: uuidv4(),
      date: new Date(),
      helpful: 0,
    }

    setReviews((prev) => [...prev, newReview])

    toast({
      title: "Ulasan Ditambahkan",
      description: "Terima kasih atas ulasan Anda!",
      variant: "default",
    })
  }

  const getProductReviews = (productId: string) => {
    return reviews.filter((review) => review.productId === productId)
  }

  const getUserReviews = (userId: string) => {
    return reviews.filter((review) => review.userId === userId)
  }

  const updateReview = (id: string, updates: Partial<Omit<Review, "id" | "date">>) => {
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, ...updates } : review)))

    toast({
      title: "Ulasan Diperbarui",
      description: "Ulasan Anda telah berhasil diperbarui.",
      variant: "default",
    })
  }

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id))

    toast({
      title: "Ulasan Dihapus",
      description: "Ulasan Anda telah berhasil dihapus.",
      variant: "destructive",
    })
  }

  const markHelpful = (id: string) => {
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, helpful: review.helpful + 1 } : review)))
  }

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0

    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / productReviews.length
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getUserReviews,
        updateReview,
        deleteReview,
        markHelpful,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
