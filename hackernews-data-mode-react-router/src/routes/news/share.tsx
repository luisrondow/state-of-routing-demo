import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Share2, Copy, Twitter, Facebook, Linkedin, Mail } from "lucide-react";

export function NewsShare() {
  const params = useParams();
  const currentUrl = `${window.location.origin}/news/${params.id}`;

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      color: "text-blue-500"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: "text-blue-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: "text-blue-700"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=Check out this story&body=${encodeURIComponent(currentUrl)}`,
      color: "text-gray-600"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        📤 <span>Share Story (Nested Route)</span>
      </div>

      {/* Share URL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share this Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Story URL</label>
            <div className="flex gap-2">
              <Input
                value={currentUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
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

      {/* Social Stats Mock */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Social Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-blue-700">Shares</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-green-700">Views</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nested Route Info */}
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

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          Generate QR Code
        </Button>
        <Button variant="outline" size="sm">
          Create Short Link
        </Button>
        <Button variant="outline" size="sm">
          Embed Code
        </Button>
      </div>
    </div>
  );
}