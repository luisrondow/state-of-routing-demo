import { useLoaderData } from "react-router";
import { StoryList } from "../../components/story-list";
import { type Story } from "../../lib/utils";

export function NewStories() {
  const { stories } = useLoaderData() as { stories: Story[] };

  return (
    <StoryList
      stories={stories}
      title="New Stories"
      description="Latest new stories from Hacker News (loaded via React Router loader)"
    />
  );
}