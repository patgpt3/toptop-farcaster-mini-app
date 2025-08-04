import { Link } from 'react-router-dom'
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
  index: number
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
  hasVoted,
  index
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
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    let interval = seconds / 31536000
    if (interval > 1) return `${Math.floor(interval)} years ago`
    interval = seconds / 2592000
    if (interval > 1) return `${Math.floor(interval)} months ago`
    interval = seconds / 86400
    if (interval > 1) return `${Math.floor(interval)} days ago`
    interval = seconds / 3600
    if (interval > 1) return `${Math.floor(interval)} hours ago`
    interval = seconds / 60
    if (interval > 1) return `${Math.floor(interval)} minutes ago`
    return `${Math.floor(seconds)} seconds ago`
  }

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      return domain
    } catch {
      return url
    }
  }

  return (
    <tr>
      <td className="subtext" style={{ fontSize: "10pt" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td className="votelinks" style={{ verticalAlign: "top", textAlign: "center" }}>
                <div className="votearrow" 
                     style={{
                       width: "10px",
                       height: "10px",
                       border: "0px",
                       margin: "3px 2px 6px",
                       cursor: "pointer",
                       background: hasVoted ? "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMEw5IDZIMFY2TDVaIiBmaWxsPSIjZmY2NjAwIi8+Cjwvc3ZnPgo=')" : "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMEw5IDZIMFY2TDVaIiBmaWxsPSIjODI4MjgyIi8+Cjwvc3ZnPgo=')"
                     }}
                     onClick={() => handleVote(true)}
                     title="upvote"
                ></div>
              </td>
              <td className="title" style={{ verticalAlign: "top", paddingLeft: "2px" }}>
                <span style={{ color: "#828282" }}>{index}. </span>
                <span style={{ fontSize: "18px", marginRight: "4px" }}>{emoji}</span>
                <Link 
                  to={`/post/${id}`}
                  style={{ color: "#000000", textDecoration: "none" }}
                  className="title"
                >
                  {title}
                </Link>
                <span style={{ color: "#828282" }}> </span>
                <span style={{ color: "#828282", fontSize: "8pt" }}>
                  (<a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#828282" }}>
                    {extractDomain(url)}
                  </a>)
                </span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="subtext" style={{ fontSize: "7pt", color: "#828282" }}>
                <span>{points} points</span>
                <span> by </span>
                <a href={`/user/${author}`} style={{ color: "#828282" }} className="hnuser">
                  {author}
                </a>
                <span> </span>
                <span>{formatTime(createdAt)}</span>
                <span> | </span>
                <Link to={`/post/${id}`} style={{ color: "#828282" }}>
                  {comments} comments
                </Link>
                <span> | </span>
                <span style={{ color: "#828282" }}>{category}</span>
                {username === author && (
                  <>
                    <span> | </span>
                    <button
                      onClick={handleDelete}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "#ff0000", 
                        cursor: "pointer",
                        fontSize: "7pt",
                        padding: "0",
                        textDecoration: "underline"
                      }}
                      title="Delete post"
                    >
                      delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
} 