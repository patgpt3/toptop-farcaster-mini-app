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
                      <td style={{ textAlign: "right", paddingRight: "4px" }}>
                        <span
                          className="pagetop"
                          style={{ color: "white", display: "block" }}
                        >
                          <div id="log" style={{ cursor: "pointer" }}>
                            {/* Farcaster Connect Button will be here */}
                          </div>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr id="pagespace" style={{ height: "5px" }}></tr>
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                        {/* Category Navigation */}
                        <div style={{ marginBottom: "10px" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
                            {categories.map((category) => (
                              <div key={category.name} style={{ margin: "5px", marginLeft: "0px" }}>
                                <Link
                                  to={category.href}
                                  style={{ 
                                    color: category.color, 
                                    margin: "5px",
                                    textDecoration: selectedCategory === category.name ? "underline" : "none"
                                  }}
                                  onClick={() => setSelectedCategory(category.name)}
                                >
                                  <u>{category.name}</u>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Posts Feed */}
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
                                category={selectedCategory}
                                emoji={post.emoji || '📰'}
                                onVote={handleVote}
                                hasVoted={false}
                                index={index + 1}
                              />
                            ))
                          ) : (
                            <div style={{ padding: "20px", textAlign: "center", color: "#828282" }}>
                              <p>No posts found in {selectedCategory}</p>
                              <p style={{ fontSize: "9pt", marginTop: "5px" }}>Be the first to share something!</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <img src="./Hacker News_files/s.gif" height="10" width="0" />
                <table width="100%" cellSpacing="0" cellPadding="1">
                  <tbody>
                    <tr>
                      <td style={{ backgroundColor: "#053eff" }}></td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <center
                  style={{
                    fontSize: "8px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    color: "#828282"
                  }}
                >
                  <span>TopTop Network Farcaster Mini App</span>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  )
} 