import { useLoaderData } from "react-router";
import { StoryList } from "../../components/story-list";
import { type Story } from "../../lib/utils";


export function StaticStories() {
  const { stories } = useLoaderData() as { stories: Story[] };

  return (
    <StoryList
      stories={stories}
      title="Static Stories"
      description="Static mock stories for development and testing"
    />
  );
}