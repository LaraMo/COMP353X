import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../scss/home.scss';

function App() {
  return (
    <div className="App">
     <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">COVID 19 - COMP 353X</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#people">People</Nav.Link>
          <Nav.Link href="#phcw">Public Health Care Workers</Nav.Link>
          <Nav.Link href="#fac">Facility</Nav.Link>
          <Nav.Link href="#rg">Region</Nav.Link>
          <Nav.Link href="#gz">Groupzone</Nav.Link>
          <Nav.Link href="#hrec">Health Recs</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#addAlert">Add alert</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#addPerson">Add person</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="showMsg">Show all messages</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default App;
