import './App.css';
import { LandingComp, NavBarLogged, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp, ContactComp, FemaleCollectionComp, MaleCollectionComp, KidCollectionComp } from './components/index'
import { BrowserRouter, Route } from 'react-router-dom'
import CartComp from './components/cartComp';
import "@mdi/font/css/materialdesignicons.min.css";
import { useState } from 'react';
import StripeContainer from './StripeContainer';
import { Container } from 'react-bootstrap'


function App() {
  const [login, setLogin] = useState(false)
  const [feedback, setFeedback] = useState({ empty: true });
  const [user, setUser] = useState('');

  return (
    <Container fluid className="full-app">
      <BrowserRouter>
        {login ? <NavBarLogged /> : <NavBarComp />}
        <Route exact path="/">
          <LandingComp />
        </Route>
        <Route exact path="/registro">
          <RegisterComp />
        </Route>
        <Route exact path="/login">
          <LoginComp setFeedback={setFeedback} feedback={feedback} login={login} setLogin={setLogin} setUser={setUser} user={user} />
        </Route>
        <Route path="/contacto">
          <ContactComp />
        </Route>
        <Route path="/products">
          <ProductsComps />
        </Route>
        <Route path="/femaleCollection">
          <FemaleCollectionComp />
        </Route>
        <Route path="/maleCollection">
          <MaleCollectionComp />
        </Route>
        <Route path="/kidCollection">
          <KidCollectionComp />
        </Route>
        <Route path="/cart">
          <CartComp />
        </Route>
        <Route path="/payment">
          <StripeContainer />
        </Route>
        <FooterComp />
      </BrowserRouter>
    </Container>);
}

export default App;


// ------------ 
