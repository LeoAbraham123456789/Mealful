import React from 'react'

// import Navbar from './navbar/Navigationbar'
import Home from './Pages/Home'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (

      <Router>
        <Routes>
          <Route
           path="/"
           element={
             <Home />
           }
         />
        </Routes>
      </Router>
  )
}

export default App
