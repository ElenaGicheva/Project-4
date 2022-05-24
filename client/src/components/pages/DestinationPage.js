import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const DestinationPage = () => {

  const [destination, setDestination] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const { destinationId } = useParams()
  console.log(destinationId)

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const { data } = await axios.get(`/destinations/${destinationId}/`)
        setDestination(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getDestinations()
  }, [destinationId])

  useEffect(() => {
    console.log(destination)
  })
  return (
    <h2>{destination.name}</h2>
  )
}
export default DestinationPage