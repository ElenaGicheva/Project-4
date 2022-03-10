import React, { useEffect } from 'react'


import axios from 'axios'

// import { Container } from 'react-bootstrap'
// import { Row } from 'react-bootstrap/Row'
// import { Col } from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const Home = () => {
  // const [continents, setContinets] = useState([])

  useEffect(() => {
    const getContinents = async () => {
      const { data } = await axios.get('/api/continents/')
      console.log(data)
    }
    getContinents()
  }, [])

  return (
    <div className="site-wrapper">
      <div className="text-center">
        <div className="background-image">
          <h2 className="display-2">🐴 Horse trips 🐎</h2>
          <h4>Discover new scenery for your horse riding vacation.</h4>
          <p>Start by first choosing a Continent</p>
          <div className="continent-cards">
            <Link to="africa" className='africa-btn'>Africa</Link>
            <Link to="americas" className='americas-btn'>Americas</Link>
            <Link to="europe" className='europe-btn'>Europe</Link>
            <Link to="asia" className='asia'>Asia and Astralasia</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home