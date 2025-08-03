import { useFarcasterAuth } from '../hooks/useFarcasterAuth'

export function MiniAppHeader() {
  const { username, profile } = useFarcasterAuth()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-toptop-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">TopTop Network</h1>
              <p className="text-xs text-gray-500">Farcaster Mini App</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            {username ? (
              <div className="flex items-center space-x-2">
                {profile?.pfp && (
                  <img
                    src={profile.pfp}
                    alt={username}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">@{username}</p>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 