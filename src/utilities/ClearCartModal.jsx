import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ClearCartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { clearCart } = useContext(CartContext);

    const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div onClick={toggleOpen} className="primary-btn">
        Clear Cart
        {isOpen &&
        <div className="modal-overlay">
            <div className="clearCart-overlay-btn-container">
                <span>Are you sure you want to clear the cart?</span>        
                <button className="primary-btn" onClick={clearCart}>Yes</button>
                <button className="primary-btn">No</button>
            </div>
        </div>
}
    </div>
  )
}

export default ClearCartModal
