import { Navbar, Nav, NavDropdown, Button, Badge} from 'react-bootstrap';
import logo from '../assets/IMG_8178-min.jpg'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

const mapStateToProps = state => {
  return{
    cart: state.shop.cart
  }
}
function NavBarLogged({cart}) {
const [cartCount, setCartCount] = useState(0);

useEffect(() =>{
  let count = 0;
  cart.forEach(item => {
    count += item.qty
  });
  setCartCount(count)
},[cart, cartCount])
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
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
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          <NavDropdown title="Productos" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/products">Todos los productos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/femaleCollection" >Moda femenina</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/maleCollection" >Moda Masculina</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/kidCollection" >Moda infantil</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="nav-sesion">
        <Navbar.Brand as={Link} to="/login"><span
                      style={{ fontSize: 20 }}
                      className="mdi mdi-account"
                    /></Navbar.Brand>
          <Navbar.Brand as={Link} to="/cart"><span
                      style={{ fontSize: 20 }}
                      className="mdi mdi-cart"
                    /></Navbar.Brand>
          <Button as={Link} to="/cart" variant="info"><Badge bg="secondary">{cartCount}</Badge>  
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
}
export default connect(mapStateToProps) (NavBarLogged)