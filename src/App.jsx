import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import MedicationsPage from './pages/MedicationsPage'
import AppointmentsPage from './pages/AppointmentsPage'
import ProfilePage from './pages/ProfilePage'
import SymptomsPage from './pages/SymptomsPage'
import MapPage from './pages/MapPage'
import SOSPage from './pages/SOSPage'
import FamilyAccessPage from './pages/FamilyAccessPage'
import QRViewPage from './pages/QRViewPage'
import AshaWorkerPage from './pages/AshaWorkerPage'
import AlertsPage from './pages/AlertsPage'
import DemoLoopPage from './pages/DemoLoopPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Primary Entry Point: Shows the Main ElderCare AI Dashboard immediately! */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Public Routes */}
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/qr/:userId" element={<QRViewPage />} />

            {/* Core Features */}
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/sos" element={<SOSPage />} />
            <Route path="/family-access" element={<FamilyAccessPage />} />
            <Route path="/asha-worker" element={<AshaWorkerPage />} />
            <Route path="/demo-loop" element={<DemoLoopPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
