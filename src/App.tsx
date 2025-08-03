import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Crypto } from './pages/Crypto'
import { AI } from './pages/AI'
import { Gaming } from './pages/Gaming'
import { Film } from './pages/Film'
import { NFT } from './pages/NFT'
import { Memecoins } from './pages/Memecoins'
import { DePIN } from './pages/DePIN'
import { DeSci } from './pages/DeSci'
import { Submit } from './pages/Submit'
import { PostDetails } from './pages/PostDetails'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || 'cm4g4hzw102g3hlf5jgx0rxf9'}
      config={{
        loginMethods: ['farcaster'],
        appearance: {
          theme: 'light',
          accentColor: '#3B82F6',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/film" element={<Film />} />
              <Route path="/nft" element={<NFT />} />
              <Route path="/memecoins" element={<Memecoins />} />
              <Route path="/depin" element={<DePIN />} />
              <Route path="/desci" element={<DeSci />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </PrivyProvider>
  )
}

export default App 