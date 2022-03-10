import React from 'react'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from './helpers/auth'

const SiteNavbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('teachers-token')
    navigate('/')
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Black Knight</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) 
}

export default Nav