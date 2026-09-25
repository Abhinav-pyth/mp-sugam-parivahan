import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { busStops } from '../data/mockData';
import { Search, MapPin, Clock, Navigation } from 'lucide-react';

export default function BusStopsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filteredStops = busStops.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
    const matchesCity = !cityFilter || s.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const allCities = [...new Set(busStops.map(s => s.city))];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-navy-900 mb-2">{t('busStops')}</h1>
        <p className="text-sm text-navy-500 mb-6">Find bus stops, pickup points and drop points across Madhya Pradesh.</p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchBusStop')}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mp-blue/30"
            />
          </div>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium">
            <option value="">All Cities</option>
            {allCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <DemoBadge />

        {/* Stops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredStops.map(stop => (
            <div key={stop.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-mp-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-mp-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">{stop.name}</h3>
                  <p className="text-xs text-navy-500">{stop.city}</p>
                </div>
              </div>
              <p className="text-xs text-navy-500 mb-3">{stop.address}</p>
              <div className="flex items-center gap-2 text-xs text-navy-500 mb-3">
                <Clock className="w-3.5 h-3.5" />
                {stop.operatingHours}
              </div>
              <div className="mb-3">
                <div className="text-[10px] font-semibold text-navy-600 uppercase mb-1.5">Routes Served</div>
                <div className="flex flex-wrap gap-1">
                  {stop.routes.slice(0, 4).map((r, i) => (
                    <span key={i} className="px-2 py-0.5 bg-navy-50 text-navy-700 text-[10px] rounded-md">{r}</span>
                  ))}
                  {stop.routes.length > 4 && <span className="px-2 py-0.5 bg-navy-50 text-navy-500 text-[10px] rounded-md">+{stop.routes.length - 4}</span>}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-[10px] font-semibold text-navy-600 uppercase mb-1.5">{t('facilities')}</div>
                <div className="flex flex-wrap gap-1">
                  {stop.facilities.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] rounded-md">{f}</span>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-mp-blue font-medium hover:underline">
                <Navigation className="w-3.5 h-3.5" /> View on Map
              </button>
            </div>
          ))}
        </div>

        {filteredStops.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <p className="text-sm text-navy-500">No bus stops found for your search.</p>
          </div>
        )}

        {/* Notice */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            ⚠️ Bus stop information should be verified with the latest official schedule. Not all Sugam Parivahan buses may operate from all listed stops.
          </p>
        </div>
      </div>
    </div>
  );
}
