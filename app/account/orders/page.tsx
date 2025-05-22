"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, Package, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const orders = [
    {
      id: "INV-20230615-001",
      date: "15 Jun 2023",
      total: 365000,
      status: "pending",
      items: [
        {
          id: 1,
          name: "Fillet Ikan Kakap",
          quantity: 2,
          image: "/images/fillet-kakap.jpg",
        },
        {
          id: 2,
          name: "Udang Vaname Premium",
          quantity: 1,
          image: "/images/udang-vaname.jpg",
        },
      ],
    },
    {
      id: "INV-20230610-002",
      date: "10 Jun 2023",
      total: 250000,
      status: "processing",
      items: [
        {
          id: 3,
          name: "Cumi-Cumi Segar",
          quantity: 3,
          image: "/images/cumi-cumi.jpg",
        },
      ],
    },
    {
      id: "INV-20230601-003",
      date: "1 Jun 2023",
      total: 420000,
      status: "shipped",
      items: [
        {
          id: 6,
          name: "Fillet Ikan Salmon",
          quantity: 2,
          image: "/images/fillet-salmon.jpg",
        },
        {
          id: 8,
          name: "Udang Galah",
          quantity: 1,
          image: "/images/udang-galah.jpg",
        },
      ],
    },
    {
      id: "INV-20230520-004",
      date: "20 Mei 2023",
      total: 185000,
      status: "delivered",
      items: [
        {
          id: 4,
          name: "Fillet Ikan Dori",
          quantity: 2,
          image: "/images/fillet-dori.jpg",
        },
        {
          id: 10,
          name: "Cumi-Cumi Cincin",
          quantity: 1,
          image: "/images/cumi-cincin.jpg",
        },
      ],
    },
  ]

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

  const filteredOrders = orders.filter((order) => {
    // Apply status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Apply search filter
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <div className="container px-4 py-8 mx-auto">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/account">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Akun
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Pesanan Saya</h1>
          <p className="text-gray-500">Lihat dan lacak semua pesanan Anda</p>
        </div>
        <Button asChild className="bg-cyan-700 hover:bg-cyan-800">
          <Link href="/products">
            <Package className="mr-2 h-4 w-4" />
            Belanja Lagi
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari berdasarkan nomor pesanan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Menunggu Pembayaran</SelectItem>
            <SelectItem value="processing">Diproses</SelectItem>
            <SelectItem value="shipped">Dikirim</SelectItem>
            <SelectItem value="delivered">Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
            <Package className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">Tidak ada pesanan ditemukan</h3>
          <p className="text-gray-500 mb-6">
            {statusFilter !== "all" ? "Tidak ada pesanan dengan status yang dipilih" : "Anda belum memiliki pesanan"}
          </p>
          <Button asChild className="bg-cyan-700 hover:bg-cyan-800">
            <Link href="/products">Mulai Belanja</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Pesanan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <FadeIn key={order.id} delay={0.05 * index}>
                    <TableRow>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {order.items.map((item, i) => (
                            <div
                              key={item.id}
                              className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative"
                            >
                              <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-medium text-cyan-800 border-2 border-white">
                              +{order.items.length - 2}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>Rp{order.total.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/account/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detail
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </FadeIn>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
