import type { Route } from "./+types/new-stories";
import { useLoaderData } from "react-router";
import { StoryList } from "~/components/story-list";
import { fetchNewStories } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hacker News - New Stories" },
    { name: "description", content: "Latest new stories from Hacker News" },
  ];
}

// React Router loader function for data fetching
export async function loader({}: Route.LoaderArgs) {
  const stories = await fetchNewStories();
  return { stories };
}

export default function NewStories() {
  const { stories } = useLoaderData<typeof loader>();

  return (
    <StoryList
      stories={stories}
      title="New Stories"
      description="Latest new stories from Hacker News (loaded via React Router loader)"
    />
  );
}