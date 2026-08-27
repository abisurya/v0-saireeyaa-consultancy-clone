"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle, Users, Globe, FileText, UserCheck, Briefcase, Heart, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const services = [
    {
      icon: FileText,
      title: "Visa Application Assistance",
      description: "Complete assistance with applications, including document preparation and submission",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Flight Ticket Booking",
      description: "Professional flight booking services with best prices and flexible options",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Document Preparation & Verification",
      description: "Professional preparation and verification of all required documentation",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: UserCheck,
      title: "Immigration Eligibility Assessment",
      description: "Comprehensive evaluation of your immigration eligibility and options",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description: "Comprehensive coaching and mock sessions for visa interviews",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: Briefcase,
      title: "Tour Packages ",
      description: "Complete travel packages including flights, accommodation, and visa services",
      color: "from-pink-500 to-rose-500",
    },
  ]

  const immigrationPrograms = [
    { name: "Express Entry Programs", clients: "200+", success: "99%" },
    { name: "Provincial Nominee Programs", clients: "150+", success: "98%" },
    { name: "Skilled Worker Programs", clients: "120+", success: "97%" },
    { name: "Family Sponsorship", clients: "80+", success: "96%" },
    { name: "Business Immigration", clients: "50+", success: "95%" },
  ]

  const detailedServices = [
    {
      title: "Visa Application Support",
      description: "Complete assistance with applications, including document preparation and submission",
      features: [
        "Application form completion",
        "Document checklist preparation",
        "Submission guidance",
        "Status tracking",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Document Services",
      description: "Professional preparation and verification of all required documentation",
      features: [
        "Document authentication",
        "Translation services",
        "Notarization assistance",
        "Digital document management",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Interview Preparation",
      description: "Comprehensive coaching and mock sessions for visa interviews",
      features: ["Mock interview sessions", "Question preparation", "Confidence building", "Cultural orientation"],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Travel & Relocation",
      description: "Complete travel planning and relocation assistance",
      features: ["Flight booking assistance", "Accommodation guidance", "Local orientation", "Settlement support"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Express Processing",
      description: "Expedited services for urgent visa requirements",
      features: [
        "Priority processing",
        "Urgent document preparation",
        "Fast-track submissions",
        "Emergency consultations",
      ],
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Renewal Services",
      description: "Timely assistance with visa renewals and extensions",
      features: ["Renewal reminders", "Extension applications", "Status change assistance", "Compliance monitoring"],
      color: "from-pink-500 to-rose-500",
    },
  ]

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
              Our Comprehensive Services
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              From visa applications to flight bookings, we provide end-to-end solutions for all your travel and
              immigration needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Core Visa Services */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
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
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Visa Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional visa and immigration services tailored to your specific needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  onHoverStart={() => setActiveService(index)}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10`}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Floating particles */}
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
                        className={`absolute w-1 h-1 bg-gradient-to-r ${service.color} rounded-full`}
                        style={{
                          top: `${20 + i * 20}%`,
                          right: `${10 + i * 15}%`,
                        }}
                      />
                    ))}

                    <CardHeader className="relative z-10">
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6 },
                        }}
                        className={`p-3 rounded-full bg-gradient-to-br ${service.color} mb-4 w-fit`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-gray-900 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </CardDescription>
                    </CardContent>

                    {/* Animated border */}
                    <motion.div
                      className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${service.color} rounded-lg opacity-0 group-hover:opacity-100`}
                      transition={{ duration: 0.3 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Immigration Programs */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated background shapes */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Immigration Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized programs for different immigration pathways
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {immigrationPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"
                    >
                      <CheckCircle className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Success Rate</div>
                      <div className="text-lg font-bold text-green-600">{program.success}</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                    {program.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Clients Served</span>
                    <span className="text-lg font-bold text-blue-600">{program.clients}</span>
                  </div>
                </div>

                {/* Animated accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 w-0 group-hover:w-full"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Detailed Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Detailed Immigration Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support throughout your immigration journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{
                  y: -10,
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
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Floating sparkles */}
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
                    <CardTitle
                      className={`text-xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                    >
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                          className="flex items-center space-x-3 group/item"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`p-1 rounded-full bg-gradient-to-r ${service.color}`}
                          >
                            <CheckCircle className="h-4 w-4 text-white" />
                          </motion.div>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>

                  {/* Animated border pulse */}
                  <motion.div
                    className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${service.color} rounded-lg`}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 0 rgba(59, 130, 246, 0)",
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

      {/* Enhanced Support Services */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional services to ensure your complete satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mr-4"
                    >
                      <Heart className="h-6 w-6 text-white" />
                    </motion.div>
                    Pre- and Post-Visa Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    Complete support before and after visa approval, including travel planning and settlement
                    assistance.
                  </p>
                  <ul className="space-y-2">
                    {["Pre-departure orientation", "Airport assistance", "Settlement support"].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mr-4"
                    >
                      <Shield className="h-6 w-6 text-white" />
                    </motion.div>
                    Legal & Regulatory Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    Stay informed with the latest immigration laws and policy changes that may affect your application.
                  </p>
                  <ul className="space-y-2">
                    {["Policy change notifications", "Legal compliance guidance", "Regular updates"].map(
                      (item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
