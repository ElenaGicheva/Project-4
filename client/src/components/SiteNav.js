import React from 'react'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Logo from '../images/Logo.png'


const SiteNav = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img className='main-logo' src={Logo} alt='horse logo' /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#register">Register</Nav.Link>
          <Nav.Link href="#Login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
)

export default SiteNav