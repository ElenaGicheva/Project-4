import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
  // navigate
  const navigate = useNavigate()

  // const [formErrors, setFormErrors] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    // first_name: '',
    // last_name: '',
    password: '',
    password_confirmation: '',
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    //console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('auth/register/', formData)
      navigate('/login')
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data.errors })
      // (err.response.data.errors)
    }
  }

  return (
    <section className="form-page">
      <Container>
        <Form onSubmit={handleSubmit} className="mt-4">
          <h2>Register</h2>
          {/* Username */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            {formErrors.username &&
              <Form.Text>{formErrors.username}</Form.Text>
            }
          </Form.Group>
          {/* Email */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={formData.email}
            />
            {/* {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>} */}
          </Form.Group>
          {/* First name */}
          {/* <Form.Group className="mb-2">
            <Form.Label htmlFor="first_name">First name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="first_name"
              placeholder="First name"
              defaultValue={formData.first_name}
            />
            {formErrors.username && (
              <Form.Text>{formErrors.first_name}</Form.Text>
            )}
          </Form.Group> */}
          {/* Last name */}
          {/* <Form.Group className="mb-2">
            <Form.Label htmlFor="last_name">Last name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="last_name"
              placeholder="Last name"
              defaultValue={formData.last_name}
            />
            {formErrors.username && (
              <Form.Text>{formErrors.last_name}</Form.Text>
            )}
          </Form.Group> */}
          {/* Password */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={formData.password}
            />
            {/* {formErrors.password && (
              <Form.Text>{formErrors.password}</Form.Text>
            )} */}
          </Form.Group>
          {/* Password Confirmation */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="password_confirmation">
              Confirm Password
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              defaultValue={formData.password_confirmation}
            />
            {/* {formErrors.passwordConfirmation && (
              <Form.Text>{formErrors.passwordConfirmation}</Form.Text>
            )} */}
          </Form.Group>
          {/* Submit */}
          <Form.Group className="text-center mt-4">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  )
}

export default Register