import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
const Navigation = ({data}) => {
  // console.log(data)
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Bryce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link href="/fileupload">Upload</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );



};

export default Navigation;
