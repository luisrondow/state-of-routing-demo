import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/news/$id/')({
  component: NewsDetail,
})

function NewsDetail() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        📄 <span>Story Details (Nested Index Route)</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Story Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Story Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Type</span>
              <Badge variant="outline">Story</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Engagement Rate</span>
              <span className="font-mono">94.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Comments per Hour</span>
              <span className="font-mono">12.3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Score</span>
              <span className="font-mono">4.2/5.0</span>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Community Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Readers</span>
              <span className="font-mono">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bookmark Rate</span>
              <span className="font-mono">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Share Count</span>
              <span className="font-mono">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Discussion Quality</span>
              <Badge variant="secondary">High</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TanStack Router Features Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 TanStack Router Features Showcase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🏗️ Nested Layouts</h4>
            <p className="text-blue-700 text-sm">
              This page shares the news item data loaded by the parent layout route.
              No additional data fetching needed!
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">⚡ URL Parameters</h4>
            <p className="text-green-700 text-sm">
              URL path: <code className="bg-white px-1 rounded">/news/$id</code> where
              <code className="bg-white px-1 rounded ml-1">$id</code> is dynamically matched
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🎯 Route-based Code Splitting</h4>
            <p className="text-purple-700 text-sm">
              Each nested route can be lazy-loaded independently for optimal performance.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">📁 File-based Routing</h4>
            <p className="text-orange-700 text-sm">
              TanStack Router automatically generates routes from your file structure.
              This is the index route for /news/$id/
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Original
        </Button>
        <Button variant="outline" size="sm">
          Bookmark Story
        </Button>
        <Button variant="outline" size="sm">
          Flag Content
        </Button>
      </div>
    </div>
  )
}