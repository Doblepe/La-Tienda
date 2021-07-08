import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

function LoginComp (props){
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const [feedback, setFeedback] = useState({ empty: true });
  const [login, setLogin] = useState({log:false})

  
    useEffect(() =>{
      fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        setFeedback(datos);
        setTimeout(()=>{setFeedback({empty:true})}, 5000)
    });},[login])


return (<Container>
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
    <Form.Check type="checkbox" label="Check me out" onClick={props.showPass} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={()=>{setLogin({log:true})}}>
    Entrar
  </Button>
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
export default LoginComp 