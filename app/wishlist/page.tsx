"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FadeIn } from "@/components/fade-in"
import { WaveAnimation } from "@/components/wave-animation"
import { OceanParticles } from "@/components/ocean-particles"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleAddToCart = (productId: number) => {
    const product = items.find((item) => item.id === productId)
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        discount: product.discount || 0,
      })
      toast({
        title: "Ditambahkan ke Keranjang",
        description: `${product.name} telah ditambahkan ke keranjang Anda.`,
      })
    }
  }

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId)
    toast({
      title: "Dihapus dari Wishlist",
      description: "Produk telah dihapus dari wishlist Anda.",
    })
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast({
      title: "Wishlist Dikosongkan",
      description: "Semua produk telah dihapus dari wishlist Anda.",
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <OceanParticles className="absolute inset-0 z-0 opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-pink-100 to-red-100 p-4 rounded-full mb-4"
            >
              <Heart className="h-8 w-8 text-red-500" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Wishlist Saya</h1>
            <p className="text-gray-600 max-w-2xl">
              Simpan produk favorit Anda di sini untuk dibeli nanti atau pantau perubahan harga.
            </p>
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto border border-gray-100">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Wishlist Anda Kosong</h2>
              <p className="text-gray-600 mb-6">
                Anda belum menambahkan produk ke wishlist. Jelajahi produk kami dan tambahkan produk favorit Anda.
              </p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white">
                  Jelajahi Produk
                </Button>
              </Link>
            </div>
          </FadeIn>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleClearWishlist}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Semua
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {items.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg?height=300&width=400"}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-red-50 text-red-500 border border-red-100"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-3">
                        {product.description || "Produk seafood beku berkualitas tinggi"}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount && product.discount > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-gray-500 line-through text-sm">
                                Rp {product.price.toLocaleString("id-ID")}
                              </span>
                              <span className="font-bold text-lg text-sky-700">
                                Rp {((product.price * (100 - product.discount)) / 100).toLocaleString("id-ID")}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg text-sky-700">
                              Rp {product.price.toLocaleString("id-ID")}
                            </span>
                          )}
                        </div>

                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white"
                          disabled={product.stock === false}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Tambah
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <WaveAnimation className="absolute bottom-0 left-0 right-0 z-0" />
    </div>
  )
}
