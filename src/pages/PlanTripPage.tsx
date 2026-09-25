import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { CITIES, routes } from '../data/mockData';
import { Navigation, Clock, Zap, ArrowRight, MapPin, Bus, Filter } from 'lucide-react';

export default function PlanTripPage() {
  const { t } = useLanguage();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [preference, setPreference] = useState('fastest');
  const [showResults, setShowResults] = useState(false);

  const handlePlan = () => {
    if (from && to) setShowResults(true);
  };

  const matchingRoute = routes.find(r => 
    r.source.toLowerCase() === from.toLowerCase() && 
    r.destination.toLowerCase() === to.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Navigation className="w-6 h-6 text-mp-blue" />
          <h1 className="text-2xl font-bold text-navy-900">{t('travelPlanner')}</h1>
        </div>
        <p className="text-sm text-navy-500 mb-6">{t('travelPlannerDesc')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Planner Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <h2 className="font-bold text-navy-900 mb-4">Plan Your Journey</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase">{t('from')}</label>
                  <select value={from} onChange={e => setFrom(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30">
                    <option value="">{t('selectCity')}</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase">{t('to')}</label>
                  <select value={to} onChange={e => setTo(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30">
                    <option value="">{t('selectCity')}</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase">{t('date')}</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mp-blue/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase">Time</label>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mp-blue/30" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-2 uppercase">Preferences</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'fastest', label: t('fastest'), icon: Clock },
                      { value: 'cheapest', label: t('cheapest'), icon: Filter },
                      { value: 'ac', label: t('ac'), icon: Zap },
                      { value: 'electric', label: t('electric'), icon: Zap },
                    ].map(pref => {
                      const Icon = pref.icon;
                      return (
                        <button
                          key={pref.value}
                          onClick={() => setPreference(pref.value)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            preference === pref.value ? 'bg-mp-blue text-white' : 'bg-gray-50 text-navy-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {pref.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handlePlan}
                  disabled={!from || !to}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-mp-blue to-mp-blue-light text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Navigation className="w-5 h-5" />
                  {t('planNow')}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {showResults ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DemoBadge />
                </div>

                {matchingRoute ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">Recommended</span>
                    </div>
                    
                    <h3 className="font-bold text-navy-900 text-lg mb-4">{from} → {to}</h3>

                    {/* Journey Timeline */}
                    <div className="relative pl-6 mb-6">
                      <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-navy-200"></div>
                      
                      <div className="relative mb-6">
                        <div className="absolute -left-6 w-5 h-5 bg-mp-blue rounded-full border-2 border-white shadow flex items-center justify-center">
                          <MapPin className="w-2.5 h-2.5 text-white" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-navy-900 text-sm">{from}</div>
                          <div className="text-xs text-navy-500">Departure • {matchingRoute.firstDeparture}</div>
                        </div>
                      </div>

                      {matchingRoute.stops.map((stop, i) => (
                        <div key={i} className="relative mb-6">
                          <div className="absolute -left-6 w-5 h-5 bg-navy-300 rounded-full border-2 border-white shadow flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <div className="ml-2">
                            <div className="font-medium text-navy-700 text-sm">{stop}</div>
                            <div className="text-xs text-navy-400">Transfer point (if needed)</div>
                          </div>
                        </div>
                      ))}

                      <div className="relative">
                        <div className="absolute -left-6 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow flex items-center justify-center">
                          <MapPin className="w-2.5 h-2.5 text-white" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-navy-900 text-sm">{to}</div>
                          <div className="text-xs text-navy-500">Arrival • {matchingRoute.lastDeparture}</div>
                        </div>
                      </div>
                    </div>

                    {/* Journey Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Clock className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-navy-900">{matchingRoute.duration}</div>
                        <div className="text-[10px] text-navy-500">Duration</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <MapPin className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-navy-900">{matchingRoute.distance} km</div>
                        <div className="text-[10px] text-navy-500">Distance</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Bus className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-navy-900">{matchingRoute.services}</div>
                        <div className="text-[10px] text-navy-500">Services</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Navigation className="w-4 h-4 text-navy-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-navy-900">{matchingRoute.frequency}</div>
                        <div className="text-[10px] text-navy-500">Frequency</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link to={`/routes/${matchingRoute.id}`} className="flex items-center gap-1.5 px-4 py-2 bg-mp-blue text-white text-sm font-medium rounded-lg hover:bg-mp-blue-light transition-colors">
                        View Route Details <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link to={`/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        See All Buses
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <Navigation className="w-10 h-10 text-navy-300 mx-auto mb-3" />
                    <h3 className="font-bold text-navy-700 mb-2">No direct route found</h3>
                    <p className="text-sm text-navy-500 mb-4">Try searching with different cities or check available routes.</p>
                    <Link to="/routes" className="text-sm text-mp-blue font-medium hover:underline">Browse all routes →</Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Navigation className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                <h3 className="font-bold text-navy-700 mb-2">Plan your journey</h3>
                <p className="text-sm text-navy-500">Select your departure and destination cities to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
