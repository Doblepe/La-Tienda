import { useState, useEffect } from "react";
import Products from "./Products";

function KidCollectionComp() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/products/kidCollection`)
        .then((res) => res.json())
        .then(function (datos) {
            if (datos.error) {
                window.alert('Error al cargar la página');
            } else {
                setData(datos.contenido)
            }
        })
    }, [])
    return <Products data={data} />
}
export default KidCollectionComp