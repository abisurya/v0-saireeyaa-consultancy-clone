import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const contactMessages = pgTable('contact_messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const testimonials = pgTable('testimonials', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  rating: integer('rating').notNull().default(5),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const successStories = pgTable('success_stories', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  category: text('category').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
