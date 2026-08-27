'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Testimonial } from '@/lib/storage'

export default function TestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
    rating: 5,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials', { credentials: 'include' })
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('[v0] Fetch testimonials error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingId
        ? `/api/admin/testimonials`
        : `/api/admin/testimonials`

      const method = editingId ? 'PUT' : 'POST'
      const body = editingId
        ? { id: editingId, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })

      if (response.ok) {
        await fetchTestimonials()
        setFormData({ name: '', title: '', content: '', rating: 5 })
        setShowForm(false)
        setEditingId(null)
      }
    } catch (error) {
      console.error('[v0] Submit error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      title: testimonial.title,
      content: testimonial.content,
      rating: testimonial.rating,
    })
    setEditingId(testimonial.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        await fetchTestimonials()
      }
    } catch (error) {
      console.error('[v0] Delete error:', error)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', title: '', content: '', rating: 5 })
  }

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
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-600">Manage customer testimonials</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={20} className="mr-2" />
            Add Testimonial
          </Button>
        )}
      </motion.div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Customer name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Visa Consultant"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Testimonial Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write the testimonial..."
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rating (1-5)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check size={18} className="mr-2" />
                  {submitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-600 hover:bg-slate-700 text-white"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 gap-4">
        {testimonials.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-600">No testimonials yet. Add one to get started!</p>
          </Card>
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-600">{testimonial.title}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(testimonial)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <p className="text-slate-700 mb-2">{testimonial.content}</p>
                <p className="text-xs text-slate-500">
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </p>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
