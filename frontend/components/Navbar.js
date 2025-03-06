"use client";  // Ensure this is at the very top

import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { usePathname } from 'next/navigation';

const CustomNavbar = () => {
  const showAnchorLinks = usePathname() === '/';
  return (
    <Navbar className="p-3 mb-2 text-white" bg='dark' data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} href="/">My Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">Main</Nav.Link>
            {/* Show anchor links only in a relevant page */}
            {showAnchorLinks ? (
              <>
                <Nav.Link as={Link} href="#about">About Me</Nav.Link>
                <Nav.Link as={Link} href="#skills">Skills</Nav.Link>
                <Nav.Link as={Link} href="#contact">Contact</Nav.Link>
              </>
            ) : null}
            {/* <Nav.Link as={Link} href="/fuel-prices">Fuel Prices</Nav.Link> */}
            <NavDropdown title="Other" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} href="/fuel-prices">Fuel Prices</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;