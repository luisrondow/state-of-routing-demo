import type { Route } from "./+types/comment-thread";
import { useLoaderData, Link, useParams } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ArrowUp, Clock, User, ArrowLeft, MessageSquare } from "lucide-react";
import { getCommentThread, getComment } from "~/lib/mock-data";
import { formatTimeAgo } from "~/lib/utils";

export function meta({ params }: Route.MetaArgs) {
  const comment = getComment(params.commentId);
  return [
    { title: comment ? `Comment by ${comment.by}` : "Comment Thread" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const thread = getCommentThread(params.commentId);
  const mainComment = getComment(params.commentId);

  if (!mainComment) {
    throw new Response("Comment not found", { status: 404 });
  }

  return { thread, mainComment };
}

function CommentCard({ comment, isMain = false }: { comment: any; isMain?: boolean }) {
  const indentLevel = Math.min(comment.depth, 4);

  return (
    <div
      className="border-l-2 border-muted pl-4 ml-4"
      style={{ marginLeft: `${indentLevel * 16}px` }}
    >
      <Card className={`mb-4 ${isMain ? 'ring-2 ring-orange-200 bg-orange-50/50' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium">{comment.by}</span>
              {isMain && <Badge variant="secondary" className="text-xs">Main Comment</Badge>}
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(comment.time)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />
                <span>{comment.score}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Level {comment.depth}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CommentThread() {
  const { thread, mainComment } = useLoaderData<typeof loader>();
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        🧵 <span>Comment Thread (Multiple URL Parameters)</span>
      </div>

      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to={`/news/${params.id}/comments`} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Comments
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Comment ID: <span className="font-mono text-orange-600">{params.commentId}</span>
        </div>
      </div>

      {/* URL Parameters Demo */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">🎯 Multiple URL Parameters</h3>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Story ID Parameter</div>
              <div className="text-xs font-mono bg-blue-50 p-2 rounded border">
                :id = <span className="text-blue-600">{params.id}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Comment ID Parameter</div>
              <div className="text-xs font-mono bg-green-50 p-2 rounded border">
                :commentId = <span className="text-green-600">{params.commentId}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Full route: <code className="bg-white px-1 rounded">/news/:id/comments/:commentId</code>
          </div>
        </CardContent>
      </Card>

      {/* Thread Content */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5" />
          <h3 className="font-semibold">
            Thread: {thread.length} {thread.length === 1 ? 'comment' : 'comments'}
          </h3>
        </div>

        <div className="space-y-0">
          {thread.map((comment, index) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isMain={index === 0}
            />
          ))}
        </div>

        {thread.length === 1 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No replies to this comment yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          Reply to Thread
        </Button>
        <Button variant="outline" size="sm">
          Share Thread
        </Button>
        <Button variant="outline" size="sm">
          Report Comment
        </Button>
      </div>
    </div>
  );
}