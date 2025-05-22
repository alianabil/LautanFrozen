"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Clock,
  ArrowLeft,
  Share2,
  Thermometer,
  Info,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemperatureChart from "@/components/temperature-chart";
import FadeIn from "@/components/fade-in";
import ReviewForm from "@/components/review-form";
import ReviewList from "@/components/review-list";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";

// Mock database of products
const productsDatabase = [
  {
    id: "1",
    name: "Fillet Ikan Kakap Merah Premium",
    description:
      "Fillet ikan kakap merah premium yang diproses dengan teknologi IQF untuk menjaga kesegaran dan kualitas. Cocok untuk berbagai jenis masakan seperti goreng, panggang, atau kukus.",
    price: 85000,
    weight: "500g",
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-kakap.jpg",
      "/kakap-2.jpg?height=600&width=800",
      "/kakap-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "120 kcal",
      protein: "24g",
      fat: "2g",
      carbs: "0g",
      omega3: "0.5g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -0.5 },
      { time: "Pengolahan", temp: -1.2 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -15 },
      { time: "Tiba", temp: -16 },
    ],
    storageInfo:
      "Simpan dalam freezer dengan suhu -18°C. Setelah dibuka, segera gunakan atau simpan kembali dalam freezer.",
    cookingInfo:
      "Thawing dalam kulkas selama 2-3 jam sebelum dimasak. Dapat digoreng, dipanggang, atau dikukus sesuai selera.",
    origin: "Laut Arafura, Indonesia",
    harvestDate: "15 Mei 2023",
    expiryDate: "15 Mei 2024",
    certifications: ["HACCP", "MSC", "ASC"],
    relatedProducts: ["2", "3", "4"],
  },
  {
    id: "2",
    name: "Udang Vaname Premium",
    description:
      "Udang vaname segar berkualitas premium yang diproses dengan teknologi IQF. Udang ini memiliki tekstur kenyal dan rasa manis yang khas, cocok untuk berbagai hidangan seafood.",
    price: 95000,
    weight: "500g",
    stock: 18,
    rating: 4.7,
    reviewCount: 98,
    unit: "pack",
    discount: 5,
    images: [
      "/udang-vaname.jpg",
      "/vaname-2.jpg?height=600&width=800",
      "/vaname-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "99 kcal",
      protein: "20g",
      fat: "1.5g",
      carbs: "0g",
      omega3: "0.3g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -0.8 },
      { time: "Pengolahan", temp: -1.5 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo:
      "Simpan dalam freezer dengan suhu -18°C. Setelah dibuka, segera gunakan atau simpan kembali dalam freezer.",
    cookingInfo:
      "Thawing dalam kulkas selama 1-2 jam sebelum dimasak. Dapat digoreng, direbus, atau dipanggang sesuai selera.",
    origin: "Tambak Lampung, Indonesia",
    harvestDate: "20 Mei 2023",
    expiryDate: "20 Mei 2024",
    certifications: ["HACCP", "BAP", "ASC"],
    relatedProducts: ["1", "3", "5"],
  },
  {
    id: "3",
    name: "Cumi-cumi Segar Premium",
    description:
      "Cumi-cumi segar berkualitas premium yang diproses dengan teknologi IQF. Cumi ini memiliki tekstur kenyal dan rasa manis yang khas, cocok untuk berbagai hidangan seafood.",
    price: 75000,
    weight: "500g",
    stock: 15,
    rating: 4.6,
    reviewCount: 87,
    unit: "pack",
    discount: 0,
    images: [
      "/cumi-cumi.jpg?height=600&width=800",
      "/cumi-2.jpg?height=600&width=800",
      "/cumi-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "92 kcal",
      protein: "18g",
      fat: "1.2g",
      carbs: "3g",
      omega3: "0.4g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -0.6 },
      { time: "Pengolahan", temp: -1.3 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -15 },
      { time: "Tiba", temp: -16 },
    ],
    storageInfo:
      "Simpan dalam freezer dengan suhu -18°C. Setelah dibuka, segera gunakan atau simpan kembali dalam freezer.",
    cookingInfo:
      "Thawing dalam kulkas selama 1-2 jam sebelum dimasak. Dapat digoreng, direbus, atau dipanggang sesuai selera.",
    origin: "Laut Jawa, Indonesia",
    harvestDate: "18 Mei 2023",
    expiryDate: "18 Mei 2024",
    certifications: ["HACCP", "MSC"],
    relatedProducts: ["1", "2", "4"],
  },
  {
    id: "4",
    name: "Ikan Dori Fillet Premium",
    description:
      "Fillet ikan dori premium yang diproses dengan teknologi IQF untuk menjaga kesegaran dan kualitas. Cocok untuk berbagai jenis masakan seperti goreng, panggang, atau kukus.",
    price: 65000,
    weight: "500g",
    stock: 22,
    rating: 4.5,
    reviewCount: 76,
    unit: "pack",
    discount: 10,
    images: [
      "/fillet-dori.jpg?height=600&width=800",
      "/dori-2.jpg?height=600&width=800",
      "/dori-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "105 kcal",
      protein: "22g",
      fat: "1.8g",
      carbs: "0g",
      omega3: "0.6g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -0.7 },
      { time: "Pengolahan", temp: -1.4 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo:
      "Simpan dalam freezer dengan suhu -18°C. Setelah dibuka, segera gunakan atau simpan kembali dalam freezer.",
    cookingInfo:
      "Thawing dalam kulkas selama 2-3 jam sebelum dimasak. Dapat digoreng, dipanggang, atau dikukus sesuai selera.",
    origin: "Laut Banda, Indonesia",
    harvestDate: "12 Mei 2023",
    expiryDate: "12 Mei 2024",
    certifications: ["HACCP", "MSC"],
    relatedProducts: ["1", "3", "5"],
  },
  // {
  //   id: "5",
  //   name: "Kepiting Rajungan Premium",
  //   description:
  //     "Kepiting rajungan segar berkualitas premium yang diproses dengan teknologi IQF. Kepiting ini memiliki daging yang manis dan gurih, cocok untuk berbagai hidangan seafood.",
  //   price: 120000,
  //   weight: "500g",
  //   stock: 10,
  //   rating: 4.9,
  //   reviewCount: 65,
  //   unit: "pack",
  //   discount: 0,
  //   images: [
  //     "/Kepiting-Rajungan.jpg?height=600&width=800",
  //     "/kepiting-2.jpg?height=600&width=800",
  //     "/kepiting-3.jpg?height=600&width=800",
  //   ],
  //   nutritionFacts: {
  //     calories: "110 kcal",
  //     protein: "23g",
  //     fat: "2g",
  //     carbs: "0g",
  //     omega3: "0.4g",
  //   },
  //   temperatureData: [
  //     { time: "Penangkapan", temp: -0.5 },
  //     { time: "Pengolahan", temp: -1.2 },
  //     { time: "Penyimpanan", temp: -18 },
  //     { time: "Pengiriman", temp: -15 },
  //     { time: "Tiba", temp: -16 },
  //   ],
  //   storageInfo:
  //     "Simpan dalam freezer dengan suhu -18°C. Setelah dibuka, segera gunakan atau simpan kembali dalam freezer.",
  //   cookingInfo:
  //     "Thawing dalam kulkas selama 2-3 jam sebelum dimasak. Dapat direbus, dikukus, atau dipanggang sesuai selera.",
  //   origin: "Laut Jawa, Indonesia",
  //   harvestDate: "14 Mei 2023",
  //   expiryDate: "14 Mei 2024",
  //   certifications: ["HACCP", "MSC", "ASC"],
  //   relatedProducts: ["2", "3", "4"],
  // },
  {
    id: "5",
    name: "Udang Pancet Premium",
    description:
      "Udang pancet segar berkualitas ekspor, berukuran besar dan berdaging tebal. Cocok untuk berbagai olahan seafood.",
    price: 95000,
    weight: "500g",
    stock: 15,
    rating: 4.8,
    reviewCount: 52,
    unit: "pack",
    discount: 0,
    images: [
      "/udang-pancet.jpg?height=600&width=800",
      "/pancet-2.jpg?height=600&width=800",
      "/pancet-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "99 kcal",
      protein: "21g",
      fat: "1.7g",
      carbs: "0g",
      omega3: "0.3g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -0.5 },
      { time: "Pengolahan", temp: -1.0 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo:
      "Simpan beku pada suhu -18°C. Setelah dicairkan, jangan dibekukan ulang.",
    cookingInfo:
      "Cairkan secara perlahan di kulkas selama 2 jam. Cocok digoreng, dibakar, atau dimasak saus padang.",
    origin: "Perairan Kalimantan",
    harvestDate: "10 Mei 2023",
    expiryDate: "10 Mei 2024",
    certifications: ["HACCP", "MSC"],
    relatedProducts: ["5", "7", "9"],
  },

  {
    id: "6",
    name: "Fillet Ikan Salmon",
    description:
      "Fillet ikan salmon Norwegia berkualitas premium, kaya akan Omega-3 dan rendah kolesterol. Cocok untuk sashimi atau dipanggang.",
    price: 180000,
    weight: "300g",
    stock: 20,
    rating: 4.9,
    reviewCount: 88,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-salmon.jpg?height=600&width=800",
      "/salmon-2.jpg?height=600&width=800",
      "/salmon-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "206 kcal",
      protein: "22g",
      fat: "13g",
      carbs: "0g",
      omega3: "2.5g",
    },
    temperatureData: [
      { time: "Pemotongan", temp: 0 },
      { time: "Pengemasan", temp: -1 },
      { time: "Penyimpanan", temp: -20 },
      { time: "Pengiriman", temp: -18 },
      { time: "Tiba", temp: -18 },
    ],
    storageInfo: "Simpan beku -20°C. Gunakan setelah dicairkan dalam kulkas.",
    cookingInfo:
      "Bisa langsung dimasak setelah thawing 1-2 jam. Cocok dipanggang atau dibuat sashimi.",
    origin: "Norwegia",
    harvestDate: "20 April 2023",
    expiryDate: "20 April 2024",
    certifications: ["HACCP", "ASC"],
    relatedProducts: ["6", "8", "9"],
  },

  {
    id: "7",
    name: "Fillet Ikan Kembung",
    description:
      "Fillet ikan kembung segar tanpa duri, kaya Omega-3, cocok untuk menu harian sehat dan bergizi.",
    price: 65000,
    weight: "400g",
    stock: 18,
    rating: 4.7,
    reviewCount: 36,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-kembung.jpg?height=600&width=800",
      "/kembung-2.jpg?height=600&width=800",
      "/kembung-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "134 kcal",
      protein: "20g",
      fat: "5g",
      carbs: "0g",
      omega3: "1.2g",
    },
    temperatureData: [
      { time: "Pemrosesan", temp: 0 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo: "Simpan di freezer -18°C. Hindari paparan udara terbuka.",
    cookingInfo:
      "Thawing 1-2 jam sebelum dimasak. Cocok digoreng atau dikukus.",
    origin: "Laut Jawa",
    harvestDate: "5 Mei 2023",
    expiryDate: "5 Mei 2024",
    certifications: ["HACCP"],
    relatedProducts: ["5", "7"],
  },

  {
    id: "8",
    name: "Udang Galah Premium",
    description:
      "Udang galah besar dengan daging manis dan lembut. Cocok untuk sajian istimewa keluarga.",
    price: 135000,
    weight: "500g",
    stock: 12,
    rating: 4.8,
    reviewCount: 49,
    unit: "pack",
    discount: 0,
    images: [
      "/udang-galah.jpg?height=600&width=800",
      "/galah-2.jpg?height=600&width=800",
      "/galah-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "98 kcal",
      protein: "21g",
      fat: "1.3g",
      carbs: "0g",
      omega3: "0.25g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -1 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo:
      "Simpan pada suhu -18°C. Jangan bekukan ulang setelah dicairkan.",
    cookingInfo: "Cocok dibakar, ditumis, atau dimasak dalam kuah santan.",
    origin: "Sungai Kapuas, Kalimantan",
    harvestDate: "12 Mei 2023",
    expiryDate: "12 Mei 2024",
    certifications: ["HACCP"],
    relatedProducts: ["6", "10"],
  },

  {
    id: "9",
    name: "Fillet Ikan Tuna",
    description:
      "Fillet tuna sirip kuning berkualitas ekspor. Cocok untuk sashimi, steak, atau olahan lainnya.",
    price: 125000,
    weight: "400g",
    stock: 16,
    rating: 4.9,
    reviewCount: 70,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-tuna.jpg?height=600&width=800",
      "/tuna-2.jpg?height=600&width=800",
      "/tuna-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "130 kcal",
      protein: "24g",
      fat: "1g",
      carbs: "0g",
      omega3: "0.6g",
    },
    temperatureData: [
      { time: "Pemotongan", temp: 0 },
      { time: "Penyimpanan", temp: -20 },
      { time: "Pengiriman", temp: -18 },
      { time: "Tiba", temp: -19 },
    ],
    storageInfo: "Simpan di freezer -20°C. Hindari suhu ruangan.",
    cookingInfo: "Cocok untuk sashimi, dipanggang, atau ditumis cepat.",
    origin: "Laut Flores",
    harvestDate: "8 Mei 2023",
    expiryDate: "8 Mei 2024",
    certifications: ["MSC", "HACCP"],
    relatedProducts: ["7", "9"],
  },

  {
    id: "10",
    name: "Fillet Ikan Tenggiri",
    description:
      "Fillet ikan tenggiri pilihan, tanpa tulang dan siap masak. Cocok untuk otak-otak atau pepes.",
    price: 88000,
    weight: "500g",
    stock: 14,
    rating: 4.7,
    reviewCount: 40,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-tenggiri.jpg?height=600&width=800",
      "/tenggiri-2.jpg?height=600&width=800",
      "/tenggiri-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "147 kcal",
      protein: "21g",
      fat: "7g",
      carbs: "0g",
      omega3: "1.4g",
    },
    temperatureData: [
      { time: "Pemotongan", temp: -1 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -17 },
      { time: "Tiba", temp: -18 },
    ],
    storageInfo: "Simpan dalam freezer -18°C. Cairkan sebelum dimasak.",
    cookingInfo: "Cocok dijadikan bakso ikan, pepes, atau digoreng kering.",
    origin: "Laut Sulawesi",
    harvestDate: "6 Mei 2023",
    expiryDate: "6 Mei 2024",
    certifications: ["HACCP"],
    relatedProducts: ["8", "10"],
  },

  {
    id: "11",
    name: "Udang Windu Jumbo",
    description:
      "Udang windu ukuran jumbo dengan rasa gurih dan manis alami. Ideal untuk bakaran dan hidangan spesial.",
    price: 140000,
    weight: "500g",
    stock: 10,
    rating: 4.9,
    reviewCount: 60,
    unit: "pack",
    discount: 0,
    images: [
      "/udang-windu.jpg?height=600&width=800",
      "/windu-2.jpg?height=600&width=800",
      "/windu-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "105 kcal",
      protein: "20g",
      fat: "2g",
      carbs: "0g",
      omega3: "0.35g",
    },
    temperatureData: [
      { time: "Penangkapan", temp: -1 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -17 },
      { time: "Tiba", temp: -18 },
    ],
    storageInfo:
      "Disarankan disimpan dalam suhu -18°C dan segera digunakan setelah dicairkan.",
    cookingInfo: "Bisa dibakar, digoreng mentega, atau saus tiram.",
    origin: "Perairan Maluku",
    harvestDate: "9 Mei 2023",
    expiryDate: "9 Mei 2024",
    certifications: ["MSC", "HACCP"],
    relatedProducts: ["6", "9"],
  },

  {
    id: "12",
    name: "Fillet Ikan Gurame",
    description:
      "Fillet ikan gurame segar, daging tebal dan lembut, tanpa duri. Cocok untuk bakar, goreng, atau saus asam manis.",
    price: 92000,
    weight: "450g",
    stock: 13,
    rating: 4.8,
    reviewCount: 55,
    unit: "pack",
    discount: 0,
    images: [
      "/fillet-gurame.jpg?height=600&width=800",
      "/gurami-2.jpg?height=600&width=800",
      "/gurami-3.jpg?height=600&width=800",
    ],
    nutritionFacts: {
      calories: "145 kcal",
      protein: "19g",
      fat: "6g",
      carbs: "0g",
      omega3: "0.5g",
    },
    temperatureData: [
      { time: "Pemrosesan", temp: 0 },
      { time: "Penyimpanan", temp: -18 },
      { time: "Pengiriman", temp: -16 },
      { time: "Tiba", temp: -17 },
    ],
    storageInfo: "Simpan di freezer -18°C dan hindari paparan udara.",
    cookingInfo:
      "Cocok untuk dimasak asam manis, dibakar, atau digoreng tepung.",
    origin: "Perairan Sumatera",
    harvestDate: "11 Mei 2023",
    expiryDate: "11 Mei 2024",
    certifications: ["HACCP"],
    relatedProducts: ["7", "8"],
  },
];

// Mock reviews
const reviewsDatabase = {
  "1": [
    {
      id: "1",
      user: "Budi Santoso",
      rating: 5,
      date: "12 Apr 2023",
      comment:
        "Ikan sangat segar dan berkualitas. Pengiriman cepat dan tetap beku sampai tujuan.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      user: "Siti Rahayu",
      rating: 4,
      date: "28 Mar 2023",
      comment:
        "Rasanya enak, tapi ukurannya sedikit lebih kecil dari yang saya bayangkan. Tetap puas dengan kualitasnya.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      user: "Ahmad Hidayat",
      rating: 5,
      date: "15 Mar 2023",
      comment:
        "Sudah berkali-kali beli di sini dan tidak pernah mengecewakan. Ikan selalu segar dan packaging aman.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "2": [
    {
      id: "1",
      user: "Dewi Lestari",
      rating: 5,
      date: "10 Apr 2023",
      comment:
        "Udang sangat segar dan manis. Pengiriman cepat dan packaging sangat baik.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      user: "Rudi Hartono",
      rating: 4,
      date: "25 Mar 2023",
      comment:
        "Kualitas udang bagus, tapi beberapa ukurannya tidak konsisten. Overall puas.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "3": [
    {
      id: "1",
      user: "Nina Wati",
      rating: 5,
      date: "8 Apr 2023",
      comment:
        "Cumi-cumi sangat segar dan empuk. Sangat puas dengan pembelian ini.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "4": [
    {
      id: "1",
      user: "Hendra Wijaya",
      rating: 4,
      date: "15 Apr 2023",
      comment:
        "Ikan dori fillet sangat praktis untuk dimasak. Rasanya enak dan tidak amis.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "5": [
    {
      id: "1",
      user: "Rina Susanti",
      rating: 5,
      date: "20 Apr 2023",
      comment:
        "Kepiting rajungan sangat segar dan dagingnya manis. Sangat memuaskan!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    // Find product by ID
    const productId = Array.isArray(id) ? id[0] : id;
    const foundProduct = productsDatabase.find((p) => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);

      // Get related products
      const related = productsDatabase.filter((p) =>
        foundProduct.relatedProducts.includes(p.id)
      );
      setRelatedProducts(related);

      // Get reviews for this product
      const productReviews = reviewsDatabase[productId] || [];
      setReviews(productReviews);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const inWishlist = isInWishlist(product.id);

    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Dihapus dari Wishlist",
        description: `${product.name} telah dihapus dari wishlist Anda.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Ditambahkan ke Wishlist",
        description: `${product.name} telah ditambahkan ke wishlist Anda.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="container py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Memuat Produk...</h2>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 pt-6">
      {/* Back button */}
      <div className="container">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Produk</span>
        </Link>
      </div>

      <FadeIn>
        <div className="container pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden bg-white p-4 shadow-lg border border-blue-100"
            >
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-blue-50 to-cyan-100">
                <Image
                  src={product.images[activeImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlistToggle();
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id)
                          ? "fill-pink-500 text-pink-500"
                          : "text-pink-500"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <Share2 className="h-5 w-5 text-blue-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                      activeImageIndex === index
                        ? "border-blue-400"
                        : "border-transparent"
                    } hover:border-blue-400 transition-all cursor-pointer`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} ulasan)
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-blue-600">
                        Rp{" "}
                        {(
                          (product.price * (100 - product.discount)) /
                          100
                        ).toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        Rp {product.price.toLocaleString()}
                      </span>
                      <Badge className="bg-red-500 text-white">
                        -{product.discount}%
                      </Badge>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">
                      Rp {product.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    / {product.weight}
                  </span>
                </div>
              </div>

              <div className="prose prose-blue max-w-none text-gray-600">
                <p>{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Pengiriman Cepat
                    </p>
                    <p className="text-xs text-green-600">Dijamin tetap beku</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Masa Simpan
                    </p>
                    <p className="text-xs text-blue-600">
                      12 bulan dalam freezer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Kualitas Premium
                    </p>
                    <p className="text-xs text-amber-600">Teknologi IQF</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Tambahkan ke Keranjang
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-blue-200 hover:bg-blue-50 ${
                    isInWishlist(product.id)
                      ? "text-pink-600 border-pink-200"
                      : "text-blue-700"
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${
                      isInWishlist(product.id) ? "fill-pink-500" : ""
                    }`}
                  />
                  {isInWishlist(product.id)
                    ? "Hapus dari Wishlist"
                    : "Tambahkan ke Wishlist"}
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-800">
                    Informasi Rantai Dingin
                  </h3>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Produk ini dijaga pada suhu optimal sepanjang rantai pasokan
                  untuk memastikan kesegaran dan kualitas.
                </p>
                <Link
                  href={`/products/${id}/track`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Lihat detail tracking suhu
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-12"
          >
            <Tabs defaultValue="details" className="w-full">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500">
                <div className="container">
                  <TabsList className="bg-transparent h-14 w-full justify-start gap-2">
                    <TabsTrigger
                      value="details"
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Detail Produk
                    </TabsTrigger>
                    <TabsTrigger
                      value="nutrition"
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Informasi Nutrisi
                    </TabsTrigger>
                    <TabsTrigger
                      value="temperature"
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Tracking Suhu
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Ulasan ({product.reviewCount})
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="p-6">
                <TabsContent value="details" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Informasi Produk
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Berat</span>
                          <span className="font-medium">{product.weight}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Asal</span>
                          <span className="font-medium">{product.origin}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Tanggal Panen</span>
                          <span className="font-medium">
                            {product.harvestDate}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Kadaluarsa</span>
                          <span className="font-medium">
                            {product.expiryDate}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Stok</span>
                          <span className="font-medium text-green-600">
                            {product.stock} tersedia
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Penyimpanan & Penggunaan
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">
                            Cara Penyimpanan
                          </h4>
                          <p className="text-sm text-blue-700">
                            {product.storageInfo}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">
                            Tips Memasak
                          </h4>
                          <p className="text-sm text-green-700">
                            {product.cookingInfo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-0">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Informasi Nutrisi
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <p className="text-sm text-gray-500">Per 100g</p>
                        <h4 className="text-xl font-bold">Informasi Nutrisi</h4>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Kalori</span>
                          <span className="font-medium">
                            {product.nutritionFacts.calories}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Protein</span>
                          <span className="font-medium">
                            {product.nutritionFacts.protein}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Lemak</span>
                          <span className="font-medium">
                            {product.nutritionFacts.fat}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Karbohidrat</span>
                          <span className="font-medium">
                            {product.nutritionFacts.carbs}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Omega-3</span>
                          <span className="font-medium">
                            {product.nutritionFacts.omega3}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">
                              Manfaat Kesehatan
                            </h4>
                            <p className="text-sm text-blue-700">
                              {product.name.includes("Ikan")
                                ? "Ikan kaya akan protein berkualitas tinggi dan asam lemak omega-3 yang baik untuk kesehatan jantung dan otak. Rendah kalori dan karbohidrat, cocok untuk diet sehat."
                                : product.name.includes("Udang")
                                ? "Udang kaya akan protein dan rendah lemak. Mengandung antioksidan astaxanthin yang baik untuk kesehatan kulit dan sistem kekebalan tubuh."
                                : product.name.includes("Cumi")
                                ? "Cumi-cumi kaya akan protein dan mineral seperti seng, tembaga, dan selenium. Rendah kalori dan baik untuk program diet."
                                : product.name.includes("Kepiting")
                                ? "Kepiting kaya akan protein, vitamin B12, dan selenium. Baik untuk kesehatan tulang dan sistem saraf."
                                : "Seafood kaya akan protein berkualitas tinggi dan nutrisi penting untuk kesehatan tubuh. Rendah kalori dan karbohidrat, cocok untuk diet sehat."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="temperature" className="mt-0">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Tracking Suhu Rantai Dingin
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
                      <p className="text-gray-700 mb-6">
                        Kami memantau suhu produk di setiap tahap rantai pasokan
                        untuk memastikan kualitas dan kesegaran optimal. Berikut
                        adalah data suhu untuk produk ini:
                      </p>

                      <div className="h-80 mb-6">
                        <TemperatureChart data={product.temperatureData} />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {product.temperatureData.map((point, index) => (
                          <div
                            key={index}
                            className="bg-white p-3 rounded-lg shadow-sm border border-blue-100"
                          >
                            <p className="text-xs text-gray-500 mb-1">
                              {point.time}
                            </p>
                            <p
                              className={`text-lg font-bold ${
                                point.temp <= -15
                                  ? "text-green-600"
                                  : point.temp <= -10
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }`}
                            >
                              {point.temp}°C
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-blue-100 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">
                          Standar Suhu Kami
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Optimal: -18°C hingga -22°C</li>
                          <li>• Aman: -15°C hingga -18°C</li>
                          <li>• Perhatian: -10°C hingga -15°C</li>
                          <li>• Kritis: Di atas -10°C</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                          <div className="text-center mb-4">
                            <h3 className="text-3xl font-bold text-blue-800">
                              {product.rating}
                            </h3>
                            <div className="flex justify-center my-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              Berdasarkan {product.reviewCount} ulasan
                            </p>
                          </div>

                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div
                                key={rating}
                                className="flex items-center gap-2"
                              >
                                <span className="text-sm text-gray-600 w-2">
                                  {rating}
                                </span>
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{
                                      width: `${
                                        rating === 5
                                          ? 70
                                          : rating === 4
                                          ? 20
                                          : rating === 3
                                          ? 7
                                          : rating === 2
                                          ? 2
                                          : 1
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 w-8">
                                  {rating === 5
                                    ? "70%"
                                    : rating === 4
                                    ? "20%"
                                    : rating === 3
                                    ? "7%"
                                    : rating === 2
                                    ? "2%"
                                    : "1%"}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6">
                            <ReviewForm productId={id} />
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Ulasan Pelanggan
                        </h3>
                        <ReviewList reviews={reviews} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Produk Terkait
              </h2>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          if (isInWishlist(relatedProduct.id)) {
                            removeFromWishlist(relatedProduct.id);
                          } else {
                            addToWishlist(relatedProduct);
                          }
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(relatedProduct.id)
                              ? "fill-pink-500 text-pink-500"
                              : "text-pink-500"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="block"
                    >
                      <h3 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-blue-600">
                            Rp{" "}
                            {(
                              (relatedProduct.price *
                                (100 - relatedProduct.discount)) /
                              100
                            ).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            Rp {relatedProduct.price.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="font-bold text-blue-600">
                          Rp {relatedProduct.price.toLocaleString()}
                        </p>
                      )}
                    </Link>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {relatedProduct.rating}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(relatedProduct);
                          toast({
                            title: "Ditambahkan ke Keranjang",
                            description: `${relatedProduct.name} telah ditambahkan ke keranjang Anda.`,
                          });
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span>Tambah</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  );
}
