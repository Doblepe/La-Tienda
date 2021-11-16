import { Row, Container, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import Product from './Product';


const mapStateToProps = state => {
  return {
    products: state.shop.products,
  }
}
function Products({ products }) {
  return (<Container fluid className="Card-container">
    <Col xs md={12}>
      <Row>
        {products.map((prod) => { return (<Product key={prod.id} productData={prod} />) })}
      </Row>
    </Col>
  </Container>
  )
}
export default connect(mapStateToProps)(Products);

