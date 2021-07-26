import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Axios from "axios";
import ContactComp from './Contactcomp';


function LoginComp (props){
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
 function showPass() {
  var tipo = document.getElementById('password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }}
function loadingAcc(){
  Axios({
    method: "POST",
    data: {
      email: email,
      password: password,
    },
    withCredentials: true,
    url: process.env.PORT + "/login",
  }).then((res) => {
    return (
    props.setLogin(res.data.logged),
    props.setUser(res.data.nombre),
    setTimeout(()=>{props.setFeedback({empty:true})}, 2000))
})
}

const logout = () => {
  Axios({
    method: "POST",
    withCredentials: true,
    url: process.env.PORT + "/logout",
  }).then((res) => {
    return (
    console.log(res), 
    props.setLogin(false),
    props.setUser(''))
})
}  
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false); loadingAcc();
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
        {isLoading ? 'Conectando' : 'Inicio de sesión'}
      </Button>
    );
  }

return (<Container>
    
    {props.login ? (
    <Row className="justify-content-md-center">
    <h1>Bienvenido {props.user}</h1>
    <hr></hr>
    <ContactComp/>
    <Button variant="danger" onClick={logout}>Abandonar sesión</Button>
    </Row>) :(
    <Row className="justify-content-md-center">
    <Col xs lg="6">
        <h1>¿Ya tienes cuenta?</h1>
        <p>Inicia sesión ahora para aprovecharte de todos los beneficios de la cuenta de cliente de MediaMarkt</p>
        <p>Si todavía no eres cliente regístrate de manera gratuita en el siguiente enlace: </p>
        <Link to="/registro">
          <p>Crear cuenta</p>
        </Link>
        <hr></hr>
        <Form>
  <Form.Group>
    <Form.Label>Dirección Email</Form.Label>
    <Form.Control type="email" placeholder="Introduce tu email" onChange={(e)=>{setEmail(e.target.value)}} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group>
    <Form.Label>Contraseña</Form.Label>
    <Form.Control type="password" placeholder="Contraseña" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
  </Form.Group>
  <Form.Group>
    <Form.Check type="checkbox" label="Check me out" onClick={showPass} />
  </Form.Group>
  <LoadingButton />
  {props.feedback.empty ? (
              <h1> </h1>
            ) : (
              <Alert variant={props.feedback.err ? "danger" : "success"}>
                {props.feedback.data.mensaje}
              </Alert>
            )}
</Form>   
    </Col>
    </Row>) }
    </Container>
)
}
export default (LoginComp)  