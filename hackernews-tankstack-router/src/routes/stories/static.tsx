import { createFileRoute } from '@tanstack/react-router'
import { StoryList } from '@/components/story-list'
import { getAllMockNews, type NewsItem } from '@/lib/mock-data'
import { type Story } from '@/lib/utils'

export const Route = createFileRoute('/stories/static')({
  loader: () => {
    const mockStories = getAllMockNews()

    const stories: Story[] = mockStories.map((item: NewsItem) => ({
      id: parseInt(item.id),
      title: item.title,
      url: item.url,
      score: item.score,
      by: item.by,
      time: item.time,
      descendants: item.descendants,
      type: item.type
    }))

    return { stories }
  },

  component: StaticStoriesComponent,
})

function StaticStoriesComponent() {
  const { stories } = Route.useLoaderData()

  return (
    <StoryList
      stories={stories}
      title="Static Stories"
      description="Mock news data demonstrating static data loading"
    />
  )
}