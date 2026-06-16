import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mern_product_crud');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Quantum Core Processor', price: 299.99, category: 'Hardware', stock: 15, rating: 4.8, description: 'Superconducting CPU with sub-nanosecond instruction execution.', imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=150&auto=format&fit=crop&q=60' },
      { id: 2, name: 'Apex GPU Accelerator', price: 799.99, category: 'Hardware', stock: 8, rating: 4.9, description: 'High-performance tensor core processing unit for deep learning tasks.', imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=150&auto=format&fit=crop&q=60' },
      { id: 3, name: 'Aether Shield Router', price: 129.99, category: 'Networking', stock: 25, rating: 4.5, description: 'Dual-band router with hardware-level firewall encryption.', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&auto=format&fit=crop&q=60' }
    ];
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('mern_product_crud', JSON.stringify(products));
  }, [products]);

  const validateProduct = () => {
    if (!name.trim()) return 'Product Name is required';
    if (parseFloat(price) <= 0 || isNaN(price)) return 'Price must be a positive number';
    if (parseInt(stock) < 0 || isNaN(stock)) return 'Stock cannot be negative';
    return null;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const error = validateProduct();
    if (error) {
      alert(error);
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      rating: 5.0,
      description: description.trim() || 'No description provided.',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=60'
    };

    setProducts([newProduct, ...products]);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('Hardware');
    setStock('');
    setDescription('');
    setImageUrl('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      if (viewingProduct?.id === id) setViewingProduct(null);
    }
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct.name.trim()) return alert('Name cannot be empty');
    if (parseFloat(editingProduct.price) <= 0) return alert('Price must be positive');
    if (parseInt(editingProduct.stock) < 0) return alert('Stock cannot be negative');

    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { 
            ...editingProduct, 
            price: parseFloat(editingProduct.price), 
            stock: parseInt(editingProduct.stock) 
          } 
        : p
    ));
    setEditingProduct(null);
  };

  // Filter & Sort
  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' ? true : p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="product-container">
      <header className="product-header">
        <div className="brand">
          <span className="logo-icon">📦</span>
          <div>
            <h1>ProductNexus</h1>
            <p className="subtitle">MERN Level - Premium Inventory Management</p>
          </div>
        </div>
        <div className="summary-box">
          <div className="stat-item">
            <span className="label">Total Products</span>
            <span className="val">{products.length}</span>
          </div>
          <div className="stat-item">
            <span className="label">Total Value</span>
            <span className="val">
              ${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      <div className="product-grid">
        {/* Creator Sidebar / Editor */}
        <aside className="product-sidebar card">
          {editingProduct ? (
            <div>
              <h2>Edit Product</h2>
              <form onSubmit={handleSaveEdit} className="product-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Networking">Networking</option>
                    <option value="Software">Software</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.imageUrl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows="3"
                  />
                </div>
                <div className="action-buttons">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2>Add Product</h2>
              <form onSubmit={handleAddProduct} className="product-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Qty</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Hardware">Hardware</option>
                    <option value="Networking">Networking</option>
                    <option value="Software">Software</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Provide details about the product..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Add to Catalog</button>
              </form>
            </div>
          )}
        </aside>

        {/* Product Catalog Display */}
        <main className="product-content">
          <div className="filters-card card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by product name or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <div className="filter-group">
                <span className="control-label">Category Filter</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select-mini"
                >
                  <option value="all">All Categories</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Networking">Networking</option>
                  <option value="Software">Software</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="filter-group">
                <span className="control-label">Sort Order</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select-mini"
                >
                  <option value="name">Product Name (A-Z)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock">Stock Availability</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog grid */}
          <div className="catalog-grid">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-card card">
                <div className="card-image-wrapper">
                  <img src={p.imageUrl} alt={p.name} className="product-img" />
                  <span className="card-category-badge">{p.category}</span>
                </div>
                <div className="card-info">
                  <div className="card-header-row">
                    <h3>{p.name}</h3>
                    <span className="price">${p.price.toFixed(2)}</span>
                  </div>
                  <p className="card-desc">{p.description.substring(0, 75)}...</p>
                  <div className="card-status-row">
                    <span className={`stock-status ${p.stock === 0 ? 'out' : p.stock < 10 ? 'low' : 'ok'}`}>
                      {p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? `Only ${p.stock} left` : `${p.stock} in stock`}
                    </span>
                    <span className="rating">⭐ {p.rating.toFixed(1)}</span>
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => setViewingProduct(p)}>View Details</button>
                    <button className="btn btn-secondary btn-sm edit" onClick={() => handleStartEdit(p)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Viewing details modal */}
      {viewingProduct && (
        <div className="detail-modal-overlay" onClick={() => setViewingProduct(null)}>
          <div className="detail-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Product Specifications</h2>
              <button className="close-btn" onClick={() => setViewingProduct(null)}>×</button>
            </div>
            <div className="modal-body">
              <img src={viewingProduct.imageUrl} alt={viewingProduct.name} className="modal-img" />
              <div className="modal-details">
                <h3>{viewingProduct.name}</h3>
                <span className="modal-badge">{viewingProduct.category}</span>
                <p className="modal-desc">{viewingProduct.description}</p>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Unit Price</span>
                    <span className="spec-val">${viewingProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Current Stock</span>
                    <span className="spec-val">{viewingProduct.stock} units</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Rating</span>
                    <span className="spec-val">⭐ {viewingProduct.rating} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
