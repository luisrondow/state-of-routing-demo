import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { AlertCircle, User, Lock, Shield } from "lucide-react";
import { useAuth } from "../../lib/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  const redirectTo = searchParams.get("redirectTo") || "/stories/top";

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

  const isProtectedRoute = redirectTo !== "/stories/top";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login to Hacker News</CardTitle>
            <CardDescription>
              {isProtectedRoute ? (
                <span className="flex items-center justify-center gap-2 text-amber-600">
                  <Shield className="w-4 h-4" />
                  Authentication required to access this page
                </span>
              ) : (
                "Enter your credentials to continue"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProtectedRoute && (
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-amber-800">Protected Route</div>
                    <div className="text-amber-700">
                      You tried to access: <span className="font-mono text-xs bg-white px-1 rounded">{redirectTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
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