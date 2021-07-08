import './App.css';
import {CarouselComp, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp} from './components/index'
import {BrowserRouter, Route} from 'react-router-dom'


function App() {
  function showPass() {
    var tipo = document.getElementById('password');
    if (tipo.type === 'password') {
      tipo.type = 'text';
    } else {
      tipo.type = 'password';
    }}
  return ( <BrowserRouter>
    <NavBarComp />
    <Route exact path="/">
    <CarouselComp />
    </Route>
    <Route  exact path="/registro">
      <RegisterComp showpass={showPass}/>
    </Route>
    <Route exact path="/login">
      <LoginComp showpass={showPass}/>
    </Route>
    <Route path="/products">
      <ProductsComps />
    </Route>
    <FooterComp />
    
   </BrowserRouter>);
}

export default App;
