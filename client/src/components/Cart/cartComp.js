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

        <Container fluid className="Card-container">
            <Row>
                {cart.length === 0 ?
                    <Col>
                        <h5>Todavía no tienes ningún producto en tu carrito. Vuelve a la tienda y añade cuantos quieras</h5>
                        <Button variant="info" as={Link} to="/products"  >Volver a la tienda</Button>
                    </Col> :
                    <Col>
                        <Col xs md ={12} className="finalCart">
                            <h5 className="font-wheight">Productos en el carrito</h5>
                            <div>
                                <span className="font-wheight">TOTAL:  ({totalItems} productos)</span>
                                <span className="font-wheight">TOTAL:  ({totalPrice} Euros)</span>
                            </div>
                            <Button variant="info" as={Link} to="/payment" >Realizar Pedido</Button>
                        </Col>
                        <hr></hr>
                        <Col xs md={12}>
                            <Row>
                                {cart.map(item => (
                                    <CartItem key={item.id} itemData={item} />
                                ))}
                            </Row>
                        </Col>
                        
                    </Col>}

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