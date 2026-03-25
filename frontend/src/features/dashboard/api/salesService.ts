import api from '../../../api/client';
import type { SaleRecord, PredictFormState } from '../types';

export const getSales = async (): Promise<SaleRecord[]> => {
  const response = await api.get<SaleRecord[]>('/sales');
  return response.data.slice(0, 50);
};

export const predictStatus = async (form: PredictFormState): Promise<string> => {
  const response = await api.post<{ status: string }>('/predict', {
    jumlah_penjualan: Number(form.jumlah_penjualan),
    harga: Number(form.harga),
    diskon: Number(form.diskon),
  });
  return response.data.status;
};
