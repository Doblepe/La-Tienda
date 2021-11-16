import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'


function ContactComp() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [infomsg, setInfomsg] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState({ empty: true });

  // ------------ SEND INFO MSG ------------
  function sendInfo() {
    fetch('http://localhost:3001/contact/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        apellidos,
        email,
        infomsg,
        selectedFile
      }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        setFeedback(datos);
        setTimeout(() => { setFeedback({ empty: true }) }, 3000)
      })
  }
  // ---------- LOADING BUTTON------
  function resetForm (){
    setNombre('');
    setApellidos('');
    setEmail('');
    setInfomsg('');
    setInfomsg('');
    setSelectedFile(null);
  }
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
          resetForm();
          sendInfo();
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
        {isLoading ? 'Enviando' : 'Enviar'}
      </Button>
    );
  }


  return (<Container className="Card-container">
    <Row className="justify-content-md-center">
      <Col xs="12" lg="8">
        <h5 className="font-wheight">Si tienes cualquier duda sobre tu compra o consulta sobre nuestras tiendas, puedes contactar con nosotros como prefieras:</h5>
        <hr />
        <Row>
          <Col>
            <p>Escríbenos un mensaje directo a nuestro perfil de Facebook <a href="https://es-es.facebook.com/">facebook.com/LaTienda</a></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Escríbenos un mensaje directo a nuestro perfil de Twitter <a href="https://twitter.com/">twitter.com/LaTienda</a></p>
          </Col>
        </Row>
        <hr />
        <h5>También puedes enviarnos tu consulta a través de este formulario:</h5>
      </Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col xs="12" lg="8">
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Tratamiento:</Form.Label>
            <Form.Control as="select">
              <option>SR</option>
              <option>SRA</option>
              <option>Empresa</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Introduce tu nombre" onChange={(e) => { setNombre(e.target.value) }} />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" placeholder="Introduce tus apellidos" onChange={(e) => { setApellidos(e.target.value) }} />
            <Form.Label>Dirección Email</Form.Label>
            <Form.Control type="email" placeholder="Introduce tu email" onChange={(e) => { setEmail(e.target.value) }} />
            <Form.Text className="text-muted">
              Tus datos no serán compartidos con ninguna empresa externa.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Explique brevemente su incidencia</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => { setInfomsg(e.target.value) }} />
          </Form.Group>
          <Form>
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Example file input" onChange={(e) => setSelectedFile(e.target.files[0])} />
            </Form.Group>
          </Form>
          <LoadingButton />
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
  </Container>)
}
export default ContactComp