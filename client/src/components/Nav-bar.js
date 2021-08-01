import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from '../assets/LOGO.jpg'
import { Link } from 'react-router-dom'

function NavBarComp(props) {
  return (
    <Navbar className="font-wheight" bg="light" expand="lg">
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
}
export default NavBarComp