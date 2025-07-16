import { createFileRoute, redirect } from '@tanstack/react-router'
import { StoryList } from '@/components/story-list'
import { fetchBestStories } from '@/lib/utils'
import { getStoredUser } from '@/lib/auth'

export const Route = createFileRoute('/stories/best')({
  beforeLoad: () => {
    const user = getStoredUser()
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
  },

  loader: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const stories = await fetchBestStories()
    return { stories }
  },

  pendingComponent: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-64 mb-2 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-96 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="flex items-center gap-4">
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  component: BestStoriesComponent,
})

function BestStoriesComponent() {
  const { stories } = Route.useLoaderData()

  return (
    <StoryList
      stories={stories}
      title="Best Stories"
      description="Best stories from Hacker News (requires login)"
    />
  )
}