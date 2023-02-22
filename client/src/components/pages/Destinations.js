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

  const { continentId } = useParams()
  // console.log(continentId)

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get(`/api/continents/${continentId}/`)
        setContinent(data)
        console.log(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [continentId])

  return (
    <>
      <div className="cont-name">
        <img className="img" src={continent.image} alt="" />
        <div className="bottom-left"><h2><em>{continent.name}</em></h2></div>
      </div>
      <Container className="mt-4">
        <Row>
          {continent?.destinations?.length && continent?.destinations?.map((destination, i) => {
            return (
              <Col key={i} xs="2" md="4" className="destinations mb-4">
                <Link to={`destinations/${destination.id}`}>
                  <Card className="destination-card">
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
          <h2 className="text-center">
            {hasError.error && 'hmmm... Something went wrong'}
          </h2>
        </Row>
      </Container>
    </>
  )
}

export default Destinations