import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">COVID 19 - COMP 353X</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/people">People</Nav.Link>
            <Nav.Link href="/publicHealthWorker">Public Health Care Workers</Nav.Link>
            <Nav.Link href="/facility">Facility</Nav.Link>
            <Nav.Link href="/region">Region</Nav.Link>
            <Nav.Link href="/groupZone">Groupzone</Nav.Link>
            <Nav.Link href="/healthRecs">Health Recs</Nav.Link>
            <NavDropdown title="Other" id="basic-nav-dropdown">
              <NavDropdown.Item href="/addAlert">Add alert</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addPersonForm">Add form</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/showAllMessages">Show all messages</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
