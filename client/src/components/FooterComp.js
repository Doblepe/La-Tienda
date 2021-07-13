import {Container, Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo from '../assets/IMG_8178-min.jpg'
function FooterComp(){

    return(
        <Container className="footer" fluid>
            <Row>
            <Button variant="secondary" size="lg" block onClick={()=>{
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera   
             }}>
            Volver Arriba
            </Button>
            </Row>
            <Row className="footer-content">
            <Col xs={6} md={4}>
                <h5>Contenido</h5>
                <ul>
                    <li><Link to ="/">Inicio</Link></li>
                    <li><Link to ="/contacto">Contacto</Link></li>
                    <li><Link to ="/products">productos</Link></li>
                </ul></Col>
            <Col xs={6} md={4}>
                <h5>Condicinoes de pago</h5>
                <ul>
                    <li><Link to ="/">Inicio</Link></li>
                    <li><Link to ="/contacto">Contacto</Link></li>
                    <li><Link to ="/products">productos</Link></li>
                </ul></Col>
            <Col xs={6} md={4} >
                <h5>Política de envíos</h5>
                <ul>
                    <li><Link to ="/">Inicio</Link></li>
                    <li><Link to ="/contacto">Contacto</Link></li>
                    <li><Link to ="/products">productos</Link></li>
                </ul></Col>           
            </Row>
            <hr/>
            <Row className="justify-content-sm-center">
                <Col className="justify-content-sm-center" >
                <img
                src={logo}
                width="45"
                height="45"
                className="d-inline-block align-top"
                alt="Víctor's Shop"
             />
            <p>Política de copyright © 2021 - Todos los derechos de esta página web quedan reservados</p>
                
                </Col>
            
            </Row>
        </Container>
    )
}
export default FooterComp