import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

type PageProps = {
  params: Promise<{}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const SuccessPage = async ({ params, searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams
  const supabase = await createClient()
  const {data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Success Icon */}
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-foreground">
          Connection Successful
        </h1>

        {/* User Info */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-medium text-primary">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-medium text-foreground">
            {user.email}
          </p>
          {user.user_metadata && (
            <p className="text-sm text-muted-foreground">
              {user.user_metadata.name}
            </p>
          )}
        </div>

        {/* Status Message */}
        <p className="text-sm text-muted-foreground">
          Your account has been successfully connected. You can now access all features.
        </p>

        {/* Action Button */}
        <Button asChild className="mt-4">
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default SuccessPage
