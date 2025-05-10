import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products"); // Updated port to 8080
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Ensure products is set only if the response is an array
        } else {
          console.error("API response is not an array:", response.data);
          setProducts([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]); // Fallback to an empty array in case of error
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] }); // Store the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("image", newProduct.image); // Append the file

      await axios.post("http://localhost:8080/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
      setNewProduct({ name: "", price: "", category: "", image: "" });

      // Fetch the updated list of products
      const response = await axios.get("http://localhost:8080/api/products"); // Updated port to 8080
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`); // Updated port to 8080
      alert("Product deleted successfully!");

      // Fetch the updated list of products
      const response = await axios.get("http://localhost:8080/api/products"); // Updated port to 8080
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-8 bg-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold  mb-6 text-center">
        Admin - Manage Products
      </h1>

      <div className="bg-secondary p-6 rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-2 rounded"
              required
            />
            <input
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-2 rounded"
              type="number"
              required
            />
            <input
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 rounded"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-accent text-light py-2 px-4 rounded-md hover:bg-light hover:text-primary transition"
          >
            Add Product
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-secondary p-4 rounded-lg">
              <img
                src={`http://localhost:8080${product.image}`} // Ensure full URL for image
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
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
