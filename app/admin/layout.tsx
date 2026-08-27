'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AdminNavigation from '@/components/admin/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  // Don't show navigation on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <AdminNavigation />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
