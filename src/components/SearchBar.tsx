import React from 'react';
const SearchBar: React.FC<{ value: string, onChange: (v:string)=>void }> = ({ value, onChange }) => (
  <input placeholder="Tìm theo tên..." value={value} onChange={(e)=>onChange(e.target.value)} />
);
export default SearchBar;
