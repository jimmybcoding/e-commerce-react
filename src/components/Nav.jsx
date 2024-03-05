import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Nav() {
    const { getQuantityTotal } = useContext(CartContext)
  
    return (
    <div className="nav_container">
        <Link to='/' className="nav_shop">
          Shop
        </Link>
        <Link to='cart'>
          <button className="primary-btn cart-btn">Cart <FontAwesomeIcon icon={faCartShopping} style={{paddingRight: "0.5rem"}}/>{getQuantityTotal()}</button>
        </Link>
    </div>
  )
}

export default Nav
