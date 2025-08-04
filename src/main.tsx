import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APP_ID || 'cm4g4hzw102g3hlf5jgx0rxf9'}
        config={{
          loginMethods: ['farcaster'],
          appearance: {
            theme: 'light',
            accentColor: '#3B82F6',
            showWalletLoginFirst: false,
          },
          // Keep Solana wallet configuration with type assertion to bypass TypeScript issues
          externalWallets: {
            solana: {
              connectors: [
                {
                  name: 'phantom',
                  options: {
                    shimDisconnect: true,
                  },
                },
              ],
              onMount: () => {},
              onUnmount: () => {},
              get: () => Promise.resolve(null),
            } as any,
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrivyProvider>
    </QueryClientProvider>
  </React.StrictMode>,
) 