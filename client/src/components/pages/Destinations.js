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
  const [filtDest, setFiltDest] = useState([])
  const [newFilterDest, setNewFilterDest] = useState([])


  const { continentId } = useParams()
  // console.log(continentId)

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get(`/continents/${continentId}`)
        setContinent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [continentId])


  useEffect(() => {
    const getDestinations = async () => {
      const { data } = await axios.get('/destinations/')
      setDestinations(data)
    }
    getDestinations()
  }, [])

  useEffect(() => {
    if (destinations.length) {
      const filteredDest = []
      destinations.forEach(filterDest => {
        filteredDest.indexOf(filterDest) === -1 && filteredDest.push(filterDest)
      })
      setFiltDest(filteredDest)
    }
  }, [destinations])

  const updatedFilteredDest = (e) => {
    const filteredContDest = destinations.filter(destination => destination.continent.id === e.target.value)
    setNewFilterDest(filteredContDest)
  }

  return (
    <>
      <div className="cont-name">
        <img className="img" src={continent.image} alt="" />
        <div className="bottom-left"><h2><em>{continent.name}</em></h2></div>
      </div>
      <Container className="mt-4" onChange={updatedFilteredDest}>
        <Row>
          {filtDest.map((filterDest, i) => <option key={i} value={filterDest}></option>) ?
            <>
              {(newFilterDest.length ? newFilterDest : destinations).map((filtDest, i) => {
                // console.log(filterDest)
                return (
                  <Col key={i} xs="2" md="4" className="destinations mb-4">
                    <Link to={`destinations/${filtDest.id}`}>
                      <Card className="destination-card">
                        <Card.Img variant="bottom" src={filtDest.image} />
                        <Card.Body>
                          <Card.Footer className="text-center">
                            {filtDest.name}
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </>
            :
            <h2 className="text-center">
              {hasError.error ? 'hmmm... Something went wrong' : 'Loading...'}
            </h2>}
        </Row>
      </Container>
    </>
  )
}

export default Destinations