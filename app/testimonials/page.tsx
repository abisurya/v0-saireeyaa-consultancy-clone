"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Heart, Award, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const testimonials = [
    {
      name: "Sharmila Thangeshwar",
      country: "Canada",
      program: "Express Entry Program",
      text: "Saireeyaa Consultancy made my Canadian immigration dream come true. Their professional guidance and attention to detail were exceptional. The team was always available to answer my questions and provided step-by-step support throughout the entire process.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇨🇦",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Priyachenthan",
      country: "Australia",
      program: "Skilled Worker Program",
      text: "The team's expertise in visa processing is unmatched. They handled everything professionally and kept me informed throughout the process. I couldn't have asked for better service. Highly recommend to anyone looking for immigration assistance.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇦🇺",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Priya Thinesh",
      country: "UK",
      program: "Family Sponsorship",
      text: "Outstanding service! They helped me navigate the complex UK visa process with ease. The document preparation was thorough and the interview coaching gave me confidence. I'm now happily settled in the UK with my family.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇬🇧",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Ahmed Hassan",
      country: "Germany",
      program: "Business Visa",
      text: "Professional, reliable, and efficient. Saireeyaa Consultancy helped me secure my German business visa in record time. Their knowledge of immigration laws and attention to detail is impressive. Thank you for making my business expansion possible.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇩🇪",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Merrlin Chrystopher",
      country: "New Zealand",
      program: "Provincial Nominee Program",
      text: "I was overwhelmed by the immigration process until I found Saireeyaa Consultancy. They simplified everything and guided me through each step. Their personalized approach and genuine care for clients is what sets them apart.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇳🇿",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "David Ronald",
      country: "USA",
      program: "Investment Visa",
      text: "Exceptional service from start to finish. The team at Saireeyaa Consultancy demonstrated deep knowledge of US immigration law and provided invaluable guidance for my investment visa. I'm now successfully running my business in the US.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      flag: "🇺🇸",
      color: "from-indigo-500 to-blue-600",
    },
  ]

  const successStats = [
    { number: "500+", label: "Successful Cases", icon: Award, color: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Success Rate", icon: Star, color: "from-green-500 to-emerald-500" },
    { number: "50+", label: "Countries", icon: Globe, color: "from-purple-500 to-violet-500" },
    { number: "4.9/5", label: "Client Rating", icon: Heart, color: "from-orange-500 to-red-500" },
  ]

  const countries = [
    { name: "Canada", flag: "🇨🇦", clients: "150+" },
    { name: "Australia", flag: "🇦🇺", clients: "120+" },
    { name: "United Kingdom", flag: "🇬🇧", clients: "80+" },
    { name: "United States", flag: "🇺🇸", clients: "70+" },
    { name: "Germany", flag: "🇩🇪", clients: "45+" },
    { name: "New Zealand", flag: "🇳🇿", clients: "35+" },
    { name: "Netherlands", flag: "🇳🇱", clients: "25+" },
    { name: "Sweden", flag: "🇸🇪", clients: "20+" },
    { name: "Norway", flag: "🇳🇴", clients: "18+" },
    { name: "Denmark", flag: "🇩🇰", clients: "15+" },
    { name: "Switzerland", flag: "🇨🇭", clients: "12+" },
    { name: "Austria", flag: "🇦🇹", clients: "10+" },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div style={{ y }} className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + (i % 4),
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400/30 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-purple-400/30 transform rotate-45"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(45deg, #ffffff, #60a5fa, #a78bfa, #ffffff)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              What Our Clients Say
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Success Stats */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {successStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div
                  className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial Slider */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from real clients who achieved their immigration dreams
            </p>
          </motion.div>

          <div className="relative">
            {/* Testimonial Slider */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 300, rotateY: 45 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -300, rotateY: -45 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Pattern */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className={`absolute inset-0 opacity-5 bg-gradient-to-br ${testimonials[currentTestimonial].color}`}
                    style={{ backgroundSize: "400% 400%" }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
                    {/* Client Image */}
                    <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className={`absolute inset-0 bg-gradient-to-r ${testimonials[currentTestimonial].color} rounded-full blur-xl opacity-30`}
                      />
                      <div
                        className={`relative w-48 h-48 mx-auto bg-gradient-to-br ${testimonials[currentTestimonial].color} rounded-full flex items-center justify-center text-6xl`}
                      >
                        {testimonials[currentTestimonial].flag}
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 * i,
                                type: "spring",
                                stiffness: 200,
                              }}
                              whileHover={{
                                scale: 1.3,
                                rotate: 360,
                                transition: { duration: 0.3 },
                              }}
                            >
                              <Star className="h-6 w-6 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                        <p className="text-lg text-blue-600 font-semibold flex items-center">
                          <span className="mr-2">{testimonials[currentTestimonial].flag}</span>
                          {testimonials[currentTestimonial].country}
                        </p>
                        <p className="text-gray-600">{testimonials[currentTestimonial].program}</p>
                      </motion.div>

                      {/* Quote */}
                      <motion.blockquote
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-gray-700 relative"
                      >
                        <Quote className="absolute -top-4 -left-4 h-8 w-8 text-blue-200" />
                        <p className="italic pl-8">"{testimonials[currentTestimonial].text}"</p>
                      </motion.blockquote>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>

              {/* Auto-play Toggle */}
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full shadow-lg transition-colors ${
                  isAutoPlaying ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                } text-white`}
              >
                {isAutoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every client's journey is unique, but their success is our shared achievement
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
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                }}
                style={{ perspective: "1000px" }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  {/* Add animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10`}
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
                        delay: i * 1 + index * 0.2,
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
                    <div className="flex items-center space-x-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-2xl`}
                      >
                        {testimonial.flag}
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-700 transition-colors duration-300">
                          {testimonial.name}
                        </CardTitle>
                        <p className="text-blue-600 font-medium">{testimonial.country}</p>
                        <p className="text-sm text-gray-500">{testimonial.program}</p>
                      </div>
                    </div>
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
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 italic group-hover:text-gray-700 transition-colors duration-300">
                      "{testimonial.text}"
                    </p>
                  </CardContent>

                  {/* Add animated border pulse */}
                  <motion.div
                    className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${testimonial.color} rounded-lg`}
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

      {/* Enhanced Countries We Serve */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Countries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have successfully helped clients immigrate to these countries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {country.flag}
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {country.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">{country.clients} clients</p>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 w-0 group-hover:w-full"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have achieved their immigration dreams with Saireeyaa Consultancy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get Free Consultation
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
