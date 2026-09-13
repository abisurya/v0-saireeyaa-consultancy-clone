"use client"

import { useEffect } from "react"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime)
          }
          if (entry.entryType === "layout-shift") {
            if (!entry.hadRecentInput) {
              console.log("CLS:", entry.value)
            }
          }
        })
      })

      // Observe different entry types
      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] })
        observer.observe({ entryTypes: ["first-input"] })
        observer.observe({ entryTypes: ["layout-shift"] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log("Performance monitoring not fully supported")
      }

      // Monitor page load performance
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log("Page Load Time:", navigation.loadEventEnd - navigation.fetchStart)
          console.log("DOM Content Loaded:", navigation.domContentLoadedEventEnd - navigation.fetchStart)
          console.log("First Paint:", performance.getEntriesByName("first-paint")[0]?.startTime)
          console.log("First Contentful Paint:", performance.getEntriesByName("first-contentful-paint")[0]?.startTime)
        }
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return null
}
