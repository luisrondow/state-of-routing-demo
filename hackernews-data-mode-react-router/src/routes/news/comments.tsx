import { useLoaderData, useSearchParams, Link, useParams } from "react-router";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowUp, MessageSquare, Clock, User, Filter, SortAsc } from "lucide-react";
import { type Comment } from "../../lib/mock-data";
import { formatTimeAgo } from "../../lib/utils";

function CommentCard({ comment }: { comment: Comment }) {
  const params = useParams();
  const indentLevel = Math.min(comment.depth, 4); // Max 4 levels of nesting

  return (
    <div
      className="border-l-2 border-muted pl-4 ml-4"
      style={{ marginLeft: `${indentLevel * 16}px` }}
    >
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium">{comment.by}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(comment.time)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />
                <span>{comment.score}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {comment.depth > 0 && (
                <Badge variant="outline" className="text-xs">
                  Level {comment.depth}
                </Badge>
              )}
              <Link
                to={`/news/${params.id}/comments/${comment.id}`}
                className="text-xs text-blue-600 hover:underline"
              >
                Thread
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
          {comment.kids && comment.kids.length > 0 && (
            <div className="mt-3 text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 inline mr-1" />
              {comment.kids.length} {comment.kids.length === 1 ? 'reply' : 'replies'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function NewsComments() {
  const { comments, totalComments, currentPage, totalPages, sortBy, filter } = useLoaderData() as {
    comments: Comment[];
    totalComments: number;
    currentPage: number;
    totalPages: number;
    sortBy: string;
    filter: string;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "best" && key === "sort") {
      newParams.delete("sort");
    } else if (value === "all" && key === "filter") {
      newParams.delete("filter");
    } else {
      newParams.set(key, value);
    }

    // Reset page when changing sort/filter
    if (key !== "page") {
      newParams.delete("page");
    }

    setSearchParams(newParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        💬 <span>Comments Section (Query Parameters Demo)</span>
      </div>

      {/* Query Parameters Showcase */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">🔧 Query Parameters in Action</h3>
            <Badge variant="outline" className="font-mono text-xs">
              {searchParams.toString() || "No query params"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-1">
                <SortAsc className="w-3 h-3" />
                Sort By
              </label>
              <Select
                value={sortBy}
                onValueChange={(value: string) => updateSearchParams("sort", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best">Best</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Filter
              </label>
              <Select
                value={filter}
                onValueChange={(value: string) => updateSearchParams("filter", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="top">Top Rated (10+ points)</SelectItem>
                  <SelectItem value="recent">Recent (24h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2">Current URL</label>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                /news/{params.id}/comments{searchParams.toString() ? `?${searchParams.toString()}` : ''}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">
            {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
            {filter !== "all" && <span className="text-muted-foreground"> (filtered)</span>}
          </h3>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {comments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No comments match your criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-0">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => updateSearchParams("page", String(currentPage - 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => updateSearchParams("page", String(page))}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => updateSearchParams("page", String(currentPage + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}