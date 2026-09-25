import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { popularRoutes, cities, statistics, destinations, announcements, routes as allRoutes } from '../data/mockData';
import { CITIES } from '../data/mockData';
import {
  Search, ArrowRightLeft, MapPin, Bus, Camera, Radio,
  Zap, Users, Target, Building2, ChevronRight,
  Globe, AlertCircle, Navigation, ArrowRight, Route
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (from && to) {
      navigate(`/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${date ? `&date=${date}` : ''}`);
    }
  };

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleQuickRoute = (route: { from: string; to: string }) => {
    navigate(`/routes?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-mp-blue to-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
            <path d="M0 300 Q300 200 600 300 T1200 300" stroke="white" strokeWidth="1" opacity="0.3"/>
            <path d="M0 350 Q300 250 600 350 T1200 350" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="200" cy="200" r="3" fill="white" opacity="0.4"/>
            <circle cx="400" cy="280" r="2" fill="white" opacity="0.3"/>
            <circle cx="600" cy="250" r="3" fill="white" opacity="0.4"/>
            <circle cx="800" cy="300" r="2" fill="white" opacity="0.3"/>
            <circle cx="1000" cy="270" r="3" fill="white" opacity="0.4"/>
            {/* MP Map silhouette hint */}
            <path d="M500 150 L550 130 L620 140 L680 160 L720 200 L700 260 L650 300 L580 310 L520 290 L480 250 L470 200 Z" stroke="white" strokeWidth="0.5" fill="white" fillOpacity="0.03"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              {t('travelAcross')}
            </h1>
            <p className="text-lg md:text-xl text-navy-200 hindi-text mb-2">
              {t('hindiSub')}
            </p>
            <p className="text-sm text-navy-300 max-w-2xl mx-auto">
              {t('searchDesc')}
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase tracking-wide">{t('from')}</label>
                  <select
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30 focus:border-mp-blue"
                    aria-label="Select departure city"
                  >
                    <option value="">{t('selectCity')}</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <button
                  onClick={swapCities}
                  className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-saffron-100 text-saffron-600 hover:bg-saffron-200 transition-colors self-end mb-1"
                  aria-label="Swap cities"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>

                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase tracking-wide">{t('to')}</label>
                  <select
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30 focus:border-mp-blue"
                    aria-label="Select destination city"
                  >
                    <option value="">{t('selectCity')}</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase tracking-wide">{t('date')}</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30 focus:border-mp-blue"
                    aria-label="Select travel date"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSearch}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-mp-blue to-mp-blue-light text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-mp-blue/20"
                >
                  <Search className="w-5 h-5" />
                  {t('searchBuses')}
                </button>
                <Link
                  to="/plan-trip"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-saffron-500 text-white font-semibold rounded-xl hover:bg-saffron-600 transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  {t('planTrip')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking/Launch Info — Targets trending news searches */}
      <section className="py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LAUNCHED TODAY
            </span>
            <p className="text-sm text-green-800 font-medium">
              <strong>MP Sugam Parivahan</strong> launched with <strong>351 buses</strong> across 7 regions on September 25, 2026 — Indore gets 145 buses
            </p>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-6">{t('popularRoutes')}</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {popularRoutes.map((route, i) => (
              <button
                key={i}
                onClick={() => handleQuickRoute(route)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-navy-50 border border-navy-100 rounded-full hover:bg-mp-blue hover:text-white hover:border-mp-blue transition-all group"
              >
                <span className="text-sm font-medium text-navy-800 group-hover:text-white">{route.from}</span>
                <ArrowRight className="w-3.5 h-3.5 text-navy-400 group-hover:text-white" />
                <span className="text-sm font-medium text-navy-800 group-hover:text-white">{route.to}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Statistics */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-navy-900">{t('serviceStats')}</h2>
            <span className="px-2 py-0.5 bg-navy-100 text-navy-600 text-[10px] font-semibold rounded-full">{t('launchInfo')}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: statistics.initialBuses, label: t('initialBuses'), icon: Bus, color: 'from-blue-500 to-blue-600' },
              { value: statistics.indoreBuses, label: t('busesAllocated'), icon: Building2, color: 'from-emerald-500 to-emerald-600' },
              { value: statistics.indoreIntracity, label: t('intracityBuses'), icon: MapPin, color: 'from-violet-500 to-violet-600' },
              { value: statistics.indoreIntercity, label: t('intercityBuses'), icon: Route, color: 'from-amber-500 to-amber-600' },
              { value: statistics.regionalDivisions, label: t('regionalDivisions'), icon: Globe, color: 'from-rose-500 to-rose-600' },
              { value: `${(statistics.targetFleet2031/1000).toFixed(0)}K+`, label: t('targetFleet'), icon: Target, color: 'from-cyan-500 to-cyan-600' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                  <div className="text-xs text-navy-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Network */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-6">{t('regionalNetwork')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map(city => (
              <Link
                key={city.id}
                to={`/cities/${city.id}`}
                className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:border-mp-blue/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-mp-blue/10 rounded-lg flex items-center justify-center group-hover:bg-mp-blue/20 transition-colors">
                    <Building2 className="w-5 h-5 text-mp-blue" />
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{city.name}</div>
                    <div className="text-[10px] text-navy-500 hindi-text">{city.nameHi}</div>
                  </div>
                </div>
                <div className="text-xs text-navy-600 mb-2">
                  <span className="font-semibold text-navy-800">{city.totalBuses}</span> {t('totalBuses').toLowerCase()}
                </div>
                <div className="flex items-center gap-1 text-xs text-mp-blue font-medium">
                  {t('viewRoutes')} <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-6">{t('popularDestinations')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {destinations.map((dest, i) => (
              <Link
                key={i}
                to={`/routes?to=${encodeURIComponent(dest.name)}`}
                className="bg-white rounded-xl p-3 border border-gray-100 hover:border-saffron-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-8 h-8 mx-auto mb-2 bg-saffron-100 rounded-full flex items-center justify-center group-hover:bg-saffron-200 transition-colors">
                  <MapPin className="w-4 h-4 text-saffron-600" />
                </div>
                <div className="text-xs font-semibold text-navy-900">{dest.name}</div>
                <div className="text-[10px] text-navy-500 hindi-text">{dest.nameHi}</div>
                <div className="text-[10px] text-navy-400 mt-1">{dest.routes} routes</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Indore Bus Network */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-navy-900 to-mp-blue rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">{t('indoreBusNetwork')}</h2>
                <p className="text-navy-300 text-sm">Largest allocation under Sugam Parivahan</p>
              </div>
              <Link to="/cities/indore" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
                {t('viewRoutes')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">145</div>
                <div className="text-xs text-navy-300 mt-1">Total Buses</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">50</div>
                <div className="text-xs text-navy-300 mt-1">Intercity</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">95</div>
                <div className="text-xs text-navy-300 mt-1">Intracity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Technology */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-6">{t('safetyTech')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Navigation, title: t('gpsTracking'), desc: t('gpsDesc'), color: 'bg-blue-100 text-blue-600' },
              { icon: Camera, title: t('cctv'), desc: t('cctvDesc'), color: 'bg-purple-100 text-purple-600' },
              { icon: AlertCircle, title: t('emergencyButton'), desc: t('emergencyDesc'), color: 'bg-red-100 text-red-600' },
              { icon: Users, title: t('accessibleBuses'), desc: t('accessibleDesc'), color: 'bg-green-100 text-green-600' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-navy-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Tracking Preview */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <h2 className="text-lg font-bold text-navy-900">{t('liveTracking')}</h2>
                </div>
                <p className="text-sm text-navy-600 mb-4">Track buses in real-time with GPS-enabled tracking across all routes.</p>
                <Link to="/live" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                  <Radio className="w-4 h-4" />
                  Open Live Map
                </Link>
              </div>
              <div className="flex-shrink-0 w-full md:w-64 h-40 bg-emerald-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-8 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-12 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-8 left-16 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <path d="M20 50 Q60 20 100 50 T180 50" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                    <path d="M30 70 Q80 40 130 70 T190 60" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <Bus className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                  <span className="text-xs font-semibold text-emerald-700">Live Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-navy-900">{t('latestNews')}</h2>
            <Link to="/announcements" className="text-sm text-mp-blue font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.slice(0, 3).map(ann => (
              <div key={ann.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    ann.category === 'Safety' ? 'bg-red-100 text-red-700' :
                    ann.category === 'Bus Launches' ? 'bg-blue-100 text-blue-700' :
                    ann.category === 'New Routes' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{ann.category}</span>
                  {ann.important && <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-saffron-100 text-saffron-700">{t('important')}</span>}
                </div>
                <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug">{ann.title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3 line-clamp-2">{ann.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-navy-400">{ann.date}</span>
                  <span className="text-[10px] text-navy-400">{ann.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — Critical for SEO Featured Snippets */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-2 text-center">
            MP Sugam Parivahan — Frequently Asked Questions
          </h2>
          <p className="text-sm text-navy-500 text-center mb-8 hindi-text">
            मुख्यमंत्री सुगम परिवहन सेवा — अक्सर पूछे जाने वाले प्रश्न
          </p>
          <div className="space-y-3">
            {[
              {
                q: 'What is MP Sugam Parivahan (Mukhyamantri Sugam Parivahan Seva)?',
                qHi: 'एमपी सुगम परिवहन (मुख्यमंत्री सुगम परिवहन सेवा) क्या है?',
                a: 'MP Sugam Parivahan is a Madhya Pradesh government-supervised public bus service launched on September 25, 2026. It provides intercity and intracity bus transportation across 7 regional transport divisions with 351 initial buses, targeting a fleet of 15,000 by 2031.'
              },
              {
                q: 'How many buses are in MP Sugam Parivahan?',
                qHi: 'एमपी सुगम परिवहन में कितनी बसें हैं?',
                a: 'The service launched with 351 buses. Indore has the largest allocation with 145 buses (95 intracity + 50 intercity). The target fleet is 15,000 buses by 2031.'
              },
              {
                q: 'Which cities are covered under Sugam Parivahan?',
                qHi: 'सुगम परिवहन के तहत कौन से शहर शामिल हैं?',
                a: 'Seven regional divisions: Indore, Bhopal, Jabalpur, Gwalior, Ujjain, Sagar, and Rewa, with connections to Dewas, Dhar, Shivpuri, Morena, Shahdol, Singrauli and more.'
              },
              {
                q: 'What types of buses operate under Sugam Parivahan?',
                qHi: 'सुगम परिवहन में कौन सी बसें चलती हैं?',
                a: 'AC Electric buses, AC Seater, AC Sleeper, Non-AC Seater, and CNG/Electric buses. All buses have GPS, CCTV, and emergency panic buttons.'
              },
              {
                q: 'What is the Indore to Singrauli bus route?',
                qHi: 'इंदौर से सिंगरौली बस मार्ग क्या है?',
                a: 'The Indore-Singrauli route covers approximately 889 km, one of the longest routes under Sugam Parivahan, passing through Bhopal, Jabalpur, and Rewa.'
              },
              {
                q: 'Are MP Sugam Parivahan buses safe?',
                qHi: 'क्या एमपी सुगम परिवहन बसें सुरक्षित हैं?',
                a: 'Yes. All buses are equipped with GPS tracking, CCTV surveillance, emergency panic buttons, and many offer wheelchair accessibility with low-floor designs.'
              },
              {
                q: 'How to find MP Sugam Parivahan bus timings?',
                qHi: 'एमपी सुगम परिवहन बस का समय कैसे पता करें?',
                a: 'Search routes on this portal to find departure times, pickup points, and bus information. Timetables are being updated progressively following the launch.'
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-4 md:p-5 font-semibold text-navy-900 text-sm md:text-base hover:bg-gray-100 transition-colors list-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-navy-400 transition-transform group-open:rotate-90 flex-shrink-0 ml-2" />
                </summary>
                <div className="px-4 md:px-5 pb-4 md:pb-5">
                  <p className="text-sm text-navy-600 leading-relaxed">{faq.a}</p>
                  <p className="text-xs text-navy-400 mt-2 hindi-text">{faq.qHi}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* About Section — SEO keyword-rich content */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 text-center">
            About MP Sugam Parivahan — Madhya Pradesh Government Bus Service
          </h2>
          <div className="prose prose-sm max-w-none text-navy-600 space-y-4">
            <p>
              <strong>MP Sugam Parivahan</strong> (मुख्यमंत्री सुगम परिवहन सेवा / Mukhyamantri Sugam Parivahan Seva) is a new public transportation initiative by the Madhya Pradesh government, launched on <strong>September 25, 2026</strong>. The service aims to provide affordable, safe, and accessible bus transportation across all regions of Madhya Pradesh.
            </p>
            <p>
              The initial launch includes <strong>351 buses</strong> distributed across <strong>7 regional transport divisions</strong> — Indore, Bhopal, Jabalpur, Gwalior, Ujjain, Sagar, and Rewa. Indore receives the largest allocation with <strong>145 buses</strong> (95 intracity and 50 intercity). The government has set an ambitious target of expanding the fleet to <strong>15,000 buses by 2031</strong>.
            </p>
            <p>
              The bus fleet includes <strong>electric buses</strong>, <strong>CNG buses</strong>, and diesel-operated vehicles in AC and Non-AC configurations. All buses are equipped with modern safety features including <strong>GPS tracking</strong>, <strong>CCTV surveillance</strong>, <strong>emergency panic buttons</strong>, and wheelchair accessibility.
            </p>
            <p>
              Popular routes under the Sugam Parivahan network include <strong>Indore to Bhopal</strong> (~198 km), <strong>Indore to Ujjain</strong> (~55 km), <strong>Indore to Jabalpur</strong> (~378 km), <strong>Bhopal to Jabalpur</strong> (~280 km), <strong>Gwalior to Bhopal</strong> (~423 km), and the long-distance <strong>Indore to Singrauli</strong> route (~889 km).
            </p>
            <p className="text-xs text-navy-400 italic">
              Note: This is an independent information portal. Timings, fares, and route details should be verified from official government sources before travel.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Planner CTA */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl p-6 md:p-8 text-white text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{t('travelPlanner')}</h2>
            <p className="text-saffron-100 text-sm mb-6 max-w-lg mx-auto">{t('travelPlannerDesc')}</p>
            <Link to="/plan-trip" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-saffron-700 font-bold rounded-xl hover:bg-saffron-50 transition-colors shadow-lg">
              <Navigation className="w-5 h-5" />
              {t('planNow')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
