import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from localStorage on mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  // Update localStorage when cart changes
  const updateLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const itemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex !== -1) {
        // Item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        updateLocalStorage(updatedItems); // Update localStorage
        return updatedItems;
      } else {
        // Item doesn't exist, add it to the cart
        const updatedItems = [...prevItems, { ...item, quantity: 1 }];
        updateLocalStorage(updatedItems); // Update localStorage
        return updatedItems;
      }
    });
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === itemId) {
            const updatedItem = { ...item, quantity: item.quantity + change };
            if (updatedItem.quantity <= 0) {
              return null; // Don't add it to the updated list if quantity is <= 0
            }
            return updatedItem;
          }
          return item;
        })
        .filter(Boolean); // Remove null items (those with quantity <= 0)

      updateLocalStorage(updatedItems); // Update localStorage
      return updatedItems;
    });
  };

  // Remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      updateLocalStorage(updatedItems); // Update localStorage
      return updatedItems;
    });
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle checkout process
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/payment"); // Proceed to payment page
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="ml-4 text-gray-500">${item.price}</p>
                </div>

                <div className="flex items-center">
                  <Button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                    variant="outlined"
                    color="primary"
                    className="mr-2"
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    variant="outlined"
                    color="primary"
                    className="ml-2"
                  >
                    +
                  </Button>

                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    variant="outlined"
                    color="error"
                    className="ml-4"
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <p className="font-semibold">Total: ${calculateTotal()}</p>
            <Button
              onClick={handleCheckout}
              className="bg-accent text-light py-2 px-4 rounded-md"
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
