import React from 'react'
import { BrowserRouter as Router, Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import AuthForm from "./pages/Auth/AuthForm"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/Authpage' element={<AuthForm/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App