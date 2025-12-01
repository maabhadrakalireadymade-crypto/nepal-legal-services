import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nepal Legal Services - Company Registration & Legal Solutions',
  description: 'Professional company registration, legal documentation, and business services in Nepal. Fast, reliable, and affordable.',
  keywords: 'Nepal company registration, business registration Nepal, legal services Nepal, PAN VAT registration, trademark Nepal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
