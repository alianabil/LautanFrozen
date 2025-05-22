"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";
import {
  ArrowRight,
  Truck,
  ThermometerSnowflake,
  Award,
  ShoppingCart,
  Star,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import OceanAnimation from "@/components/ocean-animation";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Fillet Ikan Kakap",
      price: 85000,
      rating: 4.8,
      image: "fillet-kakap.jpg",
      temperature: -18,
      category: "Fillet",
      description: "Fillet ikan kakap segar yang diproses dengan teknologi IQF",
      unit: "500g",
      stock: 25,
      discount: 0,
    },
    {
      id: 2,
      name: "Udang Vaname Premium",
      price: 120000,
      rating: 4.9,
      image: "udang-vaname.jpg",
      temperature: -20,
      category: "Udang",
      description: "Udang vaname premium ukuran besar, tanpa kepala",
      unit: "500g",
      stock: 15,
      discount: 10,
    },
    {
      id: 3,
      name: "Cumi-Cumi Segar",
      price: 75000,
      rating: 4.7,
      image: "cumi-cumi.jpg",
      temperature: -19,
      category: "Cumi",
      description: "Cumi-cumi segar ukuran sedang, dibersihkan",
      unit: "500g",
      stock: 20,
      discount: 0,
    },
    {
      id: 4,
      name: "Fillet Ikan Dori",
      price: 65000,
      rating: 4.6,
      image: "fillet-dori.jpg",
      temperature: -18,
      category: "Fillet",
      description: "Fillet ikan dori tanpa duri, siap dimasak",
      unit: "500g",
      stock: 30,
      discount: 5,
    },
  ];

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const isProductsInView = useInView(productsRef, { once: false, amount: 0.3 });
  const isTestimonialsInView = useInView(testimonialsRef, {
    once: false,
    amount: 0.3,
  });
  const isCtaInView = useInView(ctaRef, { once: false, amount: 0.3 });

  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const productsControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    if (isHeroInView) heroControls.start("visible");
    if (isFeaturesInView) featuresControls.start("visible");
    if (isProductsInView) productsControls.start("visible");
    if (isTestimonialsInView) testimonialsControls.start("visible");
    if (isCtaInView) ctaControls.start("visible");
  }, [
    isHeroInView,
    isFeaturesInView,
    isProductsInView,
    isTestimonialsInView,
    isCtaInView,
    heroControls,
    featuresControls,
    productsControls,
    testimonialsControls,
    ctaControls,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] bg-gradient-to-b from-blue-900 via-cyan-800 to-teal-700 text-white flex items-center border-b-0"
      >
        <OceanAnimation className="absolute inset-0 pointer-events-none" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container px-4 pt-16 pb-24 mx-auto relative z-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroControls}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-4 p-2 bg-white/10 backdrop-blur-md rounded-full"
            >
              <div className="flex items-center space-x-2 px-4 py-1">
                <ThermometerSnowflake className="h-5 w-5 text-cyan-300" />
                <span className="text-sm font-medium text-cyan-100">
                  Teknologi IQF Terbaik
                </span>
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
            >
              Kesegaran Laut Terjaga Hingga{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
                  Meja Makan Anda
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 blur-md"
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 text-cyan-100 max-w-2xl mx-auto"
            >
              Produk laut beku berkualitas tinggi dengan teknologi IQF langsung
              dari koperasi nelayan Indonesia
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0 shadow-lg transition-transform duration-300"
                >
                  <Link href="/products">
                    Belanja Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-transform duration-300"
                >
                  <Link href="/about">Tentang Kami</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="relative py-20 bg-gradient-to-b from-teal-700 via-cyan-50 to-white"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-2">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Keunggulan Kami
                </span>
                <Sparkles className="h-5 w-5" />
              </div>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
            >
              Mengapa Memilih LautanFrozen?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Kami menyediakan produk laut beku terbaik dengan teknologi modern
              dan kualitas terjamin
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl text-center shadow-md transition-all duration-300 border border-cyan-100/50 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ThermometerSnowflake className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Teknologi IQF
              </h3>
              <p className="text-gray-600">
                Individual Quick Freezing menjaga kesegaran dan nutrisi produk
                laut tanpa menggunakan pengawet.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl text-center shadow-md transition-all duration-300 border border-teal-100/50 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-teal-500 to-green-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 bg-teal-400/20 rounded-xl blur-xl"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">
                Rantai Dingin Terjaga
              </h3>
              <p className="text-gray-600">
                Pantau suhu produk dari nelayan hingga ke tangan Anda dengan
                teknologi tracking suhu real-time.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl text-center shadow-md transition-all duration-300 border border-amber-100/50 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute inset-0 bg-amber-400/20 rounded-xl blur-xl"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Kualitas Terjamin
              </h3>
              <p className="text-gray-600">
                Setiap produk memiliki rating kualitas berdasarkan kesegaran,
                kebersihan, dan standar keamanan pangan.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100/50 shadow-md"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">
                    Komitmen Kualitas
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Kami berkomitmen untuk menyediakan produk seafood berkualitas
                  tertinggi dengan standar keamanan pangan yang ketat. Setiap
                  produk kami melalui proses seleksi dan pembekuan yang cermat
                  untuk memastikan kesegaran dan nutrisi tetap terjaga.
                </p>
                <ul className="space-y-3">
                  {[
                    "Pembekuan cepat dengan teknologi IQF",
                    "Pengawasan suhu ketat sepanjang rantai pasokan",
                    "Sertifikasi HACCP dan standar keamanan pangan",
                    "Produk bebas bahan pengawet dan aditif berbahaya",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-blue-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/beku.jpg?height=400&width=600"
                    alt="Proses pembekuan IQF"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md">
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Suhu Optimal</p>
                      <p className="text-lg font-bold text-blue-700">-18°C</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        ref={productsRef}
        className="py-20 bg-gradient-to-b from-cyan-50 to-white"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={productsControls}
            className="flex justify-between items-center mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
            >
              Produk Unggulan
            </motion.h2>
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ x: 0 }}
            >
              <Button
                asChild
                variant="ghost"
                className="text-cyan-600 hover:text-cyan-700 group"
              >
                <Link href="/products" className="flex items-center">
                  <span>Lihat Semua</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="hidden"
                animate={productsControls}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={productsControls}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-br from-blue-900 to-cyan-800 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-cyan-200">
                    Produk Terbaru
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Salmon Fillet Premium <br />
                  <span className="text-cyan-300">Kualitas Terbaik</span>
                </h3>
                <p className="text-cyan-100 mb-6">
                  Salmon fillet premium dengan kualitas terbaik, diproses dengan
                  teknologi IQF untuk menjaga kesegaran dan nutrisi. Cocok untuk
                  berbagai olahan masakan.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-xs text-cyan-200">Berat</p>
                    <p className="text-white font-medium">500g / pack</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-xs text-cyan-200">Asal</p>
                    <p className="text-white font-medium">Norwegia</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-xs text-cyan-200">Omega-3</p>
                    <p className="text-white font-medium">Tinggi</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white border-0 shadow-lg"
                  >
                    <Link href="/products/5">
                      Lihat Detail <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent md:from-transparent z-10"></div>
                <Image
                  src="/fillet-salmon.jpg?height=600&width=800"
                  alt="Salmon Fillet Premium"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                  Baru
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20">
                  <p className="text-xs text-gray-500">Harga</p>
                  <p className="text-xl font-bold text-blue-700">Rp 150.000</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={testimonialsControls}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="inline-block mb-2">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Testimoni
                </span>
                <Star className="h-5 w-5 fill-current" />
              </div>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
            >
              Apa Kata Pelanggan Kami
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Pengalaman pelanggan yang telah menikmati produk laut beku
              berkualitas dari LautanFrozen
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Santoso",
                avatar: "B",
                rating: 5,
                color: "from-cyan-500 to-blue-500",
                comment:
                  "Udang Vaname dari LautanFrozen sangat segar dan berkualitas. Saya bisa melihat suhu penyimpanannya selalu terjaga. Puas sekali!",
              },
              {
                name: "Siti Rahayu",
                avatar: "S",
                rating: 4,
                color: "from-pink-500 to-purple-500",
                comment:
                  "Fillet ikan dari LautanFrozen selalu konsisten kualitasnya. Saya suka bisa melihat rating kualitas sebelum membeli.",
              },
              {
                name: "Andi Wijaya",
                avatar: "A",
                rating: 5,
                color: "from-amber-500 to-orange-500",
                comment:
                  "Pengiriman cepat dan produk tetap beku sempurna. Cumi-cumi yang saya beli rasanya segar seperti baru ditangkap. Rekomendasi!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300 border border-cyan-100/30 relative"
              >
                <div className="absolute -top-4 -left-4 text-cyan-500 text-6xl opacity-20">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl shadow-md`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.comment}</p>
                <motion.div
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="absolute inset-0 bg-blue-400/10 rounded-2xl"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={testimonialsControls}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-6">
              Bergabunglah dengan ratusan pelanggan puas yang telah merasakan
              kualitas produk LautanFrozen
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <Link href="/products">Mulai Belanja</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-700 text-white relative overflow-hidden"
      >
        <OceanAnimation className="absolute inset-0 pointer-events-none opacity-70" />
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={ctaControls}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              Siap Menikmati{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
                Kesegaran Laut?
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg mb-8 max-w-2xl mx-auto text-cyan-100"
            >
              Dapatkan produk laut beku berkualitas tinggi langsung dari nelayan
              ke meja makan Anda. Pesan sekarang dan rasakan bedanya!
            </motion.p>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0 shadow-lg"
              >
                <Link href="/products">
                  Belanja Sekarang <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
