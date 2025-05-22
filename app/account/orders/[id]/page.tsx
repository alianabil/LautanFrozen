"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Package, Truck, ThermometerSnowflake, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/fade-in"

export default function OrderDetailPage({ params }) {
  const orderId = params.id

  // In a real app, you would fetch this data based on the ID
  const order = {
    id: orderId,
    date: "15 Jun 2023",
    total: 365000,
    status: "shipped",
    paymentMethod: "Transfer Bank",
    paymentStatus: "Lunas",
    items: [
      {
        id: 1,
        name: "Fillet Ikan Kakap",
        price: 85000,
        quantity: 2,
        image: "/images/fillet-kakap.jpg",
      },
      {
        id: 2,
        name: "Udang Vaname Premium",
        price: 120000,
        quantity: 1,
        image: "/images/udang-vaname.jpg",
      },
      {
        id: 3,
        name: "Cumi-Cumi Segar",
        price: 75000,
        quantity: 1,
        image: "/images/cumi-cumi.jpg",
      },
    ],
    shipping: {
      method: "Pengiriman Reguler",
      cost: 20000,
      address: "Jl. Merdeka No. 123, Kota Jakarta Selatan, DKI Jakarta, 12345",
      recipient: "Budi Santoso",
      phone: "081234567890",
      tracking: {
        number: "JNE123456789",
        status: "Dalam Pengiriman",
        history: [
          {
            date: "17 Jun 2023 08:30",
            status: "Paket telah dikirim dari gudang",
            location: "Jakarta Selatan",
          },
          {
            date: "16 Jun 2023 15:45",
            status: "Paket sedang diproses",
            location: "Jakarta Selatan",
          },
          {
            date: "15 Jun 2023 10:15",
            status: "Pesanan dikonfirmasi",
            location: "Jakarta Selatan",
          },
        ],
        temperature: [
          { time: "17 Jun 2023 08:30", temp: -18.2 },
          { time: "16 Jun 2023 20:00", temp: -18.5 },
          { time: "16 Jun 2023 08:00", temp: -19.0 },
          { time: "15 Jun 2023 20:00", temp: -19.2 },
        ],
      },
    },
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Menunggu Pembayaran
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Diproses
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Dikirim
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const subtotal = order.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="container px-4 py-8 mx-auto">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/account/orders">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Pesanan
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Detail Pesanan</h1>
          <p className="text-gray-500">
            {order.id} • {order.date}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(order.status)}
          <Button asChild className="bg-cyan-700 hover:bg-cyan-800">
            <Link href={`/account/orders/${order.id}/track`}>
              <Truck className="mr-2 h-4 w-4" />
              Lacak Pesanan
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <FadeIn>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Produk yang Dibeli</h2>
              </div>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-cyan-50 flex-shrink-0">
                      <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <Link href={`/products/${item.id}`} className="font-medium text-cyan-900 hover:text-cyan-700">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rp{item.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Subtotal: Rp{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{order.shipping.recipient}</p>
                    <p className="text-gray-600">{order.shipping.phone}</p>
                    <p className="text-gray-600 mt-1">{order.shipping.address}</p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Truck className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{order.shipping.method}</p>
                    <p className="text-gray-600">No. Resi: {order.shipping.tracking.number}</p>
                    <p className="text-gray-600">Status: {order.shipping.tracking.status}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ThermometerSnowflake className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Suhu Terakhir</p>
                    <p className="text-gray-600">
                      {order.shipping.tracking.temperature[0].temp}°C pada {order.shipping.tracking.temperature[0].time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Status Pengiriman</h2>
              </div>
              <div className="p-6">
                <ol className="relative border-l border-gray-200 ml-3">
                  {order.shipping.tracking.history.map((event, index) => (
                    <li key={index} className="mb-6 ml-6 last:mb-0">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-100 rounded-full -left-3 ring-8 ring-white">
                        <Package className="w-3 h-3 text-cyan-700" />
                      </span>
                      <h3 className="font-medium">{event.status}</h3>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Ringkasan Pembayaran</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengiriman</span>
                  <span>Rp{order.shipping.cost.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-cyan-900">Rp{order.total.toLocaleString()}</span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status Pembayaran</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <Button asChild className="w-full bg-cyan-700 hover:bg-cyan-800">
                  <Link href="/products">
                    <Package className="mr-2 h-4 w-4" />
                    Belanja Lagi
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
