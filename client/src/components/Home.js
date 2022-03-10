import React, { useState, useEffect } from 'react'


import axios from 'axios'

import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
    <>
      <div classname="hero text-center">
        <h2>Home</h2>
        <h4>Discover new scenery for your horse riding vacation.</h4>
        <p>Start by first choosing a Continent</p>
      </div>
    </>
  )
}

export default Home