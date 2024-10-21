import Header from "./components/Header"
import Home from "./pages/Home"
import HambMenu from "./components/HambMenu"
import { StatusProvider } from "./Context"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

function App() {

  return (

    <StatusProvider>
      <BrowserRouter>
      <Header />
      <HambMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </StatusProvider>

  )
}

export default App