import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { ExternalLink, MessageSquare, ArrowUp, Clock, ArrowLeft } from 'lucide-react'
import { getNewsItem, type NewsItem } from '@/lib/mock-data'
import { formatTimeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

// TypeScript interfaces for this route
interface NewsRouteParams {
  id: string
}

interface NewsLoaderData {
  newsItem: NewsItem
}

export const Route = createFileRoute('/news/$id')({
  loader: async ({ params }: { params: NewsRouteParams }) => {
    const newsItem = getNewsItem(params.id)

    if (!newsItem) {
      throw new Response('News item not found', { status: 404 })
    }

    return { newsItem }
  },
  component: NewsLayout,
})

function NewsLayout() {
  const { newsItem } = Route.useLoaderData() as NewsLoaderData
  const location = useLocation()
  const { id } = Route.useParams() as NewsRouteParams
  const isExternal = newsItem.url && !newsItem.url.includes('ycombinator.com')

  const navigationItems = [
    { to: '/news/$id', label: 'Story', exact: true },
    { to: '/news/$id/comments', label: `Comments (${newsItem.descendants})`, exact: false },
    { to: '/news/$id/share', label: 'Share', exact: false },
  ] as const

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
              const fullPath = item.to.replace('$id', id)
              const isActive = item.exact
                ? location.pathname === fullPath
                : location.pathname.startsWith(fullPath)

              return (
                <NavigationMenuItem key={item.to}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Link to={item.to} params={{ id }}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Nested routes render here */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="mb-4 text-xs text-muted-foreground font-mono">
          🔄 Current Route: <span className="text-orange-600">{location.pathname}</span>
          {Object.keys(location.search).length > 0 && (
            <span> | Query: <span className="text-blue-600">?{new URLSearchParams(location.search as any).toString()}</span></span>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  )
}