import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SiteNav from './components/SiteNav'
import Home from './components/Home'
import Destinations from './components/pages/Destinations'
import DestinationPage from './components/pages/DestinationPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
// import Footer from './components/Footer'

function App() {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/:continentId" element={<Destinations />} />
          <Route path="/destinations/:continentId/destinations/:destinationId" element={<DestinationPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
