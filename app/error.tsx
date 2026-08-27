"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3">
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 bg-transparent"
              >
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
