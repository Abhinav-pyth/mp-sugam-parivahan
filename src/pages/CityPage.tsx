import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { cities, routes, buses, busStops } from '../data/mockData';
import { Building2, Bus, MapPin, ArrowRight, Clock, Navigation } from 'lucide-react';

export default function CityPage() {
  const { t } = useLanguage();
  const { cityId } = useParams();
  const city = cities.find(c => c.id === cityId);

  if (!city) {
    // Show cities listing if no specific city
    return (
      <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">{t('cities')}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map(c => (
              <Link key={c.id} to={`/cities/${c.id}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-mp-blue/10 rounded-xl flex items-center justify-center group-hover:bg-mp-blue/20 transition-colors">
                    <Building2 className="w-6 h-6 text-mp-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">{c.name}</h3>
                    <p className="text-xs text-navy-500 hindi-text">{c.nameHi}</p>
                  </div>
                </div>
                <p className="text-sm text-navy-600 mb-3">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-navy-500">
                  <span className="font-semibold text-navy-800">{c.totalBuses}</span> buses
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-mp-blue font-medium">
                  View Details <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const cityRoutes = routes.filter(r => r.source === city.name || r.destination === city.name);
  const cityBuses = buses.filter(b => b.from === city.name || b.to === city.name);
  const cityStops = busStops.filter(s => s.city === city.name);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/cities" className="text-sm text-mp-blue hover:underline mb-4 inline-block">← All Cities</Link>
        
        {/* City Header */}
        <div className="bg-gradient-to-r from-navy-900 to-mp-blue rounded-2xl p-6 md:p-8 text-white mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-8 h-8 text-saffron-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{city.name} {t('busServices')}</h1>
              <p className="text-navy-300 text-sm hindi-text">{city.nameHi}</p>
            </div>
          </div>
          <p className="text-navy-200 text-sm max-w-2xl">{city.description}</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{city.totalBuses}</div>
              <div className="text-xs text-navy-300">{t('totalBuses')}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{city.intercityBuses}</div>
              <div className="text-xs text-navy-300">Intercity</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{city.intracityBuses}</div>
              <div className="text-xs text-navy-300">Intracity</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Routes */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-navy-900 mb-4">Available Routes</h2>
              <DemoBadge />
              <div className="space-y-3 mt-3">
                {cityRoutes.map(route => (
                  <Link key={route.id} to={`/routes/${route.id}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-navy-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Bus className="w-4 h-4 text-mp-blue" />
                      <span className="text-sm font-medium text-navy-900">{route.source} → {route.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-navy-500">
                      <span>{route.distance} km</span>
                      <span>{route.duration}</span>
                      <ArrowRight className="w-3 h-3 text-navy-400 group-hover:text-mp-blue" />
                    </div>
                  </Link>
                ))}
                {cityRoutes.length === 0 && <p className="text-sm text-navy-400">Route information being updated.</p>}
              </div>
            </div>

            {/* Major Stops */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-navy-900 mb-4">{t('majorStops')}</h2>
              <div className="space-y-3">
                {cityStops.map(stop => (
                  <div key={stop.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-mp-blue mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-navy-900">{stop.name}</div>
                      <div className="text-xs text-navy-500">{stop.address}</div>
                      <div className="text-[10px] text-navy-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {stop.operatingHours}</div>
                    </div>
                  </div>
                ))}
                {cityStops.length === 0 && city.majorStops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-navy-400" />
                    <span className="text-sm text-navy-700">{stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Popular Destinations</h3>
              <div className="space-y-2">
                {city.majorDestinations.map((dest, i) => (
                  <Link key={i} to={`/routes?from=${encodeURIComponent(city.name)}&to=${encodeURIComponent(dest)}`} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                    <span className="text-sm text-navy-700">{dest}</span>
                    <ArrowRight className="w-3 h-3 text-navy-400 group-hover:text-mp-blue" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link to={`/routes?from=${encodeURIComponent(city.name)}`} className="flex items-center gap-2 p-3 bg-mp-blue/5 rounded-lg text-sm text-mp-blue font-medium hover:bg-mp-blue/10 transition-colors">
                  <Navigation className="w-4 h-4" /> Search from {city.name}
                </Link>
                <Link to={`/routes?to=${encodeURIComponent(city.name)}`} className="flex items-center gap-2 p-3 bg-saffron-50 rounded-lg text-sm text-saffron-700 font-medium hover:bg-saffron-100 transition-colors">
                  <MapPin className="w-4 h-4" /> Go to {city.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
