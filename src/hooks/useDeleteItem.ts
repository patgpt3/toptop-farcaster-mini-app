import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../services/apiService'
import { useFarcasterAuth } from './useFarcasterAuth'

export function useDeleteItem() {
  const queryClient = useQueryClient()
  const { username } = useFarcasterAuth()

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return apiService.deleteItem(itemId)
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Delete failed:', error)
      alert('Failed to delete post. Please try again.')
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      return apiService.deleteComment(commentId)
    },
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (error) => {
      console.error('Delete comment failed:', error)
      alert('Failed to delete comment. Please try again.')
    }
  })

  const deleteReplyMutation = useMutation({
    mutationFn: async (replyId: string) => {
      return apiService.deleteReply(replyId)
    },
    onSuccess: () => {
      // Invalidate and refetch replies
      queryClient.invalidateQueries({ queryKey: ['replies'] })
    },
    onError: (error) => {
      console.error('Delete reply failed:', error)
      alert('Failed to delete reply. Please try again.')
    }
  })

  const handleDeleteItem = async (itemId: string, author: string) => {
    if (!username) {
      alert('Please connect your Farcaster account to delete posts')
      return
    }

    if (username !== author) {
      alert('You can only delete your own posts')
      return
    }

    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deleteItemMutation.mutate(itemId)
    }
  }

  const handleDeleteComment = async (commentId: string, author: string) => {
    if (!username) {
      alert('Please connect your Farcaster account to delete comments')
      return
    }

    if (username !== author) {
      alert('You can only delete your own comments')
      return
    }

    if (confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      deleteCommentMutation.mutate(commentId)
    }
  }

  const handleDeleteReply = async (replyId: string, author: string) => {
    if (!username) {
      alert('Please connect your Farcaster account to delete replies')
      return
    }

    if (username !== author) {
      alert('You can only delete your own replies')
      return
    }

    if (confirm('Are you sure you want to delete this reply? This action cannot be undone.')) {
      deleteReplyMutation.mutate(replyId)
    }
  }

  return {
    deleteItem: handleDeleteItem,
    deleteComment: handleDeleteComment,
    deleteReply: handleDeleteReply,
    isDeletingItem: deleteItemMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
    isDeletingReply: deleteReplyMutation.isPending,
  }
} 