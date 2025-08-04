import { useQuery } from '@tanstack/react-query'
import { NewsItem } from '../components/NewsItem'
import { LoadingSpinner } from '../components/LoadingSpinner'
import apiService from '../services/apiService'

export function AI() {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts', 'AI'],
    queryFn: () => apiService.getItems('AI', 1, 'main'),
    staleTime: 1000 * 60 * 2,
  })

  const handleVote = async (id: string, isUpvote: boolean) => {
    try {
      await apiService.voteItem(id, isUpvote)
      refetch()
    } catch (error) {
      console.error('Vote failed:', error)
      alert('Failed to vote. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Failed to load posts</p>
        <button 
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">AI</h1>
          <p className="text-sm text-gray-600 mt-1">
            Latest AI news and discussions
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {posts && posts.length > 0 ? (
            posts.map((post: any, index: number) => (
              <NewsItem
                key={post._id}
                id={post._id}
                title={post.title}
                url={post.url}
                author={post.author}
                points={post.points || 0}
                comments={post.comments?.length || 0}
                createdAt={post.createdAt}
                category="AI"
                emoji={post.emoji || '📰'}
                onVote={handleVote}
                hasVoted={false}
                index={index + 1}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No posts found in AI</p>
              <p className="text-sm mt-2">Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 