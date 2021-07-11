import {useState, useEffect} from 'react'
import { Alert, Card, Button, Container, Row, Col } from 'react-bootstrap';

function ProductsComp(props){
    const [feedback, setFeedback] = useState({ empty: true });
    const [data, setData] = useState ([])
    const [showProducts, setShowProducts] = useState('')
   /*  const [dataMale, setDataMale] = useState([])
    const [dataFemale, setDataFemale] = useState([])
    const [dataKid, setDataKid] = useState([]) */
  
                            //----- GRABA LOS PRODUCTOS ----------------------

    useEffect(() =>{ fetch(`http://localhost:3001/products/${props.select}`) // con comillas francesas tengo hacer fetch al buscado
    .then((res) => res.json())
    .then(function (datos) {
        if (datos.error) {
            setFeedback(datos);
            setTimeout(()=>{setFeedback({empty:true})}, 5000); 
            } else {     
              setData(datos.contenido)
              /* setDataMale(data.filter((clothe)=>clothe.collection==="male"));
              setDataFemale(data.filter((clothe)=>clothe.collection==="female"));
              setDataKid(data.filter((clothe)=>clothe.collection==="kid")); */

              // -------------- SOBRAN SI VIENEN PPREVIAMENTE FILTRADO POR SELECT. 
        }
    })
    },[])

                              //----- TODOS LOS PRODUCTOS ----------------------
    
  
  useEffect(() =>{
   const prevShowProducts = data.map((product, index) => {
    return(
    <Col xs={6} md={4}>
    <Card style={{ width: '18rem' }} key={index}>
    <Card.Img variant="top" src={product.url_img} alt={product.title} />
     <Card.Body>
     <Card.Title>{product.title}</Card.Title>
     <Card.Text>{product.price} EUR. </Card.Text>
    <Button variant="primary" >Añadir al carrito</Button>
    </Card.Body>
    </Card>
    </Col>)
});setShowProducts(prevShowProducts)},[data]) // Aquí tengo que pasar el state de select. 

    return <>
    <Container>
      <Row>
     {showProducts} 
      </Row>
    {feedback.empty ? 
    (<h1> </h1>) : 
    (<Alert variant={feedback.error ? "danger" : "success"}>
    {feedback.mensaje}
    </Alert>)}
    </Container>
    </>
    
}
export default ProductsComp


/*     useEffect(() =>{fetch('http://localhost:3001/products/maleCollection')
    .then((res) => res.json())
    .then(function (datos) {
        if (datos.error) {
            setFeedback(datos);
            setTimeout(()=>{setFeedback({empty:true})}, 5000);
            } else {
            printData(datos);
        }
    });},[maleProducts])

     useEffect(() =>{fetch('http://localhost:3001/products/femaleCollection')
     .then((res) => res.json())
     .then(function (datos) {
         if (datos.error) {
             setFeedback(datos);
             setTimeout(()=>{setFeedback({empty:true})}, 5000);
             } else {
             printData(datos);
         }
     });},[femaleProducts])
     
     useEffect(() =>{fetch('http://localhost:3001/products/kidCollection')
     .then((res) => res.json())
     .then(function (datos) {
         if (datos.error) {
             setFeedback(datos);
             setTimeout(()=>{setFeedback({empty:true})}, 5000);
             } else {
             printData(datos);
         }
     });},[kidProducts]) */
     
// ------------------- CÓDIGO EN JS VANILLA ----------------
/* 
function showSelectedProducts() {
	let selected = document.getElementById('basic-nav-dropdown').value;
	switch (selected) {
		case 'all':
			showAllProducts();
			break;
		case 'men':
			showMaleCollection();
			break;
		case 'women':
			showFemaleCollection();
			break;
		case 'kid':
			showKidCollection();
			break;
	}
}

function imprimir(datos) {
	localProduct = datos.contenido;
	let parrafo = '';
	let maleClothes = sessionStorage.getItem('collection' === 'male');
	let femaleClothes = sessionStorage.getItem('collection' === 'female');
	let kidClothes = sessionStorage.getItem('collection' === 'kid');
	for (let i = 0; i < datos.contenido.length; i++) {
		parrafo += `<div class="col">
		<div class="card h-100">
		  <img src="${datos.contenido[i].url_img}" class="card-img-top" alt="${datos.contenido[i].title}">
		  <div class="card-body">
			<h5 class="card-title">${datos.contenido[i].title}</h5>
			<p class="card-text">${datos.contenido[i].price} EUR</p>
			<button type="button" class="btn btn-primary" onclick="addToBag(${i})">Añadir al carrito</button>
		  </div>
		  <div class="card-footer">
			<small class="text-muted">15% de descuento</small>
		  </div>
		</div>
	  </div>`;
	}
	if (maleClothes) {
		document.getElementById('maleClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else if (femaleClothes) {
		document.getElementById('femaleClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else if (kidClothes) {
		document.getElementById('kidClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else {
		document.getElementById('products').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	}
} */