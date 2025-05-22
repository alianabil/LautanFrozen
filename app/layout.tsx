import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import Footer from "@/components/footer"
import CompactHeader from "@/components/compact-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LautanFrozen - Seafood Segar Berkualitas",
  description: "Jual seafood segar berkualitas dengan teknologi IQF (Individual Quick Freezing)",
    generator: '.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <CompactHeader />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
