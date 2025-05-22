import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/fade-in";

export default function HowToOrderPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-20 md:py-28">
        <div className="container px-4 mx-auto relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Cara Pemesanan
              </h1>
              <p className="text-lg md:text-xl mb-8 text-amber-100">
                Panduan lengkap untuk memesan produk laut beku berkualitas dari
                LautanFrozen
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                <Link href="/products">
                  Mulai Belanja Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </section>

      {/* Order Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium mb-4">
                Langkah-Langkah Pemesanan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Proses Pemesanan yang Mudah
              </h2>
              <p className="text-gray-600">
                Ikuti langkah-langkah sederhana ini untuk memesan produk laut
                beku berkualitas dari LautanFrozen
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-2xl mb-6">
                    1
                  </div>
                  <div className="mb-4 text-amber-500">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Pilih Produk
                  </h3>
                  <p className="text-gray-600">
                    Jelajahi katalog produk kami dan pilih produk laut beku yang
                    Anda inginkan. Tambahkan ke keranjang belanja Anda.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-6">
                    2
                  </div>
                  <div className="mb-4 text-orange-500">
                    <CreditCard className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Checkout & Bayar
                  </h3>
                  <p className="text-gray-600">
                    Isi informasi pengiriman Anda dan pilih metode pembayaran
                    yang nyaman. Kami menerima transfer bank, e-wallet, dan COD.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-2xl mb-6">
                    3
                  </div>
                  <div className="mb-4 text-red-500">
                    <Truck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Pengiriman
                  </h3>
                  <p className="text-gray-600">
                    Kami akan memproses pesanan Anda dan mengirimkannya dengan
                    box berpendingin khusus. Lacak pesanan dan suhu produk
                    secara real-time.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-2xl mb-6">
                    4
                  </div>
                  <div className="mb-4 text-pink-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Terima & Nikmati
                  </h3>
                  <p className="text-gray-600">
                    Terima pesanan Anda dan simpan segera di freezer. Ikuti
                    petunjuk penyimpanan dan penyajian untuk hasil terbaik.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Detailed Guide */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium mb-4">
                  Panduan Detail
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Cara Memesan Produk LautanFrozen
                </h2>
                <p className="text-gray-600 mb-8">
                  Berikut adalah panduan lengkap untuk memesan produk laut beku
                  berkualitas dari LautanFrozen, dari pemilihan produk hingga
                  penerimaan.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-600">
                      1. Membuat Akun
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Kunjungi website LautanFrozen</li>
                        <li>Klik tombol "Daftar" di pojok kanan atas</li>
                        <li>
                          Isi formulir pendaftaran dengan informasi yang valid
                        </li>
                        <li>
                          Verifikasi akun Anda melalui email yang dikirimkan
                        </li>
                        <li>Login ke akun Anda untuk mulai berbelanja</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-600">
                      2. Memilih Produk
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Jelajahi katalog produk berdasarkan kategori</li>
                        <li>
                          Gunakan filter untuk menemukan produk yang Anda cari
                        </li>
                        <li>
                          Klik pada produk untuk melihat detail, rating
                          kualitas, dan tracking suhu
                        </li>
                        <li>Pilih jumlah yang diinginkan</li>
                        <li>Klik "Tambah ke Keranjang"</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-600">
                      3. Proses Checkout
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Klik ikon keranjang untuk melihat produk yang telah
                          dipilih
                        </li>
                        <li>Periksa kembali pesanan Anda</li>
                        <li>Klik "Checkout" untuk melanjutkan</li>
                        <li>
                          Isi alamat pengiriman atau pilih dari alamat tersimpan
                        </li>
                        <li>Pilih metode pengiriman (Reguler atau Express)</li>
                        <li>Tambahkan catatan khusus jika diperlukan</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-600">
                      4. Pembayaran
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Pilih metode pembayaran yang diinginkan</li>
                        <li>
                          Transfer Bank: Ikuti instruksi untuk transfer ke
                          rekening kami
                        </li>
                        <li>
                          E-Wallet: Anda akan diarahkan ke halaman pembayaran
                          e-wallet
                        </li>
                        <li>COD: Bayar saat pesanan tiba</li>
                        <li>
                          Konfirmasi pembayaran jika menggunakan transfer bank
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-600">
                      5. Pelacakan Pesanan
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Login ke akun Anda</li>
                        <li>Kunjungi halaman "Pesanan Saya"</li>
                        <li>Klik pada pesanan yang ingin dilacak</li>
                        <li>Lihat status pengiriman dan nomor resi</li>
                        <li>Pantau suhu produk melalui grafik tracking suhu</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/pemesanan.jpg?height=800&width=600"
                  alt="Proses Pemesanan"
                  width={600}
                  height={800}
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <p className="text-xl font-medium mb-2">
                      Butuh bantuan dengan pesanan Anda?
                    </p>
                    <p className="text-orange-100 mb-4">
                      Tim layanan pelanggan kami siap membantu Anda
                    </p>
                    <Button
                      asChild
                      className="bg-white text-orange-600 hover:bg-orange-50"
                    >
                      <Link href="/contact">
                        Hubungi Kami <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium mb-4">
                Metode Pembayaran
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Pilihan Pembayaran yang Fleksibel
              </h2>
              <p className="text-gray-600">
                Kami menawarkan berbagai metode pembayaran untuk kenyamanan Anda
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Transfer Bank
                </h3>
                <p className="text-gray-600 mb-4">
                  Transfer ke rekening bank kami melalui ATM, mobile banking,
                  atau internet banking.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    BCA
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Mandiri
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    BNI
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    BRI
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M12 12h4" />
                    <path d="M12 16V8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  E-Wallet
                </h3>
                <p className="text-gray-600 mb-4">
                  Bayar dengan e-wallet favorit Anda untuk pengalaman checkout
                  yang cepat dan mudah.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    GoPay
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    OVO
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    DANA
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    LinkAja
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="M8 18v-1" />
                    <path d="M16 18v-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Bayar di Tempat (COD)
                </h3>
                <p className="text-gray-600 mb-4">
                  Bayar saat pesanan tiba di rumah Anda. Tersedia untuk area
                  tertentu dengan minimal pembelian.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Jabodetabek
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Bandung
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Surabaya
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Semarang
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium mb-4">
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-gray-600">
                Temukan jawaban untuk pertanyaan umum tentang pemesanan dan
                pengiriman
              </p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <FadeIn delay={0.1}>
                <AccordionItem value="item-1" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Berapa lama waktu pengiriman?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Untuk pengiriman reguler, estimasi waktu pengiriman adalah
                    2-3 hari kerja. Untuk pengiriman express, estimasi waktu
                    pengiriman adalah 1 hari kerja. Waktu pengiriman dapat
                    bervariasi tergantung lokasi Anda.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>

              <FadeIn delay={0.15}>
                <AccordionItem value="item-2" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Bagaimana cara menyimpan produk setelah diterima?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Segera simpan produk di freezer dengan suhu -18°C atau lebih
                    rendah. Jangan mencairkan produk kecuali akan langsung
                    dimasak. Setelah dicairkan, produk tidak boleh dibekukan
                    kembali. Gunakan dalam 6 bulan untuk kualitas terbaik.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>

              <FadeIn delay={0.2}>
                <AccordionItem value="item-3" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Apakah ada minimal pembelian?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Tidak ada minimal pembelian untuk pengiriman reguler. Namun,
                    untuk metode pembayaran COD, minimal pembelian adalah
                    Rp200.000. Untuk pengiriman gratis, minimal pembelian adalah
                    Rp500.000.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>

              <FadeIn delay={0.25}>
                <AccordionItem value="item-4" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Bagaimana jika produk rusak saat diterima?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Kami memiliki kebijakan garansi untuk memastikan kepuasan
                    Anda. Jika produk rusak atau tidak sesuai dengan standar
                    kualitas kami, silakan hubungi layanan pelanggan kami dalam
                    waktu 24 jam setelah penerimaan dengan foto produk. Kami
                    akan mengganti produk atau memberikan pengembalian dana.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>

              <FadeIn delay={0.3}>
                <AccordionItem value="item-5" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Apakah saya bisa mengubah atau membatalkan pesanan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Anda dapat mengubah atau membatalkan pesanan dalam waktu 1
                    jam setelah pemesanan dan sebelum status pesanan berubah
                    menjadi "Diproses". Untuk melakukan ini, silakan hubungi
                    layanan pelanggan kami segera. Setelah pesanan diproses,
                    perubahan atau pembatalan tidak dapat dilakukan.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>

              <FadeIn delay={0.35}>
                <AccordionItem value="item-6" className="border-purple-200">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Bagaimana cara melacak suhu produk?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Setiap pengiriman dilengkapi dengan pelacak suhu yang
                    memantau suhu produk selama pengiriman. Anda dapat melihat
                    data suhu real-time di halaman detail pesanan Anda. Ini
                    memastikan bahwa produk tetap beku pada suhu optimal selama
                    pengiriman.
                  </AccordionContent>
                </AccordionItem>
              </FadeIn>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="container px-4 mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Memesan Produk Laut Terbaik?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-amber-100">
              Ikuti panduan pemesanan kami dan nikmati produk laut beku
              berkualitas premium dengan teknologi IQF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                <Link href="/products">
                  Belanja Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Butuh Bantuan?
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/tips.jpg?height=600&width=800"
                  alt="Tips Penyimpanan"
                  width={800}
                  height={600}
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <p className="text-xl font-medium mb-2">
                      Tips Penyimpanan & Penyajian
                    </p>
                    <p className="text-amber-100">
                      Panduan untuk menikmati produk laut beku dengan kualitas
                      terbaik
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium mb-4">
                  Tips & Trik
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Cara Optimal Menyimpan & Menyajikan
                </h2>
                <p className="text-gray-600 mb-8">
                  Ikuti tips ini untuk memastikan produk laut beku Anda tetap
                  segar dan lezat saat disajikan.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        Penyimpanan
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Simpan pada suhu -18°C atau lebih rendah</li>
                        <li>Jangan mencairkan kecuali akan langsung dimasak</li>
                        <li>Setelah dicairkan, jangan dibekukan kembali</li>
                        <li>Gunakan dalam 6 bulan untuk kualitas terbaik</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        Pencairan
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Cairkan dalam lemari es selama 6-8 jam</li>
                        <li>
                          Untuk pencairan cepat, rendam dalam air dingin
                          tertutup
                        </li>
                        <li>Jangan mencairkan pada suhu ruangan</li>
                        <li>Jangan menggunakan microwave untuk mencairkan</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        Penyajian
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Masak hingga suhu internal mencapai 63°C</li>
                        <li>
                          Fillet ikan cocok untuk digoreng, dipanggang, atau
                          dikukus
                        </li>
                        <li>
                          Udang dapat dimasak langsung tanpa dicairkan untuk
                          hasil terbaik
                        </li>
                        <li>
                          Cumi-cumi membutuhkan waktu memasak yang singkat untuk
                          tekstur terbaik
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
