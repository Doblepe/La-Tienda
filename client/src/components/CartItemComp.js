import {Card, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeFromCart, adjustQTY} from '../../src/redux/shopping/shopping-actions'
import {useState} from 'react'

function CartItemComp({itemData, removeFromCart, adjustQTY}){
    const [input, setInput] = useState(itemData.qty)
   const onChangeHandler =(e) =>{
       setInput(e.target.value);
       adjustQTY(itemData.id, e.target.value)
   }
    return ( (<Col xs={12} md={4} lg={3}>
        <Card style={{ width: '10rem' }} key={itemData.index}>
        <Card.Img variant="top" src ={itemData.url_img} alt={itemData.title} />
         <Card.Body>
         <Card.Title>{itemData.title}</Card.Title>
         <Card.Text>{itemData.price} EUR. </Card.Text>
         <Button onClick={()=>removeFromCart(itemData.id)}>
             Borrar
         </Button>
         <div>
             <label htmlFor="qty">Qty</label>
             <input min="1" type="number" id="qty" name="qty" value={input} onChange={onChangeHandler}/>
         </div>
        </Card.Body>
        </Card>
        </Col>))

}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart:(id)=>dispatch(removeFromCart(id)),
        adjustQTY: (id, value)=>dispatch(adjustQTY(id, value))
    }
}
export default connect(null, mapDispatchToProps)(CartItemComp)


