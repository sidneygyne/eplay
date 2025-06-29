import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Banner } from './components/Banner'
import { Header } from './components/Header'
import { EstiloGlobal } from './styles'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Banner />
  }
])

function App() {
  return (
    <>
      <EstiloGlobal />
      <div className="container">
        <Header />
      </div>
      <RouterProvider router={rotas} />
    </>
  )
}

export default App
