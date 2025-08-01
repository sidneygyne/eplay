import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { EstiloGlobal } from './styles'
import { Rotas } from './routes'
import { Footer } from './components/Footer'
import { store } from './store'
import { Cart } from './components/Cart'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <EstiloGlobal />
        <div className="container">
          <Header />
        </div>
        <Rotas />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App
