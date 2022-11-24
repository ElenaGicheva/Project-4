import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DestinationPage = () => {

  const navigate = useNavigate()

  const [destination, setDestination] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const { destinationId } = useParams()

  const [reviewInput, setReviewInput] = useState({
    description: '',
    text: '',
    destination: parseInt(destinationId)
  })

  useEffect(() => {
    const getSingleDestination = async () => {
      try {
        const { data } = await axios.get(`/api/destinations/${destinationId}`)
        setDestination(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleDestination()
  }, [destinationId])

  const handleReviewSubmit = async () => {
    !userIsAuthenticated() && navigate('/login')
    try {
      await userIsAuthenticated()
      const token = await getTokenFromLocalStorage()
      const reviewData = { ...reviewInput, destination: parseInt(destinationId) }
      await axios.post(`/api/reviews/`, {
        ...reviewData,
      }, {
        headers: {
          Authentication: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).catch((error) => console.log(error))
      const { data } = await axios.get(`/api/destinations/${destinationId}/`)
      setDestination(data)
      const reviewInputToReset = document.querySelectorAll('textarea')
      reviewInputToReset.forEach((input) => input.value = '')
      setReviewInput({ text: '', description: '', destination: destinationId })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      {destination ?
        <>
          <div className="eachDest">
            <img src={destination.background_image} alt={destination.name} />
            <div className="bottom-left"><h1>{destination.name}</h1></div>
            {/* <hr /> */}
          </div>
          <div className="after-bk">
            <Row className="img-details">
              <Col>
                <div className="image">
                  <img className="img" src={destination.image} alt={destination.name} />
                </div>
              </Col>
              <Col>
                <div className="details">
                  <h5>Price: <em>£{destination.price}</em></h5>
                  <h5>Ability Level: <em>{destination.ability_level}</em></h5>
                  <h5>Duration: <em>{destination.duration} days</em></h5>
                </div>
              </Col>
            </Row>
            <Row>
              <hr />
              <Col>
                <div className="description">
                  <h4>Descripton: </h4>
                  <p>{destination.description}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <div className='tags'>
                <hr />
                <h4><em>Tags</em></h4>
                <ul className='tags-display'>
                  {destination.tags.length === 0 ?
                    <p>No tags yet</p>
                    :
                    destination.tags.map(tag => {
                      return (
                        <div className="tags-container" key={tag}>
                          <li>{tag.tag}</li>
                        </div>
                      )
                    })}
                </ul>
                {/* <hr /> */}
              </div>
            </Row>
            <Row>
              <div className="reviews">
                <h4>Reviews</h4>
                <div className="descrip">
                  <textarea rows='1' cols='1' maxLength='30' placeholder=' Holiday Description' onChange={(e) => setReviewInput({ ...reviewInput, description: e.target.value })} id='text-to-reset'></textarea>
                </div>
                <div className="comments">
                  <textarea rows='5' cols='30' maxLength='300' placeholder=' How was your holiday?' onChange={(e) => setReviewInput({ ...reviewInput, text: e.target.value })} id='text-to-reset'></textarea>
                </div>
                <div className='submit-btn'>
                  <button id='s-btn' onClick={handleReviewSubmit}>Submit</button>
                </div>
                <div className='review-display'>
                  {destination.reviews.length === 0 ?
                    <p>No reviews yet</p>
                    :
                    destination.reviews.slice(0).reverse().map((review, id) => <div className="review-container" key={id}>
                      <h6>{review.description}</h6>
                      <p>{review.text}</p>
                      {/* <p>{review.created_at}</p> */}
                    </div>
                    )}
                </div>
              </div>
              <hr />
            </Row>
            <Row>
              <div className="enquire" variant="success">
                <button>Enquire Now</button>
              </div>
            </Row>
          </div>
        </>
        :
        <h2 className="text-center">
          {hasError.error ? 'hmmm... Something went wrong' : 'Loading...'}
        </h2>
      }

    </Container>

  )
}
export default DestinationPage