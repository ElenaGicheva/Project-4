import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import axios from 'axios'

import SiteNav from './components/SiteNav'
import Home from './components/Home'
import Destinations from './components/pages/Destinations'
import DestinationPage from './components/pages/DestinationPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
// import Footer from './components/Footer'

function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('api/HorseTrips/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

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
