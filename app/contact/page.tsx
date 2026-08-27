"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone (24/7 Support)",
      details: ["+94 (72) 673-7717", "+94 (75) 392-9723", "+94 (78) 306-7069"],
      description: "Call us anytime for immediate assistance",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email (Quick Response)",
      details: ["saireeraaconsultancy@gmail.com"],
      description: "We respond to emails within 2 hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["820A 1/1 3rd Mile Post, Trincomalee"],
      description: "Visit our office for in-person consultation",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 3:00 PM", "Sunday: Closed"],
      description: "Extended hours available by appointment",
      color: "from-orange-500 to-red-500",
    },
  ]

  const officeFeatures = [
    { icon: CheckCircle, text: "Free initial consultation" },
    { icon: Star, text: "Document review service" },
    { icon: Users, text: "Private consultation rooms" },
    { icon: MessageCircle, text: "Multilingual support" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Save message to admin panel
      const response = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.service || 'General Inquiry',
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Send email notification
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: 'We received your inquiry - Saireeyaa Consultancy',
          message: `Thank you for reaching out to Saireeyaa Consultancy! We have received your message and will get back to you within 2 hours during business hours.`,
        }),
      })

      setSubmitStatus('success')
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        service: "",
        message: "",
      })

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('[v0] Submit error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
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
              Get In Touch
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ready to start your immigration journey? Contact us today for a consultation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Information */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Multiple ways to reach us for your convenience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => (
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
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10`}
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
                      className={`absolute w-1 h-1 bg-gradient-to-r ${info.color} rounded-full`}
                      style={{
                        top: `${20 + i * 20}%`,
                        right: `${10 + i * 15}%`,
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
                        className={`p-3 rounded-full bg-gradient-to-br ${info.color} mr-4`}
                      >
                        <info.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <span className="group-hover:text-gray-900 transition-colors duration-300">{info.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-2 mb-3">
                      {info.details.map((detail, detailIndex) => (
                        <motion.p
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1, duration: 0.5 }}
                          className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300"
                        >
                          {detail}
                        </motion.p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                      {info.description}
                    </p>
                  </CardContent>

                  {/* Animated border */}
                  <motion.div
                    className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${info.color} rounded-lg opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form and Map */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
            >
              <Card className="shadow-2xl relative overflow-hidden">
                {/* Animated background pattern */}
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

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-2xl">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-3"
                    >
                      <MessageCircle className="h-8 w-8 text-white" />
                    </motion.div>
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 2 hours during business hours.
                  </p>
                </CardHeader>
                <CardContent className="relative z-10">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="text-green-700 font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-700 font-medium">✕ Failed to send message. Please try again.</p>
                    </motion.div>
                  )}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <motion.input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your first name"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <motion.input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your last name"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Destination Country
                      </label>
                      <motion.select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a country</option>
                        <option value="canada">🇨🇦 Canada</option>
                        <option value="australia">🇦🇺 Australia</option>
                        <option value="uk">🇬🇧 United Kingdom</option>
                        <option value="usa">🇺🇸 United States</option>
                        <option value="germany">🇩🇪 Germany</option>
                        <option value="newzealand">🇳🇿 New Zealand</option>
                        <option value="other">🌍 Other</option>
                      </motion.select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <motion.select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="visa-application">Visa Application Assistance</option>
                        <option value="document-prep">Document Preparation</option>
                        <option value="eligibility">Eligibility Assessment</option>
                        <option value="interview-coaching">Interview Coaching</option>
                        <option value="express-entry">Express Entry Program</option>
                        <option value="business-visa">Business Visa</option>
                        <option value="consultation">General Consultation</option>
                      </motion.select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                        placeholder="Please describe your immigration goals and any specific questions you have..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </motion.div>

                    <p className="text-sm text-gray-500 text-center">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Map and Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              className="space-y-8"
            >
              {/* Enhanced Map */}
              <Card className="shadow-2xl relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mr-3"
                    >
                      <MapPin className="h-6 w-6 text-white" />
                    </motion.div>
                    Our Location
                  </CardTitle>
                  <p className="text-gray-600">820A 1/1 3rd Mile Post, Trincomalee</p>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated map placeholder */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                    />
                    <div className="text-center relative z-10">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-gray-700 font-medium">Interactive Map</p>
                      <p className="text-sm text-gray-500">820A 1/1 3rd Mile Post, Trincomalee</p>
                    </div>
                  </motion.div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Directions:</strong> Located on the main road, easily accessible by public transport and
                      private vehicle.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Landmarks:</strong> 3rd Mile Post junction, next to BOC (Bank of Ceylon).
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Office Features */}
              <Card className="shadow-2xl relative overflow-hidden">
                <CardHeader>
                  <CardTitle>Office Features</CardTitle>
                  <p className="text-gray-600">What to expect when you visit us</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {officeFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-3 group"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"
                        >
                          <feature.icon className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about contacting us</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will you respond to my inquiry?",
                answer:
                  "We respond to all inquiries within 2 hours during business hours (Monday-Friday, 9 AM-6 PM). For urgent matters, please call our 24/7 phone line.",
              },
              {
                question: "Is the initial consultation free?",
                answer:
                  "Yes, we offer a free 30-minute initial consultation to discuss your immigration goals and how we can help you achieve them.",
              },
              {
                question: "Do you offer virtual consultations?",
                answer:
                  "We offer video consultations via Zoom, Skype, or WhatsApp video call for clients who cannot visit our office in person.",
              },
              {
                question: "What documents should I bring for the consultation?",
                answer:
                  "Please bring your passport, educational certificates, work experience letters, language test results (if available), and any previous visa applications or refusals.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg group-hover:text-blue-700 transition-colors duration-300">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50 border-l-4 border-red-500 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full blur-xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Contact</h2>
            <p className="text-red-700 mb-6">
              For urgent visa matters or time-sensitive applications, contact us immediately:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="tel:+94728756296"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center group"
              >
                <Phone className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                +94 (72) 222-2084
              </motion.a>
              <motion.a
                href="mailto:saireeraaconsultancy@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center group"
              >
                <Mail className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Emergency Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
