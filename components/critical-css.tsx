"use client"

import { useEffect } from "react"

export default function CriticalCSS() {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href: string) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "font"
      link.type = "font/woff2"
      link.crossOrigin = "anonymous"
      link.href = href
      document.head.appendChild(link)
    }

    // Preload Inter font
    preloadFont(
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
    )

    // Preconnect to external domains
    const preconnectDomains = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"]

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Resource hints for better performance
    const prefetchResources = ["/images/saireeyaa-logo.png?v=10", "/images/travel-objects-table.avif"]

    prefetchResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = resource
      document.head.appendChild(link)
    })
  }, [])

  return null
}
