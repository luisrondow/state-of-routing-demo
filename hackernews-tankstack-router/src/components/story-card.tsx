import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MessageSquare, ArrowUp, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatTimeAgo, type Story } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const isExternal = story.url && !story.url.includes("ycombinator.com");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2">
              {/* Make story title clickable - goes to news detail page */}
              <Link
                to={`/news/${story.id}`}
                className="hover:text-orange-600 transition-colors"
              >
                {story.title}
              </Link>
              {/* External link indicator */}
              {isExternal && (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 hover:text-orange-600 inline-flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4" />
                <span className="font-medium">{story.score}</span>
              </div>
              <span>by {story.by}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(story.time)}</span>
              </div>
              {story.descendants !== undefined && (
                <Link
                  to={`/news/${story.id}/comments`}
                  className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{story.descendants} comments</span>
                </Link>
              )}
            </div>
          </div>
          <Badge variant="secondary">#{story.id}</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}