import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import ProductModal from "../utilities/ProductModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { cartItems, addToCart, removeFromCart, getQuantityTotal } = useContext(CartContext);

  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    console.log(data);
    setProducts(data.products)
  }

  useEffect(() => {
    getProducts();
  }, [])
 
  const openModal = (product) => setSelectedProduct(product);
  
  return (
    <>
      <div className={isOpen ? "products_container opacity" : "products_container"}>   
        {products.map(product => ( 
          <div key={product.id} className="products_card" >
            <img src={product.images[0]} alt={product.title} className="thumbnail" onClick={!isOpen ? () => {
              openModal(product);
              setIsOpen(true)} : null}/>                    
            <div className="products_details_container">
              <h1>{product.title}</h1>
              <div>{product.description}</div>
              <div className="products_price">${product.price}</div>
              
              {cartItems.find((cartItem) => cartItem.id === product.id) ? 
              <div className="products_btn_container">
                <button className="quantity-adjust-btn" onClick={() => addToCart(product)} disabled={isOpen}>+</button>
                <div>{cartItems.find(cartItem => cartItem.id === product.id).quantity +'\n In Cart'}</div>
                <button className="quantity-adjust-btn" onClick={() => removeFromCart(product)} disabled={isOpen}>-</button>
              </div> :
              <div className="primary-btn-container"> 
                <button className="add-btn" onClick={() => addToCart(product)}disabled={isOpen}>
                  Add
                  <FontAwesomeIcon icon={faCartShopping} />  
                </button>
                </div>}
            </div>
        </div>
        ))
        }
      </div>
      {isOpen &&
      <>
        <ProductModal 
        selectedProduct={selectedProduct} 
        isOpen={isOpen} 
        toggleOpen={toggleOpen} />
      </>
      }
    </>
  )
}

export default Products
