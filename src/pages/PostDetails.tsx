import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ArrowLeft, MessageCircle, Trash2, ThumbsUp, ThumbsDown } from 'lucide-react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useFarcasterAuth } from '../hooks/useFarcasterAuth'
import { useDeleteItem } from '../hooks/useDeleteItem'
import apiService from '../services/apiService'

export function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { username, isAuthenticated } = useFarcasterAuth()
  const { deleteItem, deleteComment, deleteReply } = useDeleteItem()
  const [commentText, setCommentText] = useState('')
  const [replyText, setReplyText] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Fetch post details
  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => apiService.getItemWithDetails(id!),
    enabled: !!id,
  })

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: async (commentData: any) => {
      return apiService.submitComment(commentData)
    },
    onSuccess: () => {
      setCommentText('')
      queryClient.invalidateQueries({ queryKey: ['post', id] })
    },
    onError: (error) => {
      console.error('Comment submission failed:', error)
      alert('Failed to submit comment. Please try again.')
    }
  })

  // Submit reply mutation
  const submitReplyMutation = useMutation({
    mutationFn: async (replyData: any) => {
      return apiService.submitReply(replyData)
    },
    onSuccess: () => {
      setReplyText('')
      setReplyingTo(null)
      queryClient.invalidateQueries({ queryKey: ['post', id] })
    },
    onError: (error) => {
      console.error('Reply submission failed:', error)
      alert('Failed to submit reply. Please try again.')
    }
  })

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ itemId, isUpvote }: { itemId: string; isUpvote: boolean }) => {
      return apiService.voteItem(itemId, isUpvote)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
    },
    onError: (error) => {
      console.error('Vote failed:', error)
      alert('Failed to vote. Please try again.')
    }
  })

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please connect your Farcaster account to comment')
      return
    }

    if (!commentText.trim()) {
      alert('Please enter a comment')
      return
    }

    const commentData = {
      body: commentText.trim(),
      author: username,
      itemId: id,
      createdAt: new Date().toISOString(),
      platform: 'farcaster'
    }

    submitCommentMutation.mutate(commentData)
  }

  const handleSubmitReply = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please connect your Farcaster account to reply')
      return
    }

    if (!replyText.trim()) {
      alert('Please enter a reply')
      return
    }

    const replyData = {
      body: replyText.trim(),
      author: username,
      commentId: commentId,
      createdAt: new Date().toISOString(),
      platform: 'farcaster'
    }

    submitReplyMutation.mutate(replyData)
  }

  const handleVote = async (itemId: string, isUpvote: boolean) => {
    if (!isAuthenticated) {
      alert('Please connect your Farcaster account to vote')
      return
    }
    voteMutation.mutate({ itemId, isUpvote })
  }

  if (postLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (postError || !post) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Failed to load post</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Feed</span>
      </button>

      {/* Post Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-toptop-blue rounded-lg flex items-center justify-center">
              <span className="text-2xl">{post.emoji || '📰'}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h1>
                <p className="text-sm text-gray-500 mb-2">
                  by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm break-all"
                >
                  {post.url}
                </a>
              </div>
              
              {/* Delete Button */}
              {username === post.author && (
                <button
                  onClick={() => deleteItem(post._id, post.author)}
                  className="text-red-600 hover:text-red-800 p-2"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Vote Buttons */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={() => handleVote(post._id, true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.points || 0}</span>
              </button>
              <button
                onClick={() => handleVote(post._id, false)}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments?.length || 0} comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-toptop-blue focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={submitCommentMutation.isPending}
              className="btn-primary disabled:opacity-50"
            >
              {submitCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment: any) => (
              <div key={comment._id} className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      {comment.author} • {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-900 mb-2">{comment.body}</p>
                    
                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleVote(comment._id, true)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-green-600 text-sm"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.points || 0}</span>
                      </button>
                      <button
                        onClick={() => handleVote(comment._id, false)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Reply
                      </button>
                      {username === comment.author && (
                        <button
                          onClick={() => deleteComment(comment._id, comment.author)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment._id && (
                      <form onSubmit={(e) => handleSubmitReply(e, comment._id)} className="mt-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-toptop-blue focus:border-transparent"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitReplyMutation.isPending}
                            className="btn-primary disabled:opacity-50"
                          >
                            {submitReplyMutation.isPending ? 'Posting...' : 'Post Reply'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 ml-4 space-y-3">
                        {comment.replies.map((reply: any) => (
                          <div key={reply._id} className="border-l-2 border-gray-200 pl-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">
                                  {reply.author} • {new Date(reply.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-900 mb-2">{reply.body}</p>
                                
                                {/* Reply Actions */}
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleVote(reply._id, true)}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-green-600 text-sm"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{reply.points || 0}</span>
                                  </button>
                                  <button
                                    onClick={() => handleVote(reply._id, false)}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </button>
                                  {username === reply.author && (
                                    <button
                                      onClick={() => deleteReply(reply._id, reply.author)}
                                      className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  )
} 