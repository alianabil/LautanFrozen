"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, Home, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { useCart } from "@/context/cart-context"
import confetti from "canvas-confetti"

export default function OrderSuccessPage() {
  const router = useRouter()
  const { items } = useCart()
  const orderNumber = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`

  // Redirect to home if no items were in cart (meaning no order was placed)
  useEffect(() => {
    if (items.length > 0) {
      router.push("/")
    }
  }, [items, router])

  // Trigger confetti effect on page load
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#3B82F6", "#06B6D4", "#10B981"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#3B82F6", "#06B6D4", "#10B981"],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container px-4 py-12 mx-auto">
      <FadeIn>
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-green-100 to-teal-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-gradient-to-r from-green-600 to-teal-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Pesanan Berhasil!
          </h1>
          <p className="text-gray-600 mb-6">
            Terima kasih atas pesanan Anda. Kami telah menerima pesanan Anda dan akan segera memprosesnya.
          </p>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Detail Pesanan</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Nomor Pesanan:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Tanggal:</span>
                <span>
                  {new Date().toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Status Pembayaran:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Menunggu Pembayaran
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Rp365.000
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Link href="/account/orders">
                <Package className="mr-2 h-4 w-4" />
                Lihat Pesanan Saya
              </Link>
            </Button>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
            >
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Belanja Lagi
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
