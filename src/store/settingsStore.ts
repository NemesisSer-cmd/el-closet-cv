import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TicketSettings {
  header: string;
  footer: string;
  showLogo: boolean;
  showAddress: boolean;
  showPhone: boolean;
  address: string;
  phone: string;
}

interface PrinterSettings {
  defaultPrinter: string;
  printers: string[];
}

interface PaymentMethod {
  id: string;
  name: string;
  active: boolean;
}

interface Settings {
  ticket: TicketSettings;
  printer: PrinterSettings;
  paymentMethods: PaymentMethod[];
}

interface SettingsState {
  settings: Settings;
  updateTicketSettings: (settings: Partial<TicketSettings>) => void;
  updatePrinterSettings: (settings: Partial<PrinterSettings>) => void;
  updatePaymentMethods: (methods: PaymentMethod[]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        ticket: {
          header: 'EL CLOSET C.V.',
          footer: '¡Gracias por su compra!',
          showLogo: true,
          showAddress: true,
          showPhone: true,
          address: '',
          phone: '',
        },
        printer: {
          defaultPrinter: '',
          printers: [],
        },
        paymentMethods: [
          { id: 'cash', name: 'Efectivo', active: true },
          { id: 'card', name: 'Tarjeta', active: true },
          { id: 'layaway', name: 'Apartado', active: true },
        ],
      },
      updateTicketSettings: (ticketSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ticket: { ...state.settings.ticket, ...ticketSettings },
          },
        })),
      updatePrinterSettings: (printerSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            printer: { ...state.settings.printer, ...printerSettings },
          },
        })),
      updatePaymentMethods: (methods) =>
        set((state) => ({
          settings: { ...state.settings, paymentMethods: methods },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);