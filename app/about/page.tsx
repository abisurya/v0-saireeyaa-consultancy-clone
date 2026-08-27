"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Target, Heart, Shield, Users, Globe, CheckCircle, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const stats = [
    { number: "500+", label: "Successful Applications", color: "from-blue-500 to-cyan-500" },
    { number: "50+", label: "Countries Served", color: "from-green-500 to-emerald-500" },
    { number: "4+", label: "Years of Experience", color: "from-purple-500 to-violet-500" },
    { number: "98%", label: "Success Rate", color: "from-orange-500 to-red-500" },
  ]

  const teamSlides = [
    {
      name: "Thanushiyanthan",
      role: "CEO",
      experience: "8+ years experience in visa processing",
      specialization: "Express Entry & Provincial Nominee Programs",
      image: "/placeholder.svg?height=300&width=300",
      achievements: ["500+ successful applications", "ICCRC certified"],
      quote: "Every client's dream is our mission to fulfill.",
    },
    {
      name: "Noilin",
      role: "Secretary",
      experience: "4+ years in document verification",
      specialization: "Document preparation & authentication",
      image: "/placeholder.svg?height=300&width=300",
      achievements: ["Zero document rejection rate", "Multilingual support", "Legal document expert"],
      quote: "Precision in documentation leads to success.",
    },
    {
      name: "Nishanthan",
      role: "Manager",
      experience: "5+ years in interview preparation",
      specialization: "Visa interview coaching & preparation",
      image: "/placeholder.svg?height=300&width=300",
      achievements: ["95% interview success rate", "Mock interview specialist", "Confidence building expert"],
      quote: "Confidence is the key to interview success.",
    },
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "Years of experience in immigration law and visa processing with proven success rates.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Every client receives individual attention and customized solutions for their unique situation.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "We handle visa applications for multiple countries with deep knowledge of international requirements.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "High success rate with thousands of satisfied clients who have achieved their immigration goals.",
      color: "from-purple-500 to-violet-600",
    },
  ]

  const milestones = [
    {
      year: "2019",
      event: "Company Founded",
      description: "Started with a vision to help people achieve their global dreams",
    },
    {
      year: "2021",
      event: "100+ Successful Cases",
      description: "Reached our first major milestone with 100 successful visa applications",
    },
    {
      year: "2022",
      event: "International Recognition",
      description: "Received recognition for excellence in immigration services",
    },
    {
      year: "2023",
      event: "500+ Happy Clients",
      description: "Celebrated helping over 500 clients achieve their immigration goals",
    },
    { year: "2024", event: "Expansion & Growth", description: "Expanded services and team to serve clients better" },
  ]

  // Auto-play functionality for team slider
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % teamSlides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, teamSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamSlides.length) % teamSlides.length)
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
              About Saireeyaa Consultancy
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your trusted partner in achieving global aspirations through expert immigration guidance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section with Animated Counters */}
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
            {stats.map((stat, index) => (
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
                  className={`text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
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

                {/* Animated underline */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${stat.color} mx-auto mt-2 rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Vision and Story with Parallax */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              className="relative"
            >
              {/* Animated Icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Target className="h-6 w-6 text-white" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 ml-8">Our Vision</h2>
              <motion.p
                className="text-gray-600 text-lg leading-relaxed ml-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                To be the most trusted and caring visa consultancy, recognized for empowering individuals to achieve
                their global aspirations through transparent, ethical, and client-focused guidance—always prioritizing
                customer success and satisfaction above profit.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Floating elements inside the card */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 2) * 60}%`,
                    }}
                  />
                ))}

                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Our Story</h2>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  Founded in 2019, Saireeyaa Consultancy has been at the forefront of providing exceptional visa and
                  immigration consultancy services to clients worldwide. Our team of expert consultants works together
                  to deliver personalized solutions that make your immigration journey smooth and successful.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 relative z-10">
                  What started as a small consultancy firm has grown into a trusted partner for hundreds of families and
                  individuals seeking to build their future abroad. Our commitment to excellence and client satisfaction
                  has been the cornerstone of our success.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Milestones that shaped our success story</p>
          </motion.div>

          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
                    >
                      <motion.div
                        className="text-2xl font-bold text-blue-600 mb-2"
                        animate={{
                          color: ["#2563eb", "#8b5cf6", "#2563eb"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        {milestone.year}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <motion.div
                    className="relative z-10 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Slider Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to your immigration success
            </p>
          </motion.div>

          <div className="relative">
            {/* Team Slider */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
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
                    className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
                    style={{ backgroundSize: "400% 400%" }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                    {/* Team Member Image */}
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
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-30"
                      />
                      <div className="relative w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="h-32 w-32 text-white" />
                      </div>
                    </motion.div>

                    {/* Team Member Info */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <h3 className="text-3xl font-bold text-gray-900">{teamSlides[currentSlide].name}</h3>
                        <p className="text-xl text-blue-600 font-semibold">{teamSlides[currentSlide].role}</p>
                        <p className="text-gray-600">{teamSlides[currentSlide].experience}</p>
                        <p className="text-sm text-gray-500">{teamSlides[currentSlide].specialization}</p>
                      </motion.div>

                      {/* Quote */}
                      <motion.blockquote
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg italic text-gray-700 border-l-4 border-blue-500 pl-4"
                      >
                        "{teamSlides[currentSlide].quote}"
                      </motion.blockquote>

                      {/* Achievements */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="space-y-2"
                      >
                        <h4 className="font-semibold text-gray-900">Key Achievements:</h4>
                        {teamSlides[currentSlide].achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600">{achievement}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {teamSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
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

      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(45deg, #3b82f6 25%, transparent 25%),
                               linear-gradient(-45deg, #8b5cf6 25%, transparent 25%),
                               linear-gradient(45deg, transparent 75%, #3b82f6 75%),
                               linear-gradient(-45deg, transparent 75%, #8b5cf6 75%)`,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Saireeyaa Consultancy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What sets us apart in the immigration consultancy industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Card className="h-full relative overflow-hidden group">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
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
                        delay: i * 1 + index * 0.5,
                        ease: "easeInOut",
                      }}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${item.color} rounded-full`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + (i % 2) * 60}%`,
                      }}
                    />
                  ))}

                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center">
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6 },
                        }}
                        className={`p-3 rounded-full bg-gradient-to-br ${item.color} mr-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <span className="group-hover:text-gray-900 transition-colors duration-300">{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </CardContent>

                  {/* Animated Border */}
                  <motion.div
                    className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${item.color} rounded-lg opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
