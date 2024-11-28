import React from 'react';
import { Store } from 'lucide-react';

export default function Inventory() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <Store className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Inventory management coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}