import {BrowserRouter } from 'react-dom'
import './App.css';
import {CarouselComp, NavBarComp} from './components/index'


function App() {

  return (<BrowserRouter>
    <NavBarComp />
    <CarouselComp />
    </BrowserRouter>);
}

export default App;
