import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onComplete: (method: string, amount: number) => void;
}

export default function PaymentModal({ isOpen, onClose, total, onComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amount, setAmount] = useState('');
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];

  if (!isOpen) return null;

  const change = paymentMethod === 'cash' ? Number(amount) - total : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{t.payment.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex space-x-2">
            {['cash', 'card', 'layaway'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  paymentMethod === method
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {t.payment[method]}
              </button>
            ))}
          </div>

          {paymentMethod === 'cash' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.payment.amount}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.payment.change}
                </label>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  ${change.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => onComplete(paymentMethod, Number(amount))}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              {t.payment.print}
            </button>
            <button
              onClick={() => onComplete(paymentMethod, Number(amount))}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              {t.payment.complete}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}