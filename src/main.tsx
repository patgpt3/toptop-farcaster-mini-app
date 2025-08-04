import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import App from './App'
import './index.css'

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#053eff', marginBottom: '20px' }}>TopTop Network</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Something went wrong. Please refresh the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#053eff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#053eff' }}>Error Details</summary>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '5px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Debug logging
console.log('Starting app initialization...')
console.log('Environment check:', {
  NODE_ENV: import.meta.env.NODE_ENV,
  VITE_PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID || 'cm4g4hzw102g3hlf5jgx0rxf9'}
          config={{
            loginMethods: ['farcaster'],
            appearance: {
              theme: 'light',
              accentColor: '#053eff',
              showWalletLoginFirst: false,
            },
            defaultChain: 10 as any, // Optimism
            supportedChains: [10, 8453, 7777777] as any[], // Optimism, Base, Zora
            externalWallets: {
              solana: {
                connectors: [
                  {
                    name: 'phantom',
                    options: {
                      shimDisconnect: true,
                    },
                  },
                ] as any,
              },
            },
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PrivyProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
) 