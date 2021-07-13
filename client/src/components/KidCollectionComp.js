import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
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
    return <Tarjetas data={data} />
}
export default KidCollectionComp