const ShoppingCartPage = ({ cartItems, onRemoveItem, onQuantityChange }) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-primary text-light p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center mb-4">
            <div className="font-semibold">Product</div>
            <div className="font-semibold">Quantity</div>
            <div className="font-semibold">Price</div>
          </div>
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 gap-6 items-center text-center mb-6 bg-secondary p-4 rounded-md"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 text-sm underline hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onQuantityChange(item.id, -1)}
                    className="bg-accent text-light px-3 py-1 rounded-md hover:bg-light hover:text-primary transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, 1)}
                    className="bg-accent text-light px-3 py-1 rounded-md hover:bg-light hover:text-primary transition"
                  >
                    +
                  </button>
                </div>
                <div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-6">
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-accent">
                ${calculateTotal().toFixed(2)}
              </span>
            </p>
            <button
              onClick={() => alert("Proceeding to checkout!")}
              className="mt-4 bg-accent text-light py-3 px-6 rounded-md hover:bg-light hover:text-primary transition"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCartPage;
