import { useState, useEffect } from "react";
import Products from "./Products";
function FemaleCollectionComp() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/products/femaleCollection`)
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
export default FemaleCollectionComp