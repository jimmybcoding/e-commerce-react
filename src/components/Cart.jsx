import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ClearCartModal from "../utilities/ClearCartModal";
import Email from "./Email";

export function Cart() {

  const { cartItems, addToCart, removeFromCart, getCartTotal, removeTotalQuantity, getQuantityTotal, getQuantityPrice } = useContext(CartContext);

  return (
    <>
        <Link to='/'>
            <button className="primary-btn red">X</button>
        </Link> 
        <div className="cart_wrapper">    
        <h1>Cart</h1>
        <p className="cart_numItems">{getQuantityTotal()}{cartItems.length === 0 ? ' Cart' : ' Items'}</p>
        <h2 className="cart_total">{"Total: $" + getCartTotal()}</h2>
        <ClearCartModal />
        
            {cartItems.map((item) => {
            return (
                <>
                    <div key={item.title} className="cart_container">    
                        <img src={item.thumbnail} alt={item.title} className="cart_thumbnail"/>
                        <p>{item.title}</p>
                        <div className="button_wrapper">
                            <button onClick={()=> addToCart(item)}>+</button>
                            <div style={{fontWeight: '800'}}>{item.quantity}</div>
                            <button onClick={()=> removeFromCart(item)}>-</button>
                        </div>
                        <p>{`$${item.price} each = $${getQuantityPrice(item)}`}</p>
                        <button className="primary-btn" onClick={()=> removeTotalQuantity(item)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </>
            )
        })}
        <p>{"Total: $" + getCartTotal()}</p>
        <Email/>
        </div>
    </>
  )
}
