import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LandingComp from './components/HeroPage/LandingComp'
import NavBarLogged from './components/HeroPage/Nav-bar-logged'
import NavBarComp from './components/HeroPage/Nav-bar'
import RegisterComp from './components/Register/RegisterComp'
import LoginComp from './components/login/LoginComp';
import CartComp from './components/Cart/cartComp';
import ContactComp from './components/Contact/Contactcomp';
import ProductsComps from './components/Products/ProductsComp'
import FooterComp from './components/HeroPage/FooterComp';
import FemaleCollectionComp from './components/Products/FemaleCollectionComp'
import MaleCollectionComp from './components/Products/MaleCollectionComp'
import KidCollectionComp from './components/Products/KidCollectionComp'
import { useState } from 'react';
import StripeContainer from './components/Cart/StripeContainer';
import "@mdi/font/css/materialdesignicons.min.css";



function App() {
  const [login, setLogin] = useState(false)
  const [feedback, setFeedback] = useState({ empty: true });
  const [user, setUser] = useState('');

  return (
    <div className="full-app">
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
    </div>);
}

export default App;


// ------------ 
