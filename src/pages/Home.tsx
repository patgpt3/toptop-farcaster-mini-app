import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { NewsItem } from '../components/NewsItem'
import { LoadingSpinner } from '../components/LoadingSpinner'
import apiService from '../services/apiService'
import { TrendingUp, Zap, Gamepad2, Film, Coins, Image, Wifi, FlaskConical } from 'lucide-react'

const categories = [
  { name: 'Crypto', icon: TrendingUp, href: '/crypto', color: '#053eff' },
  { name: 'AI', icon: Zap, href: '/ai', color: 'purple' },
  { name: 'Gaming', icon: Gamepad2, href: '/gaming', color: 'green' },
  { name: 'Film', icon: Film, href: '/film', color: 'red' },
  { name: 'Memecoins', icon: Coins, href: '/memecoins', color: 'green' },
  { name: 'NFT', icon: Image, href: '/nft', color: '#d1d10a' },
  { name: 'DePIN', icon: Wifi, href: '/depin', color: 'red' },
  { name: 'DeSci', icon: FlaskConical, href: '/desci', color: 'orange' },
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
    <div id="root">
      <center>
        <table
          id="hnmain"
          cellPadding="0"
          cellSpacing="0"
          width="85%"
          style={{ backgroundColor: "#f5f8f8" }}
        >
          <tbody>
            <tr>
              <td style={{ backgroundColor: "#053eff" }}>
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                  style={{ padding: "2px" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ lineHeight: "12pt", height: "18px" }}>
                        <span className="pagetop" style={{ color: "white" }}>
                          <b className="hnname" style={{ color: "white" }}>
                            <a
                              style={{ color: "white", marginLeft: "3px" }}
                              href="/"
                            >
                              TopTop Network
                            </a>{" "}
                          </b>
                          <a href="/submit" style={{ color: "white" }}>
                            submit
                          </a>{" "}
                          |{" "}
                          <a style={{ color: "white" }} href="/">
                            home
                          </a>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                  style={{ backgroundColor: "#f5f8f8" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          {categories.map((category) => (
                            <div key={category.name} style={{ display: "inline-block", marginRight: "15px" }}>
                              <Link
                                to={category.href}
                                style={{ 
                                  color: category.color, 
                                  textDecoration: "none",
                                  fontWeight: selectedCategory === category.name ? "bold" : "normal"
                                }}
                                onClick={() => setSelectedCategory(category.name)}
                              >
                                <u>{category.name}</u>
                              </Link>
                            </div>
                          ))}
                        </div>
                        
                        {posts && posts.length > 0 && (
                          <table cellPadding="0" cellSpacing="0" width="100%">
                            <tbody>
                              {posts.map((post: any, index: number) => (
                                <NewsItem
                                  key={post._id}
                                  id={post._id}
                                  title={post.title}
                                  url={post.url}
                                  author={post.author}
                                  points={post.points || 0}
                                  comments={post.comments ? post.comments.length : 0}
                                  createdAt={post.createdAt}
                                  category={post.category}
                                  emoji={post.emoji || '📰'}
                                  onVote={handleVote}
                                  hasVoted={false}
                                  index={index + 1}
                                />
                              ))}
                            </tbody>
                          </table>
                        )}

                        {posts && posts.length === 0 && !isLoading && (
                          <div style={{ textAlign: "center", padding: "40px", color: "#828282" }}>
                            <p>No posts found in {selectedCategory}</p>
                            <p style={{ fontSize: "12px", marginTop: "5px" }}>Be the first to share something!</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  )
} 