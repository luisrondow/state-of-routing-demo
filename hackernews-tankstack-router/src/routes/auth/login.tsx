import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
    import { Badge } from '@/components/ui/badge'
import { AlertCircle, User, Lock, Shield } from 'lucide-react'
import { useAuth } from '@/lib/auth'

// Search params type for redirectTo
type LoginSearch = {
  redirectTo?: string
}

export const Route = createFileRoute('/auth/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirectTo: search.redirectTo as string | undefined
    }
  },

  beforeLoad: ({ search }) => {
    // If already authenticated, redirect to intended destination
    const user = JSON.parse(localStorage.getItem('hackernews-user') || 'null')
    if (user) {
      throw redirect({ to: search.redirectTo || '/stories/top' })
    }
  },

  component: LoginComponent,
})

function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { redirectTo } = Route.useSearch()
  const { login, isAuthenticated } = useAuth()

  const redirectDestination = redirectTo || '/stories/top'

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: redirectDestination })
    }
  }, [isAuthenticated, navigate, redirectDestination])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save user to localStorage and update auth state
    const user = login(email)

    // Show success message with user info
    alert(`Login Successful!\nWelcome ${user.name}!\nEmail: ${user.email}\n\nRedirecting you back...`)

    setIsLoading(false)
    navigate({ to: redirectDestination })
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[600px]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <div className="text-center">
            <CardTitle className="text-2xl">Welcome to Hacker News</CardTitle>
            <CardDescription className="mt-2">
              Sign in to access premium features like Best Stories
            </CardDescription>
          </div>

          {redirectTo && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Please log in to access <strong>{redirectTo}</strong>
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Demo Account - Use any email and password
            </p>

            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center py-2">
                <User className="w-3 h-3 mr-1" />
                Any email works (e.g., demo@example.com)
              </Badge>

              <Badge variant="outline" className="w-full justify-center py-2">
                <Lock className="w-3 h-3 mr-1" />
                Any password works (e.g., password123)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}