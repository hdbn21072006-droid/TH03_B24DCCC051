import React, { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Product } from '../types';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const { state } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('Tất cả');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let arr = state.products.slice();
    if (search) arr = arr.filter((p) => p.ten.toLowerCase().includes(search.toLowerCase()));
    if (category && category !== 'Tất cả') arr = arr.filter((p) => p.danhMuc === category);
    if (minPrice !== '') arr = arr.filter((p) => p.gia >= Number(minPrice));
    if (maxPrice !== '') arr = arr.filter((p) => p.gia <= Number(maxPrice));
    return arr;
  }, [state.products, search, category, minPrice, maxPrice]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageItems: Product[] = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <p>Tổng: {total} sản phẩm — Trang {currentPage}/{totalPages}</p>
      <ProductList products={pageItems} />
      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
};

export default HomePage;
