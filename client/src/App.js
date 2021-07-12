import './App.css';
import {CarouselComp, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp, ContactComp, FemaleCollectionComp, MaleCollectionComp, KidCollectionComp} from './components/index'
import {BrowserRouter, Route} from 'react-router-dom'
import {useState} from 'react'


function App() {
  const[select, setSelect]= useState('');
  return ( <BrowserRouter>
    <NavBarComp select={setSelect}/>
    <Route exact path="/">
    <CarouselComp />
    </Route>
    <Route  exact path="/registro">
      <RegisterComp />
    </Route>
    <Route exact path="/login">
      <LoginComp/>
    </Route>
    <Route path="/contacto">
      <ContactComp/>
    </Route>
    <Route path="/products">
      <ProductsComps/>
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
    
    <FooterComp />
   </BrowserRouter>);
}

export default App;
