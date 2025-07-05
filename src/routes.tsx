import { Routes, Route } from 'react-router-dom'
import { Categories } from './pages/Categories'
import { Home } from './pages/Home'

export const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
  </Routes>
)
