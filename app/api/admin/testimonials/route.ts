import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('[v0] Get testimonials error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, title, content, rating } = await request.json()

    // Validate input
    if (!name || !title || !content || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const testimonial = await addTestimonial({
      name,
      title,
      content,
      rating: Number(rating),
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('[v0] Add testimonial error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, name, title, content, rating } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial id' }, { status: 400 })
    }

    const testimonial = await updateTestimonial(id, {
      name,
      title,
      content,
      rating: Number(rating),
    })

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('[v0] Update testimonial error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial id' }, { status: 400 })
    }

    const success = await deleteTestimonial(id)

    if (!success) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Delete testimonial error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
