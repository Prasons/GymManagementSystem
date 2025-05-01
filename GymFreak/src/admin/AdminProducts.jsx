import React, { useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    const id = Date.now();
    setProducts([...products, { ...newProduct, id }]);
    setNewProduct({ name: "", price: "", category: "", image: "" });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-8 bg-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold  mb-6 text-center">
        Admin - Manage Products
      </h1>

      <div className="bg-secondary p-6 rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="p-2 rounded"
          />
          <input
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="p-2 rounded"
            type="number"
          />
          <input
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="p-2 rounded"
          />
          <input
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-accent text-light py-2 px-4 rounded-md hover:bg-light hover:text-primary transition"
        >
          Add Product
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-secondary p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-accent">${product.price}</p>
            <p className="text-sm">{product.category}</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="mt-2 bg-red-500 text-light py-1 px-3 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
