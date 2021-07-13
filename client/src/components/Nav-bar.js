import { Navbar, Nav, NavDropdown,} from 'react-bootstrap';
import logo from '../assets/IMG_8178-min.jpg'
import {Link} from 'react-router-dom'


function NavBarComp(props){

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
        <Nav.Link  as={Link} to="/">Inicio</Nav.Link>
        <Nav.Link as={Link} to= "/contacto">Contacto</Nav.Link>
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/products">Todos los productos</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/femaleCollection" >Moda femenina</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/maleCollection" >Moda Masculina</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/kidCollection" >Moda infantil</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav className="nav-sesion">
      <Nav.Link as={Link} to ="/login">Inicia Sesión</ Nav.Link>
      <Nav.Link as={Link} to ="/registro">Únete a Nosotros</ Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
}
export default NavBarComp