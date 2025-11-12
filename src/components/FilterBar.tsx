import React from 'react';
export default function FilterBar({ category, setCategory, minPrice, maxPrice, setMinPrice, setMaxPrice }: any) {
  return (
    <div style={{ display:'flex', gap: 8, margin: '8px 0' }}>
      <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="Tất cả">Tất cả</option>
        <option>Điện tử</option>
        <option>Quần áo</option>
        <option>Đồ ăn</option>
        <option>Sách</option>
        <option>Khác</option>
      </select>
      <input placeholder="Min" value={minPrice as any} onChange={(e)=>setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} type="number" />
      <input placeholder="Max" value={maxPrice as any} onChange={(e)=>setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} type="number" />
      <button onClick={()=>{ setCategory('Tất cả'); setMinPrice(''); setMaxPrice(''); }}>Reset</button>
    </div>
  );
}
