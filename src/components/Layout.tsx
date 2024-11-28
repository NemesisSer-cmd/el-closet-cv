import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShoppingCart, Package, Users, BarChart2, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Clock from './Clock';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b">
            <Store className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">EL CLOSET C.V.</h1>
          </div>

          {/* Clock */}
          <div className="p-4 border-b">
            <Clock />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <button onClick={() => navigate('/')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Point of Sale
              </button>
              <button onClick={() => navigate('/products')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                <Package className="w-5 h-5 mr-3" />
                Products
              </button>
              <button onClick={() => navigate('/inventory')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                <Store className="w-5 h-5 mr-3" />
                Inventory
              </button>
              {user?.role === 'admin' && (
                <button onClick={() => navigate('/users')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                  <Users className="w-5 h-5 mr-3" />
                  Users
                </button>
              )}
              <button onClick={() => navigate('/reports')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                <BarChart2 className="w-5 h-5 mr-3" />
                Reports
              </button>
              <button onClick={() => navigate('/settings')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}