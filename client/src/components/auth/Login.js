import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormError('')
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('horseTrip-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('auth/login/', formData)
      //console.log('token', data.token)
      setTokenToLocalStorage(data.token)
      navigate('/')
    } catch (err) {
      console.log(err.response)
      setFormError(err.response.data.message)
    }
  }


  return (
    <div className="form-page">
      <Container>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Login</h2>
          <div className="form-fields">
            <Form.Group className='mb-2'>
              <Form.Label htmlFor='email'>Email Address</Form.Label>
              <Form.Control onChange={handleChange} type="email" name="email" placeholder='E.g. horses@email.com' defaultValue={formData.email} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control onChange={handleChange} type="password" name="password" placeholder='Password' defaultValue={formData.password} />
              {formError && <Form.Text>{formError}</Form.Text>}
            </Form.Group>
          </div>
          <Form.Group className='mt-4 text-center'>
            <Button variant="success" type="submit">Log in</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Login