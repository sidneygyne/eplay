import { Routes, Route } from 'react-router-dom'
import { Product } from './pages/Product'
import { Categories } from './pages/Categories'
import { Home } from './pages/Home'

export const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/product/:id" element={<Product />} />
  </Routes>
)
