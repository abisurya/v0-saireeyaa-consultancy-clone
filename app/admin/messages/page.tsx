'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Trash2, Eye, CheckCircle, Mail } from 'lucide-react'
import { ContactMessage } from '@/lib/storage'

export default function MessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages', { credentials: 'include' })
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setMessages(Array.isArray(data) ? data.reverse() : [])
    } catch (error) {
      console.error('[v0] Fetch messages error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (message: ContactMessage) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: message.id,
          status: message.status === 'new' ? 'read' : message.status,
        }),
        credentials: 'include',
      })

      if (response.ok) {
        await fetchMessages()
        if (selectedMessage?.id === message.id) {
          const updated = await response.json()
          setSelectedMessage(updated)
        }
      }
    } catch (error) {
      console.error('[v0] Mark as read error:', error)
    }
  }

  const handleMarkAsReplied = async (message: ContactMessage) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: message.id,
          status: 'replied',
        }),
        credentials: 'include',
      })

      if (response.ok) {
        await fetchMessages()
        if (selectedMessage?.id === message.id) {
          const updated = await response.json()
          setSelectedMessage(updated)
        }
      }
    } catch (error) {
      console.error('[v0] Mark as replied error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        await fetchMessages()
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('[v0] Delete error:', error)
    }
  }

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true
    return msg.status === filter
  })

  const newMessagesCount = messages.filter((m) => m.status === 'new').length
  const unrepliedCount = messages.filter((m) => m.status !== 'replied').length

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
        <h1 className="text-4xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-600">
          Manage messages from your contact form
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-blue-50">
          <p className="text-sm text-slate-600 mb-1">Total Messages</p>
          <p className="text-3xl font-bold text-blue-600">{messages.length}</p>
        </Card>
        <Card className="p-4 bg-red-50">
          <p className="text-sm text-slate-600 mb-1">New Messages</p>
          <p className="text-3xl font-bold text-red-600">{newMessagesCount}</p>
        </Card>
        <Card className="p-4 bg-orange-50">
          <p className="text-sm text-slate-600 mb-1">Awaiting Reply</p>
          <p className="text-3xl font-bold text-orange-600">{unrepliedCount}</p>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'new', 'read', 'replied'] as const).map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            className={`whitespace-nowrap ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Messages List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2">
          {filteredMessages.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-slate-600">No messages in this category</p>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => handleMarkAsRead(message)}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : message.status === 'new'
                      ? 'bg-yellow-50 hover:bg-yellow-100'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">
                        {message.name}
                      </p>
                      <p className="text-sm text-slate-600 truncate">
                        {message.subject}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {message.status === 'new' && (
                      <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail */}
        {selectedMessage ? (
          <motion.div
            key={selectedMessage.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-slate-600">{selectedMessage.email}</p>
                    <p className="text-slate-600">{selectedMessage.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleMarkAsReplied(selectedMessage)}
                      size="sm"
                      className={
                        selectedMessage.status === 'replied'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-slate-600 hover:bg-slate-700 text-white'
                      }
                    >
                      <CheckCircle size={16} className="mr-1" />
                      {selectedMessage.status === 'replied' ? 'Replied' : 'Mark Replied'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(selectedMessage.id)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-slate-700">Subject:</span>{' '}
                    <span className="text-slate-600">{selectedMessage.subject}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-slate-700">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedMessage.status === 'new'
                        ? 'bg-red-100 text-red-700'
                        : selectedMessage.status === 'read'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 mb-6">
                <h3 className="font-semibold text-slate-700 mb-3">Message</h3>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Mail size={18} />
                  Send Email Reply
                </a>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center">
            <Card className="p-8 text-center w-full">
              <Eye size={48} className="mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 text-lg">
                Select a message to view details
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
