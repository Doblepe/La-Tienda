import { Navbar, Nav, Form, Button,FormControl,NavDropdown  } from 'react-bootstrap';
import {useState} from 'react-dom';

function NavBarComp(){
 const [imput, setImput] = useState('')
    return<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Inicio</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Política de envíos</Nav.Link>
        <Nav.Link href="#link">Contacto</Nav.Link>
        <NavDropdown title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Moda femenina</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Moda Masculina</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Moda infantil</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>{setImput(e.target.value)}}/>
        <Button variant="outline-success">Buscar</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
}
export default NavBarComp