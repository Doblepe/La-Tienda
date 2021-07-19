import { Row,Container } from 'react-bootstrap';
import { connect } from "react-redux";
import Product from './Product';

const mapStateToProps = state =>{
    return {
      products: state.shop.products,
    }
}
function maleCollectionComp({products}) {
    return (<Container>
        <Row>
        {products.filter((el)=>{return el.collection==='male'}).map((prod) => {return(<Product key={prod.id}productData={prod}/>)})}
        </Row>
    </Container>)
}

export default connect(mapStateToProps)(maleCollectionComp)