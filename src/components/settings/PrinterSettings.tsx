import React, { useEffect, useState } from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export default function PrinterSettings() {
  const { settings, updatePrinterSettings } = useSettingsStore();
  const [availablePrinters, setAvailablePrinters] = useState<string[]>([]);

  useEffect(() => {
    // In a real implementation, this would use the Electron API to get system printers
    // For now, we'll simulate it
    setAvailablePrinters(['Printer 1', 'Printer 2', 'Printer 3']);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Configuración de Impresoras</h3>
        <p className="mt-1 text-sm text-gray-500">
          Selecciona la impresora predeterminada para los tickets de venta.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Impresora Predeterminada
        </label>
        <select
          value={settings.printer.defaultPrinter}
          onChange={(e) =>
            updatePrinterSettings({ defaultPrinter: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">Seleccionar impresora</option>
          {availablePrinters.map((printer) => (
            <option key={printer} value={printer}>
              {printer}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}