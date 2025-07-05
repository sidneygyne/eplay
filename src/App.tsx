import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { EstiloGlobal } from './styles'
import { Rotas } from './routes'

function App() {
  return (
    <BrowserRouter>
      <EstiloGlobal />
      <div className="container">
        <Header />
      </div>
      <Rotas />
    </BrowserRouter>
  )
}

export default App
