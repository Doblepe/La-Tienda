import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
import BagCard from './CheckoutPage'
function CheckOutCard() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/products/`)
        .then((res) => res.json())
        .then(function (datos) {
            setData(datos.contenido)
        })
    })
    return <BagCard data={data} />
}
export default CheckOutCard