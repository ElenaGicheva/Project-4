import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [continents, setContinets] = useState([])

  useEffect(() => {
    const getContinents = async () => {
      const { data } = await axios.get('/api/continents/')
      console.log(data)
    }
    getContinents()
  }, [])

  return (

  )
}

export default Home