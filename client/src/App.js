import './App.css';
import { LandingComp, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp, ContactComp, FemaleCollectionComp, MaleCollectionComp, KidCollectionComp } from './components/index'
import { BrowserRouter, Route } from 'react-router-dom'
import CartComp from './components/cartComp';
import "@mdi/font/css/materialdesignicons.min.css";
function App() {
  return (<BrowserRouter>
    <NavBarComp />
    <Route exact path="/">
      <LandingComp />
    </Route>
    <Route exact path="/registro">
      <RegisterComp />
    </Route>
    <Route exact path="/login">
      <LoginComp />
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
      <CartComp/>
    </Route>
    <FooterComp />
  </BrowserRouter>);
}

export default App;
