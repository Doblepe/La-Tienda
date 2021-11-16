import { Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeFromCart, adjustQTY } from '../../redux/shopping/shopping-actions'
import { useState } from 'react';


function CartItemComp({ itemData, removeFromCart, adjustQTY }) {
    const [input, setInput] = useState(itemData.qty)
    const onChangeHandler = (e) => {
        setInput(e.target.value);
        adjustQTY(itemData.id, e.target.value)
    }
    return (
    <Card className="products-cards"style={{ width: '17rem', height:'auto', padding:'1rem' }} key={itemData.index}>
        <img variant="bottom" src={itemData.url_img} alt={itemData.title} ></img> 
            <h5 className="font-wheight">{itemData.title}</h5>
            <p>{itemData.price} EUR. </p>
            <Button variant="info" onClick={() => removeFromCart(itemData.id)}>
                Borrar
            </Button>
            <hr></hr>
            <label htmlFor="qty">Cantidad</label>
            <input min="1" type="number" id="qty" name="qty" value={input} onChange={onChangeHandler} />
    </Card>
)
    

   
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart:(id)=>dispatch(removeFromCart(id)),
        adjustQTY: (id, value)=>dispatch(adjustQTY(id, value))
    }
}
            export default connect(null, mapDispatchToProps)(CartItemComp)


