import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { contactMessages, successStories, testimonials } from '@/lib/db/schema'

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

const toDateString = (date: Date) => date.toISOString()

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
  return rows.map((row) => ({ ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) }))
}

export async function addTestimonial(input: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
  const [row] = await db.insert(testimonials).values({ id: crypto.randomUUID(), ...input }).returning()
  return { ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) }
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const [row] = await db.update(testimonials).set({
    ...(updates.name !== undefined && { name: updates.name }),
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.content !== undefined && { content: updates.content }),
    ...(updates.rating !== undefined && { rating: updates.rating }),
    ...(updates.image !== undefined && { image: updates.image }),
  }).where(eq(testimonials.id, id)).returning()
  return row ? { ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) } : null
}

export async function deleteTestimonial(id: string) {
  const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning({ id: testimonials.id })
  return result.length > 0
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  const rows = await db.select().from(successStories).orderBy(desc(successStories.createdAt))
  return rows.map((row) => ({ ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) }))
}

export async function addSuccessStory(input: Omit<SuccessStory, 'id' | 'createdAt'>): Promise<SuccessStory> {
  const [row] = await db.insert(successStories).values({ id: crypto.randomUUID(), ...input }).returning()
  return { ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) }
}

export async function updateSuccessStory(id: string, updates: Partial<SuccessStory>): Promise<SuccessStory | null> {
  const [row] = await db.update(successStories).set({
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.content !== undefined && { content: updates.content }),
    ...(updates.category !== undefined && { category: updates.category }),
    ...(updates.image !== undefined && { image: updates.image }),
  }).where(eq(successStories.id, id)).returning()
  return row ? { ...row, image: row.image ?? undefined, createdAt: toDateString(row.createdAt) } : null
}

export async function deleteSuccessStory(id: string) {
  const result = await db.delete(successStories).where(eq(successStories.id, id)).returning({ id: successStories.id })
  return result.length > 0
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
  return rows.map((row) => ({ ...row, status: row.status as ContactMessage['status'], createdAt: toDateString(row.createdAt) }))
}

export async function addContactMessage(input: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
  const [row] = await db.insert(contactMessages).values({ id: crypto.randomUUID(), ...input, status: 'new' }).returning()
  return { ...row, status: row.status as ContactMessage['status'], createdAt: toDateString(row.createdAt) }
}

export async function updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
  const [row] = await db.update(contactMessages).set({ status }).where(eq(contactMessages.id, id)).returning()
  return row ? { ...row, status: row.status as ContactMessage['status'], createdAt: toDateString(row.createdAt) } : null
}

export async function deleteContactMessage(id: string) {
  const result = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning({ id: contactMessages.id })
  return result.length > 0
}
