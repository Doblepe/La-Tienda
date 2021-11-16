import {Card,  Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/shopping/shopping-actions'
import {useState} from 'react'

function Product({productData, addToCart}){
    const [feedback, setFeedback] = useState({ empty: true });

    return (
        
        <Card className="products-cards" style={{ width: '18rem', height:'auto', padding:'1rem' }} key={productData.index}>
        <img variant="top" src ={productData.url_img} alt={productData.title} />
         <h5 className="font-wheight">{productData.title}</h5>
         <p>{productData.price} EUR. </p>
        <Button onClick={()=>{addToCart(productData.id); setFeedback({empty:false}); setTimeout(() => { setFeedback({ empty: true }) }, 2000) }}
        variant="dark">Añadir</Button>
        {feedback.empty ? (<h1> </h1>) : (<Alert variant="success">{productData.title} se ha añadido a tu carrito de la compra</Alert> )}
        </Card>)
  }
  const mapDispatchToProps = dispatch =>{
      return {
          addToCart: (id)=>dispatch(addToCart(id))
      }
  }
  export default connect(null,mapDispatchToProps)(Product);