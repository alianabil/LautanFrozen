import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ThermometerSnowflake, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-blue-900 via-cyan-900 to-teal-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Waves className="absolute top-0 left-0 w-full h-full text-white" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <ThermometerSnowflake className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  LautanFrozen
                </div>
                <div className="text-xs text-cyan-300">Kesegaran Laut Terjaga</div>
              </div>
            </div>
            <p className="text-cyan-100 mb-6 leading-relaxed">
              Produk laut beku berkualitas tinggi dengan teknologi IQF langsung dari koperasi nelayan Indonesia.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-cyan-300 hover:text-white hover:bg-cyan-800/50 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-cyan-300 hover:text-white hover:bg-cyan-800/50 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-cyan-300 hover:text-white hover:bg-cyan-800/50 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cyan-100 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-order"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cara Pemesanan
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Kategori
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=Fillet"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Fillet Ikan
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Udang"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Udang
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Cumi"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cumi-Cumi
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Seafood"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Seafood Mix
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Olahan"
                  className="text-cyan-100 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Produk Olahan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              Kontak Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg shadow-lg mr-3 mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-cyan-100">Jl. Laut Biru No. 123, Kota Jakarta Utara, DKI Jakarta, 14250</span>
              </li>
              <li className="flex items-center">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg shadow-lg mr-3 flex-shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-cyan-100">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg shadow-lg mr-3 flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-cyan-100">info@lautanfrozen.com</span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3 text-cyan-100">Berlangganan Newsletter</h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-cyan-800/50 border-cyan-700 text-white placeholder:text-cyan-300 rounded-r-none focus-visible:ring-cyan-500"
                />
                <Button className="rounded-l-none bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg">
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-800/50 mt-12 pt-8 text-center text-cyan-300 text-sm">
          <p>© {new Date().getFullYear()} LautanFrozen. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
