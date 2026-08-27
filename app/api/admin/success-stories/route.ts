import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { getSuccessStories, addSuccessStory, updateSuccessStory, deleteSuccessStory } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stories = await getSuccessStories()
    return NextResponse.json(stories)
  } catch (error) {
    console.error('[v0] Get success stories error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, category } = await request.json()

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const story = await addSuccessStory({
      title,
      content,
      category,
    })

    return NextResponse.json(story, { status: 201 })
  } catch (error) {
    console.error('[v0] Add success story error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, title, content, category } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing story id' }, { status: 400 })
    }

    const story = await updateSuccessStory(id, {
      title,
      content,
      category,
    })

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error('[v0] Update success story error:', error)
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
      return NextResponse.json({ error: 'Missing story id' }, { status: 400 })
    }

    const success = await deleteSuccessStory(id)

    if (!success) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Delete success story error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
