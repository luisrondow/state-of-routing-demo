import type { Route } from "./+types/best-stories";
import { useLoaderData, redirect, useNavigate } from "react-router";
import { useEffect } from "react";
import { StoryList } from "~/components/story-list";
import { fetchBestStories } from "~/lib/utils";
import { getStoredUser, useAuth } from "~/lib/auth";
import { Skeleton } from "~/components/ui/skeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hacker News - Best Stories" },
    { name: "description", content: "Best stories from Hacker News" },
  ];
}

// React Router loader function for data fetching with authentication check
export async function clientLoader({}: Route.LoaderArgs) {
  // Check if we're on the client side (localStorage is only available on client)
  // if (typeof window !== "undefined") {
    const user = getStoredUser();
    if (!user) {
      // Redirect to login if not authenticated
      throw redirect("/login?redirectTo=/best-stories");
    }
  // }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const stories = await fetchBestStories();
  return { stories };
}

export function HydrateFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BestStories({
  loaderData,
}: Route.ComponentProps) {
  const { stories } = loaderData;
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Client-side protection for edge cases
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login?redirectTo=/best-stories");
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