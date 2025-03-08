import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVReader } from 'react-csv-reader';
import * as XLSX from 'xlsx';

import './product.css'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    size: '',
    color: '',
    stock: '',
    imageUrl: '',
  });

  // Fetch products from the backend
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/products');
//       setProducts(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        size: '',
        color: '',
        stock: '',
        imageUrl: '',
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      size: product.size,
      color: product.color,
      stock: product.stock,
      imageUrl: product.imageUrl,
    });
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Bulk Upload via CSV
  const handleCSVUpload = (data) => {
    const products = data.map((row) => ({
      name: row[0],
      description: row[1],
      price: parseFloat(row[2]),
      category: row[3],
      size: row[4],
      color: row[5],
      stock: parseInt(row[6]),
      imageUrl: row[7],
    }));

//     axios.post('http://localhost:5000/api/products/bulk', products)
//       .then(() => fetchProducts())
//       .catch(err => console.error(err));
  };

  // Bulk Upload via Excel
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const products = json.slice(1).map((row) => ({
        name: row[0],
        description: row[1],
        price: parseFloat(row[2]),
        category: row[3],
        size: row[4],
        color: row[5],
        stock: parseInt(row[6]),
        imageUrl: row[7],
      }));
      axios.post('http://localhost:5000/api/products/bulk', products)
        .then(() => fetchProducts())
        .catch(err => console.error(err));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="product-management">
      <h1>Product Management</h1>

      {/* Add/Edit Product Form */}
      <div className="form-container">
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        </form>
      </div>

      {/* Bulk Upload Section */}
      <div className="bulk-upload">
        <h2>Bulk Upload Products</h2>
        {/* <CSVReader onFileLoaded={handleCSVUpload} /> */}
        <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
      </div>

      {/* Product List Table */}
      <div className="product-list">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.size}</td>
                <td>{product.color}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;