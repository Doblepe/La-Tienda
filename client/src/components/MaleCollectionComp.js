import { useState, useEffect } from "react";
import Products from "./Products";

function MaleCollectionComp() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/products/maleCollection`)
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
export default MaleCollectionComp