import type { Route } from "./+types/share";
import { useParams, useSearchParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Share2, Copy, Link2, Twitter, Facebook, Mail } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Share Story" },
  ];
}

export default function NewsShare() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const baseUrl = "https://demo-hackernews.com";
  const shareUrl = `${baseUrl}/news/${params.id}`;
  const source = searchParams.get("source") || "direct";

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this interesting story`,
      color: "text-blue-400"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "text-blue-600"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=Interesting Story&body=Check out this story: ${shareUrl}`,
      color: "text-gray-600"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        📤 <span>Share Story (Query Parameters + URL Building)</span>
      </div>

      {/* Share URL Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share This Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Story URL</label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={() => window.open(option.url, '_blank')}
              >
                <option.icon className={`w-4 h-4 ${option.color}`} />
                {option.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Query Parameters Demo */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Query Parameters Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Source:</span>
            <Badge variant="outline" className="font-mono">
              {source}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            Try these URLs to see different sources:
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-mono bg-muted p-2 rounded">
              /news/{params.id}/share?source=email
            </div>
            <div className="font-mono bg-muted p-2 rounded">
              /news/{params.id}/share?source=social
            </div>
            <div className="font-mono bg-muted p-2 rounded">
              /news/{params.id}/share?source=direct
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Demo */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Share Analytics (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">42</div>
              <div className="text-sm text-muted-foreground">Total Shares</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Twitter</div>
              <div className="text-sm text-muted-foreground">Top Platform</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Structure Info */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Nested Route Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs font-mono space-y-1">
            <div>📁 /news/:id (layout)</div>
            <div className="ml-4">├── 📄 /news/:id (index - story details)</div>
            <div className="ml-4">├── 💬 /news/:id/comments (comments with query params)</div>
            <div className="ml-4">├── 🧵 /news/:id/comments/:commentId (comment thread)</div>
            <div className="ml-4 text-orange-600">└── 📤 /news/:id/share (current page)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}