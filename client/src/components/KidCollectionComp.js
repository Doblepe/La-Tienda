import { Row,Container } from 'react-bootstrap';
import { connect } from "react-redux";
import Product from './Product';

const mapStateToProps = state =>{
    return {
      products: state.shop.products,
    }
}
function KidCollectionComp({products}) {
    return (<Container>
        <Row>
        {products.filter((el)=>{return el.collection==='kid'}).map((prod) => {return(<Product key={prod.id}productData={prod}/>)})}
        </Row>
    </Container>)
}

export default connect(mapStateToProps)(KidCollectionComp)