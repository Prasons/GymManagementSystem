import React from "react";

const Store = () => {
  const products = [
    { id: 1, name: "Dumbbells", price: 50 },
    { id: 2, name: "Yoga Mat", price: 20 },
  ];

  return (
    <div className="store-container">
      <h1>Online Store</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
