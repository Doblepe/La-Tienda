import {Card, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart} from '../redux/shopping/shopping-actions'

function Product({productData, addToCart}){
  
    return (<Col xs={12} md={3} lg={4}>
        <Card style={{ width: '18rem' }} key={productData.index}>
        <Card.Img variant="top" src ={productData.url_img} alt={productData.title} />
         <Card.Body>
         <Card.Title>{productData.title}</Card.Title>
         <Card.Text>{productData.price} EUR. </Card.Text>
        <Button onClick={()=>addToCart(productData.id)}variant="dark"  >Añadir al carrito</Button>
        </Card.Body>
        </Card>
        </Col>)
  }
  const mapDispatchToProps = dispatch =>{
      return {
          addToCart: (id)=>dispatch(addToCart(id))
      }
  }
  export default connect(null,mapDispatchToProps)(Product);