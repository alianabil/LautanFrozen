"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn } from "@/components/fade-in"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    notes: "",
    shippingMethod: "regular",
    paymentMethod: "transfer",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login terlebih dahulu untuk melanjutkan ke pembayaran.",
        variant: "destructive",
      })
      router.push("/auth/login")
    }
  }, [isAuthenticated, router, toast])

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Silakan tambahkan produk ke keranjang terlebih dahulu.",
      })
      router.push("/products")
    }
  }, [items, router, toast])

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  const subtotal = getSubtotal()
  const shipping = formData.shippingMethod === "express" ? 35000 : 20000
  const total = subtotal + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form data
    if (step === 1) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.postalCode ||
        !formData.province
      ) {
        toast({
          title: "Form tidak lengkap",
          description: "Silakan lengkapi semua field yang diperlukan.",
          variant: "destructive",
        })
        return
      }
    }

    nextStep()
  }

  const completeOrder = () => {
    setIsLoading(true)

    // Simulate order processing
    setTimeout(() => {
      // Clear cart after successful order
      clearCart()

      setIsLoading(false)
      router.push("/checkout/success")
    }, 1500)
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/cart">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Keranjang
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
        Checkout
      </h1>

      <div className="flex justify-between items-center mb-8">
        <div className="hidden md:flex items-center w-full max-w-3xl mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-sm">Pengiriman</span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-gray-200"}`}
          />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm">Pembayaran</span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-gray-200"}`}
          />
          <div className={`flex flex-col items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 3 ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              <Check className="h-5 w-5" />
            </div>
            <span className="text-sm">Konfirmasi</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FadeIn>
            {step === 1 && (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Select
                        value={formData.province}
                        onValueChange={(value) => handleSelectChange("province", value)}
                      >
                        <SelectTrigger id="province">
                          <SelectValue placeholder="Pilih provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dki">DKI Jakarta</SelectItem>
                          <SelectItem value="jabar">Jawa Barat</SelectItem>
                          <SelectItem value="jateng">Jawa Tengah</SelectItem>
                          <SelectItem value="jatim">Jawa Timur</SelectItem>
                          <SelectItem value="bali">Bali</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota/Kabupaten</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan (opsional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Instruksi khusus untuk pengiriman"
                    />
                  </div>
                  <div className="space-y-3 pt-4">
                    <Label>Metode Pengiriman</Label>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => handleSelectChange("shippingMethod", value)}
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular" className="flex-1 cursor-pointer">
                          <div className="font-medium">Pengiriman Reguler</div>
                          <div className="text-sm text-gray-500">Estimasi 2-3 hari kerja</div>
                        </Label>
                        <div className="font-medium">Rp20.000</div>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-lg hover:border-blue-200 transition-colors">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="font-medium">Pengiriman Express</div>
                          <div className="text-sm text-gray-500">Estimasi 1 hari kerja</div>
                        </Label>
                        <div className="font-medium">Rp35.000</div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="p-6 border-t bg-gray-50 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Lanjut ke Pembayaran
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
                </div>
                <div className="p-6 space-y-4">
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-lg hover:border-blue-200 transition-colors">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                        <div className="font-medium">Transfer Bank</div>
                        <div className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-lg hover:border-blue-200 transition-colors">
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <Label htmlFor="ewallet" className="flex-1 cursor-pointer">
                        <div className="font-medium">E-Wallet</div>
                        <div className="text-sm text-gray-500">OVO, GoPay, DANA, LinkAja</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-lg hover:border-blue-200 transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium">Bayar di Tempat (COD)</div>
                        <div className="text-sm text-gray-500">Bayar saat pesanan tiba</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "transfer" && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <h3 className="font-medium mb-2">Instruksi Pembayaran:</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Transfer ke rekening BCA: 1234567890 a/n PT Lautan Frozen</li>
                        <li>Jumlah transfer: Rp{total.toLocaleString()}</li>
                        <li>Sertakan nomor pesanan pada keterangan transfer</li>
                        <li>Konfirmasi pembayaran melalui WhatsApp ke 08123456789</li>
                      </ol>
                    </div>
                  )}

                  {formData.paymentMethod === "ewallet" && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <h3 className="font-medium mb-2">Instruksi Pembayaran:</h3>
                      <p className="text-sm mb-2">
                        Anda akan diarahkan ke halaman pembayaran setelah mengkonfirmasi pesanan.
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t bg-gray-50 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Kembali
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Lanjut ke Konfirmasi
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Konfirmasi Pesanan</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Informasi Pengiriman</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{formData.name}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.email}</p>
                      <p className="mt-2">{formData.address}</p>
                      <p>
                        {formData.city}, {formData.province}, {formData.postalCode}
                      </p>
                      {formData.notes && <p className="mt-2 text-gray-600">Catatan: {formData.notes}</p>}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Metode Pengiriman</h3>
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between">
                      <div>
                        <p className="font-medium">
                          {formData.shippingMethod === "express" ? "Pengiriman Express" : "Pengiriman Reguler"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formData.shippingMethod === "express" ? "Estimasi 1 hari kerja" : "Estimasi 2-3 hari kerja"}
                        </p>
                      </div>
                      <p className="font-medium">Rp{shipping.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Metode Pembayaran</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {formData.paymentMethod === "transfer"
                          ? "Transfer Bank"
                          : formData.paymentMethod === "ewallet"
                            ? "E-Wallet"
                            : "Bayar di Tempat (COD)"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Produk yang Dibeli</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center border-b pb-4">
                          <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 flex-shrink-0">
                            <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Rp{item.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              Subtotal: Rp{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t bg-gray-50 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Kembali
                  </Button>
                  <Button
                    onClick={completeOrder}
                    className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8x0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </div>
                    ) : (
                      "Konfirmasi & Bayar"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </FadeIn>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4 border border-gray-100">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengiriman</span>
                  <span>Rp{shipping.toLocaleString()}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                    Rp{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
