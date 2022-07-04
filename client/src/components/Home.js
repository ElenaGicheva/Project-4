import React, { useEffect, useState } from 'react'
import axios from 'axios'

//import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const Home = () => {

  const [continents, setContinents] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    const getContinents = async () => {
      try {
        const { data } = await axios.get('continents/')
        setContinents(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getContinents()
  }, [])

  return (
    <div className="site-wrapper">
      <div className="text-center">
        <div className="background-image">
          <h1 className="display-1"><em>
            Horse Outdoors
          </em></h1>
          <h3>Discover new scenery for your horse riding vacations.</h3>
          <p>Start your journey by choosing a continent</p>
        </div>
        <div className="continent-cards mb-3">
          <Row>
            {continents.length ?
              <>
                {continents.map(continent => {
                  const { name, id, image } = continent
                  console.log(continent)
                  return (
                    <Col key={id} xs="1" sm="2" md="4" className="continents mb-4">
                      <Link to={`destinations/${id}`}>
                        <Card className="continent-card" >
                          <Card.Img variant="bottom" src={image} />
                          <Card.Body>
                            <Card.Footer className="text-center">
                              {name}
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
              </h2>
            }
          </Row>
        </div>
      </div>
    </div>
  )
}
export default Home