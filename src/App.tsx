import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

const App: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link> | <Link to="/add">Thêm sản phẩm</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
