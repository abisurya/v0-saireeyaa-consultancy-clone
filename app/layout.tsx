import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import PerformanceMonitor from "@/components/performance-monitor"
import CriticalCSS from "@/components/critical-css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Saireeyaa Consultancy - Expert Visa & Immigration Services",
  description:
    "Your trusted partner for visa consultancy, flight tickets, and travel services. We help you achieve your global aspirations through professional, transparent, and client-focused guidance.",
  keywords:
    "visa consultancy, immigration services, flight tickets, travel agency, visa application, document preparation, interview coaching, express entry, provincial nominee program",
  authors: [{ name: "Saireeyaa Consultancy" }],
  creator: "Saireeyaa Consultancy",
  publisher: "Saireeyaa Consultancy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saireeyaaconsultancy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Saireeyaa Consultancy - Expert Visa & Immigration Services",
    description:
      "Your trusted partner for visa consultancy, flight tickets, and travel services. Professional immigration guidance with proven success rates.",
    url: "https://saireeyaaconsultancy.com",
    siteName: "Saireeyaa Consultancy",
    images: [
      {
        url: "/images/saireeyaa-logo.png?v=10",
        width: 1200,
        height: 630,
        alt: "Saireeyaa Consultancy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saireeyaa Consultancy - Expert Visa & Immigration Services",
    description: "Your trusted partner for visa consultancy, flight tickets, and travel services.",
    images: ["/images/saireeyaa-logo.png?v=10"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} font-sans`} suppressHydrationWarning>
        <CriticalCSS />
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  )
}
