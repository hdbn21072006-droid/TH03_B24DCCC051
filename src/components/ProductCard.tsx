import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  const handleDelete = () => {
if (window.confirm(`Xóa ${product.ten}?`)) {

      dispatch({ type: 'DELETE', payload: { id: product.id } });
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 8, borderRadius: 8 }}>
      <h3>{product.ten}</h3>
      <p>{product.danhMuc} • Giá: {product.gia.toLocaleString()} • SL: {product.soLuong}</p>
      <p>{product.moTa}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to={`/products/${product.id}`}>Chi tiết</Link>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button onClick={handleDelete}>Xóa</button>
      </div>
    </div>
  );
};

export default ProductCard;
