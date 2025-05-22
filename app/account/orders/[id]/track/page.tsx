"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Package, Truck, ThermometerSnowflake, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/fade-in"
import { TemperatureChart } from "@/components/temperature-chart"

export default function TrackOrderPage({ params }) {
  const orderId = params.id
  const [currentStep, setCurrentStep] = useState(2)

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
          { date: "17 Jun 2023 08:30", temp: -18.2 },
          { date: "16 Jun 2023 20:00", temp: -18.5 },
          { date: "16 Jun 2023 08:00", temp: -19.0 },
          { date: "15 Jun 2023 20:00", temp: -19.2 },
        ],
        estimatedDelivery: "18 Jun 2023",
        currentLocation: "Jakarta Timur",
      },
    },
  }

  // Simulate progress for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <div className="container px-4 py-8 mx-auto">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={`/account/orders/${orderId}`}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Detail Pesanan
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lacak Pesanan</h1>
          <p className="text-gray-500">
            {order.id} • {order.date}
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0">
          {order.shipping.tracking.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <FadeIn>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Pesanan Dalam Perjalanan</h2>
                  <p className="text-indigo-200">Estimasi tiba: {order.shipping.tracking.estimatedDelivery}</p>
                </div>
                <Badge className="mt-2 md:mt-0 bg-white/20 hover:bg-white/30 text-white border-0">
                  {order.shipping.tracking.number}
                </Badge>
              </div>

              <div className="relative">
                <div className="absolute top-1/3 left-0 w-full h-1 bg-indigo-300/30"></div>
                <div
                  className="absolute top-1/3 left-0"
                  style={{ width: `${(currentStep / 4) * 100}%`, height: "4px" }}
                >
                  <div className="h-full bg-gradient-to-r from-white to-indigo-200"></div>
                </div>

                <div className="grid grid-cols-4 relative z-10">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? "bg-white text-indigo-600" : "bg-indigo-400/30 text-indigo-100"}`}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-center text-sm">Pesanan Dikonfirmasi</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? "bg-white text-indigo-600" : "bg-indigo-400/30 text-indigo-100"}`}
                    >
                      <Package className="h-5 w-5" />
                    </div>
                    <p className="text-center text-sm">Sedang Diproses</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? "bg-white text-indigo-600" : "bg-indigo-400/30 text-indigo-100"}`}
                    >
                      <Truck className="h-5 w-5" />
                    </div>
                    <p className="text-center text-sm">Dalam Pengiriman</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 4 ? "bg-white text-indigo-600" : "bg-indigo-400/30 text-indigo-100"}`}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-center text-sm">Pesanan Diterima</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
              <Tabs defaultValue="tracking">
                <div className="px-6 pt-6">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="tracking">Tracking Pengiriman</TabsTrigger>
                    <TabsTrigger value="temperature">Tracking Suhu</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="tracking" className="p-6 pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-medium">Lokasi Saat Ini</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-red-500 mr-1" />
                        <span>{order.shipping.tracking.currentLocation}</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      Lihat di Peta
                    </Button>
                  </div>

                  <h3 className="font-medium mb-4">Riwayat Pengiriman</h3>
                  <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                    {order.shipping.tracking.history.map((event, index) => (
                      <li key={index} className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
                          {index === 0 ? (
                            <Truck className="w-3 h-3 text-indigo-600" />
                          ) : index === 1 ? (
                            <Package className="w-3 h-3 text-indigo-600" />
                          ) : (
                            <CheckCircle className="w-3 h-3 text-indigo-600" />
                          )}
                        </span>
                        <h3 className="font-medium">{event.status}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </li>
                    ))}
                  </ol>
                </TabsContent>

                <TabsContent value="temperature" className="p-6 pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-medium">Suhu Terakhir</h3>
                      <div className="flex items-center mt-1">
                        <ThermometerSnowflake className="h-4 w-4 text-cyan-500 mr-1" />
                        <span className="font-semibold">{order.shipping.tracking.temperature[0].temp}°C</span>
                        <span className="text-sm text-gray-500 ml-2">
                          pada {order.shipping.tracking.temperature[0].date}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={
                        order.shipping.tracking.temperature[0].temp <= -18
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.shipping.tracking.temperature[0].temp <= -18 ? "Suhu Optimal" : "Suhu Perlu Diperhatikan"}
                    </Badge>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Catatan:</strong> Produk laut beku harus disimpan pada suhu minimal -18°C untuk menjaga
                      kualitas dan keamanan pangan.
                    </p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-600 mr-4">-18°C atau lebih rendah: Optimal</span>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-xs text-gray-600 mr-4">-15°C hingga -18°C: Perlu perhatian</span>
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-xs text-gray-600">Di atas -15°C: Kritis</span>
                    </div>
                  </div>

                  <h3 className="font-medium mb-4">Grafik Suhu</h3>
                  <div className="h-64 mb-4">
                    <TemperatureChart data={order.shipping.tracking.temperature} />
                  </div>

                  <h3 className="font-medium mb-4">Riwayat Suhu</h3>
                  <div className="space-y-3">
                    {order.shipping.tracking.temperature.map((record, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{record.date}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            record.temp <= -18
                              ? "bg-green-100 text-green-800"
                              : record.temp <= -15
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.temp}°C
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Produk dalam Pengiriman</h2>
              </div>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <Link href={`/products/${item.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
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
        </div>

        <div>
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{order.shipping.recipient}</p>
                    <p className="text-gray-600">{order.shipping.phone}</p>
                    <p className="text-gray-600 mt-1">{order.shipping.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
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
                      {order.shipping.tracking.temperature[0].temp}°C pada {order.shipping.tracking.temperature[0].date}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp{(order.total - order.shipping.cost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengiriman</span>
                  <span>Rp{order.shipping.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-gray-900">Rp{order.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Link href={`/account/orders/${order.id}`}>Detail Pesanan</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
