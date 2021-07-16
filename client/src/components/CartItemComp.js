import {Card, Col, Button} from 'react-bootstrap'

function CartItemComp({itemData}){
    return ( (<Col xs={12} md={4} lg={3}>
        <Card style={{ width: '18rem' }} key={itemData.index}>
        <Card.Img variant="top" src ={itemData.url_img} alt={itemData.title} />
         <Card.Body>
         <Card.Title>{itemData.title}</Card.Title>
         <Card.Text>{itemData.price} EUR. </Card.Text>
         <div>
             <label htmlFor="qty">Qty</label>
             <input min="1" type="number" id="qty" name="qty" value={itemData.qty} />
         </div>
        </Card.Body>
        </Card>
        </Col>))

}
export default CartItemComp


