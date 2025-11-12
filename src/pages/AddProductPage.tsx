import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';

const AddProductPage: React.FC = () => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  const handleAdd = (data: any) => {
    dispatch({ type: 'ADD', payload: data });
    navigate('/');
  };

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddProductPage;
