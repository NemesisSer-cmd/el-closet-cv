import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: 'create' | 'edit';
}

export default function ProductForm({ isOpen, onClose, onSubmit, initialData, mode }: ProductFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      barcode: '',
      name: '',
      description: '',
      costPrice: '',
      salePrice: '',
      wholesalePrice: '',
      department: '',
      requiresInventory: false,
      stock: '',
      minStock: '',
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      costPrice: Number(formData.costPrice),
      salePrice: Number(formData.salePrice),
      wholesalePrice: Number(formData.wholesalePrice),
      stock: formData.requiresInventory ? Number(formData.stock) : undefined,
      minStock: formData.requiresInventory ? Number(formData.minStock) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'create' ? 'Nuevo Producto' : 'Modificar Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código de Barras
              </label>
              <input
                type="text"
                required
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Producto
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio Costo
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio Venta
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio Mayoreo
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.wholesalePrice}
                onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departamento
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.requiresInventory}
                  onChange={(e) =>
                    setFormData({ ...formData, requiresInventory: e.target.checked })
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Requiere Control de Inventario
                </span>
              </label>
            </div>

            {formData.requiresInventory && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Actual
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Mínimo
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {mode === 'create' ? 'Guardar' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}