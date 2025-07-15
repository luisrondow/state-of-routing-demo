import type { Route } from "./+types/top-stories";
import { useLoaderData } from "react-router";
import { StoryList } from "~/components/story-list";
import { fetchTopStories } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hacker News - Top Stories" },
    { name: "description", content: "Latest top stories from Hacker News" },
  ];
}

// React Router loader function for data fetching
export async function loader({}: Route.LoaderArgs) {
  const stories = await fetchTopStories();
  return { stories };
}

export default function TopStories() {
  const { stories } = useLoaderData<typeof loader>();

  return (
    <StoryList
      stories={stories}
      title="Top Stories"
      description="Latest top stories from Hacker News (loaded via React Router loader)"
    />
  );
}