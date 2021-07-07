import {useState, useEffect} from 'react'
import { Alert, Card, Button, Container, Row, Col } from 'react-bootstrap';
// TODO: Añadir parámetro mensaje al servidor en Rutas

function ProductsComp(){
    const [feedback, setFeedback] = useState({ empty: true });
    const [allProducts, setAllProducts] = useState ([])
  /*const [maleProducts, setMaleProducts] = useState ([])
    const [femaleProducts, setfemaleProducts] = useState ([])
    const [kidProducts, setkidProducts] = useState ([]) */
    const [showProducts, setShowProducts] = useState ('')

    useEffect(() =>{ fetch('http://localhost:3001/products/products')
    .then((res) => res.json())
    .then(function (datos) {
        console.log(datos)
        if (datos.error) {
            setFeedback(datos);
            setTimeout(()=>{setFeedback({empty:true})}, 5000);
            } else {
                setAllProducts(datos.contenido)
        }
    });
    },[])

  useEffect(() =>{
    const prevShowProducts = allProducts.map((product, index) => {
    return(
      <Row>
    <Col xs={6} md={4}>
    <Card style={{ width: '18rem' }} key={index}>
    <Card.Img variant="top" src={product.url_img} alt={product.title} />
     <Card.Body>
     <Card.Title>{product.title}</Card.Title>
     <Card.Text>{product.price} EUR. </Card.Text>
    <Button variant="primary" /* onClick={addToBag(datos.contenido.index)}  */ >Añadir al carrito</Button>
    </Card.Body>
    </Card>
    </Col>
    </Row>)
}); const maleClothes = allProducts.filter(maleCollection);
setShowProducts(prevShowProducts)},
[allProducts]) 
console.log(allProducts)
const maleClothes = allProducts.filter(maleCollection);
const femaleClothes = allProducts.filter(femaleCollection);
const kidClothes= allProducts.filter(kidCollection);

console.log(maleClothes)

function maleCollection(arr){
  if (allProducts.collection === "male")
  return true
}
function femaleCollection(arr){
  if (allProducts.collection === "female")
  return true
}
function kidCollection(arr){
  if (allProducts.collection === "kid")
  return true
}

    return <>
    <Container>
      <Row>
      <Col xs={6} md={4}>
      {showProducts}
    </Col>
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