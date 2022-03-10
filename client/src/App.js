import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Nav from './components/Nav'
import Home from './components/Home'
<<<<<<< HEAD
import Destinations from './components/pages/Destination'
=======
import Destinations from './components/pages/Destinations'
>>>>>>> c6b7683ca8b43a5b6fb965d0eea3a3f7ee4fd35f
// import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/continents/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations/:continentId" element={<Destinations />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
