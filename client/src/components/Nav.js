import React from 'react'

// import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Nav = () => (
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

export default Nav