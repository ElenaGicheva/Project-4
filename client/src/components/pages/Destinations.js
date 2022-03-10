import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Destinations = () => {

  const [continent, setContinent] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  
  const { continentId } = useParams()
  console.log(continentId)

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get(`/api/continents/${continentId}/`)
        setContinent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [continentId])
  
  useEffect(() => {
    console.log(continent)
  })
  return (
    <h2>Continents</h2>
  )
}

export default Destinations