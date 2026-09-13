"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import {
  Phone, Mail, MapPin, CheckCircle, Users, Globe, ArrowRight, Star,
  FileText, UserCheck, Briefcase, Heart, Shield, Plane, Award,
  TrendingUp, Clock, ChevronDown, ChevronUp, Sparkles, BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */
function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─────────────────────────────────────────────
   Particle Background (canvas)
───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      })
      // draw faint connector lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} id="particle-canvas" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }} />
}

/* ─────────────────────────────────────────────
   Scroll Progress Bar
───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      id="scroll-progress"
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 z-[9999]"
    />
  )
}

/* ─────────────────────────────────────────────
   WhatsApp FAB
───────────────────────────────────────────── */
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/94728756296?text=Hello%20Saireeyaa%20Consultancy%2C%20I%27d%20like%20to%20enquire%20about%20your%20visa%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.738 5.474 2.027 7.778L0 32l8.472-2.004A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm7.93 22.293c-.332.933-1.94 1.784-2.67 1.9-.68.107-1.538.152-2.482-.156-.572-.187-1.306-.436-2.24-.854-3.944-1.703-6.52-5.67-6.717-5.934-.197-.263-1.606-2.136-1.606-4.074 0-1.938 1.017-2.892 1.378-3.286.36-.394.787-.492 1.049-.492.263 0 .525.002.756.013.243.013.568-.092.888.677.332.789 1.128 2.727 1.228 2.924.1.197.165.427.033.687-.132.263-.197.427-.394.657-.197.23-.414.514-.591.69-.197.197-.402.41-.173.804.23.394.02.394 1.804 2.9 1.23 1.768 2.264 2.278 2.655 2.475.394.197.625.165.856-.099.23-.263.986-1.147 1.246-1.542.263-.394.525-.328.887-.197.36.132 2.29 1.08 2.684 1.277.394.197.657.296.756.46.099.165.099.953-.23 1.886z"/>
      </svg>
    </motion.a>
  )
}

/* ─────────────────────────────────────────────
   Section fade-in wrapper
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22,1,0.36,1] } }),
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function SaireeyaaConsultancy() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"])
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ""
    const name = get("name"); const email = get("email"); const phone = get("phone"); const message = get("message")
    if (!name || !email || !message) { alert("Please fill Name, Email and Message."); return }
    const fd = new FormData()
    fd.append("name", name); fd.append("email", email); fd.append("phone", phone)
    fd.append("message", message); fd.append("to", "saireeyaaconsultancy@gmail.com")
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    btn.disabled = true; btn.textContent = "Sending…"
    try {
      const res = await fetch("/api/send-email", { method: "POST", body: fd })
      const ok = res.headers.get("content-type")?.includes("application/json")
      const json = ok ? await res.json().catch(() => null) : null
      if (res.ok && json?.success) { alert(json.message ?? "Sent! We'll be in touch."); form.reset() }
      else alert(json?.message ?? `Error ${res.status}. Please try again.`)
    } catch { alert("Network error. Please check your connection.") }
    finally { btn.disabled = false; btn.textContent = "Send Message" }
  }

  const services = [
    { icon: FileText,   title: "Visa Application Assistance",          description: "End-to-end guidance on applications, documentation and submission for any visa category.", color: "from-blue-500 to-cyan-500" },
    { icon: CheckCircle,title: "Document Preparation & Verification",  description: "Professional preparation and thorough verification of every document your application needs.", color: "from-green-500 to-emerald-500" },
    { icon: UserCheck,  title: "Immigration Eligibility Assessment",   description: "Comprehensive evaluation of your profile against immigration pathways and eligibility criteria.", color: "from-purple-500 to-violet-500" },
    { icon: Users,      title: "Interview Coaching",                   description: "Mock sessions and coaching to build confidence and ace your visa interview.", color: "from-orange-500 to-amber-500" },
    { icon: Globe,      title: "Expedited Visa Processing",            description: "Fast-track services for urgent requirements — we know the shortcuts that work.", color: "from-red-500 to-rose-500" },
    { icon: Briefcase,  title: "Business Visa Consultancy",            description: "Specialist advice for investors, entrepreneurs, and corporate relocations.", color: "from-teal-500 to-cyan-600" },
    { icon: Heart,      title: "Pre & Post-Visa Assistance",           description: "Full-cycle support from pre-departure planning to post-arrival settlement guidance.", color: "from-pink-500 to-rose-400" },
    { icon: Shield,     title: "Legal & Regulatory Updates",           description: "Stay current with immigration law changes that may affect your status or application.", color: "from-indigo-500 to-blue-600" },
  ]

  const immigrationPrograms = [
    { name: "Express Entry Programs", flag: "🇨🇦" },
    { name: "Provincial Nominee Programs", flag: "🇨🇦" },
    { name: "Skilled Worker Programs", flag: "🌐" },
    { name: "Family Sponsorship", flag: "🌍" },
    { name: "Business Immigration", flag: "💼" },
    { name: "Student Visas", flag: "🎓" },
  ]

  const destinations = [
    { country: "Canada",      flag: "🇨🇦", count: "250+" },
    { country: "Australia",   flag: "🇦🇺", count: "180+" },
    { country: "UK",          flag: "🇬🇧", count: "160+" },
    { country: "Germany",     flag: "🇩🇪", count: "90+" },
    { country: "UAE",         flag: "🇦🇪", count: "200+" },
    { country: "New Zealand", flag: "🇳🇿", count: "70+" },
    { country: "USA",         flag: "🇺🇸", count: "120+" },
    { country: "France",      flag: "🇫🇷", count: "55+" },
  ]

  const testimonials = [
    { name: "Sharmila Thangeshwar", country: "Canada",    flag: "🇨🇦", text: "Saireeyaa Consultancy made my Canadian immigration dream come true. Professional, detailed, and genuinely caring about my success.", rating: 5 },
    { name: "Priyachenthan",        country: "Australia",  flag: "🇦🇺", text: "Unmatched expertise in visa processing. They handled everything professionally and kept me informed every step of the way.", rating: 5 },
    { name: "Priya Dharshan",       country: "UK",         flag: "🇬🇧", text: "Outstanding service! They made the complex UK visa process feel effortless. Highly recommended for any immigration need.", rating: 5 },
    { name: "Rajan Kumar",          country: "Germany",    flag: "🇩🇪", text: "I got my German work visa faster than I expected. The team knew exactly what was needed and delivered with zero stress.", rating: 5 },
    { name: "Meena Selvam",         country: "UAE",        flag: "🇦🇪", text: "Their 24/7 support is real! They answered my questions at midnight before my embassy appointment. Truly dedicated team.", rating: 5 },
  ]

  const stats = [
    { label: "Visas Approved",   value: 1500, suffix: "+", icon: BadgeCheck },
    { label: "Countries Served", value: 40,   suffix: "+", icon: Globe },
    { label: "Years Experience", value: 8,    suffix: "+", icon: Award },
    { label: "Success Rate",     value: 97,   suffix: "%", icon: TrendingUp },
  ]

  const process = [
    { step: "01", title: "Free Consultation",    desc: "Tell us your goal. We assess your eligibility and recommend the best visa pathway." },
    { step: "02", title: "Document Collection",  desc: "We provide a tailored checklist and guide you through gathering every required document." },
    { step: "03", title: "Application Filing",   desc: "Our experts prepare and submit your application with precision to maximise approval odds." },
    { step: "04", title: "Interview Prep",       desc: "Mock interviews and coaching so you walk into the embassy with complete confidence." },
    { step: "05", title: "Approval & Beyond",    desc: "We celebrate your approval and support your travel planning and post-arrival settlement." },
  ]

  const faqs = [
    { q: "How long does the visa application process take?",                     a: "Processing times range from 2–12 weeks depending on the country and visa type. We provide realistic timelines and offer expedited services when available." },
    { q: "What documents do I need for my visa application?",                    a: "Requirements vary by visa type and destination. We provide a comprehensive, personalised checklist and assist with preparation and verification of every document." },
    { q: "Do you handle visa renewals and extensions?",                          a: "Yes — we offer complete assistance for renewals, extensions and status changes, ensuring timely submission to avoid any gaps in your legal status." },
    { q: "What makes Saireeyaa Consultancy different?",                          a: "Our client-centred approach, transparent processes and genuine commitment to your success set us apart. We personalise every case — no generic templates." },
    { q: "Is there a consultation fee?",                                         a: "Your first consultation is completely free. We believe in transparency, so all fees are discussed upfront with zero hidden charges." },
    { q: "Can you help if my previous visa application was rejected?",           a: "Absolutely. We specialise in complex cases including prior refusals. We analyse the rejection reasons and build a stronger application strategy for you." },
  ]

  const trustBadges = ["ISO Certified Consultants", "24/7 Client Support", "No Hidden Fees", "97% Success Rate", "8+ Years Experience"]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          {/* animated mesh gradient */}
          <motion.div
            animate={{ backgroundPosition: ["0% 0%","100% 100%","0% 0%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse 80% 50% at 20% 40%, #3b82f680, transparent), radial-gradient(ellipse 60% 60% at 80% 70%, #8b5cf660, transparent)", backgroundSize: "200% 200%" }}
          />
          {/* travel bg image */}
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/travel-objects-table.avif')" }} />
        </motion.div>

        <ParticleCanvas />

        {/* floating orbs */}
        {[
          { size: 300, x: "10%", y: "20%", color: "from-blue-600/20 to-cyan-600/10",   dur: 12 },
          { size: 200, x: "75%", y: "15%", color: "from-purple-600/20 to-pink-600/10", dur: 16 },
          { size: 250, x: "60%", y: "65%", color: "from-yellow-500/15 to-orange-500/10",dur: 10 },
          { size: 160, x: "15%", y: "70%", color: "from-teal-500/15 to-green-500/10",  dur: 14 },
        ].map((orb, i) => (
          <motion.div key={i}
            animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            className={`absolute rounded-full blur-3xl bg-gradient-to-br ${orb.color} pointer-events-none`}
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, zIndex: 2 }}
          />
        ))}

        {/* hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20">
          <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6 }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/40 px-4 py-2 rounded-full text-yellow-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Sri Lanka's Most Trusted Visa Consultancy
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight"
          >
            Your Trusted Partner for<br />
            <span className="gradient-text">Visa & Flight Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.25 }}
            className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed text-gray-300"
          >
            SAI REEYAA Consultancy — expert guidance for visa applications, flight bookings and international immigration. Turning your global dreams into reality since 2016.
          </motion.p>

          {/* destination flags marquee */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5, duration:0.8 }}
            className="flex justify-center gap-3 flex-wrap mb-10"
          >
            {destinations.map((d,i) => (
              <motion.span key={i} className="flag-pill"
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.5 + i*0.07 }}
              >
                {d.flag} {d.country}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6, duration:0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/services">
              <Button size="lg" className="btn-shine bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 text-lg rounded-xl shadow-lg shadow-yellow-500/30">
                Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/94728756296" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <Phone className="mr-2 h-5 w-5 text-green-400" /> WhatsApp Us
              </Button>
            </a>
          </motion.div>

          {/* trust badges */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85, duration:0.8 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustBadges.map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-700/40 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3" /> {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/travel-objects-table.avif')] bg-cover bg-center opacity-5" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
                className="text-center group"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors duration-300">
                    <s.icon className="w-7 h-7 text-yellow-400" />
                  </div>
                </div>
                <div className="stat-number"><Counter to={s.value} suffix={s.suffix} /></div>
                <p className="text-gray-400 text-sm mt-2 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS MARQUEE ── */}
      <section className="py-8 bg-slate-800 overflow-hidden border-y border-white/5">
        <div className="flex">
          <div className="marquee-track flex gap-12 whitespace-nowrap">
            {[...destinations, ...destinations].map((d, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-gray-300 text-sm font-medium">
                <span className="text-2xl">{d.flag}</span>
                {d.country}
                <span className="text-yellow-400 font-bold">{d.count} clients</span>
                <span className="text-gray-600 ml-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">Our Comprehensive Services</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">From first enquiry to final approval — we handle every step of your immigration journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
                <div className="service-card group h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 cursor-default">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <svc.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Immigration programs */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Immigration Programs We Handle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {immigrationPrograms.map((prog, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                >
                  <span className="text-2xl">{prog.flag}</span>
                  <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{prog.name}</span>
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f640, transparent 60%), radial-gradient(circle at 80% 50%, #8b5cf640, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="text-center mb-16">
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Five clear steps from first consultation to approved visa.</p>
          </motion.div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-blue-500 to-purple-500 opacity-40 hidden md:block" />
            <div className="space-y-10">
              {process.map((step, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {step.step}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6 flex-1 group-hover:border-yellow-400/40 transition-colors duration-300">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Client Stories</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">Real people. Real results. Real stories of dreams fulfilled.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
                className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-yellow-200 transition-all duration-400 relative overflow-hidden"
              >
                {/* quote mark */}
                <div className="absolute top-4 right-5 text-7xl text-gray-100 font-serif leading-none select-none group-hover:text-yellow-100 transition-colors">"</div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({length: t.rating}).map((_,j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.flag} {t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLIGHT TICKETS BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <Plane className="w-12 h-12 text-black/70 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">Flight Tickets at the Best Prices</h2>
            <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
              We don't just get you a visa — we book your flight too. One-stop solution for your entire travel journey.
            </p>
            <a href="https://wa.me/94728756296?text=Hi%2C%20I%27d%20like%20to%20book%20a%20flight%20ticket" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-black text-white hover:bg-gray-900 font-bold px-10 py-4 text-lg rounded-xl shadow-xl">
                Book Flight via WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── VISA QUIZ CTA ── */}
      <section className="py-16 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #818cf8, transparent 50%), radial-gradient(circle at 80% 50%, #f59e0b, transparent 50%)" }} />
        {[...Array(12)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -60, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3 + i % 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{ left: `${8 + i * 8}%`, bottom: "15%" }}
          />
        ))}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 px-4 py-2 rounded-full text-yellow-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Free · 2 minutes · Instant result
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Not Sure Which Visa is Right for You?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Take our free 7-question quiz and get a personalised visa pathway recommendation — complete with a document checklist and expert tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/visa-quiz">
                <Button size="lg" className="btn-shine bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 text-lg rounded-xl shadow-lg shadow-yellow-500/30">
                  Take the Free Quiz <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex justify-center gap-6 flex-wrap">
              {["1,500+ quizzes taken", "97% found it helpful", "40+ countries covered"].map((t, i) => (
                <span key={i} className="text-gray-400 text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #3b82f640, transparent 50%), radial-gradient(circle at 70% 70%, #8b5cf640, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="text-center mb-16">
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Start Your Journey Today</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Ready to achieve your global aspirations? Reach out — your first consultation is free.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="space-y-8">
              {[
                { icon: Phone, label: "Phone (24/7 Support)", lines: ["+94 (72) 875-6296", "+94 (75) 392-9723", "+94 (72) 673-7729"] },
                { icon: Mail,  label: "Email", lines: ["saireeraaconsultancy@gmail.com"] },
                { icon: MapPin,label: "Office", lines: ["820A 1/1 3rd Mile Post, Trincomalee, Sri Lanka"] },
                { icon: Clock, label: "Working Hours", lines: ["Monday – Saturday: 8:00 AM – 8:00 PM", "Sunday: 9:00 AM – 5:00 PM"] },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                    <item.icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{item.label}</p>
                    {item.lines.map((ln, j) => <p key={j} className="text-gray-300 text-sm">{ln}</p>)}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/94728756296" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500/20 border border-green-500/40 rounded-2xl p-5 hover:bg-green-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white"><path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.738 5.474 2.027 7.778L0 32l8.472-2.004A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm7.93 22.293c-.332.933-1.94 1.784-2.67 1.9-.68.107-1.538.152-2.482-.156-.572-.187-1.306-.436-2.24-.854-3.944-1.703-6.52-5.67-6.717-5.934-.197-.263-1.606-2.136-1.606-4.074 0-1.938 1.017-2.892 1.378-3.286.36-.394.787-.492 1.049-.492.263 0 .525.002.756.013.243.013.568-.092.888.677.332.789 1.128 2.727 1.228 2.924.1.197.165.427.033.687-.132.263-.197.427-.394.657-.197.23-.414.514-.591.69-.197.197-.402.41-.173.804.23.394.02.394 1.804 2.9 1.23 1.768 2.264 2.278 2.655 2.475.394.197.625.165.856-.099.23-.263.986-1.147 1.246-1.542.263-.394.525-.328.887-.197.36.132 2.29 1.08 2.684 1.277.394.197.657.296.756.46.099.165.099.953-.23 1.886z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-green-300 group-hover:text-green-200">Chat on WhatsApp</p>
                  <p className="text-gray-400 text-sm">Instant replies · 24/7 support</p>
                </div>
                <ArrowRight className="w-5 h-5 text-green-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {[
                    { name:"name",    type:"text",  placeholder:"Your Full Name *" },
                    { name:"email",   type:"email", placeholder:"Your Email *" },
                    { name:"phone",   type:"tel",   placeholder:"Your Phone Number" },
                  ].map(f => (
                    <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    />
                  ))}
                  <select name="service"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  >
                    <option value="" className="text-gray-900">Select a Service</option>
                    {services.map(s => <option key={s.title} value={s.title} className="text-gray-900">{s.title}</option>)}
                  </select>
                  <textarea name="message" rows={4} placeholder="Tell us about your visa requirements *"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                  />
                  <button type="submit"
                    className="btn-shine w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-yellow-500/30"
                  >
                    Send Message
                  </button>
                  <p className="text-center text-gray-400 text-xs">We respond within 2 hours · Free consultation</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
