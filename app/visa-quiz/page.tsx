"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, ArrowLeft, CheckCircle, Globe, Plane, Users,
  Briefcase, GraduationCap, Heart, RefreshCw, Phone, MessageCircle,
  Star, Clock, FileText, Shield, Sparkles, ChevronRight,
} from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

/* ─── Types ─── */
interface Answer { questionId: string; value: string; label: string }
interface Result {
  pathway: string
  flag: string
  summary: string
  processingTime: string
  successRate: string
  difficulty: "Easy" | "Moderate" | "Complex"
  steps: string[]
  documents: string[]
  tips: string[]
  cta: string
  color: string
  aiNote?: string
}

/* ─── Questions ─── */
const questions = [
  {
    id: "purpose",
    question: "What is the main purpose of your travel?",
    subtitle: "Select the option that best describes your goal.",
    icon: Globe,
    options: [
      { value: "work",     label: "Work / Employment",   icon: "💼", desc: "Job offer or skilled migration" },
      { value: "study",    label: "Study / Education",   icon: "🎓", desc: "University, college or school" },
      { value: "family",   label: "Join Family",         icon: "❤️", desc: "Spouse, parent or child abroad" },
      { value: "business", label: "Business / Investment",icon: "📊", desc: "Start or expand a business" },
      { value: "tourist",  label: "Tourism / Visit",     icon: "✈️", desc: "Holiday or short-term visit" },
      { value: "pr",       label: "Permanent Residency", icon: "🏡", desc: "Settle permanently abroad" },
    ],
  },
  {
    id: "destination",
    question: "Which country are you applying to?",
    subtitle: "We'll tailor your pathway to that country's requirements.",
    icon: Plane,
    options: [
      { value: "canada",      label: "Canada",      icon: "🇨🇦", desc: "Express Entry, PNP & more" },
      { value: "australia",   label: "Australia",   icon: "🇦🇺", desc: "Skilled & family visas" },
      { value: "uk",          label: "United Kingdom", icon: "🇬🇧", desc: "Skilled Worker & family" },
      { value: "germany",     label: "Germany",     icon: "🇩🇪", desc: "Job Seeker & EU Blue Card" },
      { value: "uae",         label: "UAE",         icon: "🇦🇪", desc: "Employment & investor visas" },
      { value: "other",       label: "Other Country", icon: "🌍", desc: "USA, NZ, France & more" },
    ],
  },
  {
    id: "education",
    question: "What is your highest level of education?",
    subtitle: "Education level affects your eligibility for many pathways.",
    icon: GraduationCap,
    options: [
      { value: "phd",       label: "PhD / Doctorate",     icon: "🎓", desc: "Doctoral degree" },
      { value: "masters",   label: "Master's Degree",     icon: "📚", desc: "Postgraduate qualification" },
      { value: "bachelors", label: "Bachelor's Degree",   icon: "🎒", desc: "Undergraduate degree" },
      { value: "diploma",   label: "Diploma / Certificate",icon: "📜", desc: "Trade or technical qualification" },
      { value: "highschool",label: "High School",          icon: "🏫", desc: "Secondary education" },
      { value: "none",      label: "No Formal Qualification",icon: "📝", desc: "Self-taught or informal" },
    ],
  },
  {
    id: "experience",
    question: "How many years of work experience do you have?",
    subtitle: "In your primary field or profession.",
    icon: Briefcase,
    options: [
      { value: "0",    label: "No experience",  icon: "🌱", desc: "Student or first job seeker" },
      { value: "1-2",  label: "1 – 2 years",    icon: "📈", desc: "Early career" },
      { value: "3-5",  label: "3 – 5 years",    icon: "💪", desc: "Mid-level professional" },
      { value: "6-10", label: "6 – 10 years",   icon: "⭐", desc: "Experienced professional" },
      { value: "10+",  label: "10+ years",       icon: "🏆", desc: "Senior / specialist level" },
    ],
  },
  {
    id: "language",
    question: "What is your English language proficiency?",
    subtitle: "Based on IELTS, TOEFL, or general self-assessment.",
    icon: Users,
    options: [
      { value: "native",    label: "Native / Fluent",      icon: "🗣️", desc: "Mother tongue or equivalent" },
      { value: "advanced",  label: "Advanced (IELTS 7+)",  icon: "✅", desc: "Strong communication skills" },
      { value: "upper-int", label: "Upper Intermediate",   icon: "👍", desc: "IELTS 6 – 6.5 range" },
      { value: "basic",     label: "Basic",                icon: "📖", desc: "Everyday conversation only" },
      { value: "none",      label: "Very Limited",         icon: "🔤", desc: "Minimal English" },
    ],
  },
  {
    id: "finances",
    question: "What best describes your financial situation?",
    subtitle: "Many visas require proof of sufficient funds.",
    icon: Shield,
    options: [
      { value: "strong",   label: "Strong (USD 50k+)",    icon: "💰", desc: "Significant savings or assets" },
      { value: "moderate", label: "Moderate (USD 10–50k)",icon: "💵", desc: "Good savings available" },
      { value: "limited",  label: "Limited (< USD 10k)",  icon: "💳", desc: "Some savings, need support" },
      { value: "sponsored",label: "Employer Sponsored",   icon: "🤝", desc: "Company or family will sponsor" },
    ],
  },
  {
    id: "timeline",
    question: "When are you hoping to travel or migrate?",
    subtitle: "This helps us prioritise your pathway options.",
    icon: Clock,
    options: [
      { value: "asap",    label: "As soon as possible",  icon: "⚡", desc: "Within 1 – 3 months" },
      { value: "6months", label: "Within 6 months",      icon: "📅", desc: "Planning ahead" },
      { value: "1year",   label: "Within 1 year",        icon: "🗓️", desc: "Longer preparation time" },
      { value: "2years",  label: "1 – 2 years",          icon: "🎯", desc: "No rush, doing it right" },
      { value: "unsure",  label: "Not sure yet",         icon: "🤔", desc: "Just exploring options" },
    ],
  },
]

/* ─── Recommendation engine ─── */
function getRecommendation(answers: Answer[]): Result {
  const get = (id: string) => answers.find(a => a.questionId === id)?.value ?? ""
  const purpose  = get("purpose")
  const dest     = get("destination")
  const edu      = get("education")
  const exp      = get("experience")
  const lang     = get("language")
  const finances = get("finances")
  const timeline = get("timeline")

  const strongLang  = ["native", "advanced"].includes(lang)
  const goodEdu     = ["phd", "masters", "bachelors"].includes(edu)
  const experienced = ["6-10", "10+"].includes(exp)
  const funded      = ["strong", "moderate", "sponsored"].includes(finances)
  const urgent      = timeline === "asap"

  /* Canada */
  if (dest === "canada") {
    if (purpose === "work" || purpose === "pr") {
      if (goodEdu && experienced && strongLang)
        return {
          pathway: "Canada Express Entry – CRS Score 67+",
          flag: "🇨🇦", color: "from-red-600 to-red-700",
          summary: "You are an excellent candidate for Canada's Express Entry system. Your education, experience and language profile puts you in the competitive CRS score range for the Federal Skilled Worker Program.",
          processingTime: "6 – 8 months", successRate: "94%", difficulty: "Moderate",
          steps: ["Calculate your CRS score","Create an Express Entry profile","Receive Invitation to Apply (ITA)","Submit full application within 60 days","Medical exam & biometrics","Receive PR confirmation"],
          documents: ["Valid passport","IELTS/CELPIP results (CLB 7+)","Educational Credential Assessment (ECA)","Employment reference letters","Proof of funds (CAD 13,000+)","Police clearance certificate"],
          tips: ["Improve CRS score with a Provincial Nominee Program (PNP) nomination (+600 points)","Get an LMIA-backed job offer for extra points","Take IELTS again to reach Band 8+ for maximum language points"],
          cta: "Book a Free Express Entry Assessment",
          aiNote: "Based on your profile, you may qualify for draws happening every 2 weeks. We recommend starting your ECA and IELTS preparation immediately.",
        }
      if (purpose === "work")
        return {
          pathway: "Canada Provincial Nominee Program (PNP)",
          flag: "🇨🇦", color: "from-red-500 to-rose-600",
          summary: "The Provincial Nominee Program is ideal for your profile. Several provinces like Ontario, BC and Alberta have streams with lower CRS requirements, giving you a strong alternative pathway to PR.",
          processingTime: "12 – 18 months", successRate: "89%", difficulty: "Moderate",
          steps: ["Identify the best province for your occupation","Apply to provincial stream","Receive provincial nomination (+600 CRS points)","Submit Express Entry profile","Receive ITA and apply for PR","Medical & biometrics"],
          documents: ["Passport","Work experience letters","Education credentials (ECA)","Language test results","Job offer (if applicable)","Proof of funds"],
          tips: ["Research province-specific occupation lists","Ontario Tech Draw and BC Skills Immigration are popular","A job offer in the province significantly boosts your chances"],
          cta: "Find Your Best Province Match",
          aiNote: "Your experience level is well-suited for PNP streams targeted at mid-skilled workers. We'll identify which province has a current draw matching your occupation.",
        }
    }
    if (purpose === "study")
      return {
        pathway: "Canada Student Visa (Study Permit)",
        flag: "🇨🇦", color: "from-blue-600 to-indigo-600",
        summary: "Canada is one of the most welcoming countries for international students, and a Study Permit opens a clear pathway to Post-Graduate Work Permit (PGWP) and eventually Permanent Residency.",
        processingTime: "4 – 8 weeks", successRate: "91%", difficulty: "Easy",
        steps: ["Choose a Designated Learning Institution (DLI)","Receive Letter of Acceptance","Apply for Study Permit online","Biometrics appointment","Receive Study Permit","Arrive in Canada"],
        documents: ["Passport","Letter of Acceptance from DLI","Proof of funds (CAD 10,000+/year)","Language test results","Statement of Purpose","Academic transcripts"],
        tips: ["Apply early — at least 3 months before your intake","Choose a DLI on the eligible institutions list","Plan for PGWP after graduation to stay and work"],
        cta: "Get Your Study Visa Checklist",
        aiNote: "Students who graduate from Canadian institutions gain access to PGWP of up to 3 years, which is a direct pathway to Express Entry. This is a smart long-term strategy.",
      }
    if (purpose === "family")
      return {
        pathway: "Canada Family Sponsorship",
        flag: "🇨🇦", color: "from-pink-500 to-rose-500",
        summary: "If your spouse, parent or child is a Canadian PR or citizen, you can be sponsored to join them. Canada has one of the most generous family reunification programs in the world.",
        processingTime: "12 – 24 months", successRate: "92%", difficulty: "Moderate",
        steps: ["Sponsor submits sponsorship application","IRCC assesses sponsor eligibility","Applicant submits permanent residence application","Medical exam & biometrics","Background check","Receive PR visa"],
        documents: ["Sponsor's PR card or citizenship proof","Marriage/birth certificates (notarised)","Proof of relationship (photos, communication records)","Medical exam results","Police clearance","Passport photographs"],
        tips: ["Spousal sponsorship is currently prioritised by IRCC","Keep communication records (WhatsApp, emails, photos)","Hire a consultant — minor errors cause long delays"],
        cta: "Start Your Sponsorship Assessment",
        aiNote: "IRCC has been reducing spousal sponsorship processing times. Inland sponsorship (if your spouse is in Canada) can be faster than outland.",
      }
  }

  /* Australia */
  if (dest === "australia") {
    if (purpose === "work" || purpose === "pr")
      return {
        pathway: "Australia Skilled Independent Visa (Subclass 189)",
        flag: "🇦🇺", color: "from-blue-700 to-cyan-600",
        summary: "Australia's points-based skilled migration system suits your profile well. The Subclass 189 requires no employer or state sponsorship and grants permanent residency directly.",
        processingTime: "6 – 12 months", successRate: "88%", difficulty: "Moderate",
        steps: ["Skills assessment by relevant authority","Submit Expression of Interest (EOI) via SkillSelect","Receive invitation to apply","Lodge full visa application","Health & character checks","Receive permanent residency visa"],
        documents: ["Passport","Skills assessment result","IELTS result (minimum 6 per band)","Employment reference letters","Academic qualifications","Health insurance policy"],
        tips: ["Aim for 65+ points on the points test — higher scores get invited faster","State nomination (Subclass 190) adds 5 points — consider this if your score is borderline","Healthcare and teaching are currently high-demand occupations"],
        cta: "Calculate Your Australian Points Score",
        aiNote: "The current points test invitations are going to profiles with 85–90+ points. We'll assess your exact score and recommend whether state nomination would benefit you.",
      }
    if (purpose === "study")
      return {
        pathway: "Australia Student Visa (Subclass 500)",
        flag: "🇦🇺", color: "from-green-600 to-teal-600",
        summary: "Australia's Student Visa allows you to study at any registered provider and work up to 48 hours per fortnight. It also opens a post-study work pathway to stay and gain experience.",
        processingTime: "4 – 6 weeks", successRate: "93%", difficulty: "Easy",
        steps: ["Apply to Australian university/college","Receive Confirmation of Enrolment (CoE)","Create ImmiAccount and lodge application","Health exam (if required)","Biometrics","Receive student visa"],
        documents: ["CoE from registered provider","Genuine Temporary Entrant (GTE) statement","Proof of funds (AUD 21,041+/year)","IELTS/PTE results","Academic transcripts","Overseas Student Health Cover (OSHC)"],
        tips: ["Write a strong GTE statement — this is the most common rejection reason","Apply at least 6 weeks before course start date","Course in STEM or healthcare? Excellent post-study work rights await"],
        cta: "Get Your Student Visa Checklist",
        aiNote: "Students who study in regional Australia gain extra points for skilled migration after graduation. This can be a strategic way to boost your PR pathway.",
      }
  }

  /* UK */
  if (dest === "uk") {
    if (purpose === "work" || purpose === "pr")
      return {
        pathway: "UK Skilled Worker Visa",
        flag: "🇬🇧", color: "from-indigo-600 to-blue-700",
        summary: "The UK Skilled Worker Visa replaced Tier 2 and is now the primary route for skilled professionals. You need a job offer from a licensed UK employer — once secured, approval rates are very high.",
        processingTime: "3 – 8 weeks", successRate: "91%", difficulty: "Moderate",
        steps: ["Find a UK employer with a Sponsor Licence","Receive Certificate of Sponsorship (CoS)","Score 70 points (job offer + salary + English)","Apply online and pay Immigration Health Surcharge","Biometrics appointment","Receive visa decision"],
        documents: ["Valid passport","Certificate of Sponsorship (CoS)","Proof of English (IELTS B1+)","Tuberculosis test (if required)","Proof of maintenance funds (GBP 1,270)","Criminal record certificate"],
        tips: ["Use the UK's Shortage Occupation List — these jobs need fewer points","Salary threshold is currently GBP 38,700 (check for exemptions)","Healthcare workers have a separate, faster NHS pathway"],
        cta: "Check If Your Job Is on the Shortage List",
        aiNote: "The UK recently removed the 20% salary discount for shortage occupations, but the list itself still makes visa approval much smoother. We'll check if your role qualifies.",
      }
    if (purpose === "study")
      return {
        pathway: "UK Student Visa",
        flag: "🇬🇧", color: "from-purple-600 to-indigo-600",
        summary: "The UK Student Visa lets you study at any UK university and work 20 hours per week during term time. A Graduate Visa after completion lets you stay 2 years to find skilled work.",
        processingTime: "3 – 6 weeks", successRate: "89%", difficulty: "Easy",
        steps: ["Receive CAS from UK university","Demonstrate English proficiency (IELTS 5.5+)","Apply online with supporting documents","Biometrics appointment","Receive visa (usually in 3 weeks)","Travel to UK"],
        documents: ["Confirmation of Acceptance for Studies (CAS)","IELTS/UKVI results","Proof of funds (GBP 1,334/month in London)","Parental consent (if under 18)","Tuberculosis test result","Valid passport"],
        tips: ["Apply from outside UK for faster processing","Russell Group universities have strong Graduate Visa alumni networks","Check if your course qualifies for the longer 3-year Graduate Visa"],
        cta: "Get Your UK Student Visa Checklist",
        aiNote: "The UK Graduate Visa (2 years post-study) is one of the best in the world for Sri Lankan students. Many then convert to Skilled Worker visas once employed.",
      }
  }

  /* Germany */
  if (dest === "germany") {
    return {
      pathway: "Germany Job Seeker Visa",
      flag: "🇩🇪", color: "from-yellow-500 to-orange-500",
      summary: "Germany's Job Seeker Visa lets qualified professionals enter Germany for up to 6 months to find a job. Once employed, you convert to a work permit — no job offer needed upfront.",
      processingTime: "4 – 12 weeks", successRate: "82%", difficulty: "Moderate",
      steps: ["Get your qualifications recognised by German authority","Apply for Job Seeker Visa at German embassy","Travel to Germany","Attend job interviews","Sign employment contract","Convert to EU Blue Card or work permit"],
      documents: ["Degree certificates (German recognition proof)","German or English language proof","CV tailored to German standards","Proof of funds (EUR 1,027/month)","Health insurance","Accommodation proof in Germany"],
      tips: ["Germany recognises STEM, medical, and IT skills readily","Learning basic German (A1) significantly increases your job prospects","EU Blue Card requires EUR 58,400+ salary and offers fast-track PR"],
      cta: "Start Your German Recognition Process",
      aiNote: "Germany passed its Skilled Immigration Act in 2023, making it significantly easier for non-EU professionals. Your background may qualify you for immediate entry under the new rules.",
    }
  }

  /* UAE */
  if (dest === "uae") {
    if (purpose === "work" || purpose === "business")
      return {
        pathway: "UAE Employment / Golden Visa",
        flag: "🇦🇪", color: "from-amber-500 to-yellow-600",
        summary: experienced && goodEdu
          ? "Your experience and education profile makes you a strong candidate for the UAE Golden Visa — a 10-year renewable residency for skilled professionals, investors and exceptional talents."
          : "The UAE Employment Visa is the most common pathway and is processed by your employer within 2–4 weeks of receiving a job offer.",
        processingTime: experienced && goodEdu ? "4 – 8 weeks" : "2 – 4 weeks",
        successRate: "96%", difficulty: "Easy",
        steps: experienced && goodEdu
          ? ["Nominate yourself or be nominated via ICP portal","Submit qualifications and achievement proof","Receive 10-year Golden Visa","Sponsor family members","Enjoy full residency rights"]
          : ["Receive job offer from UAE employer","Employer submits entry permit","Medical fitness test","Emirates ID registration","Receive residence visa stamp"],
        documents: ["Valid passport (6+ months validity)","Educational certificates (attested)","Medical fitness certificate","Passport-size photographs","Employment contract","Health insurance"],
        tips: experienced && goodEdu
          ? ["Golden Visa holders can stay outside UAE for extended periods without losing residency","Dubai's freelancer Golden Visa is available for creative professionals","Investors need AED 2 million+ in property or business"]
          : ["Have your certificates attested by Sri Lankan Ministry of Foreign Affairs","Dubai and Abu Dhabi are most active for job seekers","UAE has no income tax — compare net salary carefully"],
        cta: experienced && goodEdu ? "Apply for UAE Golden Visa" : "Get UAE Employment Visa Guidance",
        aiNote: "The UAE Golden Visa category for 'outstanding graduates' from top 500 universities is often overlooked. We'll assess if your institution qualifies.",
      }
  }

  /* Tourist / generic fallback */
  if (purpose === "tourist")
    return {
      pathway: "Tourist / Visitor Visa",
      flag: dest === "canada" ? "🇨🇦" : dest === "australia" ? "🇦🇺" : dest === "uk" ? "🇬🇧" : "✈️",
      color: "from-sky-500 to-blue-600",
      summary: "A tourist or visitor visa is straightforward for a short-term visit. Approval depends heavily on demonstrating strong ties to Sri Lanka (job, property, family) and sufficient funds.",
      processingTime: "2 – 6 weeks", successRate: "85%", difficulty: "Easy",
      steps: ["Complete visa application form","Gather supporting documents","Book embassy appointment","Attend interview (if required)","Await decision","Receive visa and travel"],
      documents: ["Valid passport","Bank statements (3–6 months)","Employment letter or business proof","Itinerary and accommodation booking","Return flight booking","Travel insurance"],
      tips: ["Strong bank statements are the most important factor","Show clear ties to Sri Lanka — job, family, property","Don't overstate your travel purpose — be clear it's tourism"],
      cta: "Get Your Tourist Visa Checklist",
      aiNote: "Tourist visas often have lower approval rates for first-time travellers. We recommend a consultation to strengthen your application before submission.",
    }

  /* Generic skilled worker fallback */
  return {
    pathway: "Skilled Worker / Professional Visa",
    flag: "🌍", color: "from-blue-600 to-purple-600",
    summary: "Based on your profile, a skilled worker or professional visa is your most likely pathway. Your education and experience are strong assets. Our consultants will identify the exact visa stream for your destination.",
    processingTime: "4 – 16 weeks", successRate: "88%", difficulty: "Moderate",
    steps: ["Free consultation to identify exact visa stream","Skills and qualification assessment","Document preparation","Application submission","Await decision","Receive visa"],
    documents: ["Valid passport","Educational qualifications (attested)","Employment reference letters","Language test results","Proof of funds","Medical and police clearance"],
    tips: ["Every country has multiple visa streams — we'll find the one with the highest approval rate for your profile","Start gathering documents now — attestation can take weeks","Language test scores are often the biggest differentiator"],
    cta: "Book Your Free Consultation",
    aiNote: "We've helped hundreds of Sri Lankan professionals with similar profiles. A 30-minute consultation will give you a clear, personalised roadmap.",
  }
}

/* ─── Difficulty badge ─── */
function DifficultyBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Easy: "bg-green-100 text-green-700 border-green-200",
    Moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Complex: "bg-red-100 text-red-700 border-red-200",
  }
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${map[level] ?? map.Moderate}`}>
      {level}
    </span>
  )
}

/* ─── Main component ─── */
export default function VisaQuiz() {
  const [step, setStep]         = useState<"intro" | "quiz" | "loading" | "result">("intro")
  const [current, setCurrent]   = useState(0)
  const [answers, setAnswers]   = useState<Answer[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult]     = useState<Result | null>(null)
  const [progress, setProgress] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step === "quiz") setProgress(((current) / questions.length) * 100)
  }, [current, step])

  useEffect(() => {
    if (step === "result" && resultRef.current) {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
    }
  }, [step])

  const handleSelect = (value: string, label: string) => setSelected(value === selected ? null : value)

  const handleNext = () => {
    if (!selected) return
    const q = questions[current]
    const optLabel = q.options.find(o => o.value === selected)?.label ?? selected
    const newAnswers = [...answers.filter(a => a.questionId !== q.id), { questionId: q.id, value: selected, label: optLabel }]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setSelected(null)
      setCurrent(c => c + 1)
    } else {
      setStep("loading")
      setProgress(100)
      setTimeout(() => {
        setResult(getRecommendation(newAnswers))
        setStep("result")
      }, 2200)
    }
  }

  const handleBack = () => {
    if (current === 0) { setStep("intro"); setAnswers([]); setSelected(null); return }
    setCurrent(c => c - 1)
    setSelected(answers.find(a => a.questionId === questions[current - 1].id)?.value ?? null)
  }

  const restart = () => {
    setStep("intro"); setCurrent(0); setAnswers([]); setSelected(null); setResult(null); setProgress(0)
  }

  const q = questions[current]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, #3b82f6, transparent)" }} />
        {[...Array(20)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4 + i % 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: `${5 + i * 5}%`, bottom: "10%" }}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/40 px-4 py-2 rounded-full text-yellow-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Free · Takes 2 minutes · Instant results
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Visa Eligibility Quiz
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Answer 7 quick questions and get a personalised visa pathway recommendation — plus a document checklist and expert tips.
          </motion.p>
        </div>
      </section>

      {/* ── PROGRESS BAR (during quiz) ── */}
      {step === "quiz" && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">Question {current + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">

          {/* ── INTRO ── */}
          {step === "intro" && (
            <motion.div key="intro"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Find Your Perfect Visa Pathway</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Our smart quiz analyses your profile across 7 key factors and recommends the visa pathway with the highest chance of approval.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { icon: Clock, label: "2 minutes", sub: "to complete" },
                    { icon: CheckCircle, label: "7 questions", sub: "about your profile" },
                    { icon: Star, label: "Instant result", sub: "with document checklist" },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <item.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="font-bold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                  ))}
                </div>

                <motion.button onClick={() => setStep("quiz")}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-shadow"
                >
                  Start the Quiz <ArrowRight className="inline ml-2 w-5 h-5" />
                </motion.button>
                <p className="text-xs text-gray-400 mt-4">No signup required. 100% free.</p>
              </div>

              {/* Social proof */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { n: "1,500+", l: "quizzes taken" },
                  { n: "97%", l: "found it helpful" },
                  { n: "40+", l: "countries covered" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-2xl font-extrabold text-blue-600">{s.n}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── QUIZ ── */}
          {step === "quiz" && (
            <motion.div key={`q-${current}`}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <q.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Question {current + 1}</p>
                    <p className="text-xs text-gray-400">{q.subtitle}</p>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">{q.question}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.value
                    return (
                      <motion.button key={opt.value}
                        onClick={() => handleSelect(opt.value, opt.label)}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white hover:shadow-sm"
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{opt.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{opt.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                          isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}>
                          {isSelected && <CheckCircle className="w-5 h-5 text-white -m-0.5" />}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <motion.button onClick={handleNext} disabled={!selected}
                    whileHover={selected ? { scale: 1.03 } : {}} whileTap={selected ? { scale: 0.97 } : {}}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                      selected
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {current === questions.length - 1 ? "Get My Result" : "Next"} <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Answer trail */}
              {answers.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {answers.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3 text-green-500" /> {a.label}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {step === "loading" && (
            <motion.div key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"
                />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full border-4 border-transparent border-t-yellow-400"
                />
                <Globe className="absolute inset-0 m-auto w-8 h-8 text-blue-500" />
              </div>
              <motion.h2 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                Analysing your profile…
              </motion.h2>
              <p className="text-gray-500">Matching your answers against 40+ visa pathways</p>
              <div className="mt-8 flex justify-center gap-2">
                {["Checking eligibility", "Calculating success rate", "Preparing recommendations"].map((t, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.7 }}
                    className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {step === "result" && result && (
            <motion.div key="result" ref={resultRef}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero result card */}
              <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden`}>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-16 translate-x-16"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <p className="text-white/70 text-sm font-medium mb-1">Your recommended pathway</p>
                      <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{result.flag} {result.pathway}</h2>
                    </div>
                    <DifficultyBadge level={result.difficulty} />
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6 max-w-2xl">{result.summary}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/15 rounded-2xl p-4">
                      <p className="text-white/60 text-xs mb-1">Processing time</p>
                      <p className="font-bold text-lg">{result.processingTime}</p>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-4">
                      <p className="text-white/60 text-xs mb-1">Success rate</p>
                      <p className="font-bold text-lg text-green-300">{result.successRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Note */}
              {result.aiNote && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex gap-3"
                >
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">Expert insight</p>
                    <p className="text-blue-800 text-sm leading-relaxed">{result.aiNote}</p>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Steps */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" /> Application Steps
                  </h3>
                  <ol className="space-y-3">
                    {result.steps.map((step, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-gray-600 leading-relaxed">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" /> Documents Needed
                  </h3>
                  <ul className="space-y-2.5">
                    {result.documents.map((doc, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
                        className="flex items-start gap-2.5 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {doc}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" /> Expert Tips for Your Application
                </h3>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-amber-800"
                    >
                      <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Your answers summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Profile Summary</h3>
                <div className="flex flex-wrap gap-2">
                  {answers.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-blue-500" /> {a.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA block */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white text-center">
                <h3 className="text-2xl font-extrabold mb-3">Ready to Start Your Application?</h3>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Our expert consultants will verify your eligibility, prepare your documents and submit your application — with a 97% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/94728756296?text=Hi%2C%20I%20just%20completed%20the%20visa%20eligibility%20quiz%20and%20I%27d%20like%20to%20book%20a%20free%20consultation."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 rounded-2xl font-bold text-white transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
                  </a>
                  <Link href="/contact"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" /> Book a Free Call
                  </Link>
                </div>
                <button onClick={restart}
                  className="mt-6 flex items-center gap-2 mx-auto text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Retake the quiz
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
