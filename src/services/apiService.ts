const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://crypto-news-api-backend-b5addae00d92.herokuapp.com'

interface CacheEntry {
  data: any
  timestamp: number
}

class APIService {
  private cache = new Map<string, CacheEntry>()
  private pendingRequests = new Map<string, Promise<any>>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  async fetch(url: string, options?: RequestInit): Promise<any> {
    const cacheKey = `${url}-${JSON.stringify(options || {})}`
    
    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)
    }

    const promise = this.makeRequest(url, options, cacheKey)
    this.pendingRequests.set(cacheKey, promise)
    
    try {
      const result = await promise
      return result
    } finally {
      this.pendingRequests.delete(cacheKey)
    }
  }

  private async makeRequest(url: string, options?: RequestInit, cacheKey?: string): Promise<any> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Cache the result
      if (cacheKey) {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        })
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Get items by category (fixed to match backend endpoints)
  async getItems(category: string, page: number = 1, type: 'main' | 'newest' | 'ask' | 'show' = 'main'): Promise<any[]> {
    const url = `${API_BASE}/items/${type}/pages/cat`
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ 
        pageNumber: page, 
        cat: category 
      }),
    })
  }

  // Get jobs by category (fixed to match backend endpoints)
  async getJobs(category: string, page: number = 1): Promise<any[]> {
    const url = `${API_BASE}/jobs/jobs/newest/pages/cat`
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ 
        pageNumber: page, 
        cat: category 
      }),
    })
  }

  // Get comments by category (fixed to match backend endpoints)
  async getComments(category: string, page: number = 1): Promise<any[]> {
    const url = `${API_BASE}/comments/comments/newest/pages/cat`
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ 
        pageNumber: page, 
        cat: category 
      }),
    })
  }

  // Vote on an item
  async voteItem(itemId: string, isUpvote: boolean): Promise<any> {
    const url = `${API_BASE}/items/${isUpvote ? 'upVote' : 'downVote'}/${itemId}`
    const username = localStorage.getItem("username")
    return this.fetch(url, { 
      method: 'PUT',
      body: JSON.stringify({ currentUserName: username })
    })
  }

  // Vote on a comment
  async voteComment(commentId: string, isUpvote: boolean): Promise<any> {
    const url = `${API_BASE}/comments/${isUpvote ? 'upVote' : 'downVote'}/${commentId}`
    const username = localStorage.getItem("username")
    return this.fetch(url, { 
      method: 'PUT',
      body: JSON.stringify({ currentUserName: username })
    })
  }

  // Submit new item (same as main app)
  async submitItem(itemData: any): Promise<any> {
    const url = `${API_BASE}/items`
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(itemData),
    })
  }

  // Submit new comment
  async submitComment(commentData: any): Promise<any> {
    const url = `${API_BASE}/comments`
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(commentData),
    })
  }

  // Submit new reply
  async submitReply(replyData: any): Promise<any> {
    const url = `${API_BASE}/replies`
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(replyData),
    })
  }

  // Get single item with comments
  async getItemWithDetails(itemId: string): Promise<any> {
    const url = `${API_BASE}/items/${itemId}`
    return this.fetch(url)
  }

  // Get single comment with replies
  async getCommentWithReplies(commentId: string): Promise<any> {
    const url = `${API_BASE}/comments/${commentId}`
    return this.fetch(url)
  }

  // Delete an item (post)
  async deleteItem(itemId: string): Promise<any> {
    const url = `${API_BASE}/items/${itemId}`
    return this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Delete a comment
  async deleteComment(commentId: string): Promise<any> {
    const url = `${API_BASE}/comments/${commentId}`
    return this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Delete a reply
  async deleteReply(replyId: string): Promise<any> {
    const url = `${API_BASE}/replies/${replyId}`
    return this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Clear cache for specific patterns
  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  // Get cache statistics
  getStats(): { size: number; pendingRequests: number } {
    return {
      size: this.cache.size,
      pendingRequests: this.pendingRequests.size,
    }
  }
}

// Create singleton instance
const apiService = new APIService()
export default apiService 