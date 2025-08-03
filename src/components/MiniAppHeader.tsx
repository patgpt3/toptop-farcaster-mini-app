import { useTopTopMiniApp } from '../hooks/useMiniApp'
import { Share2, Home, Menu } from 'lucide-react'

export function MiniAppHeader() {
  const { shareApp, isMiniApp } = useTopTopMiniApp()

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-toptop-blue rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">TopTop Network</h1>
          <p className="text-xs text-gray-500">Crypto • AI • Gaming • Web3</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isMiniApp && (
          <button
            onClick={shareApp}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Share TopTop Network"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 