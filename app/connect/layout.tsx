import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ConnectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="container max-w-md mx-auto px-4">
        {children}
      </div>
    </div>
  )
}
