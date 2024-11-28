import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Search, DollarSign, MinusCircle, Printer, RotateCcw } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProductStore } from '../store/productStore';
import { useSaleStore } from '../store/saleStore';
import PaymentModal from '../components/PaymentModal';
import Clock from '../components/Clock';

interface TicketItem {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

interface Ticket {
  id: string;
  items: TicketItem[];
  total: number;
}

export default function POS() {
  const [tickets, setTickets] = useState<Ticket[]>([{ id: '1', items: [], total: 0 }]);
  const [activeTicket, setActiveTicket] = useState(0);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showDailySales, setShowDailySales] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { products, getProductByBarcode } = useProductStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F6') {
      addNewTicket();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addNewTicket = () => {
    setTickets([...tickets, { id: String(tickets.length + 1), items: [], total: 0 }]);
    setActiveTicket(tickets.length);
  };

  const removeTicket = (index: number) => {
    if (tickets.length > 1) {
      const newTickets = tickets.filter((_, i) => i !== index);
      setTickets(newTickets);
      setActiveTicket(Math.min(activeTicket, newTickets.length - 1));
    }
  };

  const addProduct = (barcode: string) => {
    const product = getProductByBarcode(barcode);
    if (product) {
      const newTickets = [...tickets];
      const ticket = newTickets[activeTicket];
      const existingItem = ticket.items.find(item => item.barcode === barcode);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        ticket.items.push({
          id: product.id,
          barcode: product.barcode,
          name: product.name,
          price: product.salePrice,
          quantity: 1,
          discount: 0
        });
      }

      ticket.total = calculateTotal(ticket.items);
      setTickets(newTickets);
      setBarcodeInput('');
    }
  };

  const calculateTotal = (items: TicketItem[]) => {
    return items.reduce((sum, item) => 
      sum + (item.price * (1 - item.discount / 100) * item.quantity), 0
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Punto de Venta</h1>
          <Clock />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Usuario: {user?.name}</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Left Panel - Tickets */}
        <div className="col-span-8 bg-white rounded-lg shadow p-4">
          {/* Ticket Tabs */}
          <div className="flex space-x-2 mb-4">
            {tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`flex items-center ${
                  activeTicket === index
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                } rounded-lg px-3 py-1 cursor-pointer`}
              >
                <button
                  onClick={() => setActiveTicket(index)}
                  className="mr-2"
                >
                  Ticket {ticket.id}
                </button>
                {tickets.length > 1 && (
                  <button
                    onClick={() => removeTicket(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addNewTicket}
              className="bg-purple-600 text-white rounded-lg px-3 py-1 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Active Ticket */}
          <div className="h-[calc(100vh-300px)] flex flex-col">
            <div className="flex-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets[activeTicket].items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.barcode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-3xl font-bold">
                  ${tickets[activeTicket].total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Actions */}
        <div className="col-span-4 space-y-4">
          {/* Barcode Input */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addProduct(barcodeInput);
                  }
                }}
                placeholder="Escanear código de barras"
                className="flex-1 rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                onClick={() => addProduct(barcodeInput)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                <Plus className="w-5 h-5" />
                <span>INS Varios</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700">
                <DollarSign className="w-5 h-5" />
                <span>Entrada</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700">
                <MinusCircle className="w-5 h-5" />
                <span>Salida</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
                <Printer className="w-5 h-5" />
                <span>Reimprimir</span>
              </button>
              <button 
                onClick={() => setShowDailySales(true)}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Ventas del Día</span>
              </button>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={() => setShowPayment(true)}
            disabled={tickets[activeTicket].items.length === 0}
            className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cobrar
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        total={tickets[activeTicket].total}
        onComplete={(method, amount) => {
          // Handle payment completion
          setShowPayment(false);
          // Remove the ticket after payment
          removeTicket(activeTicket);
        }}
      />
    </div>
  );
}