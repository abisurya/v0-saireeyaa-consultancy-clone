import { NextRequest, NextResponse } from 'next/server'
import { addContactMessage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const contactMessage = await addContactMessage({
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
    })

    return NextResponse.json(contactMessage, { status: 201 })
  } catch (error) {
    console.error('[v0] Add contact message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
