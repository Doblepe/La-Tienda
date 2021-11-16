import { Row, Container, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import Product from './Product';

const mapStateToProps = state => {
    return {
        products: state.shop.products,
    }
}
function maleCollectionComp({ products }) {
    return (<Container fluid className="Card-container">
        <Row>
            <Col xs md={12}>
                <Row>
                    {products.filter((el) => { return el.collection === 'male' }).map((prod) => { return (<Product key={prod.id} productData={prod} />) })}
                </Row>
            </Col>
        </Row>
    </Container>)
}

export default connect(mapStateToProps)(maleCollectionComp)