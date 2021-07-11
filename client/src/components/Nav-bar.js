import { Navbar, Nav, Button,NavDropdown, Popover, OverlayTrigger } from 'react-bootstrap';
import logo from '../assets/IMG_8178-min.jpg'
import {Link} from 'react-router-dom'
import { useState } from 'react';


function NavBarComp(props){

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Inicia tu sesión</Popover.Title>
      <Popover.Content>
        <p>Si eres cliente nuestro entonces inicia sesión <Link to="/login">Click aquí</Link></p>
        <hr/>
        <p>Si no eres cliente nuestro crea tu cuenta <Link to="/registro">Click aquí</Link></p>
      </Popover.Content>
    </Popover>
  );
  const MyAcc = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <Button variant="success">Mi cuenta</Button>
    </OverlayTrigger>
  );

    return(
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <img
        src={logo}
        width="45"
        height="45"
        className="d-inline-block align-top"
        alt=""
      /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="/contacto">Contacto</Nav.Link>
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item href="/products"onClick={()=>props.setSelect('products')}>Todos los productos</NavDropdown.Item>
          <NavDropdown.Item href="/products/femaleCollection" onClick={()=>props.setSelect('femaleCollection')}>Moda femenina</NavDropdown.Item>
          <NavDropdown.Item href="/products/maleCollection"onClick={()=>props.setSelect('maleCollection')}>Moda Masculina</NavDropdown.Item>
          <NavDropdown.Item href="/products/kidCollection" onClick={()=>props.setSelect('kidCollection')}>Moda infantil</NavDropdown.Item>
        </NavDropdown>
      </Nav>
       <MyAcc />
    </Navbar.Collapse>
  </Navbar>)
}
export default NavBarComp