import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const GoToCartButton = () => {
    const { getQuantityTotal } = useContext(CartContext);
    
    const goToCart = {
        position: "fixed",
        bottom: "0",
        right: "0"
    }

    return (
        <div style={goToCart}>
            <button className="primary-btn cart-btn">
                Cart 
                <FontAwesomeIcon 
                    icon={faCartShopping} 
                    style={{paddingRight: "0.5rem"}}
                    />
                    {getQuantityTotal()}
            </button>
        </div>
    )
}

export default GoToCartButton