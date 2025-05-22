"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Heart,
  Search,
  LogIn,
  LogOut,
  Home,
  Package,
  Info,
  Phone,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { useMobile } from "@/hooks/use-mobile"

export default function CompactHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items, getItemCount } = useCart()
  const { user, logout } = useAuth()
  const isMobile = useMobile()

  const cartItemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/products", label: "Produk", icon: Package },
    { href: "/about", label: "Tentang Kami", icon: Info },
    { href: "/how-to-order", label: "Cara Order", icon: HelpCircle },
    { href: "/contact", label: "Kontak", icon: Phone },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-1"
          : "bg-gradient-to-r from-blue-800/90 to-cyan-700/90 backdrop-blur-sm py-1.5 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="relative">
                <span
                  className={`text-xl font-bold ${
                    isScrolled
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  Lautan
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </div>
              <span className={`text-xl font-bold ${isScrolled ? "text-sky-700" : "text-cyan-300"} ml-0.5`}>
                Frozen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  size="sm"
                  className={`relative ${
                    isScrolled
                      ? isActive(link.href)
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                        : "text-gray-700 hover:text-blue-600"
                      : isActive(link.href)
                        ? "bg-white/20 text-white"
                        : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`relative h-8 w-8 ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <NotificationDropdown isScrolled={isScrolled} />

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className={`relative h-8 w-8 ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={`relative h-8 w-8 ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Account */}
            {user ? (
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 flex items-center gap-1 ${isScrolled ? "text-gray-700" : "text-white"}`}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block text-xs">{user.name?.split(" ")[0]}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link href="/account">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-3 w-3 mr-2" />
                        Profil Saya
                      </Button>
                    </Link>
                    <Link href="/account/orders">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Package className="h-3 w-3 mr-2" />
                        Pesanan Saya
                      </Button>
                    </Link>
                    <Link href="/wishlist">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Heart className="h-3 w-3 mr-2" />
                        Wishlist
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      onClick={logout}
                    >
                      <LogOut className="h-3 w-3 mr-2" />
                      Keluar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 flex items-center gap-1 ${isScrolled ? "text-gray-700" : "text-white"}`}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline-block text-xs">Masuk</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden h-8 w-8 ${isScrolled ? "text-gray-700" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 overflow-hidden"
            >
              <div className="flex gap-2 pb-2">
                <Input
                  type="search"
                  placeholder="Cari produk seafood..."
                  className="w-full h-8 text-sm bg-white/90 backdrop-blur-sm border-blue-200 focus-visible:ring-blue-400"
                  autoFocus
                />
                <Button
                  size="sm"
                  className="h-8 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                >
                  <Search className="h-3 w-3 mr-1" />
                  <span className="text-xs">Cari</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={isActive(link.href) ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start ${
                        isActive(link.href) ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white" : "text-gray-700"
                      }`}
                    >
                      <link.icon className="h-3.5 w-3.5 mr-2" />
                      {link.label}
                    </Button>
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link href="/account">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-3.5 w-3.5 mr-2" />
                        Profil Saya
                      </Button>
                    </Link>
                    <Link href="/account/orders">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Package className="h-3.5 w-3.5 mr-2" />
                        Pesanan Saya
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-600" onClick={logout}>
                      <LogOut className="h-3.5 w-3.5 mr-2" />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <LogIn className="h-3.5 w-3.5 mr-2" />
                      Masuk / Daftar
                    </Button>
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
