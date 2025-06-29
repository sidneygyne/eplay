import { Banner } from './components/Banner'
import { Header } from './components/Header'
import { EstiloGlobal } from './styles'

function App() {
  return (
    <>
      <EstiloGlobal />
      <div className="container">
        <Header />
      </div>
      <Banner />
    </>
  )
}

export default App
