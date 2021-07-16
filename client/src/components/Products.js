import { Card, Button, Col,Row,Container } from 'react-bootstrap';
import {connect} from 'react-redux'
import shopReducer from '../redux/shopping/shopping-reducer';
import Product from './Product';

//https://www.youtube.com/watch?v=MNs_7avLIJ4&ab_channel=TheFullStackJunkie EN EL MIN 28:18

const mapStateToProps = state =>{
  return {
    products: state.shop.products,
  }
}
function Products({products}){ 
  return  ( <Container fluid>
  <Row>
  {products.map((prod) => {return(<Product key={prod.id}productData={prod}/>)})}
  </Row>
</Container>
) 
    
   /*  return (<Container fluid>
        <Row>
       {prevShowProducts} 
        </Row>
      </Container>
      ) */
}
export default connect(mapStateToProps)(Products);