import React, { useState } from 'react';
import { Package, Search, Edit2, XCircle } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import ProductForm from '../components/ProductForm';

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { products, addProduct, updateProduct, toggleProductStatus, getProductByBarcode } = useProductStore();

  const handleSearch = () => {
    if (!searchQuery) return;
    const product = getProductByBarcode(searchQuery);
    if (product) {
      setSelectedProduct(product);
      setFormMode('edit');
      setShowForm(true);
    } else {
      alert('Producto no encontrado');
    }
  };

  const handleSubmit = (data: any) => {
    if (formMode === 'create') {
      addProduct(data);
    } else {
      updateProduct(selectedProduct.id, data);
    }
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleDeactivate = () => {
    if (!searchQuery) return;
    const product = getProductByBarcode(searchQuery);
    if (product) {
      if (confirm('¿Está seguro de que desea cambiar el estado de este producto?')) {
        toggleProductStatus(product.id);
      }
    } else {
      alert('Producto no encontrado');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
        <button
          onClick={() => {
            setFormMode('create');
            setSelectedProduct(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Actions */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar por código de barras"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Modificar</span>
            </button>
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Desactivar</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Venta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.barcode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.salePrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.requiresInventory
                      ? `${product.stock} / ${product.minStock}`
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
        mode={formMode}
      />
    </div>
  );
}