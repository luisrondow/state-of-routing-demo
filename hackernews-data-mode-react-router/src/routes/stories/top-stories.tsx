import { useLoaderData } from "react-router";
import { StoryList } from "../../components/story-list";
import { type Story } from "../../lib/utils";

function TopStories() {
  const { stories } = useLoaderData() as { stories: Story[] };

  return (
    <StoryList
      stories={stories}
      title="Top Stories"
      description="Latest top stories from Hacker News (loaded via React Router loader)"
    />
  );
}

export { TopStories };