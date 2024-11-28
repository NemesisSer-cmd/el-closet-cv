import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../types';

interface ClientState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'active'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  toggleClientStatus: (id: string) => void;
  getActiveClients: () => Client[];
  getInactiveClients: () => Client[];
}

export const useClientStore = create<ClientState>((set, get) => ({
  clients: [],
  addClient: (clientData) => {
    const client: Client = {
      ...clientData,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ clients: [...state.clients, client] }));
  },
  updateClient: (id, clientData) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id
          ? { ...client, ...clientData, updatedAt: new Date().toISOString() }
          : client
      ),
    }));
  },
  toggleClientStatus: (id) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id
          ? { ...client, active: !client.active, updatedAt: new Date().toISOString() }
          : client
      ),
    }));
  },
  getActiveClients: () => {
    return get().clients.filter((client) => client.active);
  },
  getInactiveClients: () => {
    return get().clients.filter((client) => !client.active);
  },
}));