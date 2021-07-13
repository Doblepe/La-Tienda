import { useState, useEffect } from "react";
import Tarjetas from "./TarjetasComp";
function MaleCollectionComp (){
    const [feedback, setFeedback] = useState({ empty: true });
    const [data, setData] = useState ([])
    useEffect(() =>{ fetch(`http://localhost:3001/products/maleCollection`) 
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
export default MaleCollectionComp