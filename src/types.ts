export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: string;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa?: string;
}
