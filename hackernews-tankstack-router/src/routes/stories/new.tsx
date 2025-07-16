import { createFileRoute } from '@tanstack/react-router'
import { StoryList } from '@/components/story-list'
import { fetchNewStories } from '@/lib/utils'

export const Route = createFileRoute('/stories/new')({
  loader: async () => {
    const stories = await fetchNewStories()
    return { stories }
  },

  component: NewStoriesComponent,
})

function NewStoriesComponent() {
  const { stories } = Route.useLoaderData()

  return (
    <StoryList
      stories={stories}
      title="New Stories"
      description="Latest new stories from Hacker News"
    />
  )
}