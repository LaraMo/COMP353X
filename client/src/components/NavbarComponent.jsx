import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"> 🦠COVID 19 - COMP 353X</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Person">
            <NavDropdown.Item href="/1">CRUD Person</NavDropdown.Item>
            <NavDropdown.Item href="/9">Date People Symptoms</NavDropdown.Item>
            <NavDropdown.Item href="/11">People By Address</NavDropdown.Item>
            <NavDropdown.Item href="/14">People By Date</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Public Health Worker">
            <NavDropdown.Item href="/2">Public Health Worker</NavDropdown.Item>
            <NavDropdown.Item href="/16">Infceted Workers</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Facility">
            <NavDropdown.Item href="/3">CRUD Facility</NavDropdown.Item>
            <NavDropdown.Item href="/12">Detailed Facility</NavDropdown.Item>
            <NavDropdown.Item href="/15">Workers Per Facility</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Region">
            <NavDropdown.Item href="/4">CRUD Region</NavDropdown.Item>
            <NavDropdown.Item href="/13">Detailed Region</NavDropdown.Item>
            <NavDropdown.Item href="/17">Region Report</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="GroupZone">
            <NavDropdown.Item href="/5">CRUD GroupZone</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Add Alert">
            <NavDropdown.Item href="/7">Add Alert</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Follow up form">
            <NavDropdown.Item href="/8">Follow Up Form</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Public Health Rec">
          <NavDropdown.Item href="/6">CRUD PHCR</NavDropdown.Item>
            <NavDropdown.Item href="/10">Messages</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
