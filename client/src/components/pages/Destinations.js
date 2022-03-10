import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Destinations = () => {

  const [continent, setContinent] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  
  const { continentId } = useParams()
  console.log(continentId)

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const { data } = await axios.get(`/api/continents/${continentId}/`)
        setContinent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
<<<<<<< HEAD:client/src/components/pages/Destination.js
    getDestinations()
  }, [])

=======
    getContinents()
  }, [continentId])
  
  useEffect(() => {
    console.log(continent)
  })
>>>>>>> c6b7683ca8b43a5b6fb965d0eea3a3f7ee4fd35f:client/src/components/pages/Destinations.js
  return (
    <h2>Continents</h2>
  )
}

export default Destinations