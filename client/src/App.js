
import './App.css';
import {CarouselComp, LoginComp, NavBarComp, RegisterComp, ProductsComps, FooterComp} from './components/index'
import {BrowserRouter, Route} from 'react-router-dom'


function App() {
  return ( <BrowserRouter>
    <NavBarComp />
    <Route exact path="/">
    <CarouselComp />
    </Route>
    <Route  exact path="/registro">
      <RegisterComp/>
    </Route>
    <Route exact path="/login">
      <LoginComp/>
    </Route>
    <Route path="/products">
      <ProductsComps />
    </Route>
    <FooterComp />
    
   </BrowserRouter>);
}

export default App;
