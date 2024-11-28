import React from 'react';
import { BarChart } from 'lucide-react';

export default function Reports() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Reports and analytics coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}