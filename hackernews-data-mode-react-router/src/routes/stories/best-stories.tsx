import { useLoaderData, useNavigate } from "react-router";
import { useEffect } from "react";
import { StoryList } from "../../components/story-list";
import { type Story } from "../../lib/utils";
import { useAuth } from "../../lib/auth";

export function BestStories() {
  const { stories } = useLoaderData() as { stories: Story[] };
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Client-side protection for edge cases
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login?redirectTo=/stories/best");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Don't render content if not authenticated (prevents flash)
  if (!isLoading && !isAuthenticated) {
    return null;
  }

  return (
    <StoryList
      stories={stories}
      title="Best Stories 🔒"
      description="Best stories from Hacker News (requires authentication)"
    />
  );
}