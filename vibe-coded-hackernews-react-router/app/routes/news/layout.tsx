import type { Route } from "./+types/layout";
import { useLoaderData, Outlet, Link, useLocation, useParams } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import { ExternalLink, MessageSquare, ArrowUp, Clock, Share, ArrowLeft } from "lucide-react";
import { getNewsItem } from "~/lib/mock-data";
import { formatTimeAgo } from "~/lib/utils";
import { cn } from "~/lib/utils";

export function meta({ params }: Route.MetaArgs) {
  const newsItem = getNewsItem(params.id);
  return [
    { title: newsItem ? `${newsItem.title} | Hacker News` : "News | Hacker News" },
    { name: "description", content: newsItem?.title || "Hacker News story" },
  ];
}

// Shared loader for news item data
export async function loader({ params }: Route.LoaderArgs) {
  const newsItem = getNewsItem(params.id);

  if (!newsItem) {
    throw new Response("News item not found", { status: 404 });
  }

  return { newsItem };
}

export default function NewsLayout() {
  const { newsItem } = useLoaderData<typeof loader>();
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
          <Link to="/top-stories" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </Button>
      </div>

      {/* News Item Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold leading-tight mb-3">
                {isExternal ? (
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 flex items-center gap-2"
                  >
                    {newsItem.title}
                    <ExternalLink className="w-5 h-5 flex-shrink-0" />
                  </a>
                ) : (
                  <span>{newsItem.title}</span>
                )}
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span className="font-medium">{newsItem.score} points</span>
                </div>
                <span>by {newsItem.by}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(newsItem.time)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{newsItem.descendants} comments</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary">#{newsItem.id}</Badge>
          </div>
        </CardHeader>

        {newsItem.text && (
          <CardContent>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">
              {newsItem.text}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Sub-navigation for nested routes */}
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