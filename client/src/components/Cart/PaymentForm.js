import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { connect } from 'react-redux'
import PaymentItem from "./Payment-item"

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
function PaymentForm({ cart }) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    // FORM ADDRESS
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [firstAddress, setFirstAddress] = useState('')
    const [secondAddress, setSecondAddress] = useState('')
    const [Country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [PostData, setPostData] = useState('')
    const [feedback, setFeedback] = useState({ empty: true });
    useEffect(() => {
        let items = 0;
        let price = 0;
        cart.forEach(item => {
            items += item.qty;
            price += item.qty * item.price;
            setTotalPrice(price);
            setTotalItems(items);
        }); return (totalPrice, totalItems)
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
    useEffect(() => { console.log(totalPrice) }, [totalPrice])

    function saveAddress() {
        fetch('http://localhost:3001/address/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                apellidos,
                firstAddress,
                secondAddress,
                Country,
                state,
                PostData
            }),
        })
            .then((res) => res.json())
            .then(function (datos) {
                setFeedback(datos);
                setTimeout(() => { setFeedback({ empty: true }) }, 3000)
            })
    }

    // let amount = totalPrice  no lo recoge de ninguna de las maneras. Da problemas con las cookies. 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 13000,
                    id
                })

                if (response.data.success) {
                    setFeedback("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                setFeedback("Error", error);
                setTimeout(() => { setFeedback({ empty: true }) }, 3000)

            }
        } else {
            setFeedback(error.message);
            setTimeout(() => { setFeedback({ empty: true }) }, 3000)
        }
    }
    return (
        <Container fluid className="Card-container">

            {!success ?
                <>
                    <h2 className="font-wheight">Estás a punto de finalizar tu compra, asegura los detalles:</h2>
                    <h4 className="font-wheight">TOTAL: {totalItems} productos por un valor de {totalPrice} euros</h4>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Col xs md={12}>
                                    <Row>
                                        {cart.map(item => (
                                            <PaymentItem key={item.id} itemData={item} />
                                        ))}
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                        <hr></hr>
                        <div className="Card-container">
                            <Row>
                                <Col>
                                    <h3 className="font-wheight">Dirección de envío</h3>
                                    <hr></hr>
                                    <Form>
                                        <Row>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Nombre" onChange={(e) => { setNombre(e.target.value) }} />
                                            </Col>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Apellidos" onChange={(e) => { setApellidos(e.target.value) }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Dirección 1" onChange={(e) => { setFirstAddress(e.target.value) }} />
                                            </Col>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Dirección 2" onChange={(e) => { setSecondAddress(e.target.value) }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={10}>
                                                <Form.Control placeholder="País" onChange={(e) => { setCountry(e.target.value) }} />
                                            </Col>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Provincia" onChange={(e) => { setState(e.target.value) }} />
                                            </Col>
                                            <Col xs={10}>
                                                <Form.Control placeholder="Código postal" onChange={(e) => { setPostData(e.target.value) }} />
                                            </Col >
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button variant="info" onClick={() => saveAddress()}>Guardar dirección</Button>
                                                {feedback.empty ? (
                                                    <h1> </h1>
                                                ) : (
                                                    <Alert variant={feedback.error ? "danger" : "success"}>
                                                        {feedback.mensaje}
                                                    </Alert>
                                                )}
                                            </Col>
                                        </Row>
                                    </Form>
                                    <hr></hr>
                                    <fieldset className="FormGroup">
                                        <div className="FormRow">
                                            <CardElement options={CARD_OPTIONS} />
                                        </div>
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button className="buy-button">Pagar</button>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </>
                :
                <Row className="Card-container">
                    <Col>
                        <h4 className="font-wheight">😎😎GRACIAS POR CONFIAR EN TU TIENDA 😎😎</h4>
                        <hr></hr>
                        <h5 className="font-wheight">Pago realizado correctamente 👍 </h5>
                        <h5 className="font-wheight">  Recibirás tu paquete dentro de 3 a 5 días laborales 🎁🎁 </h5>
                    </Col>
                </Row>


            }

        </Container>
    )
}
const mapStateToProps = state => {
    return {
        products: state.shop.products,
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(PaymentForm)