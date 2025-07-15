import type { Route } from "./+types/static-stories";
import { getAllMockNews } from "~/lib/mock-data";
import { StoryList } from "~/components/story-list";
import { type Story } from "~/lib/utils";

export async function loader({}: Route.LoaderArgs) {
  const mockStories = getAllMockNews();

  // Convert NewsItem[] to Story[] format
  const stories: Story[] = mockStories.map(item => ({
    id: parseInt(item.id), // Convert string to number
    title: item.title,
    url: item.url,
    score: item.score,
    by: item.by,
    time: item.time,
    descendants: item.descendants,
    type: item.type
  }));

  return { stories };
}

export default function StaticStories({
  loaderData,
}: Route.ComponentProps) {
  const { stories } = loaderData;

  return (
    <StoryList
      stories={stories}
      title="Static Stories"
      description="Mock news data loaded via React Router v7 loader - demonstrating server-side data loading"
    />
  );
}