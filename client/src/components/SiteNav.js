// import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import { getPayload } from './helpers/auth'

import Logo from '../images/Logo.png'
import { userIsAuthenticated } from './helpers/auth'


const SiteNav = () => {

  console.log(userIsAuthenticated())

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('horseTrip-token')
    navigate('/')
  }

  return (
    <Container>
      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/"><img className='main-logo' src={Logo} alt='horse-logo' /></Navbar.Brand>
        <Nav className="justify-content-end">
          {userIsAuthenticated() ?
            <>
              <Nav.Item onClick={handleLogout}>
                <span>Logout</span>
              </Nav.Item>
            </>
            :
            <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          }
        </Nav>
      </Navbar>
    </Container>
  )
}

export default SiteNav