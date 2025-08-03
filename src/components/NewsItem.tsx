import { useState } from 'react'
import { ArrowUp, MessageCircle, ExternalLink, Clock } from 'lucide-react'

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
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (isUpvote: boolean) => {
    if (isVoting) return
    setIsVoting(true)
    try {
      await onVote(id, isUpvote)
    } finally {
      setIsVoting(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors">
      {/* Vote Button */}
      <div className="flex flex-col items-center space-y-1">
        <button
          onClick={() => handleVote(true)}
          disabled={isVoting}
          className={`p-1 rounded transition-colors ${
            hasVoted 
              ? 'text-orange-500' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-gray-900">{points}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start space-x-2">
          <span className="text-lg flex-shrink-0">{emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 leading-tight">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-toptop-blue transition-colors"
              >
                {title}
              </a>
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>by {author}</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(createdAt)}</span>
              </span>
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

      {/* External Link */}
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        title="Open link"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
} 