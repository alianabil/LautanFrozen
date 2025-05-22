"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useReviews } from "@/context/review-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { getAverageRating } = useReviews()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const averageRating = getAverageRating(product.id)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsHeartAnimating(true)
    setTimeout(() => setIsHeartAnimating(false), 500)

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 transition-all duration-300",
        featured ? "md:col-span-2 lg:col-span-3" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent z-10" />

          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />

          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium">
              Diskon {product.discount}%
            </Badge>
          )}

          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="outline" className="absolute top-2 right-2 z-20 bg-amber-500 text-white border-amber-600">
              Stok Terbatas
            </Badge>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-20">
              <p className="text-white font-bold text-xl">Stok Habis</p>
            </div>
          )}

          <motion.button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-30 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
            whileTap={{ scale: 0.9 }}
            animate={isHeartAnimating ? { scale: [1, 1.5, 1] } : {}}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600",
              )}
            />
          </motion.button>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                )}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({averageRating.toFixed(1)})</span>
          </div>

          <h3 className="font-bold text-lg text-gray-800 group-hover:text-sky-600 transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>

          <div className="flex items-center justify-between mt-2">
            <div>
              {product.discount > 0 ? (
                <div className="flex flex-col">
                  <span className="text-gray-500 line-through text-sm">Rp {product.price.toLocaleString("id-ID")}</span>
                  <span className="font-bold text-lg text-sky-700">
                    Rp {((product.price * (100 - product.discount)) / 100).toLocaleString("id-ID")}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg text-sky-700">Rp {product.price.toLocaleString("id-ID")}</span>
              )}
              <p className="text-xs text-gray-500">per {product.unit}</p>
            </div>

            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span>Beli</span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
