import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
function ProductsComp (){
    const [data, setData] = useState ([])
    useEffect(() =>{ fetch(`http://localhost:3001/products/`) 
    .then((res) => res.json())
    .then(function (datos) {    
              setData(datos.contenido)
        })
    })
    return <Tarjetas data={data}/>
}
export default ProductsComp
