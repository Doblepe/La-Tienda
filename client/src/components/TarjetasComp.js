import {Row,Container } from 'react-bootstrap';
import Tarjeta from './Tarjeta'
import { connect } from 'react-redux';



function Tarjetas(props){    
     const prevShowProducts = props.data.map((prod, index) => {return(<Tarjeta key={index} productData={prod} />)})
    return (<Container>
        <Row>
       {prevShowProducts} 
        </Row>
      </Container>
      )
}
const mapStateToProps = state =>{
    return {
      products: state.shop.products,
    }
  }
export default connect(mapStateToProps)(Tarjetas)