"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  FileText,
  CheckCircle,
  UserCheck,
  Users,
  Globe,
  Briefcase,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)

  const services = [
    {
      icon: FileText,
      title: "Visa Application Assistance",
      description: "Complete assistance with applications and document preparation",
      href: "/services#visa-application",
    },
    {
      icon: CheckCircle,
      title: "Document Preparation & Verification",
      description: "Professional preparation and verification of documentation",
      href: "/services#document-preparation",
    },
    {
      icon: UserCheck,
      title: "Immigration Eligibility Assessment",
      description: "Comprehensive evaluation of your immigration eligibility",
      href: "/services#eligibility-assessment",
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description: "Comprehensive coaching and mock interview sessions",
      href: "/services#interview-coaching",
    },
    {
      icon: Globe,
      title: "Expedited Visa Processing",
      description: "Fast-track services for urgent visa requirements",
      href: "/services#expedited-processing",
    },
    {
      icon: Briefcase,
      title: "Business Visa Consultancy",
      description: "Specialized services for business and investment visas",
      href: "/services#business-visa",
    },
    {
      icon: Heart,
      title: "Pre & Post-Visa Assistance",
      description: "Complete support before and after visa approval",
      href: "/services#pre-post-assistance",
    },
    {
      icon: Shield,
      title: "Legal & Regulatory Updates",
      description: "Stay informed with latest immigration law changes",
      href: "/services#legal-updates",
    },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                filter: [
                  "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
                  "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1.5,
                ease: "easeInOut",
              }}
            >
              <Link href="/">
                <motion.img
                  src="/images/saireeyaa-logo.png?v=10"
                  alt="Saireeyaa Consultancy Logo"
                  className="h-14 w-auto cursor-pointer object-contain"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    filter: "brightness(1.2) drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))",
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                  whileTap={{ scale: 0.95, rotate: -10 }}
                  initial={{ opacity: 0, y: -20, rotate: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    transition: {
                      duration: 1.2,
                      delay: 0.2,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100,
                    },
                  }}
                />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="hidden sm:block"
            >
              <Link href="/">
                <motion.h1
                  className="text-xl font-bold text-gray-900 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-red-500"
                    whileHover={{
                      color: "#ef4444",
                      textShadow: "0 0 8px rgba(239, 68, 68, 0.5)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    SAI REEYAA
                  </motion.span>
                  <motion.span
                    className="text-blue-600 ml-1"
                    whileHover={{
                      color: "#2563eb",
                      textShadow: "0 0 8px rgba(37, 99, 235, 0.5)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    CONSULTANCY
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-xs text-gray-600 -mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ color: "#4b5563", scale: 1.05 }}
                >
                  Expert in Flight Tickets & Visa Consultancy
                </motion.p>
              </Link>
            </motion.div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center group"
              >
                Services
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesHovered ? "rotate-180" : ""}`}
                />
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isServicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 200 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                    style={{ perspective: "1000px" }}
                  >
                    {/* Enhanced Header with gradient animation */}
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 relative overflow-hidden"
                      initial={{ backgroundPosition: "0% 50%" }}
                      animate={{ backgroundPosition: "100% 50%" }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      {/* Add floating particles in header */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.6,
                            ease: "easeInOut",
                          }}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                          }}
                        />
                      ))}

                      <h3 className="text-white font-semibold text-lg relative z-10">Our Services</h3>
                      <p className="text-blue-100 text-sm relative z-10">Comprehensive immigration solutions</p>
                    </motion.div>

                    {/* Enhanced Services List */}
                    <div className="max-h-96 overflow-y-auto">
                      {services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                            type: "spring",
                            stiffness: 150,
                          }}
                          whileHover={{
                            x: 10,
                            scale: 1.02,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <Link
                            href={service.href}
                            className="flex items-start p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-50 last:border-b-0 group relative overflow-hidden"
                          >
                            {/* Add animated background line */}
                            <motion.div
                              className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 scale-y-0 group-hover:scale-y-100 origin-top"
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />

                            <motion.div
                              className="flex-shrink-0 mr-3 mt-1"
                              whileHover={{
                                rotate: 360,
                                scale: 1.2,
                                transition: { duration: 0.5 },
                              }}
                            >
                              <service.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-sm">
                                {service.title}
                              </h4>
                              <p className="text-gray-600 text-xs mt-1 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                {service.description}
                              </p>
                            </div>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ x: 5, scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4 text-blue-600 rotate-[-90deg]" />
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>

              {/* Mobile Services Section */}
              <div className="py-2">
                <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
                  Services
                </Link>
                <div className="ml-4 mt-2 space-y-2">
                  {services.slice(0, 4).map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="block py-1 text-sm text-gray-600 hover:text-blue-600 flex items-center"
                    >
                      <service.icon className="h-4 w-4 mr-2" />
                      {service.title}
                    </Link>
                  ))}
                  <Link href="/services" className="block py-1 text-sm text-blue-600 font-medium">
                    View All Services →
                  </Link>
                </div>
              </div>

              <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/testimonials" className="block py-2 text-gray-700 hover:text-blue-600">
                Testimonials
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
