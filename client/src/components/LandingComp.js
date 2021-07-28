import { Jumbotron, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import maleCard from "../assets/male-card.jpg"
import femaleCard from "../assets/female-card.jpg"
import kidCard from "../assets/kid-card.jpg"


function LandingComp() {
  return (
    <Container fluid>
      <Row>
        {/* ------------------------------------JUMBO -------------------------------- */}
        <Col xs={12} md={12}>
          <Jumbotron className="jumbo">
            <h1 className="font-wheight"><strong>Bienvenidos</strong></h1>
            <h5>
              Aprovecha las rebajas de verano y cambia tu look para por mucho menos de lo que te esperas
            </h5>
            <p>
              <Button variant="primary" as={Link} to="/products">COMPRAR AHORA</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
      {/* ------------------------------------CAJAS DE TARJETAS -------------------------------- */}
      <Row>
        <Col xs={12} md={12}>
          <h1 className="font-wheight"><strong>Oferta especial</strong></h1>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src={maleCard} />
              <Card.Body>
                <Card.Title className="font-wheight">Hombres</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
                <Button variant="dark" as={Link} to="/maleCollection">Ver colección</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src={femaleCard} />
              <Card.Body>
                <Card.Title className="font-wheight"> Mujeres</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
                <Button variant="dark" as={Link} to="/femaleCollection">Ver colección</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src={kidCard}  />
              <Card.Body>
                <Card.Title className="font-wheight">Los niños</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                </Card.Text>
                <Button variant="dark" as={Link} to="/kidCollection">Ver colección</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>)
}
export default LandingComp
