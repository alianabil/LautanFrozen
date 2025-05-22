"use client";

import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/product-card";
import { FadeIn } from "@/components/fade-in";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fillet Ikan Kakap",
      price: 85000,
      rating: 4.8,
      image: "/fillet-kakap.jpg",
      temperature: -18,
      category: "Fillet",
    },
    {
      id: 2,
      name: "Udang Vaname Premium",
      price: 120000,
      rating: 4.9,
      image: "/udang-vaname.jpg",
      temperature: -20,
      category: "Udang",
    },
    {
      id: 3,
      name: "Cumi-Cumi Segar",
      price: 75000,
      rating: 4.7,
      image: "/cumi-cumi.jpg",
      temperature: -19,
      category: "Cumi",
    },
    {
      id: 4,
      name: "Fillet Ikan Dori",
      price: 65000,
      rating: 4.6,
      image: "/fillet-dori.jpg",
      temperature: -18,
      category: "Fillet",
    },
    {
      id: 5,
      name: "Udang Pancet",
      price: 95000,
      rating: 4.5,
      image: "/udang-pancet.jpg",
      temperature: -20,
      category: "Udang",
    },
    {
      id: 6,
      name: "Fillet Ikan Salmon",
      price: 150000,
      rating: 4.9,
      image: "/fillet-salmon.jpg",
      temperature: -18,
      category: "Fillet",
    },
    {
      id: 7,
      name: "Fillet Ikan Kembung",
      price: 85000,
      rating: 4.6,
      image: "/fillet-kembung.jpg",
      temperature: -19,
      category: "Cumi",
    },
    {
      id: 8,
      name: "Udang Galah",
      price: 180000,
      rating: 4.8,
      image: "/udang-galah.jpg",
      temperature: -20,
      category: "Udang",
    },
    {
      id: 9,
      name: "Fillet Ikan Tuna",
      price: 110000,
      rating: 4.7,
      image: "/fillet-tuna.jpg",
      temperature: -18,
      category: "Fillet",
    },
    {
      id: 10,
      name: "Fillet Ikan Tenggiri",
      price: 70000,
      rating: 4.5,
      image: "/fillet-tenggiri.jpg",
      temperature: -19,
      category: "Cumi",
    },
    {
      id: 11,
      name: "Udang Windu",
      price: 140000,
      rating: 4.7,
      image: "/udang-windu.jpg",
      temperature: -20,
      category: "Udang",
    },
    {
      id: 12,
      name: "Fillet Ikan Gurame",
      price: 75000,
      rating: 4.4,
      image: "/fillet-gurame.jpg",
      temperature: -18,
      category: "Fillet",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState({
    Fillet: false,
    Udang: false,
    Cumi: false,
  });
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    const activeCategories = Object.entries(categoryFilters)
      .filter(([_, isChecked]) => isChecked)
      .map(([category]) => category);

    if (activeCategories.length > 0) {
      result = result.filter((product) =>
        activeCategories.includes(product.category)
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, categoryFilters, priceRange, sortOption, products]);

  const handleCategoryChange = (category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: !categoryFilters[category],
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilters({
      Fillet: false,
      Udang: false,
      Cumi: false,
    });
    setPriceRange([0, 200000]);
    setSortOption("featured");
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-cyan-900">
        Produk Laut Beku
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari produk..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Produk</SheetTitle>
                <SheetDescription>
                  Sesuaikan pencarian produk berdasarkan preferensi Anda
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Kategori</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fillet"
                        checked={categoryFilters.Fillet}
                        onCheckedChange={() => handleCategoryChange("Fillet")}
                      />
                      <Label htmlFor="fillet">Fillet Ikan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="udang"
                        checked={categoryFilters.Udang}
                        onCheckedChange={() => handleCategoryChange("Udang")}
                      />
                      <Label htmlFor="udang">Udang</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cumi"
                        checked={categoryFilters.Cumi}
                        onCheckedChange={() => handleCategoryChange("Cumi")}
                      />
                      <Label htmlFor="cumi">Cumi-Cumi</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Rentang Harga</h3>
                  <Slider
                    defaultValue={[0, 200000]}
                    max={200000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>Rp{priceRange[0].toLocaleString()}</span>
                    <span>Rp{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filter
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Unggulan</SelectItem>
              <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
              <SelectItem value="price-high">
                Harga: Tinggi ke Rendah
              </SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">
            Tidak ada produk yang ditemukan
          </h3>
          <p className="text-gray-500 mb-4">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          <Button onClick={clearFilters} variant="outline">
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <FadeIn key={product.id} delay={0.05 * (index % 4)}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
