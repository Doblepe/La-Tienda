import './App.css';
import {CarouselComp, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp, ContactComp} from './components/index'
import {BrowserRouter, Route} from 'react-router-dom'
import {useState} from 'react'


function App() {
  const[select, setSelect]= useState('');
    
  return ( <BrowserRouter>
    <NavBarComp select={select, setSelect}/>
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
      <ProductsComps select={select}/>
    </Route>
    <FooterComp />
    
   </BrowserRouter>);
}

export default App;
