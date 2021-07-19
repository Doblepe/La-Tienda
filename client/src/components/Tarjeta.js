import {Card, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart} from '../redux/shopping/shopping-actions'

function Tarjeta({productData, addToCart}){
  
    return (<Col xs={12} md={4} lg={3}>
        <Card style={{ width: '18rem' }} key={productData.index} id={productData.id}>
        <Card.Img variant="top" src ={productData.url_img} alt={productData.title} />
         <Card.Body>
         <Card.Title>{productData.title}</Card.Title>
         <Card.Text>{productData.price} EUR. </Card.Text>
        <Button onClick={()=>addToCart(productData.id)}variant="primary" >Añadir al carrito</Button>
        </Card.Body>
        </Card>
        </Col>)
  }
  const mapDispatchToProps = dispatch =>{
      return {
          addToCart: (id)=>dispatch(addToCart(id))
      }
  }
  export default connect(null,mapDispatchToProps)(Tarjeta);