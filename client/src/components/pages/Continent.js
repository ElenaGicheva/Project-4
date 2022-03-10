import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Destinations = () => {

  const [continent, setContinent] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get('/api/destinations/')
        setContinent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [])

  return (
    <h2>Continents</h2>
  )
}

export default Destinations