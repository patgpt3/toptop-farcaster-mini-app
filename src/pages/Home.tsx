import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { NewsItem } from '../components/NewsItem'
import { LoadingSpinner } from '../components/LoadingSpinner'
import apiService from '../services/apiService'
import { TrendingUp, Zap, Gamepad2, Film, Coins, Image, Wifi, FlaskConical } from 'lucide-react'

const categories = [
  { name: 'Crypto', icon: TrendingUp, href: '/crypto', color: 'text-blue-600' },
  { name: 'AI', icon: Zap, href: '/ai', color: 'text-purple-600' },
  { name: 'Gaming', icon: Gamepad2, href: '/gaming', color: 'text-green-600' },
  { name: 'Film', icon: Film, href: '/film', color: 'text-red-600' },
  { name: 'Memecoins', icon: Coins, href: '/memecoins', color: 'text-yellow-600' },
  { name: 'NFT', icon: Image, href: '/nft', color: 'text-pink-600' },
  { name: 'DePIN', icon: Wifi, href: '/depin', color: 'text-indigo-600' },
  { name: 'DeSci', icon: FlaskConical, href: '/desci', color: 'text-cyan-600' },
]

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Crypto')

  // Fetch posts from the selected category
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts', selectedCategory],
    queryFn: () => apiService.getItems(selectedCategory, 1, 'main'),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  const handleVote = async (id: string, isUpvote: boolean) => {
    try {
      await apiService.voteItem(id, isUpvote)
      // Refetch to get updated vote counts
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          TopTop Network
        </h1>
        <p className="text-gray-600">
          Discover the latest in Crypto, AI, Gaming, and Web3
        </p>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                to={category.href}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-200 hover:bg-gray-50 ${
                  selectedCategory === category.name
                    ? 'border-toptop-blue bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon className={`w-5 h-5 ${category.color}`} />
                <span className="font-medium text-gray-900 text-sm">{category.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Latest in {selectedCategory}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Posts from both Farcaster and web users
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <NewsItem
                key={post._id}
                id={post._id}
                title={post.title}
                url={post.url}
                author={post.author}
                points={post.points || 0}
                comments={post.comments?.length || 0}
                createdAt={post.createdAt}
                category={selectedCategory}
                emoji={post.emoji || '📰'}
                onVote={handleVote}
                hasVoted={false} // TODO: Implement vote tracking
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No posts found in {selectedCategory}</p>
              <p className="text-sm mt-2">Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>

      {/* Farcaster Integration Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🚀 Farcaster Integration
        </h3>
        <p className="text-gray-700 mb-4">
          Connect your Farcaster account to post, vote, and comment. Your posts will appear
          alongside web app users, creating a unified community experience.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="bg-white px-2 py-1 rounded">✨ Cross-platform posts</span>
          <span className="bg-white px-2 py-1 rounded">🗳️ Unified voting</span>
          <span className="bg-white px-2 py-1 rounded">💬 Shared comments</span>
          <span className="bg-white px-2 py-1 rounded">🔗 Seamless integration</span>
        </div>
      </div>
    </div>
  )
} 