import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faStar, faStarHalfStroke, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../context/CartContext";

function ProductModal({ selectedProduct, isOpen, toggleOpen }) {
  const [imageIndex, setImageIndex] = useState(0);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const {
    title,
    images,
    price,
    stock,
    rating,
  } = selectedProduct;

  const renderStarRating = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.75;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FontAwesomeIcon key={`full-star-${i}`} icon={faStar} />
          ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FontAwesomeIcon key={`empty-star-${i}`} icon={farStar} />
          ))}
      </>
    );
  };

  const handleImageChange = (direction) => {
    setImageIndex((prevIndex) =>
      direction === "left"
        ? prevIndex === 0
          ? images.length - 1
          : prevIndex - 1
        : prevIndex === images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const isProductInCart = cartItems.find(
    (cartItem) => cartItem.id === selectedProduct.id
  );

  return (
    <>
      {isOpen && (
        <div className="products-modal-overlay">
          <h1>{title}</h1>
          <button className="red" onClick={toggleOpen}>
            X
          </button>
          <div className="container">
            <div className="products-modal-container">
              <button
                className="products-modal-btn"
                onClick={() => handleImageChange("left")}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={images[imageIndex]} className="modal-thumbnail" />
              <button
                className="products-modal-btn"
                onClick={() => handleImageChange("right")}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div className="products-modal-details">
              <p>{`Image ${imageIndex + 1} of ${images.length}`}</p>
              <p>{`$${price}`}</p>
              <p>{`In Stock: ${stock}`}</p>
              <p>{`Customer Rating: ${rating}`}</p>
              <span className="stars">{renderStarRating()}</span>
            </div>
            {isProductInCart ? (
              <div className="products_btn_container">
                <button
                  className="quantity-adjust-btn"
                  onClick={() => addToCart(selectedProduct)}
                >
                  +
                </button>
                <div>
                  {isProductInCart.quantity + "\n In Cart"}
                </div>
                <button
                  className="quantity-adjust-btn"
                  onClick={() => removeFromCart(selectedProduct)}
                >
                  -
                </button>
              </div>
            ) : (
              <div className="primary-btn-container">
                <button
                  className="add-btn"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductModal;

