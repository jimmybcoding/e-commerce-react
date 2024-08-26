import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Cart } from './components/Cart';
import Nav from './components/Nav';
import Products from './components/Products';
import GoToCartButton from './utilities/GoToCartButton';


function App() {
   

    return (
    <>
        <Nav />
        <Routes >
            <Route path= '/' element={<Products />}/>
            <Route path='cart' element={<Cart />} />
        </Routes>
        <GoToCartButton />
    </>
    );
}
export default App;
