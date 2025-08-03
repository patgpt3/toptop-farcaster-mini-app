import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarcasterAuth } from '../hooks/useFarcasterAuth'
import { useMutation } from '@tanstack/react-query'
import apiService from '../services/apiService'
import { Smile, Link as LinkIcon, Hash, AlertCircle } from 'lucide-react'

const emojis = [
  '📰', '🚀', '💎', '🔥', '⚡', '🎯', '💡', '🌟', '🎮', '🎬', 
  '🎨', '🔬', '🌐', '📱', '💻', '🤖', '🎪', '🎭', '🎵', '📚'
]

const categories = [
  'Crypto', 'AI', 'Gaming', 'Film', 'Memecoins', 'NFT', 'DePIN', 'DeSci'
]

export function Submit() {
  const navigate = useNavigate()
  const { isAuthenticated, profile, connect } = useFarcasterAuth()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('Crypto')
  const [selectedEmoji, setSelectedEmoji] = useState('📰')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const submitMutation = useMutation({
    mutationFn: async (postData: any) => {
      return apiService.submitItem(postData)
    },
    onSuccess: () => {
      alert('Post submitted successfully!')
      navigate('/')
    },
    onError: (error) => {
      console.error('Submit failed:', error)
      alert('Failed to submit post. Please try again.')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      alert('Please connect your Farcaster account to submit posts')
      return
    }

    if (!title.trim() || !url.trim()) {
      alert('Please fill in all required fields')
      return
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      alert('Please enter a valid URL')
      return
    }

    const postData = {
      title: `${selectedEmoji} ${title.trim()}`,
      url: url.trim(),
      author: profile?.username || 'farcaster_user',
      category: category,
      emoji: selectedEmoji,
      points: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      platform: 'farcaster',
      farcasterFid: profile?.fid
    }

    submitMutation.mutate(postData)
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Farcaster to Submit
          </h2>
          <p className="text-gray-600 mb-6">
            You need to connect your Farcaster account to submit posts to TopTop Network.
          </p>
          <button
            onClick={connect}
            className="btn-primary"
          >
            Connect Farcaster
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-toptop-blue rounded-lg flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Submit Post</h1>
            <p className="text-gray-600">Share something with the TopTop Network community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex-shrink-0 p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Smile className="w-5 h-5 text-gray-500" />
              </button>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter post title..."
                required
              />
            </div>
            
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-10 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setSelectedEmoji(emoji)
                        setShowEmojiPicker(false)
                      }}
                      className={`p-2 text-lg rounded hover:bg-white transition-colors ${
                        selectedEmoji === emoji ? 'bg-white shadow-sm' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-field"
              placeholder="https://example.com"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Preview */}
          {title && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
              <div className="flex items-start space-x-3">
                <span className="text-lg">{selectedEmoji}</span>
                <div>
                  <p className="font-medium text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{url}</p>
                  <p className="text-xs text-gray-400 mt-1">Category: {category}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Hash className="w-4 h-4" />
              <span>Posting as @{profile?.username}</span>
            </div>
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? 'Submitting...' : 'Submit Post'}
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ About Farcaster Integration</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your posts will appear alongside web app users</li>
          <li>• All users can vote and comment on your posts</li>
          <li>• Your Farcaster username will be displayed as the author</li>
          <li>• Posts are shared across both platforms</li>
        </ul>
      </div>
    </div>
  )
} 