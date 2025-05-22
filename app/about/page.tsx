import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Fish,
  Award,
  ThermometerSnowflake,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-20 md:py-28">
        <div className="container px-4 mx-auto relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Tentang LautanFrozen
              </h1>
              <p className="text-lg md:text-xl mb-8 text-indigo-100">
                Menyediakan produk laut beku berkualitas premium dengan
                teknologi IQF langsung dari koperasi nelayan Indonesia
              </p>
            </div>
          </FadeIn>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/3]">
                <Image
                  src="/Koperasi-Nelayan.jpg?height=600&width=800"
                  alt="Nelayan Indonesia"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-lg font-medium">
                      Koperasi Nelayan Indonesia
                    </p>
                    <p className="text-sm opacity-80">
                      Mitra utama LautanFrozen sejak 2018
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-medium mb-4">
                  Cerita Kami
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Dari Laut Indonesia ke Meja Makan Anda
                </h2>
                <p className="text-gray-600 mb-6">
                  LautanFrozen didirikan pada tahun 2018 dengan visi sederhana:
                  menghubungkan nelayan lokal dengan konsumen yang menginginkan
                  produk laut berkualitas tinggi. Kami bermitra dengan koperasi
                  nelayan di seluruh Indonesia untuk memastikan bahwa produk
                  kami tidak hanya segar dan lezat, tetapi juga mendukung
                  komunitas nelayan lokal.
                </p>
                <p className="text-gray-600 mb-8">
                  Dengan teknologi Individual Quick Freezing (IQF), kami
                  memastikan bahwa setiap produk mempertahankan kesegaran,
                  nutrisi, dan rasanya tanpa perlu menggunakan pengawet. Sistem
                  pelacakan suhu rantai dingin kami memungkinkan Anda untuk
                  melihat bahwa produk tetap beku pada suhu optimal dari saat
                  penangkapan hingga tiba di rumah Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  >
                    <Link href="/products">
                      Lihat Produk Kami <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Hubungi Kami</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium mb-4">
                Nilai-Nilai Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Komitmen Kami untuk Kualitas dan Keberlanjutan
              </h2>
              <p className="text-gray-600">
                Kami berkomitmen untuk menyediakan produk laut terbaik sambil
                menjaga keberlanjutan laut dan mendukung komunitas nelayan
                lokal.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
                  <Fish className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Keberlanjutan
                </h3>
                <p className="text-gray-600">
                  Kami hanya bermitra dengan nelayan yang menggunakan metode
                  penangkapan ikan yang berkelanjutan untuk memastikan ekosistem
                  laut tetap sehat untuk generasi mendatang.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Pemberdayaan Nelayan
                </h3>
                <p className="text-gray-600">
                  Kami membayar harga yang adil kepada nelayan lokal dan
                  berinvestasi dalam komunitas mereka untuk memastikan mata
                  pencaharian yang berkelanjutan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Kualitas Premium
                </h3>
                <p className="text-gray-600">
                  Setiap produk melewati kontrol kualitas ketat untuk memastikan
                  Anda hanya mendapatkan produk laut terbaik dengan kesegaran
                  dan rasa yang optimal.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium mb-4">
                Proses Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Dari Laut ke Meja Makan
              </h2>
              <p className="text-gray-600">
                Kami memastikan kualitas produk melalui proses yang ketat dari
                penangkapan hingga pengiriman ke rumah Anda.
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-teal-300 to-green-300 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <FadeIn delay={0.1}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">
                    Penangkapan Berkelanjutan
                  </h3>
                  <p className="text-gray-600 text-center">
                    Nelayan mitra kami menangkap ikan dengan metode yang ramah
                    lingkungan dan berkelanjutan.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">
                    Pemrosesan IQF
                  </h3>
                  <p className="text-gray-600 text-center">
                    Produk dibekukan dengan teknologi IQF untuk mempertahankan
                    kesegaran dan nutrisi.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">
                    Kontrol Kualitas
                  </h3>
                  <p className="text-gray-600 text-center">
                    Setiap produk diperiksa dan diberi rating kualitas
                    berdasarkan standar ketat kami.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    4
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">
                    Pengiriman Terjaga
                  </h3>
                  <p className="text-gray-600 text-center">
                    Produk dikirim dengan box berpendingin khusus dan dilengkapi
                    pelacak suhu.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium mb-4">
                Tim Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Bertemu dengan Orang-Orang di Balik LautanFrozen
              </h2>
              <p className="text-gray-600">
                Tim kami terdiri dari para ahli di bidang perikanan, teknologi
                pangan, dan keberlanjutan yang berdedikasi untuk menyediakan
                produk laut terbaik.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/budi.jpg?height=400&width=400"
                      alt="Budi Setiawan"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    arlo alexander
                  </h3>
                  <p className="text-indigo-600 font-medium mb-4">
                    Founder & CEO
                  </p>
                  <p className="text-gray-600">
                    Mantan nelayan dengan pengalaman 15 tahun yang berdedikasi
                    untuk menghubungkan nelayan dengan konsumen.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/siti.jpg?height=400&width=400"
                      alt="Siti Rahayu"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    Siti Rahayu
                  </h3>
                  <p className="text-purple-600 font-medium mb-4">
                    Kepala Kontrol Kualitas
                  </p>
                  <p className="text-gray-600">
                    Ahli teknologi pangan dengan spesialisasi dalam pengawetan
                    dan keamanan produk laut.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl h-full">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/andi.jpg?height=400&width=400"
                      alt="Andi Wijaya"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    steven william
                  </h3>
                  <p className="text-teal-600 font-medium mb-4">
                    Manajer Keberlanjutan
                  </p>
                  <p className="text-gray-600">
                    Ahli biologi kelautan yang fokus pada praktik penangkapan
                    ikan berkelanjutan dan konservasi laut.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Mencoba Produk Laut Terbaik?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-indigo-100">
              Rasakan perbedaan produk laut beku berkualitas premium dengan
              teknologi IQF dan sistem pelacakan suhu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
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
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white">
                <ThermometerSnowflake className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Teknologi IQF</h3>
                <p className="text-blue-100 mb-6">
                  Individual Quick Freezing membekukan setiap produk secara
                  individual, mempertahankan struktur sel, nutrisi, dan rasa
                  tanpa perlu pengawet.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Link href="/how-to-order">
                    Pelajari Lebih Lanjut{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-teal-500 to-green-600 p-8 rounded-2xl text-white">
                <Truck className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Pengiriman Terjaga
                </h3>
                <p className="text-teal-100 mb-6">
                  Sistem pengiriman kami menggunakan box berpendingin khusus dan
                  pelacak suhu untuk memastikan produk tetap beku sempurna
                  hingga tiba di rumah Anda.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Link href="/how-to-order">
                    Pelajari Lebih Lanjut{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-pink-500 to-red-600 p-8 rounded-2xl text-white">
                <ShieldCheck className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Jaminan Kualitas
                </h3>
                <p className="text-pink-100 mb-6">
                  Setiap produk memiliki rating kualitas berdasarkan kesegaran,
                  kebersihan, dan kepatuhan terhadap standar keamanan pangan.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Link href="/how-to-order">
                    Pelajari Lebih Lanjut{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
