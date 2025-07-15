import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-orange-600">404</CardTitle>
            <p className="text-muted-foreground">Page not found</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>The page you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}