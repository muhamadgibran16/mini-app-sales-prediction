export interface SaleRecord {
  product_id: string;
  product_name: string;
  jumlah_penjualan: number;
  harga: number;
  diskon: number;
  status: string;
}

export interface PredictFormState {
  jumlah_penjualan: string;
  harga: string;
  diskon: string;
}
