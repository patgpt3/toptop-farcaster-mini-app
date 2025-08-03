import { ReactNode } from 'react'
import { ConnectButton } from './ConnectButton'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="farcaster-mini-app">
      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Simple Footer */}
      <div style={{ 
        textAlign: "center", 
        padding: "10px", 
        fontSize: "8px", 
        color: "#828282",
        borderTop: "1px solid #828282",
        marginTop: "20px"
      }}>
        <span>TopTop Network Farcaster Mini App</span>
      </div>
    </div>
  )
} 