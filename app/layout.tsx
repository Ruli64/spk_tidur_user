import type React from "react"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const geistSans = Inter({ subsets: ["latin"] })
const geistMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Sleep Advisor - Rekomendasi Jam Tidur Ideal",
  description: "Sistem rekomendasi jam tidur ideal menggunakan metode SAW",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${geistSans.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
