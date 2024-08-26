import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const GoToCartButton = () => {
    const { getQuantityTotal } = useContext(CartContext);
    
    const goToCart = {
        position: "fixed",
        bottom: "0",
        right: "0"
    }

    return (
        <div style={goToCart}>
            <button className="primary-btn">
                Cart
                <Link to='cart'> 
                    <FontAwesomeIcon 
                        icon={faCartShopping} 
                        style={{color: "white", paddingRight: "0.5em"}}
                        />
                            {getQuantityTotal()}
                </Link>
            </button>
        </div>
    )
}

export default GoToCartButton