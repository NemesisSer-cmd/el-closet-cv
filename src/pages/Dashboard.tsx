import React from 'react';
import { Routes, Route } from 'react-router-dom';
import POS from './POS';
import Products from './Products';
import Inventory from './Inventory';
import Users from './Users';
import Reports from './Reports';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<POS />} />
      <Route path="/products" element={<Products />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/users" element={<Users />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}