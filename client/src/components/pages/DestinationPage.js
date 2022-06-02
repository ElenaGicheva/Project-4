import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from '../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DestinationPage = () => {

  const navigate = useNavigate()

  const [destination, setDestination] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const [currentUser, setCurrentUser] = useState()
  const [reviewInput, setReviewInput] = useState({
    text: ''
  })

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

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/authentication/${payload.sub}`)
        setCurrentUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [destination])

  const handleReviewInputChange = (e) => {
    setReviewInput({ ...reviewInput, text: `${currentUser.username} says: ${e.target.value}` })
  }

  const handleReviewSubmit = async () => {
    !userIsAuthenticated() && navigate('/login')
    try {
      await axios.post(`/api/destinations/${destination.id}/reviews`, reviewInput, {
        header: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      const { data } = await axios.get(`/api/destinations/${destinationId}`)
      setReviewInput(data)
      document.getElementById('text-to-reset').value = ''
      setReviewInput({
        text: ''
      })
    } catch (error) {
      console.log(error)
    }
  }


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
              <h5>Price: £{destination.price}</h5>
              <h5>Ability Level: {destination.ability_level}</h5>
              <h5>Duration: {destination.duration}</h5>
              <hr />
              <h5>Descripton: </h5>
              <p>{destination.description}</p>
              <hr />
            </Col>
          </Row>
          <Row>
            <div className='tags'>
              <h4><em>Tags</em></h4>
              <ul className='tags-display'>
                {destination.tags.map(tag => {
                  return <li>{tag}</li>
                })}
              </ul>
              <hr />
            </div>
          </Row>
          <Row>
            <div className="reviews">
              <h4>Reviews</h4>
              <div className="comments">
                <textarea rows='7' cols='30' maxLength='300' placeholder='How was your holiday?' onChange={handleReviewInputChange} id='text-to-reset'></textarea>
              </div>
              <div className='submit-btn'>
                <button id='s-btn' onClick={handleReviewSubmit}>Submit</button>
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