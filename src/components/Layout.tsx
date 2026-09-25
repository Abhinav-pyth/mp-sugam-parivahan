import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Bus, MapPin, Radio, DollarSign, Building2, Megaphone, Home, Route, MoreHorizontal, Search } from 'lucide-react';

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/routes', label: t('routes'), icon: Route },
    { path: '/bus-stops', label: t('busStops'), icon: MapPin },
    { path: '/live', label: t('liveTracking'), icon: Radio },
    { path: '/fares', label: t('fares'), icon: DollarSign },
    { path: '/cities', label: t('cities'), icon: Building2 },
    { path: '/announcements', label: t('announcements'), icon: Megaphone },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 bg-gradient-to-br from-mp-blue to-mp-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-navy-900 leading-tight truncate">{t('siteName')}</div>
              <div className="text-[10px] text-navy-600 leading-tight truncate hindi-text">{t('siteTitle')}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-mp-blue/10 text-mp-blue'
                    : 'text-navy-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-navy-200 text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-mp-blue/10 text-mp-blue'
                        : 'text-navy-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/plan-trip"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 hover:bg-gray-100"
              >
                <Route className="w-4 h-4" />
                {t('planTrip')}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {[
            { path: '/', icon: Home, label: t('home') },
            { path: '/routes', icon: Search, label: t('search') },
            { path: '/routes', icon: Route, label: t('routes') },
            { path: '/live', icon: Radio, label: t('live') },
            { path: '/announcements', icon: MoreHorizontal, label: t('more') },
          ].map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 ${isActive ? 'text-mp-blue' : 'text-navy-500'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-900 text-white pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-lg flex items-center justify-center">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">{t('siteName')}</div>
                <div className="text-[10px] text-navy-300 hindi-text">{t('siteTitle')}</div>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed">{t('siteSubtitle')}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-saffron-400">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li><Link to="/routes" className="hover:text-white transition-colors">{t('routes')}</Link></li>
              <li><Link to="/bus-stops" className="hover:text-white transition-colors">{t('busStops')}</Link></li>
              <li><Link to="/live" className="hover:text-white transition-colors">{t('liveTracking')}</Link></li>
              <li><Link to="/fares" className="hover:text-white transition-colors">{t('fares')}</Link></li>
              <li><Link to="/cities" className="hover:text-white transition-colors">{t('cities')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-saffron-400">{t('passengerInfo')}</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li><Link to="/announcements" className="hover:text-white transition-colors">{t('announcements')}</Link></li>
              <li><Link to="/plan-trip" className="hover:text-white transition-colors">{t('planTrip')}</Link></li>
              <li><span className="cursor-default">{t('safety')}</span></li>
              <li><span className="cursor-default">{t('accessibility')}</span></li>
              <li><span className="cursor-default">{t('help')}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-saffron-400">{t('safety')}</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>• GPS Tracking</li>
              <li>• CCTV Surveillance</li>
              <li>• Emergency Panic Button</li>
              <li>• Accessible Buses</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-700">
          <p className="text-xs text-navy-400 leading-relaxed max-w-3xl">
            ⚠️ {t('disclaimer')}
          </p>
          <p className="text-xs text-navy-500 mt-3">
            © 2026 MP Sugam Parivahan — Independent Information Interface
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LaunchNotice() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-saffron-50 border-b border-saffron-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
        <div className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5">
          <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-sm text-saffron-800 flex-1 leading-relaxed">{t('launchNotice')}</p>
        <button onClick={() => setDismissed(true)} className="text-saffron-600 hover:text-saffron-800 flex-shrink-0" aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function DemoBadge() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full border border-amber-200">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
      {t('demoData')}
    </span>
  );
}
