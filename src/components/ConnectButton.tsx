import { usePrivy } from '@privy-io/react-auth'
import { LogIn, LogOut, User } from 'lucide-react'

export function ConnectButton() {
  const { login, logout, authenticated, user, ready } = usePrivy()

  if (!ready) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {user.farcaster?.pfp ? (
            <img
              src={user.farcaster.pfp}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-toptop-blue rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
          <span className="text-sm font-medium text-gray-900">
            @{user.farcaster?.username || user.id}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={login}
      className="flex items-center space-x-2 px-4 py-2 bg-toptop-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
    >
      <LogIn className="w-4 h-4" />
      <span>Connect Farcaster</span>
    </button>
  )
} 