"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Users,
  Globe,
  ArrowRight,
  Star,
  FileText,
  UserCheck,
  Briefcase,
  Heart,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function SaireeyaaConsultancy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const nameInput = form.elements.namedItem("name") as HTMLInputElement
    const emailInput = form.elements.namedItem("email") as HTMLInputElement
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      alert("Please fill in all required fields (Name, Email, and Message).")
      return
    }

    const formData = new FormData()
    formData.append("name", nameInput.value)
    formData.append("email", emailInput.value)
    formData.append("phone", phoneInput.value)
    formData.append("message", messageInput.value)
    formData.append("to", "saireeyaaconsultancy@gmail.com")

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    const originalText = submitBtn.textContent
    submitBtn.disabled = true
    submitBtn.textContent = "Sending..."

    try {
      const res = await fetch("/api/send-email", { method: "POST", body: formData })

      // Safely read the response
      const isJson = res.headers.get("content-type")?.includes("application/json")
      const payload = isJson ? await res.json().catch(() => null) : null

      if (res.ok && payload?.success) {
        alert(payload.message ?? "Message sent successfully! We’ll get back to you shortly.")
        form.reset()
      } else {
        const msg =
          payload?.message ||
          `Failed to send message. (${res.status} ${res.statusText})\nPlease try again or contact us directly.`
        alert(msg)
      }
    } catch (err) {
      console.error(err)
      alert("Network error – please check your connection and try again.")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText ?? "Send Message"
    }
  }

  const services = [
    {
      icon: FileText,
      title: "Visa Application Assistance",
      description: "Complete assistance with applications, including document preparation and submission",
    },
    {
      icon: CheckCircle,
      title: "Document Preparation & Verification",
      description: "Professional preparation and verification of all required documentation",
    },
    {
      icon: UserCheck,
      title: "Immigration Eligibility Assessment",
      description: "Comprehensive evaluation of your immigration eligibility and options",
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description: "Comprehensive coaching and mock sessions for visa interviews",
    },
    {
      icon: Globe,
      title: "Expedited Visa Processing",
      description: "Fast-track services for urgent visa requirements",
    },
    {
      icon: Briefcase,
      title: "Business Visa Consultancy",
      description: "Specialized services for business and investment visas",
    },
  ]

  const immigrationPrograms = [
    "Express Entry Programs",
    "Provincial Nominee Programs",
    "Skilled Worker Programs",
    "Family Sponsorship",
    "Business Immigration",
  ]

  const testimonials = [
    {
      name: "Sharmila Thangeshwar",
      country: "Canada",
      text: "Saireeyaa Consultancy made my Canadian immigration dream come true. Their professional guidance and attention to detail were exceptional.",
      rating: 5,
    },
    {
      name: "Priyachenthan",
      country: "Australia",
      text: "The team's expertise in visa processing is unmatched. They handled everything professionally and kept me informed throughout the process.",
      rating: 5,
    },
    {
      name: "Priya Dharshan",
      country: "UK",
      text: "Outstanding service! They helped me navigate the complex UK visa process with ease. Highly recommended for anyone seeking immigration assistance.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "How long does the visa application process typically take?",
      answer:
        "Processing times vary by country and visa type, typically ranging from 2-12 weeks. We provide realistic timelines based on current processing standards and offer expedited services when available.",
    },
    {
      question: "What documents do I need for my visa application?",
      answer:
        "Required documents vary by visa type and destination country. We provide a comprehensive checklist tailored to your specific application and assist with document preparation and verification.",
    },
    {
      question: "Do you offer services for visa renewals and extensions?",
      answer:
        "Yes, we provide complete assistance with visa renewals, extensions, and status changes. Our team ensures timely submission to avoid any gaps in your legal status.",
    },
    {
      question: "What makes Saireeyaa Consultancy different from other agencies?",
      answer:
        "Our client-centered approach, transparent processes, and commitment to excellence set us apart. We prioritize your success over profit and provide personalized solutions for each client.",
    },
    {
      question: "Do you provide post-visa assistance?",
      answer:
        "We offer comprehensive pre- and post-visa assistance, including travel planning, relocation consultation, and ongoing support for your settlement needs.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/images/travel-objects-table.avif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/60" />

        {/* Enhanced Moving Background with Image */}
        <div className="absolute inset-0">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/travel-objects-table.avif')`,
            }}
          />

          {/* Animated Moving Overlay */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-slate-900/70"
            style={{
              backgroundSize: "400% 400%",
            }}
          />

          {/* Moving Gradient Lines */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            style={{
              width: "200%",
              height: "100%",
            }}
          />

          {/* Secondary Moving Line */}
          <motion.div
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/15 to-transparent"
            style={{
              width: "200%",
              height: "100%",
            }}
          />

          {/* Final Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Trusted Partner for
              <span className="block text-yellow-400">Visa & Flight Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to SAI REEYAA Consultancy - we are a dedicated travel agency specializing in visa services and
              international travel support. With a strong reputation as Trusted Visa Partners
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/services">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
        />
        {/* Enhanced Floating Elements with more variety */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -8, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-blue-400/25 to-indigo-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/15 rounded-full blur-lg"
        />
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-br from-green-400/15 to-teal-400/20 rounded-full blur-xl"
        />

        {/* Add floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
            className={`absolute w-2 h-2 bg-white/40 rounded-full blur-sm`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${60 + (i % 2) * 20}%`,
            }}
          />
        ))}
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From visa applications to immigration programs, we provide end-to-end solutions for all your immigration
              needs.
            </p>
          </motion.div>

          {/* Core Visa Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Core Visa Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    {/* Add animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    <CardHeader className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <service.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:text-blue-700 transition-colors duration-300" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-blue-700 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </CardDescription>
                    </CardContent>

                    {/* Add animated border */}
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-400 rounded-lg opacity-0 group-hover:opacity-100"
                      initial={false}
                      whileHover={{
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Immigration Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 relative"
          >
            {/* Add animated wave background */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_200%]"
              style={{ borderRadius: "20px" }}
            />

            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 relative z-10">Immigration Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {immigrationPrograms.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Add animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 relative z-10" />
                  </motion.div>
                  <span className="text-gray-800 font-medium relative z-10 group-hover:text-gray-900 transition-colors duration-300">
                    {program}
                  </span>

                  {/* Add animated accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 w-0 group-hover:w-full"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Services */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Support Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 text-red-500 mr-2" />
                    Pre- and Post-Visa Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Complete support before and after visa approval, including travel planning and settlement
                    assistance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 text-blue-500 mr-2" />
                    Legal & Regulatory Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stay informed with the latest immigration laws and policy changes that may affect your application.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* Add floating quote graphics */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -left-10 text-6xl text-blue-200 font-serif"
            >
              "
            </motion.div>
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -3, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-10 -right-10 text-6xl text-indigo-200 font-serif"
            >
              "
            </motion.div>

            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.4, type: "spring", stiffness: 200 },
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80,
                }}
                style={{ perspective: "1000px" }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  {/* Add animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  {/* Add floating sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 1 + index * 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        top: `${20 + i * 20}%`,
                        right: `${10 + i * 15}%`,
                      }}
                    />
                  ))}

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="flex items-center space-x-1 mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.3,
                            rotate: 360,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <CardTitle className="text-lg group-hover:text-blue-700 transition-colors duration-300">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 italic group-hover:text-gray-700 transition-colors duration-300">
                      "{testimonial.text}"
                    </p>
                  </CardContent>

                  {/* Add animated border pulse */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(251, 191, 36, 0)",
                        "0 0 20px rgba(251, 191, 36, 0.3)",
                        "0 0 0 rgba(251, 191, 36, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 text-white relative overflow-hidden"
      >
        {/* Background Animation Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-500/15 rounded-full blur-xl"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your immigration journey? Contact us today for a consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Phone (24/7 Support)</h4>
                    <p className="text-gray-300">+94 (72) 875-6296</p>
                    <p className="text-gray-300">+94 (75) 392-9723</p>
                    <p className="text-gray-300">+94 (72) 673-7729</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Email (Quick Response)</h4>
                    <p className="text-gray-300">saireeraaconsultancy@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-gray-300">820A 1/1 3rd Mile Post, Trincomalee</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      name="name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      name="email"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      name="phone"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      name="message"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
