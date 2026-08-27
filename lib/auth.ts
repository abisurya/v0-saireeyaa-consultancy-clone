import bcryptjs from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'saireeyaa-admin-secret-key-change-in-production'
)

export interface AdminUser {
  username: string
  password: string
}

// Default admin credentials
export const ADMIN_CREDENTIALS: AdminUser = {
  username: 'shiyan',
  password: '0717135686',
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash)
}

// Create JWT token
export async function createToken(username: string): Promise<string> {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
  return token
}

// Verify JWT token
export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { username: string }
  } catch {
    return null
  }
}

// Get session from cookies
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('adminSession')?.value || null
}

// Set session cookie
export async function setSession(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('adminSession', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400, // 24 hours
  })
}

// Clear session cookie
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('adminSession')
}

// Verify admin is authenticated
export async function verifyAdminSession(): Promise<boolean> {
  const session = await getSession()
  if (!session) return false

  const user = await verifyToken(session)
  return user !== null && user.username === ADMIN_CREDENTIALS.username
}
