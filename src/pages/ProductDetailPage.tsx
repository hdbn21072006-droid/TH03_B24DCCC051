import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useProducts();
  const navigate = useNavigate();

  const product = state.products.find((p) => p.id === id);
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
      <h2>{product.ten}</h2>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()}</p>
      <p>Số lượng: {product.soLuong}</p>
      <p>Mô tả: {product.moTa}</p>
    </div>
  );
};

export default ProductDetailPage;
