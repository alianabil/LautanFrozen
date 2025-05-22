"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  User,
  Package,
  Heart,
  CreditCard,
  LogOut,
  Settings,
  Edit,
  Camera,
  ShoppingBag,
  MapPin,
  Clock,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FadeIn } from "@/components/fade-in"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect jika tidak login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Mock order data
  const recentOrders = [
    {
      id: "INV-20230615-001",
      date: "15 Jun 2023",
      total: 365000,
      status: "shipped",
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
  ]

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 6,
      name: "Fillet Ikan Salmon",
      price: 150000,
      image: "/images/fillet-salmon.jpg",
      stock: true,
    },
    {
      id: 8,
      name: "Udang Galah",
      price: 180000,
      image: "/images/udang-galah.jpg",
      stock: true,
    },
    {
      id: 10,
      name: "Cumi-Cumi Cincin",
      price: 70000,
      image: "/images/cumi-cincin.jpg",
      stock: false,
    },
  ]

  const handleLogout = () => {
    logout()
    toast({
      title: "Berhasil keluar",
      description: "Anda telah keluar dari akun Anda.",
    })
    router.push("/")
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Akun Saya</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white relative">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full"
                    onClick={() => router.push("/account/profile")}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Profile</span>
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 right-0 bg-white text-purple-600 hover:bg-purple-50 rounded-full h-8 w-8 shadow-sm"
                      onClick={() => router.push("/account/profile")}
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change Photo</span>
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "Pengguna"}</h2>
                  <p className="text-violet-100">{user?.email || "email@example.com"}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "overview" ? "bg-purple-50 text-purple-700" : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Ringkasan
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "orders" ? "bg-purple-50 text-purple-700" : ""}`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Pesanan Saya
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "wishlist" ? "bg-purple-50 text-purple-700" : ""}`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Wishlist
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "payment" ? "bg-purple-50 text-purple-700" : ""}`}
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Metode Pembayaran
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "settings" ? "bg-purple-50 text-purple-700" : ""}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Pengaturan
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Keluar
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {activeTab === "overview" && (
            <FadeIn>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">5</div>
                      <p className="text-blue-100">Total pesanan</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="text-white hover:bg-white/10 p-0">
                        <Link href="/account/orders">Lihat Semua Pesanan</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">3</div>
                      <p className="text-pink-100">Produk dalam wishlist</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="text-white hover:bg-white/10 p-0">
                        <Link href="#wishlist" onClick={() => setActiveTab("wishlist")}>
                          Lihat Wishlist
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Poin Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">250</div>
                      <p className="text-amber-100">Poin tersedia</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="text-white hover:bg-white/10 p-0">
                        Tukar Poin
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Pesanan Terbaru</CardTitle>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/account/orders">Lihat Semua</Link>
                      </Button>
                    </div>
                    <CardDescription>Riwayat pesanan terbaru Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length === 0 ? (
                      <div className="text-center py-6">
                        <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium mb-1">Belum ada pesanan</h3>
                        <p className="text-gray-500 mb-4">Anda belum melakukan pemesanan</p>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          <Link href="/products">Mulai Belanja</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-4">
                                {order.items.map((item, i) => (
                                  <div
                                    key={item.id}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white relative"
                                  >
                                    <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                                  </div>
                                ))}
                                {order.items.length > 2 && (
                                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-800 border-2 border-white">
                                    +{order.items.length - 2}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">Rp{order.total.toLocaleString()}</p>
                              <div className="mt-1">{getStatusBadge(order.status)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Detail kontak dan alamat Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-gray-500">Anggota sejak {user?.memberSince || "2023"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p>{user?.phone || "-"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p>{user?.address || "Belum ada alamat"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => router.push("/account/profile")}>
                      Edit Informasi
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </FadeIn>
          )}

          {activeTab === "orders" && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pesanan Saya</CardTitle>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Link href="/products">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Belanja Lagi
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>Riwayat semua pesanan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Belum ada pesanan</h3>
                      <p className="text-gray-500 mb-6">Anda belum melakukan pemesanan</p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        <Link href="/products">Mulai Belanja</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-xl p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-500">{order.date}</span>
                              </div>
                              <h3 className="font-medium mt-1">{order.id}</h3>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center">
                              {getStatusBadge(order.status)}
                              <Button asChild variant="ghost" size="sm" className="ml-2">
                                <Link href={`/account/orders/${order.id}`}>Detail</Link>
                              </Button>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                                  </div>
                                  <div className="ml-4 flex-grow">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div>
                                <p className="text-sm text-gray-500">Total Pesanan</p>
                                <p className="font-semibold text-lg">Rp{order.total.toLocaleString()}</p>
                              </div>
                              <Button
                                asChild
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                              >
                                <Link href={`/account/orders/${order.id}/track`}>Lacak Pesanan</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/account/orders">Lihat Semua Pesanan</Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          )}

          {activeTab === "wishlist" && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Wishlist Saya</CardTitle>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                    >
                      <Link href="/products">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Jelajahi Produk
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>Produk yang Anda simpan untuk dibeli nanti</CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Wishlist Anda kosong</h3>
                      <p className="text-gray-500 mb-6">Anda belum menyimpan produk apapun ke wishlist</p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                      >
                        <Link href="/products">Jelajahi Produk</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-xl overflow-hidden group">
                          <div className="relative aspect-square bg-gray-100">
                            <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                            {!item.stock && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Stok Habis
                                </span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-rose-500 hover:text-rose-600 rounded-full"
                            >
                              <Heart className="h-5 w-5" fill="currentColor" />
                              <span className="sr-only">Remove from wishlist</span>
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <p className="text-gray-900 font-semibold mb-3">Rp{item.price.toLocaleString()}</p>
                            <Button
                              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                              disabled={!item.stock}
                            >
                              {item.stock ? "Tambah ke Keranjang" : "Beri Tahu Saya"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {activeTab === "payment" && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                  <CardDescription>Kelola metode pembayaran Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Transfer Bank</h3>
                            <p className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Default</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Transfer ke rekening bank kami melalui ATM, mobile banking, atau internet banking.
                      </p>
                    </div>

                    <div className="border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-600"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <path d="M12 12h4" />
                              <path d="M12 16V8" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">E-Wallet</h3>
                            <p className="text-sm text-gray-500">GoPay, OVO, DANA, LinkAja</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Set Default
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Bayar dengan e-wallet favorit Anda untuk pengalaman checkout yang cepat dan mudah.
                      </p>
                    </div>

                    <div className="border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-orange-600"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                              <path d="M12 18v-6" />
                              <path d="M8 18v-1" />
                              <path d="M16 18v-3" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Bayar di Tempat (COD)</h3>
                            <p className="text-sm text-gray-500">Tersedia untuk area tertentu</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Set Default
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Bayar saat pesanan tiba di rumah Anda. Tersedia untuk area tertentu dengan minimal pembelian.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                    Tambah Metode Pembayaran Baru
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          )}

          {activeTab === "settings" && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Akun</CardTitle>
                  <CardDescription>Kelola preferensi dan keamanan akun Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notifikasi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Notifikasi Email</Label>
                            <p className="text-sm text-gray-500">Terima update pesanan dan promo melalui email</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="sms-notifications">Notifikasi SMS</Label>
                            <p className="text-sm text-gray-500">Terima update pesanan melalui SMS</p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="promo-notifications">Notifikasi Promo</Label>
                            <p className="text-sm text-gray-500">Terima informasi promo dan diskon</p>
                          </div>
                          <Switch id="promo-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-medium mb-4">Keamanan</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          Ubah Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Verifikasi Dua Faktor
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Hapus Akun
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Batal</Button>
                  <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                    Simpan Perubahan
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}
