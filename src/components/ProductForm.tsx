import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';

type Props = {
  initial?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id'> | Product) => void;
};

const categories: (Category | 'Tất cả')[] = ['Tất cả', 'Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const ProductForm: React.FC<Props> = ({ initial = {}, onSubmit }) => {
  const [ten, setTen] = useState(initial.ten || '');
  const [danhMuc, setDanhMuc] = useState<Category>( (initial.danhMuc as Category) || 'Điện tử' );
  const [gia, setGia] = useState<number | ''>(initial.gia ?? '');
  const [soLuong, setSoLuong] = useState<number | ''>(initial.soLuong ?? '');
  const [moTa, setMoTa] = useState(initial.moTa || '');
  const [errors, setErrors] = useState<Record<string,string>>({});

  useEffect(() => setErrors({}), [ten, gia, soLuong, danhMuc]);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!ten || ten.trim().length < 3) e.ten = 'Tên bắt buộc, tối thiểu 3 ký tự';
    if (gia === '' || Number(gia) <= 0 || isNaN(Number(gia))) e.gia = 'Giá phải là số dương';
    if (soLuong === '' || !Number.isInteger(Number(soLuong)) || Number(soLuong) < 0) e.soLuong = 'Số lượng phải là số nguyên không âm';
    if (!danhMuc) e.danhMuc = 'Chọn danh mục';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    const payload = {
      ten: ten.trim(),
      danhMuc,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim(),
      ...(initial.id ? { id: initial.id } : {}),
    } as any;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên</label>
        <input value={ten} onChange={(e)=>setTen(e.target.value)} />
        {errors.ten && <div style={{color:'red'}}>{errors.ten}</div>}
      </div>

      <div>
        <label>Danh mục</label>
        <select value={danhMuc} onChange={(e)=>setDanhMuc(e.target.value as Category)}>
          {categories.filter(c=>c!=='Tất cả').map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.danhMuc && <div style={{color:'red'}}>{errors.danhMuc}</div>}
      </div>

      <div>
        <label>Giá</label>
        <input value={gia} onChange={(e)=>setGia(e.target.value === '' ? '' : Number(e.target.value))} type="number" />
        {errors.gia && <div style={{color:'red'}}>{errors.gia}</div>}
      </div>

      <div>
        <label>Số lượng</label>
        <input value={soLuong} onChange={(e)=>setSoLuong(e.target.value === '' ? '' : Number(e.target.value))} type="number" />
        {errors.soLuong && <div style={{color:'red'}}>{errors.soLuong}</div>}
      </div>

      <div>
        <label>Mô tả</label>
        <textarea value={moTa} onChange={(e)=>setMoTa(e.target.value)} />
      </div>

      <button type="submit">Lưu</button>
    </form>
  );
};

export default ProductForm;
