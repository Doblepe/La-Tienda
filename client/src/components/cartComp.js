import { Container, Row, Col, Button } from 'react-bootstrap'
import CartItem from './CartItemComp'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function CartComp({ cart }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    useEffect(() => {
        let items = 0;
        let price = 0;
        cart.forEach(item => {
            items += item.qty;
            price += item.qty * item.price;
            setTotalPrice(price);
            setTotalItems(items);
        });
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
    return (
        
        <Container className="MainCont">
            <Row>
                <Col xs ={8} md={10}>
                    <Row>
                        {cart.map(item => (
                            <CartItem key={item.id} itemData={item} />
                        ))}
                    </Row>
                </Col>
                <Col xs={12} md={2} className="finalCart">
                    <h5>Productos en el carrito</h5>
                    <div>
                        <span>TOTAL: ({totalItems} productos)</span>
                        <span>TOTAL: ({totalPrice} Euros)</span>
                    </div>
                    <Button variant="success" as={Link} to="/payment" >Realizar Pedido</Button>
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(CartComp)