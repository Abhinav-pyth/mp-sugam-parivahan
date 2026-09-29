import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header, Footer, LaunchNotice } from './components/Layout';
import AdSlot, { AdFormats } from './components/AdSlot';
import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import RouteDetailPage from './pages/RouteDetailPage';
import BusStopsPage from './pages/BusStopsPage';
import LiveTrackingPage from './pages/LiveTrackingPage';
import CityPage from './pages/CityPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import FaresPage from './pages/FaresPage';
import PlanTripPage from './pages/PlanTripPage';
import BusDetailPage from './pages/BusDetailPage';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <LaunchNotice />
      {/* Adsterra — Top leaderboard (728x90 / responsive) */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-3">
        <AdSlot placement="leaderboard_top" format="horizontal" />
      </div>
      <main className="flex-1">{children}</main>
      {/* Adsterra — Footer banner (970x250) */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-6">
        <AdSlot placement="footer_banner" format="horizontal" />
      </div>
      <Footer />
      {/* Adsterra — site-wide formats: Popunder + SocialBar (load once per page view) */}
      <AdFormats />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/routes/:routeId" element={<RouteDetailPage />} />
            <Route path="/bus-stops" element={<BusStopsPage />} />
            <Route path="/live" element={<LiveTrackingPage />} />
            <Route path="/cities" element={<CityPage />} />
            <Route path="/cities/:cityId" element={<CityPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/fares" element={<FaresPage />} />
            <Route path="/plan-trip" element={<PlanTripPage />} />
            <Route path="/buses/:busId" element={<BusDetailPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
