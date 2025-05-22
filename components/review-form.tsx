"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  productId: string
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating diperlukan",
        description: "Silakan berikan rating untuk produk ini",
        variant: "destructive",
      })
      return
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Ulasan terlalu pendek",
        description: "Silakan berikan ulasan yang lebih detail",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Ulasan berhasil dikirim",
        description: "Terima kasih atas ulasan Anda",
      })

      setRating(0)
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-medium text-gray-800">Tulis Ulasan</h4>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating > 0 ? `${rating} dari 5 bintang` : "Pilih rating"}</span>
      </div>

      <Textarea
        placeholder="Bagikan pengalaman Anda dengan produk ini..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px] resize-none"
      />

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
      </Button>
    </form>
  )
}
