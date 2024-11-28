import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export default function PaymentMethodsSettings() {
  const { settings, updatePaymentMethods } = useSettingsStore();

  const togglePaymentMethod = (id: string) => {
    const updatedMethods = settings.paymentMethods.map((method) =>
      method.id === id ? { ...method, active: !method.active } : method
    );
    updatePaymentMethods(updatedMethods);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Métodos de Pago</h3>
        <p className="mt-1 text-sm text-gray-500">
          Activa o desactiva los métodos de pago disponibles.
        </p>
      </div>

      <div className="space-y-4">
        {settings.paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{method.name}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={method.active}
                onChange={() => togglePaymentMethod(method.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}