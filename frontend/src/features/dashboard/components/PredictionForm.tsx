import React from 'react';
import type { PredictFormState } from '../types';
import { TrendingUp, DollarSign, Tag, RefreshCw, BarChart3, PackageSearch } from 'lucide-react';

interface PredictionFormProps {
  form: PredictFormState;
  prediction: string | null;
  predicting: boolean;
  onChange: (form: PredictFormState) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PredictionForm({ form, prediction, predicting, onChange, onSubmit }: PredictionFormProps) {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
              <PackageSearch className="text-indigo-500" />
              Predict Product Status
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Enter product metrics to let our AI model predict if it will be 'Laris' (Best Seller) or not.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sales Vol</label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required value={form.jumlah_penjualan}
                  onChange={e => onChange({ ...form, jumlah_penjualan: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-shadow"
                  placeholder="e.g. 150"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Price (Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required value={form.harga}
                  onChange={e => onChange({ ...form, harga: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-shadow"
                  placeholder="e.g. 50000"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Discount %</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required value={form.diskon}
                  onChange={e => onChange({ ...form, diskon: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-shadow"
                  placeholder="e.g. 15"
                />
              </div>
            </div>

            <button
              type="submit" disabled={predicting}
              className="md:col-span-3 mt-2 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {predicting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
              {predicting ? 'Analyzing...' : 'Generate Prediction'}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          {prediction ? (
            <div className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${prediction === 'Laris' ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">AI Prediction Result</div>
              <div className={`text-5xl font-black mb-4 ${prediction === 'Laris' ? 'text-emerald-600 drop-shadow-sm' : 'text-rose-600'}`}>
                {prediction === 'Laris' ? '🚀 LARIS' : '📉 TIDAK LARIS'}
              </div>
              <p className="text-sm text-slate-600">Based on Random Forest ML model confidence.</p>
            </div>
          ) : (
            <div className="h-full min-h-[200px] border border-dashed border-slate-300 bg-slate-50/50 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
              Submit metrics to see AI prediction
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
