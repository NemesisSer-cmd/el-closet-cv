import React from 'react';
import { Users as UsersIcon } from 'lucide-react';

export default function Users() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">User management coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}