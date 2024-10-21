import Header from "./components/Header"
import Home from "./pages/Home"
import HambMenu from "./components/HambMenu"
import { StatusProvider } from "./Context"

function App() {

  return (

    <StatusProvider>
      <Header />
      <Home />
      <HambMenu />
    </StatusProvider>
    
  )
}

export default App