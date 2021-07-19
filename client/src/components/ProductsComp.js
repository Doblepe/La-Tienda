import { useState, useEffect } from "react";
import Products from "./Products";

function ProductsComp() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/products/`)
        .then((res) => res.json())
        .then(function (datos) {
            setData(datos.contenido)
        })
    })
    return <Products data={data} />
}
export default ProductsComp
