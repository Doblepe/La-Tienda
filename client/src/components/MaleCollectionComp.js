import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
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
    return <Tarjetas data={data} />
}
export default MaleCollectionComp