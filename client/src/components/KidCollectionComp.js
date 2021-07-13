import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
function KidCollectionComp (){
    const [feedback, setFeedback] = useState({ empty: true });
    const [data, setData] = useState ([]);
    useEffect(() =>{ fetch(`http://localhost:3001/products/kidCollection`) 
    .then((res) => res.json())
    .then(function (datos) {
        if (datos.error) {
            setFeedback(datos);
            setTimeout(()=>{setFeedback({empty:true})}, 5000); 
            } else {     
              setData(datos.contenido)
        }
    })
    },[])
    return <Tarjetas data={data}/>
}
export default KidCollectionComp