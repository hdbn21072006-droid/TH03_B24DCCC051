import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const product = state.products.find(p => p.id === id);
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const handleUpdate = (data: any) => {
    dispatch({ type: 'UPDATE', payload: { ...product, ...data, id: product.id } });
    navigate('/');
  };

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={product} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditProductPage;
