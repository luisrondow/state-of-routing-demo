import type { Route } from "./+types/login";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { AlertCircle, User, Lock, Shield } from "lucide-react";
import { useAuth } from "~/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hacker News - Login" },
    { name: "description", content: "Login to your Hacker News account" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  const redirectTo = searchParams.get("redirectTo") || "/top-stories";

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save user to localStorage and update auth state
    const user = login(email);

    // Show success message with user info
    alert(`Login Successful!\nWelcome ${user.name}!\nEmail: ${user.email}\n\nRedirecting you back...`);

    setIsLoading(false);
    navigate(redirectTo);
  };

  const isProtectedRoute = redirectTo !== "/top-stories";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your Hacker News account
          </p>
        </div>

        {isProtectedRoute && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 text-sm">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Authentication Required</span>
            </div>
            <p className="text-orange-600 text-xs mt-1">
              You need to be logged in to access this page. Please sign in to continue.
            </p>
          </div>
        )}

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Demo Mode</span>
              </div>
              <p className="text-blue-600 text-xs mt-1">
                This is a mock login. Use any email and password. Your "user" will be saved to localStorage.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Demo Credentials
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded border">
                  <div className="font-medium">Email:</div>
                  <div className="text-muted-foreground">any@email.com</div>
                </div>
                <div className="p-2 bg-muted rounded border">
                  <div className="font-medium">Password:</div>
                  <div className="text-muted-foreground">any password</div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                💡 Tip: Try "john@example.com" to see how the name is generated!
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button className="text-primary hover:underline">
                Sign up (Mock)
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Badge variant="outline" className="text-xs">
            🚀 React Router v7 Demo Project
          </Badge>
        </div>
      </div>
    </div>
  );
}