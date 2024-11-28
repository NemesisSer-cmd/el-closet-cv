import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export default function TicketEditor() {
  const { settings, updateTicketSettings } = useSettingsStore();
  const { ticket } = settings;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Formato del Ticket</h3>
        <p className="mt-1 text-sm text-gray-500">
          Personaliza la información que aparecerá en los tickets de venta.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Encabezado
          </label>
          <textarea
            value={ticket.header}
            onChange={(e) => updateTicketSettings({ header: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pie de Página
          </label>
          <textarea
            value={ticket.footer}
            onChange={(e) => updateTicketSettings({ footer: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={ticket.showLogo}
              onChange={(e) => updateTicketSettings({ showLogo: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mostrar Logo</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={ticket.showAddress}
              onChange={(e) =>
                updateTicketSettings({ showAddress: e.target.checked })
              }
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mostrar Dirección</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={ticket.showPhone}
              onChange={(e) => updateTicketSettings({ showPhone: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Mostrar Teléfono
            </span>
          </label>
        </div>

        {ticket.showAddress && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              value={ticket.address}
              onChange={(e) => updateTicketSettings({ address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        )}

        {ticket.showPhone && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              value={ticket.phone}
              onChange={(e) => updateTicketSettings({ phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}