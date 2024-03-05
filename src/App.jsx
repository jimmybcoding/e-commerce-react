import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Cart } from './components/Cart';
import Nav from './components/Nav';
import Products from './components/Products';


function App() {
   

    return (
    <>
        <Nav />
        <Routes >
            <Route path= 'e-commerce-react/' element={<Products />}/>
            <Route path='cart' element={<Cart />} />
        </Routes>
    </>
    );
}
export default App;
