import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DestinationPage = () => {

  const [destination, setDestination] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const { destinationId } = useParams()
  console.log(destinationId)

  useEffect(() => {
    const getSingleDestination = async () => {
      try {
        const { data } = await axios.get(`/destinations/${destinationId}`)
        setDestination(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleDestination()
  }, [destinationId])
  // const [destination, setDestination] = useState([])


  // const { continentId } = useParams()
  // const { destinationId } = useParams()
  // console.log(destinationId)

  // useEffect(() => {
  //   const getDestinations = async () => {
  //     try {
  //       const { data } = await axios.get(`/destinations/${continentId}/destinations/${destinationId}/`)
  //       setDestination(data)
  //     } catch (err) {
  //       setHasError({ error: true, message: err.message })
  //     }
  //   }
  //   getDestinations()
  // }, [continentId, destinationId])

  // useEffect(() => {
  //   console.log(destination)
  // })
  return (
    <Container className="eachDest">
      {destination ?
        <div>
          <img className="bk-img" src={destination.background_image} alt={destination.name} />
          <h1>{destination.name}</h1>
          <hr />
          <Row>
            <Col className="image">
              <img className="img" src={destination.image} alt={destination.name} />
              <hr />
            </Col>
            <Col className="descriptions">
              <h4>Price: £{destination.price}</h4>
              <h4>Ability Level: {destination.ability_level}</h4>
              <h4>Duration: {destination.duration}</h4>
              <h4>Descripton: </h4>
              <p>{destination.description}</p>
              <hr />
            </Col>
          </Row>
          <Row>
            <div className="reviews">
              <h4>Reviews</h4>
              <div className="comments">
                <textarea rows='7' cols='30' maxLength='300' placeholder='How was your holiday?'></textarea>
                {/* <textarea rows='7' cols='30' maxLength='300' placeholder='How was your holiday?' onChange={handleReviewInputChange} id='text-to-reset'></textarea> */}
              </div>
              <div className='submit-btn'>
                <button id='s-btn'>Submit</button>
              </div>
              <div className='review-display'>
                {destination.reviews.length === 0 ?
                  <p>No reviews yet</p>
                  :
                  destination.reviews.slice(0).reverse().map((review, index) =>
                    <div className="review-container" key={index} >
                      <p>{review.text}</p>
                    </div>
                  )

                }
              </div>
            </div>
            <hr />
          </Row>
          <Row>
            <div className="enquire">
              <button>Enquire Now</button>
            </div>
          </Row>
        </div>
        :
        <h2 className="text-center">
          {hasError.error ? 'hmmm... Something went wrong' : 'Loading...'}
        </h2>
      }
    </Container>

  )
}
export default DestinationPage