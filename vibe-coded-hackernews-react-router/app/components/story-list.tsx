import { StoryCard } from "~/components/story-card";
import { type Story } from "~/lib/utils";

interface StoryListProps {
  stories: Story[];
  title: string;
  description: string;
}

export function StoryList({ stories, title, description }: StoryListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}