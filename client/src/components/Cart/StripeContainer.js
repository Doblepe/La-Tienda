import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51JGJQbJkaTBGrdGE25n0I4rUTayLeZHdj532C3Xe0rYJKGgthfP23SWMII2NM9b0FI1UDajBsUux035s0gTWkPVF00WVv7Uj4R"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}