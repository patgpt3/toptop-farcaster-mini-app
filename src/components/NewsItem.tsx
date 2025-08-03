import { Link } from 'react-router-dom'
import { MessageCircle, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'
import { useFarcasterAuth } from '../hooks/useFarcasterAuth'
import { useDeleteItem } from '../hooks/useDeleteItem'

interface NewsItemProps {
  id: string
  title: string
  url: string
  author: string
  points: number
  comments: number
  createdAt: string
  category: string
  emoji: string
  onVote: (id: string, isUpvote: boolean) => void
  hasVoted: boolean
}

export function NewsItem({
  id,
  title,
  url,
  author,
  points,
  comments,
  createdAt,
  category,
  emoji,
  onVote,
  hasVoted
}: NewsItemProps) {
  const { username, isAuthenticated } = useFarcasterAuth()
  const { deleteItem } = useDeleteItem()

  const handleVote = (isUpvote: boolean) => {
    if (!isAuthenticated) {
      alert('Please connect your Farcaster account to vote')
      return
    }
    onVote(id, isUpvote)
  }

  const handleDelete = () => {
    deleteItem(id, author)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors">
      {/* Vote Button */}
      <div className="flex flex-col items-center space-y-1">
        <button
          onClick={() => handleVote(true)}
          className={`p-1 rounded transition-colors ${
            hasVoted 
              ? 'text-orange-500' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-gray-900">{points}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start space-x-2">
          <span className="text-lg flex-shrink-0">{emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 leading-tight">
              <Link 
                to={`/post/${id}`}
                className="hover:text-toptop-blue transition-colors"
              >
                {title}
              </Link>
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>by {author}</span>
              <span>{formatTime(createdAt)}</span>
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{comments} comments</span>
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end space-y-2">
        {/* Delete Button */}
        {username === author && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        
        {/* External Link */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Open link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
} 