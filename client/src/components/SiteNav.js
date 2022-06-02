import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Logo from '../images/Logo.png'
import { userIsAuthenticated } from './helpers/auth'


const SiteNav = () => {

  const ref = useRef()
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState({})

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     try {
  //       const payload = getPayload()
  //       const { data } = await axios.get(`/api/authentication/$${payload.sub}`)
  //       setCurrentUser(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getCurrentUser()
  // }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('horseTrip-token')
    navigate('/')
  }

  return (

    <Navbar expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img className='main-logo' src={Logo} alt='horse-logo' /></Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default SiteNav