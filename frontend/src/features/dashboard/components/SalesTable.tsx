import React from 'react';
import type { SaleRecord } from '../types';
import { RefreshCw } from 'lucide-react';

interface SalesTableProps {
  sales: SaleRecord[];
  loading: boolean;
  onRefresh: () => void;
}

export default function SalesTable({ sales, loading, onRefresh }: SalesTableProps) {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recent Sales Data</h2>
          <p className="text-sm text-slate-500">Showing top 50 records from dataset.</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-indigo-500' : 'text-slate-600'}`} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Product ID</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Sales Vol</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Discount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-8"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                </tr>
              ))
            ) : (
              sales.map((sale) => (
                <tr key={sale.product_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">{sale.product_id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{sale.product_name}</td>
                  <td className="px-6 py-4 text-slate-700">{sale.jumlah_penjualan}</td>
                  <td className="px-6 py-4 text-slate-700">Rp {sale.harga.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-700">{sale.diskon}%</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                        sale.status === 'Laris'
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
