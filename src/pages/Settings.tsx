import React, { useState } from 'react';
import { Printer, Receipt, CreditCard, Users } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import TicketEditor from '../components/settings/TicketEditor';
import PrinterSettings from '../components/settings/PrinterSettings';
import PaymentMethodsSettings from '../components/settings/PaymentMethodsSettings';
import UserManagement from '../components/settings/UserManagement';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('ticket');
  const settings = useSettingsStore((state) => state.settings);

  const renderContent = () => {
    switch (activeTab) {
      case 'ticket':
        return <TicketEditor />;
      case 'printer':
        return <PrinterSettings />;
      case 'payment':
        return <PaymentMethodsSettings />;
      case 'users':
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('ticket')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'ticket'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5" />
                <span>Formato de Ticket</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('printer')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'printer'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5" />
                <span>Impresoras</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'payment'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Métodos de Pago</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Usuarios</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}