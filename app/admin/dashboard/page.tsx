'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MessageSquare, Award, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  messages: number
  testimonials: number
  successStories: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    messages: 0,
    testimonials: 0,
    successStories: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch messages to verify auth
        const response = await fetch('/api/admin/messages', { credentials: 'include' })
        if (!response.ok) {
          router.push('/admin/login')
          return
        }

        // Fetch stats
        const messagesRes = await fetch('/api/admin/messages', { credentials: 'include' })
        const testimonialsRes = await fetch('/api/admin/testimonials', { credentials: 'include' })
        const storiesRes = await fetch('/api/admin/success-stories', { credentials: 'include' })

        const messages = await messagesRes.json()
        const testimonials = await testimonialsRes.json()
        const stories = await storiesRes.json()

        setStats({
          messages: Array.isArray(messages) ? messages.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          successStories: Array.isArray(stories) ? stories.length : 0,
        })
      } catch (error) {
        console.error('[v0] Dashboard error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const statCards = [
    {
      icon: MessageSquare,
      label: 'Contact Messages',
      value: stats.messages,
      href: '/admin/messages',
      color: 'bg-blue-500',
    },
    {
      icon: Award,
      label: 'Testimonials',
      value: stats.testimonials,
      href: '/admin/testimonials',
      color: 'bg-green-500',
    },
    {
      icon: Lightbulb,
      label: 'Success Stories',
      value: stats.successStories,
      href: '/admin/success-stories',
      color: 'bg-purple-500',
    },
  ]

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome to your admin panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="p-6 flex items-start justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-1">
                        {card.label}
                      </p>
                      <p className="text-4xl font-bold text-slate-900">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.color} p-4 rounded-lg`}>
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/testimonials">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                <Award size={18} className="mr-2" />
                Manage Testimonials
              </Button>
            </Link>
            <Link href="/admin/success-stories">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                <Lightbulb size={18} className="mr-2" />
                Manage Success Stories
              </Button>
            </Link>
            <Link href="/admin/messages">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                <MessageSquare size={18} className="mr-2" />
                View Messages
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
