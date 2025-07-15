import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ExternalLink } from "lucide-react";

export function NewsDetail() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        📰 <span>Story Details (Index Route)</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 React Router v7 Features Showcase
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
              URL path: <code className="bg-white px-1 rounded">/news/:id</code> where
              <code className="bg-white px-1 rounded ml-1">:id</code> is dynamically matched
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🎯 Route-based Code Splitting</h4>
            <p className="text-purple-700 text-sm">
              Each nested route can be lazy-loaded independently for optimal performance.
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
  );
}