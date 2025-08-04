import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
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
  )
}

export default App 