import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import PredictionForm from '../features/dashboard/components/PredictionForm';
import SalesTable from '../features/dashboard/components/SalesTable';
import { getSales, predictStatus } from '../features/dashboard/api/salesService';
import type { SaleRecord, PredictFormState } from '../features/dashboard/types';

export default function Dashboard() {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [predictForm, setPredictForm] = useState<PredictFormState>({
    jumlah_penjualan: '',
    harga: '',
    diskon: '',
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [predicting, setPredicting] = useState<boolean>(false);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const data = await getSales();
      setSales(data);
    } catch (err) {
      console.error('Failed to fetch sales', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredicting(true);
    setPrediction(null);
    try {
      const result = await predictStatus(predictForm);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction failed', err);
      setPrediction('Error generating prediction');
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PredictionForm
          form={predictForm}
          prediction={prediction}
          predicting={predicting}
          onChange={setPredictForm}
          onSubmit={handlePredict}
        />
        <SalesTable
          sales={sales}
          loading={loading}
          onRefresh={fetchSales}
        />
      </main>
    </div>
  );
}
