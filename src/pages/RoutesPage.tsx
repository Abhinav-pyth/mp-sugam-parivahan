import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { buses, routes, CITIES } from '../data/mockData';
import { Search, Filter, ArrowRight, Clock, MapPin, Bus, Zap, ChevronDown, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function RoutesPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [busTypeFilter, setBusTypeFilter] = useState('');
  const [acOnly, setAcOnly] = useState(false);
  const [electricOnly, setElectricOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'type'>('departure');

  const filteredBuses = useMemo(() => {
    let result = buses;
    if (from) result = result.filter(b => b.from.toLowerCase() === from.toLowerCase());
    if (to) result = result.filter(b => b.to.toLowerCase() === to.toLowerCase());
    if (busTypeFilter) result = result.filter(b => b.busType.toLowerCase().includes(busTypeFilter.toLowerCase()));
    if (acOnly) result = result.filter(b => b.busType.includes('AC'));
    if (electricOnly) result = result.filter(b => b.fuelType === 'Electric');

    if (sortBy === 'departure') result = [...result].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    else if (sortBy === 'duration') result = [...result].sort((a, b) => a.distance - b.distance);
    
    return result;
  }, [from, to, busTypeFilter, acOnly, electricOnly, sortBy]);

  const matchingRoute = useMemo(() => {
    if (!from || !to) return null;
    return routes.find(r => 
      r.source.toLowerCase() === from.toLowerCase() && 
      r.destination.toLowerCase() === to.toLowerCase()
    );
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
              <div>
                <label className="block text-[10px] font-semibold text-navy-600 mb-1 uppercase">{t('from')}</label>
                <select value={from} onChange={e => setFrom(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30">
                  <option value="">{t('selectCity')}</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="hidden sm:block" />
              <div>
                <label className="block text-[10px] font-semibold text-navy-600 mb-1 uppercase">{t('to')}</label>
                <select value={to} onChange={e => setTo(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30">
                  <option value="">{t('selectCity')}</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-navy-700 hover:bg-gray-50">
                <SlidersHorizontal className="w-4 h-4" />
                {t('filter')}
              </button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-navy-700 bg-white">
                <option value="departure">{t('departure')}</option>
                <option value="duration">{t('duration')}</option>
                <option value="type">{t('busType')}</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-3 animate-slide-up">
              <select value={busTypeFilter} onChange={e => setBusTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="">All Types</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Electric">Electric</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Seater">Seater</option>
              </select>
              <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <input type="checkbox" checked={acOnly} onChange={e => setAcOnly(e.target.checked)} className="rounded" />
                {t('ac')} Only
              </label>
              <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <input type="checkbox" checked={electricOnly} onChange={e => setElectricOnly(e.target.checked)} className="rounded" />
                {t('electric')} Only
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Route Summary */}
        {matchingRoute && (
          <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-navy-900">{matchingRoute.source} → {matchingRoute.destination}</h2>
                  <span className="text-sm text-navy-500">({filteredBuses.length} {t('routesFound')})</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-navy-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {matchingRoute.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {matchingRoute.distance} km</span>
                  <span className="flex items-center gap-1"><Bus className="w-3 h-3" /> {matchingRoute.services} services</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {matchingRoute.firstDeparture} - {matchingRoute.lastDeparture}</span>
                </div>
              </div>
              <Link to={`/routes/${matchingRoute.id}`} className="flex items-center gap-1 px-4 py-2 bg-mp-blue text-white text-sm font-medium rounded-lg hover:bg-mp-blue-light transition-colors">
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center gap-2">
          <DemoBadge />
        </div>

        {/* Bus Results */}
        {filteredBuses.length > 0 ? (
          <div className="space-y-4">
            {filteredBuses.map(bus => (
              <Link
                key={bus.id}
                to={`/buses/${bus.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 md:p-5 hover:shadow-lg hover:border-mp-blue/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Bus Info */}
                  <div className="md:w-48">
                    <div className="flex items-center gap-2 mb-1">
                      <Bus className="w-4 h-4 text-mp-blue" />
                      <span className="text-sm font-bold text-navy-900">{bus.busNumber}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      bus.busType.includes('Electric') ? 'bg-green-100 text-green-700' :
                      bus.busType.includes('AC') ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {bus.fuelType === 'Electric' && <Zap className="w-2.5 h-2.5" />}
                      {bus.busType}
                    </div>
                    {bus.status === 'delayed' && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-700">
                        Delayed
                      </span>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-navy-900">{bus.departureTime}</div>
                      <div className="text-[10px] text-navy-500 mt-0.5">{bus.pickupPoints[0]}</div>
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-2">
                      <div className="flex-1 border-t-2 border-dashed border-navy-200"></div>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded text-[10px] text-navy-500 font-medium whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {Math.round(bus.distance / 60)}h {Math.round((bus.distance / 60 % 1) * 60)}m
                      </div>
                      <div className="flex-1 border-t-2 border-dashed border-navy-200"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-navy-900">{bus.arrivalTime}</div>
                      <div className="text-[10px] text-navy-500 mt-0.5">{bus.dropPoints[0]}</div>
                    </div>
                  </div>

                  {/* Fare */}
                  <div className="md:w-32 text-right">
                    {bus.fare ? (
                      <div className="text-lg font-bold text-navy-900">₹{bus.fare}</div>
                    ) : (
                      <div className="text-xs text-navy-400 italic">{t('fareNotPublished')}</div>
                    )}
                    <div className="text-[10px] text-navy-400 mt-1">{bus.distance} km</div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                  {bus.amenities.slice(0, 5).map((a, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-50 text-navy-600 text-[10px] rounded-md">{a}</span>
                  ))}
                  {bus.gpsAvailable && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-md">📍 GPS</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bus className="w-12 h-12 text-navy-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-navy-700 mb-2">{t('noBusesFound')}</h3>
            <p className="text-sm text-navy-500">{t('tryAnother')}</p>
          </div>
        )}

        {/* Timetable Notice */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">⚠️</span>
            {t('timetableUpdating')}
          </p>
        </div>
      </div>
    </div>
  );
}
