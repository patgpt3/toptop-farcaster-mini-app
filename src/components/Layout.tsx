import { ReactNode } from 'react'
import { MiniAppHeader } from './MiniAppHeader'
import { ConnectButton } from './ConnectButton'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini App Header */}
      <MiniAppHeader />
      
      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="/submit"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Submit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 