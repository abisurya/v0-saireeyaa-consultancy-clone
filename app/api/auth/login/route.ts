import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_CREDENTIALS, verifyPassword, createToken, setSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check credentials
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // For demo purposes, we compare directly with the plaintext password
    // In production, you would hash the stored password and compare hashes
    if (password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create token
    const token = await createToken(username)

    // Set session cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('adminSession', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
