import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import Header from './components/Header'

function App() {
  return (
    <>
        <Header />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
    </>
  )
}

export default App
