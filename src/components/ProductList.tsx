import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
