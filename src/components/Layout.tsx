import { ReactNode } from 'react'
import { MiniAppHeader } from './MiniAppHeader'
import { ConnectButton } from './ConnectButton'
import { useTopTopMiniApp } from '../hooks/useMiniApp'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isMiniApp } = useTopTopMiniApp()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini App Header */}
      <MiniAppHeader />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Show connect button only if not in Mini App (since Mini Apps auto-authenticate) */}
        {!isMiniApp && (
          <div className="mb-6 flex justify-end">
            <ConnectButton />
          </div>
        )}
        
        {children}
      </main>
      
      {/* Mini App Footer */}
      {isMiniApp && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-xs text-gray-500">Powered by</div>
              <div className="text-sm font-semibold text-toptop-blue">TopTop Network</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 