import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function FooterComp(){
    return(
        <Container ClassName="footer" fluid>
            <Row>
                <Col>
                <h5>Contenido</h5>
                <ul>
                    <li><Link to ="/">Inicio</Link></li>
                    <li><Link to ="/contact">Contacto</Link></li>
                    <li><Link to ="/products">productos</Link></li>
                </ul></Col>

                <Col><h1>Hola Mundo</h1></Col>
                <Col><h1>Hola Mundo</h1></Col>
            </Row>
            <hr/>
            <Row className="justify-content-md-center">
            <img src=""/>
            <p>Política de ajsklfjasldk</p>
            </Row>
        </Container>
    )
}
export default FooterComp