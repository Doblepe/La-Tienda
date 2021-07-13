import { Card, Button, Col,Row,Container } from 'react-bootstrap';
function Tarjeta(props){
    return (<Col xs={6} md={4}>
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
function Tarjetas(props){  
        const prevShowProducts = props.data.map((product, index) => {return(<Tarjeta product={product} index={index}/>)})
    return (<Container>
        <Row>
       {prevShowProducts} 
        </Row>
      </Container>
      )

    
}
export default Tarjetas