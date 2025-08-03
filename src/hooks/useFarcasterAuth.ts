import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'

export function useFarcasterAuth() {
  const { 
    login, 
    logout, 
    authenticated, 
    user, 
    ready 
  } = usePrivy()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (authenticated && user) {
      // Use Farcaster username if available, otherwise use Privy user ID
      const farcasterUsername = user.farcaster?.username || user.id
      setUsername(farcasterUsername)
      
      // Store in localStorage for API compatibility
      localStorage.setItem('username', farcasterUsername)
      localStorage.setItem('farcaster_user', JSON.stringify({
        username: farcasterUsername,
        displayName: user.farcaster?.displayName || user.id,
        pfp: user.farcaster?.pfp || '',
        fid: user.farcaster?.fid || user.id
      }))
    } else {
      setUsername(null)
      localStorage.removeItem('username')
      localStorage.removeItem('farcaster_user')
    }
  }, [authenticated, user])

  const getAuthHeaders = () => {
    if (!username) return {}
    
    return {
      'X-Farcaster-User': username,
      'X-Farcaster-FID': user?.farcaster?.fid?.toString() || user?.id || '',
      'X-Platform': 'farcaster'
    }
  }

  const isAuthenticated = () => {
    return authenticated && !!username
  }

  return {
    isConnected: authenticated,
    profile: user?.farcaster,
    username,
    connect: login,
    disconnect: logout,
    getAuthHeaders,
    isAuthenticated: isAuthenticated(),
    ready
  }
} 