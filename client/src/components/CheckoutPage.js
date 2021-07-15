import { Card, Button, Col,Row,Container } from 'react-bootstrap';
import CheckOutCard from './CheckOutCard';

function Tarjetas(props){    
     const prevShowProducts = props.data.map((product, index) => {return(<CheckOutCard product={product} index={index}/>)})
    return (<Container>
        <Row>
       {prevShowProducts} 
        </Row>
      </Container>
      )
}
function Tarjeta(props){
  return (<Col xs={12} md={4} lg={3}>
      <Card style={{ width: '18rem' }} key={props.index}>
      <Card.Img variant="top" src={props.product.url_img} alt={props.product.title} />
       <Card.Body>
       <Card.Title>{props.product.title}</Card.Title>
       <Card.Text>{props.product.price} EUR. </Card.Text>
      <Button variant="primary" >Añadir al carrito</Button>
      </Card.Body>
      </Card>
      </Col>)
}

export default Tarjetas