import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Nav from './components/Nav'
import Home from './components/Home'
import Destinations from './components/pages/Destinations'
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
