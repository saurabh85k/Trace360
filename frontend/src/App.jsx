import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ShipmentsPage from './pages/ShipmentsPage';
import ReportsPage from './pages/ReportsPage';
import FleetMapPage from './pages/FleetMapPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="fleet-map" element={<FleetMapPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
