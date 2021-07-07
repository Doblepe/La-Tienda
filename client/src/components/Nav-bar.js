import { Navbar, Nav, Button,NavDropdown  } from 'react-bootstrap';

function NavBarComp(){
  
    return(
      
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <img
        src="adfadsfasd"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt=""
      /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="#link">Contacto</Nav.Link>
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item href="/products">Todos los productos</NavDropdown.Item>
          <NavDropdown.Item href="/products/femaleCollection">Moda femenina</NavDropdown.Item>
          <NavDropdown.Item href="/products/maleCollection">Moda Masculina</NavDropdown.Item>
          <NavDropdown.Item href="/products/kidCollection">Moda infantil</NavDropdown.Item>
        </NavDropdown>
      </Nav>
        <Button variant="outline-success" /* onClick={history.push('/login')} */>Sesión</Button>
    </Navbar.Collapse>
  </Navbar>)
}
export default NavBarComp