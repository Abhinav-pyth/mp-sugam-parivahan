import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { buses } from '../data/mockData';
import { Bus, MapPin, Navigation, Shield, Camera, AlertCircle, Zap, Wifi, Users, Phone } from 'lucide-react';

export default function BusDetailPage() {
  const { t } = useLanguage();
  const { busId } = useParams();
  const bus = buses.find(b => b.id === busId);

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20 lg:pb-0">
        <div className="text-center">
          <Bus className="w-12 h-12 text-navy-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-navy-700">Bus not found</h2>
          <Link to="/routes" className="text-sm text-mp-blue mt-2 inline-block">← Back to routes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/routes" className="text-sm text-mp-blue hover:underline mb-4 inline-block">← Back to routes</Link>

        {/* Bus Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-mp-blue/10 rounded-xl flex items-center justify-center">
                  <Bus className="w-6 h-6 text-mp-blue" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-navy-900">{bus.busNumber}</h1>
                  <p className="text-sm text-navy-500">{bus.operator}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  bus.busType.includes('Electric') ? 'bg-green-100 text-green-700' :
                  bus.busType.includes('AC') ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>{bus.busType}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{bus.fuelType}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  bus.status === 'active' ? 'bg-green-100 text-green-700' :
                  bus.status === 'delayed' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {bus.status === 'active' ? '🟢 Active' : bus.status === 'delayed' ? '🟡 Delayed' : '🔴 Cancelled'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-navy-500">{bus.from} → {bus.to}</div>
              <div className="text-lg font-bold text-navy-900">{bus.distance} km</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Journey Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-navy-900 mb-4">Journey Details</h2>
              <DemoBadge />
              
              <div className="mt-4 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900">{bus.departureTime}</div>
                  <div className="text-xs text-navy-500 mt-1">{t('departure')}</div>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 border-t-2 border-dashed border-navy-200"></div>
                  <div className="px-3 py-1 bg-gray-50 rounded-full text-xs text-navy-500 font-medium">
                    {Math.round(bus.distance / 60)}h {Math.round((bus.distance / 60 % 1) * 60)}m
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-navy-200"></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900">{bus.arrivalTime}</div>
                  <div className="text-xs text-navy-500 mt-1">{t('arrival')}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-navy-600 uppercase mb-2">{t('pickupPoint')}</div>
                  {bus.pickupPoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-700 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-mp-blue" /> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy-600 uppercase mb-2">{t('dropPoint')}</div>
                  {bus.dropPoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-700 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-navy-900 mb-4">{t('amenities')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bus.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    {amenity === 'WiFi' && <Wifi className="w-4 h-4 text-blue-500" />}
                    {amenity === 'GPS' && <Navigation className="w-4 h-4 text-green-500" />}
                    {amenity === 'CCTV' && <Camera className="w-4 h-4 text-purple-500" />}
                    {amenity === 'USB Charging' && <Zap className="w-4 h-4 text-yellow-500" />}
                    {amenity === 'Charging' && <Zap className="w-4 h-4 text-yellow-500" />}
                    {amenity === 'Emergency Button' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {amenity === 'Low Floor' && <Users className="w-4 h-4 text-indigo-500" />}
                    {amenity === 'Blanket' && <span className="text-sm">🛏️</span>}
                    {amenity === 'Water' && <span className="text-sm">💧</span>}
                    {amenity === 'Snacks' && <span className="text-sm">🍪</span>}
                    <span className="text-sm text-navy-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" /> Safety Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <Navigation className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-sm font-bold text-navy-900">{t('gpsTracking')}</div>
                    <div className="text-xs text-navy-500">{bus.gpsAvailable ? t('available') : t('unavailable')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <Camera className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-navy-900">{t('cctv')}</div>
                    <div className="text-xs text-navy-500">{bus.cctv ? t('available') : t('unavailable')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="text-sm font-bold text-navy-900">{t('emergencyButton')}</div>
                    <div className="text-xs text-navy-500">{bus.emergencyButton ? t('available') : t('unavailable')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Bus Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-navy-500">Bus Number</dt>
                  <dd className="font-medium text-navy-900">{bus.busNumber}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('operator')}</dt>
                  <dd className="font-medium text-navy-900">{bus.operator}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('busType')}</dt>
                  <dd className="font-medium text-navy-900">{bus.busType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">Fuel</dt>
                  <dd className="font-medium text-navy-900">{bus.fuelType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('distance')}</dt>
                  <dd className="font-medium text-navy-900">{bus.distance} km</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('fare')}</dt>
                  <dd className="font-medium text-navy-400 italic text-xs">{t('fareNotPublished')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">{t('gpsStatus')}</dt>
                  <dd className={`font-medium ${bus.gpsAvailable ? 'text-green-600' : 'text-navy-400'}`}>
                    {bus.gpsAvailable ? '🟢 Active' : '⚪ Inactive'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy-500">Service Type</dt>
                  <dd className="font-medium text-navy-900 capitalize">{bus.serviceType}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-700 font-medium hover:bg-emerald-100 transition-colors">
                  <Navigation className="w-4 h-4" /> Track on Map
                </button>
                <button className="w-full flex items-center gap-2 p-3 bg-red-50 rounded-lg text-sm text-red-700 font-medium hover:bg-red-100 transition-colors">
                  <Phone className="w-4 h-4" /> Emergency Contact
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-800 leading-relaxed">
                ⚠️ This bus information is demo data. Verify details with official sources before travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
