"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const subtotal = getSubtotal();
  const shipping = 20000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login diperlukan",
        description:
          "Silakan login terlebih dahulu untuk melanjutkan ke pembayaran.",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    // Simulasi delay untuk menunjukkan loading state
    setTimeout(() => {
      router.push("/checkout");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
        Keranjang Belanja
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FadeIn>
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full">
              <ShoppingCart className="h-12 w-12 text-cyan-500" />
            </div>
            <h2 className="text-xl font-medium mb-4">
              Keranjang Belanja Anda Kosong
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Sepertinya Anda belum menambahkan produk apapun ke keranjang
              belanja. Mari jelajahi produk-produk laut beku berkualitas kami.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Mulai Belanja
              </Link>
            </Button>
          </FadeIn>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">
                    Item dalam Keranjang (
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                    )
                  </h2>
                </div>
                <ul>
                  {cartItems.map((item, index) => (
                    <FadeIn key={item.id} delay={0.1 * index}>
                      <li className="border-b last:border-0 p-6">
                        <div className="flex items-center">
                          <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 flex-shrink-0">
                            <Image
                              src="/placeholder.svg"
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-medium text-gray-900 hover:text-cyan-700"
                            >
                              {item.name}
                            </Link>
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-semibold mt-1">
                              Rp{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center ml-auto">
                            <div className="flex items-center border rounded-md mr-4 overflow-hidden">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="h-8 w-8 rounded-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="h-8 w-8 rounded-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4 border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pengiriman</span>
                    <span>Rp{shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                        Rp{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
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
                      <>
                        Lanjut ke Pembayaran{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button variant="outline" asChild className="w-full mt-2">
                    <Link href="/products">Lanjut Belanja</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      )}
    </div>
  );
}
