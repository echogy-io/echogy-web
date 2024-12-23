import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

export const runtime = 'edge';

type PageProps = {
  params: Promise<{}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params, searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams
  const errorParam = resolvedSearchParams.error
  const error = typeof errorParam === 'string' ? errorParam : ''
  const errorMessage = getErrorMessage(error)

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Error Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-6 h-6 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-foreground">
          Connection Failed
        </h1>

        {/* Error Message */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {errorMessage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
          <Button variant="outline" asChild className="flex-1">
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/connect">
              Try Again
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

function getErrorMessage(error: string): string {
  switch (error) {
    case 'invalid_token':
      return 'The connection token is invalid or has expired. Please try again with a new token.'
    case 'user_not_found':
      return 'We could not find your user account. Please make sure you are logged in.'
    case 'already_connected':
      return 'This account is already connected. You can manage your connections in the dashboard.'
    case 'permission_denied':
      return 'You do not have permission to perform this action. Please contact support if you believe this is an error.'
    default:
      return 'An unexpected error occurred while trying to connect your account. Please try again later.'
  }
}

export default Page
