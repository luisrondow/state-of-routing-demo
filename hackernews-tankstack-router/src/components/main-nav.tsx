import { Link, useLocation } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LogIn, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { UserProfile } from "@/components/user-profile";

const navigationItems = [
  { href: "/stories/top", label: "Top Stories", protected: false },
  { href: "/stories/best", label: "Best Stories", protected: true },
  { href: "/stories/new", label: "New Stories", protected: false },
  { href: "/stories/static", label: "Static Stories", protected: false },
]; // Oops, forgot to add the const

export function MainNav() {
  const location = useLocation();
  const { user, isLoading, isAuthenticated } = useAuth();

  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-orange-600">
              Hacker News
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Link to={item.href} className={cn(
                        item.protected && !isAuthenticated && "opacity-60"
                      )}>
                        <span className="flex items-center gap-1">
                          {item.label}
                          {item.protected && (
                            <Lock className="w-3 h-3" />
                          )}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Demo: React Router v7 with SSR
            </div>

            {/* Authentication section */}
            {isLoading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name}
                </span>
                <UserProfile user={user} />
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}