import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faStar, faStarHalfStroke, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from  "@fortawesome/free-regular-svg-icons" 
import { CartContext } from "../context/CartContext";

function ProductModal({ selectedProduct, isOpen, toggleOpen }) {

const [imageIndex, setImageIndex] = useState(0);
const { cartItems, addToCart, removeFromCart} = useContext(CartContext);

const checkStarRating = () => {
   if (selectedProduct.rating >= 4.25){   
    return ( 
    <>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStarHalfStroke} />
    </>
    )} else if (selectedProduct.rating < 4.25 && selectedProduct.rating >= 3.75) {
      return (
    <>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={farStar} />
    </>        
      )
    } else {
      return (
           <>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStarHalfStroke} />
      <FontAwesomeIcon icon={farStar} />
    </> 
      )
    } 
}

const checkIndex = () => {
  imageIndex === selectedProduct.images.length-1 ? setImageIndex(0) : setImageIndex(imageIndex + 1)
}

  return (
    <>
      {isOpen && (  
        <>
          <div className="products-modal-overlay">
            <h1>{selectedProduct.title}</h1>
            <button className="red" onClick={toggleOpen}>X</button>
            <div className="container">
              <div className="products-modal-container">
                <button className="products-modal-btn" onClick={() => checkIndex()}>{<FontAwesomeIcon icon={faArrowLeft} />}</button>             
                <img src={selectedProduct.images[imageIndex]} className="modal-thumbnail" />
                <button className="products-modal-btn" onClick={() => checkIndex()}>{<FontAwesomeIcon icon={faArrowRight} />}</button>
              </div>
              <div className="products-modal-details">
                <p>{`Image ` + parseInt(imageIndex + 1)}{` of `+ parseInt(selectedProduct.images.length)}</p>
                <p>{`$` + selectedProduct.price}</p>
                <p>{`In Stock: ` + selectedProduct.stock}</p>
                <p>{`Customer Rating: ` + selectedProduct.rating}</p>
                <span className="stars">{checkStarRating()}</span>
              </div>
              {cartItems.find((cartItem) => cartItem.id === selectedProduct.id) ? 
                <div className="products_btn_container">
                  <button className="quantity-adjust-btn" onClick={() => addToCart(selectedProduct)}>+</button>
                  <div>{cartItems.find(cartItem => cartItem.id === selectedProduct.id).quantity +'\n In Cart'}</div>
                  <button className="quantity-adjust-btn" onClick={() => removeFromCart(selectedProduct)}>-</button>
                </div> :
                <div className="primary-btn-container"> 
                  <button className="add-btn" onClick={() => addToCart(selectedProduct)}>
                    Add
                    <FontAwesomeIcon icon={faCartShopping} />  
                  </button>
                  </div>}
            </div>
          </div>
        </>)}
    </>
  )
}

export default ProductModal
