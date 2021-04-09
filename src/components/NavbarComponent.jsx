import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"> 🦠COVID 19 - COMP 353X</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Person">
              <NavDropdown.Item href="/1">1</NavDropdown.Item>
              <NavDropdown.Item href="/9">9</NavDropdown.Item>
              <NavDropdown.Item href="/11">11</NavDropdown.Item>
              <NavDropdown.Item href="/14">14</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Public Health Worket">
              <NavDropdown.Item href="/2">2</NavDropdown.Item>
              <NavDropdown.Item href="/16">16</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Facility">
              <NavDropdown.Item href="/3">3</NavDropdown.Item>
              <NavDropdown.Item href="/12">12</NavDropdown.Item>
              <NavDropdown.Item href="/15">15</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Region">
              <NavDropdown.Item href="/4">4</NavDropdown.Item>
              <NavDropdown.Item href="/13">13</NavDropdown.Item>
              <NavDropdown.Item href="/17">17</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="GroupZone">
              <NavDropdown.Item href="/5">5</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Add Alert">
              <NavDropdown.Item href="/7">7</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Follow up form">
              <NavDropdown.Item href="/8">8</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Public Health Rec">
              <NavDropdown.Item href="/10">10</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
