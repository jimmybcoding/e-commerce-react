
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()


export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState(
    () => {
        const cartJson = localStorage.getItem("cartItems");
        return cartJson ? JSON.parse(cartJson) : [];
    })

  
    const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      if (isItemInCart.quantity < item.stock) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        alert(`Cannot add more than ${item.stock} of this item to the cart.`);
      }
    } else {
      if (item.stock > 0) {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    }
  };


  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);


    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };


  const clearCart = () => {
    setCartItems([]);
  };

  const removeTotalQuantity = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }


  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  };

  const getQuantityPrice = (item) => {
    const total =  item.quantity * item.price;
    return parseFloat(total.toFixed(2));
  }

  const getQuantityTotal = () => {
    let quantityTotal = 0;
    for (let i = 0; i <= cartItems.length -1; i++) {
      quantityTotal += cartItems[i].quantity;
    }
    return quantityTotal === 0 ? `Empty` : quantityTotal;
  }

  useEffect(() => {
    const data = localStorage.getItem('cartItems');
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); 


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getQuantityTotal,
        removeTotalQuantity,
        getQuantityPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};