import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { routes, buses } from '../data/mockData';
import { MapPin, Clock, Bus, ArrowRight, Share2, Heart, Navigation } from 'lucide-react';

export default function RouteDetailPage() {
  const { t } = useLanguage();
  const { routeId } = useParams();
  const route = routes.find(r => r.id === routeId);
  const routeBuses = buses.filter(b => 
    b.from.toLowerCase() === route?.source.toLowerCase() && 
    b.to.toLowerCase() === route?.destination.toLowerCase()
  );

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20 lg:pb-0">
        <div className="text-center">
          <Bus className="w-12 h-12 text-navy-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-navy-700">Route not found</h2>
          <Link to="/routes" className="text-sm text-mp-blue mt-2 inline-block">← Back to routes</Link>
        </div>
      </div>
    );
  }

  const allStops = [route.source, ...route.stops, route.destination];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/routes" className="text-sm text-mp-blue hover:underline mb-2 inline-block">← Back to routes</Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                {route.source} <ArrowRight className="w-5 h-5 text-navy-400" /> {route.destination}
              </h1>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-navy-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {route.distance} km</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {route.duration}</span>
                <span className="flex items-center gap-1"><Bus className="w-4 h-4" /> {route.services} services</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-navy-700 hover:bg-gray-50">
                <Navigation className="w-4 h-4" /> {t('viewOnMap')}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-navy-700 hover:bg-gray-50">
                <Share2 className="w-4 h-4" /> {t('shareRoute')}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-navy-700 hover:bg-gray-50">
                <Heart className="w-4 h-4" /> {t('saveRoute')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-navy-900 mb-4">Route Timeline</h2>
              <div className="relative">
                {allStops.map((stop, i) => (
                  <div key={i} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${i === 0 || i === allStops.length - 1 ? 'bg-mp-blue border-mp-blue' : 'bg-white border-navy-300'}`}></div>
                      {i < allStops.length - 1 && <div className="w-0.5 h-12 bg-navy-200 mt-1"></div>}
                    </div>
                    <div className="pt-0">
                      <div className="font-semibold text-navy-900 text-sm">{stop}</div>
                      {i === 0 && <div className="text-xs text-navy-500 mt-0.5">{t('departure')} • {route.firstDeparture}</div>}
                      {i === allStops.length - 1 && <div className="text-xs text-navy-500 mt-0.5">{t('arrival')} • {route.lastDeparture}</div>}
                      {i > 0 && i < allStops.length - 1 && <div className="text-xs text-navy-400 mt-0.5">{t('intermediateStops')}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Buses */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-navy-900">Available Buses</h2>
                <DemoBadge />
              </div>
              {routeBuses.length > 0 ? (
                <div className="space-y-3">
                  {routeBuses.map(bus => (
                    <Link key={bus.id} to={`/buses/${bus.id}`} className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bus className="w-5 h-5 text-mp-blue" />
                          <div>
                            <div className="font-bold text-sm text-navy-900">{bus.busNumber}</div>
                            <div className="text-xs text-navy-500">{bus.busType} • {bus.fuelType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-navy-900">{bus.departureTime} → {bus.arrivalTime}</div>
                          {bus.fare ? (
                            <div className="text-sm font-bold text-mp-blue">₹{bus.fare}</div>
                          ) : (
                            <div className="text-xs text-navy-400 italic">{t('fareNotPublished')}</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <p className="text-sm text-navy-500">{t('timetableUpdating')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Route Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('distance')}</dt>
                  <dd className="font-medium text-navy-900">{route.distance} km</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('duration')}</dt>
                  <dd className="font-medium text-navy-900">{route.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('firstDeparture')}</dt>
                  <dd className="font-medium text-navy-900">{route.firstDeparture}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('lastDeparture')}</dt>
                  <dd className="font-medium text-navy-900">{route.lastDeparture}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('frequency')}</dt>
                  <dd className="font-medium text-navy-900">{route.frequency}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('fare')}</dt>
                  <dd className="font-medium text-navy-400 italic text-xs">{t('fareNotPublished')}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Bus Types</h3>
              <div className="flex flex-wrap gap-2">
                {route.busTypes.map((type, i) => (
                  <span key={i} className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    type.includes('Electric') ? 'bg-green-100 text-green-700' :
                    type.includes('AC') ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{type}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Pickup Points</h3>
              <ul className="space-y-2">
                {routeBuses.length > 0 ? (
                  [...new Set(routeBuses.flatMap(b => b.pickupPoints))].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                      <MapPin className="w-3.5 h-3.5 text-navy-400" /> {p}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-navy-400 italic">Information being updated</li>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Drop Points</h3>
              <ul className="space-y-2">
                {routeBuses.length > 0 ? (
                  [...new Set(routeBuses.flatMap(b => b.dropPoints))].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                      <MapPin className="w-3.5 h-3.5 text-navy-400" /> {p}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-navy-400 italic">Information being updated</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
