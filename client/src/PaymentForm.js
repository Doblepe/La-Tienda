import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import CartItem from './components/CartItemComp'
import { connect } from 'react-redux'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function PaymentForm({cart}) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
    return (
        <>
        {!success ? 
        <Container>
        <form onSubmit={handleSubmit}>
            <Row>
            <Col xs ={8} md={10}>
                    <Row>
                        {cart.map(item => (
                            <CartItem key={item.id} itemData={item} />
                        ))}
                    </Row>
                </Col>
            </Row> 
            <Row>   
                <Col>
                        <h5>TOTAL: {totalItems} productos</h5>
                        <h5>TOTAL: {totalPrice} Euros</h5>
                <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
                </Col>
                </Row>
            <Row>
                <Col>
                <button>Pagar</button>
                </Col>
            </Row>
        </form>
        </Container>
        :
        <Container>
            <Row>
                <Col>
                <h5>Pago realizado correctamente. Recibirás tu paquete entre 3 y 5 días laborales</h5>
                <h5>GRACIAS POR CONFIAR EN TU TIENDA</h5>
                </Col>
            </Row>
        </Container>

        }
            
        </>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}
export default connect(mapStateToProps)(PaymentForm)