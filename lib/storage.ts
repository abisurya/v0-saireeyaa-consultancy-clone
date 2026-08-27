import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory already exists
  }
}

export interface Testimonial {
  id: string
  name: string
  title: string
  content: string
  image?: string
  rating: number
  createdAt: string
}

export interface SuccessStory {
  id: string
  title: string
  content: string
  image?: string
  category: string
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

// Testimonials storage
export async function getTestimonials(): Promise<Testimonial[]> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'testimonials.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveTestimonials(testimonials: Testimonial[]): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'testimonials.json')
  await fs.writeFile(filePath, JSON.stringify(testimonials, null, 2))
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
  const testimonials = await getTestimonials()
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  testimonials.push(newTestimonial)
  await saveTestimonials(testimonials)
  return newTestimonial
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const testimonials = await getTestimonials()
  const index = testimonials.findIndex(t => t.id === id)
  if (index === -1) return null

  testimonials[index] = { ...testimonials[index], ...updates }
  await saveTestimonials(testimonials)
  return testimonials[index]
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const testimonials = await getTestimonials()
  const filtered = testimonials.filter(t => t.id !== id)
  if (filtered.length === testimonials.length) return false

  await saveTestimonials(filtered)
  return true
}

// Success stories storage
export async function getSuccessStories(): Promise<SuccessStory[]> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'success-stories.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveSuccessStories(stories: SuccessStory[]): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'success-stories.json')
  await fs.writeFile(filePath, JSON.stringify(stories, null, 2))
}

export async function addSuccessStory(story: Omit<SuccessStory, 'id' | 'createdAt'>): Promise<SuccessStory> {
  const stories = await getSuccessStories()
  const newStory: SuccessStory = {
    ...story,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  stories.push(newStory)
  await saveSuccessStories(stories)
  return newStory
}

export async function updateSuccessStory(id: string, updates: Partial<SuccessStory>): Promise<SuccessStory | null> {
  const stories = await getSuccessStories()
  const index = stories.findIndex(s => s.id === id)
  if (index === -1) return null

  stories[index] = { ...stories[index], ...updates }
  await saveSuccessStories(stories)
  return stories[index]
}

export async function deleteSuccessStory(id: string): Promise<boolean> {
  const stories = await getSuccessStories()
  const filtered = stories.filter(s => s.id !== id)
  if (filtered.length === stories.length) return false

  await saveSuccessStories(filtered)
  return true
}

// Contact messages storage
export async function getContactMessages(): Promise<ContactMessage[]> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'messages.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveContactMessages(messages: ContactMessage[]): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, 'messages.json')
  await fs.writeFile(filePath, JSON.stringify(messages, null, 2))
}

export async function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
  const messages = await getContactMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  messages.push(newMessage)
  await saveContactMessages(messages)
  return newMessage
}

export async function updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
  const messages = await getContactMessages()
  const index = messages.findIndex(m => m.id === id)
  if (index === -1) return null

  messages[index].status = status
  await saveContactMessages(messages)
  return messages[index]
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const messages = await getContactMessages()
  const filtered = messages.filter(m => m.id !== id)
  if (filtered.length === messages.length) return false

  await saveContactMessages(filtered)
  return true
}
