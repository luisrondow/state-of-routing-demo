import { fetchTopStories } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { StoryList } from '@/components/story-list'

export const Route = createFileRoute('/stories/top')({
  loader: async () => {
    const stories = await fetchTopStories()
    return { stories }
  },
  component: TopStoriesComponent,
})

function TopStoriesComponent() {
  const { stories } = Route.useLoaderData()

  return (
    <StoryList
      stories={stories}
      title="Top Stories"
      description="Latest top stories from Hacker News (loaded via Tanstack Router loader)"
    />
  )
}
