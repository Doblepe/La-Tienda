import { Navbar, Nav, NavDropdown, Button, Badge} from 'react-bootstrap';
import logo from '../assets/IMG_8178-min.jpg'
import carrito from '../assets/carrito.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

const mapStateToProps = state => {
  return{
    cart: state.shop.cart
  }
}
function NavBarComp({cart}) {
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
          <Nav.Link as={Link} to="/login">Inicia Sesión</ Nav.Link>
          <Nav.Link as={Link} to="/registro">Únete a Nosotros</ Nav.Link>
          <Navbar.Brand as={Link} to="/cart">
        <img
          src={carrito}
          width="25"
          height="25"
          className="d-inline-block align-top"
          alt=""
        /></Navbar.Brand>
          <Button as={Link} to="/cart" variant="info"><Badge bg="secondary">{cartCount}</Badge>  
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
}
export default connect(mapStateToProps) (NavBarComp)