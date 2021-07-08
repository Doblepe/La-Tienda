import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {Link,} from 'react-router-dom'
function RegisterComp (props){
const [nombre, setNombre] = useState('')
const [apellidos, setApellidos] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [feedback, setFeedback] = useState({ empty: true });

function register(){
  fetch('http://localhost:3001/registro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
      email: email,
      nombre: nombre,
      apellidos: apellidos,
      password: password,
      bag: [],
  }),
})
  .then((res) => res.json())
  .then(function (datos) {
      console.log(datos);
      setFeedback(datos);
      setTimeout(()=>{setFeedback({empty:true})}, 5000)
  });}
 /// --------------------- LOADING BOTÓN --------------
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  
  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false); register();
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoading(true);
  
    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Creando…' : 'Crear cuenta'}
      </Button>
    );
  }

return (<Container>
    <Row className="justify-content-md-center">
    <Col xs lg="6">
        <h1>Crea tu cuenta fácilmente</h1>
        <p>Regístrate en nuestra web y accede a cientos de descuentos y mucho más</p>
        <Link to="/login">
          <p>Iniciar sesión</p>
        </Link>
        <hr></hr>
        <Form>
  <Form.Group>
    <Form.Label>Nombre</Form.Label>
    <Form.Control type="text" placeholder="Introduce tu nombre" onChange={(e)=>{setNombre(e.target.value)}}/>
    <Form.Label>Apellidos</Form.Label>
    <Form.Control type="text" placeholder="Introduce tus apellidos" onChange={(e)=>{setApellidos(e.target.value)}}/>
    <Form.Label>Dirección Email</Form.Label>
    <Form.Control type="email" placeholder="Introduce tu email" onChange={(e)=>{setEmail(e.target.value)}} />
    <Form.Text className="text-muted">
      Tus datos no serán compartidos con ninguna empresa externa.
    </Form.Text>
  </Form.Group>
  <Form.Group>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
  </Form.Group>
  <Form.Group>
    <Form.Check type="checkbox" label="Check me out" onClick={props.showPass}/>
  </Form.Group>
  <LoadingButton/>
  {feedback.empty ? (
              <h1> </h1>
            ) : (
              <Alert variant={feedback.error ? "danger" : "success"}>
                {feedback.mensaje}
              </Alert>
            )}
</Form>   
    </Col>
    </Row>
    </Container>
)
}

export default RegisterComp 