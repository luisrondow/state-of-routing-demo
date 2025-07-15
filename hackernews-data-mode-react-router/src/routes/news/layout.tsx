import { useLoaderData, Outlet, Link, useLocation, useParams } from "react-router";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../../components/ui/navigation-menu";
import { ExternalLink, MessageSquare, ArrowUp, Clock, ArrowLeft } from "lucide-react";
import { type NewsItem } from "../../lib/mock-data";
import { formatTimeAgo } from "../../lib/utils";
import { cn } from "../../lib/utils";


export function NewsLayout() {
  const { newsItem } = useLoaderData() as { newsItem: NewsItem };
  const location = useLocation();
  const params = useParams();
  const isExternal = newsItem.url && !newsItem.url.includes("ycombinator.com");

  const navigationItems = [
    { href: `/news/${params.id}`, label: "Story", exact: true },
    { href: `/news/${params.id}/comments`, label: `Comments (${newsItem.descendants})` },
    { href: `/news/${params.id}/share`, label: "Share" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/stories/top" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </Button>
      </div>

      {/* News Item Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-2">{newsItem.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>{newsItem.score} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(newsItem.time)}</span>
                </div>
                <span>by {newsItem.by}</span>
                {newsItem.descendants > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{newsItem.descendants} comments</span>
                  </div>
                )}
              </div>
            </div>
            {isExternal && (
              <Button asChild variant="outline" size="sm">
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Site
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        {newsItem.url && (
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground">
              URL: <a href={newsItem.url} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                {newsItem.url}
              </a>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link to={item.href}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Nested routes render here */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="mb-4 text-xs text-muted-foreground font-mono">
          🔄 Current Route: <span className="text-orange-600">{location.pathname}</span>
          {location.search && (
            <span> | Query: <span className="text-blue-600">{location.search}</span></span>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}