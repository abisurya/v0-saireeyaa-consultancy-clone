"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white py-12 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.img
                  src="/images/saireeyaa-logo.png?v=10"
                  alt="Saireeyaa Consultancy Logo"
                  className="h-16 w-auto cursor-pointer object-contain"
                  whileHover={{
                    scale: 1.05,
                    filter: "brightness(1.3) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                />
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <h2 className="text-2xl font-bold text-white">
                    <span className="text-red-400 hover:text-red-300 transition-colors duration-300">SAI REEYAA</span>
                    <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300 ml-1">
                      CONSULTANCY
                    </span>
                  </h2>
                  <p className="text-gray-300 text-sm">Expert in Flight Tickets & Visa Consultancy</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.p
              className="text-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your trusted partner for visa consultancy, flight tickets, and travel services. We help you achieve your
              global aspirations through professional, transparent, and client-focused guidance for all your travel and
              immigration needs.
            </motion.p>

            {/* Social Media Icons */}
            <motion.div
              className="flex space-x-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href="https://www.facebook.com/share/1BiTaDxw7j/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com/saireeyaaconsultancy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-pink-600/20 hover:bg-pink-600/40 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.405h-1.78V6.156h1.78v1.427zm-1.427 5.864c0-.807-.318-1.547-.875-2.104a2.95 2.95 0 00-2.104-.875c-.807 0-1.547.318-2.104.875a2.95 2.95 0 00-.875 2.104c0 .807.318 1.547.875 2.104a2.95 2.95 0 002.104.875c.807 0 1.547-.318 2.104-.875a2.95 2.95 0 00.875-2.104z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://tiktok.com/@saireeyaaconsultancy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gray-600/20 hover:bg-gray-600/40 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4 text-lg text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="/" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/services"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Services
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  About
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4 text-lg text-white">Services</h4>
            <ul className="space-y-3 text-gray-300">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Visa Applications
                </span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Immigration Programs
                </span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Document Services
                </span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Interview Coaching
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700/50 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-center md:text-left"
              whileHover={{ color: "#9CA3AF" }}
              transition={{ duration: 0.3 }}
            >
              &copy; 2024 Saireeyaa Consultancy. All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="hover:text-blue-400 cursor-pointer transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Privacy Policy
              </motion.span>
              <motion.span
                className="hover:text-blue-400 cursor-pointer transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Terms of Service
              </motion.span>
              <motion.span
                className="hover:text-blue-400 cursor-pointer transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Cookie Policy
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
