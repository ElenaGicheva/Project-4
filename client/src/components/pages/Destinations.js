import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Destinations = () => {

  const [continent, setContinent] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const [destinations, setDestinations] = useState([])

  const { continentId } = useParams()
  console.log(continentId)

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get(`/continents/${continentId}/`)
        setContinent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [continentId])

  useEffect(() => {
    // console.log(continent)
  })

  useEffect(() => {
    const getDestinations = async () => {
      const { data } = await axios.get('/destinations/')
      setDestinations(data)
    }
    getDestinations()
  }, [])

  return (
    <Container className="mt-4">
      <h2>{continent.name}</h2>
      <Row>
        {destinations.length ?
          <>
            {destinations.map(destination => {
              console.log(destination)
              return (
                <Col xs="2" md="4" className="destinations mb-4">
                  <Link to={`destinations/${destination.id}`}>
                    <Card className="destination-card" >
                      <Card.Img variant="bottom" src={destination.image} />
                      <Card.Body>
                        <Card.Footer className="text-center">
                          {destination.name}
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </>
          :
          <p>No Horses here Either</p>
        }
      </Row>
    </Container>
  )
}

export default Destinations