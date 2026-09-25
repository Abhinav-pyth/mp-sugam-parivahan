import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DemoBadge } from '../components/Layout';
import { buses } from '../data/mockData';
import { Search, Radio, Bus, Navigation } from 'lucide-react';

export default function LiveTrackingPage() {
  const { t } = useLanguage();
  const [searchBus, setSearchBus] = useState('');
  const [demoBuses] = useState([
    { id: 'd1', number: 'MP-SG-001', route: 'Indore → Bhopal', status: 'active' as const, progress: 65, lat: 23.0, lng: 76.5 },
    { id: 'd2', number: 'MP-SG-010', route: 'Indore → Ujjain', status: 'active' as const, progress: 40, lat: 22.9, lng: 75.8 },
    { id: 'd3', number: 'MP-SG-040', route: 'Bhopal → Indore', status: 'delayed' as const, progress: 80, lat: 23.2, lng: 76.0 },
    { id: 'd4', number: 'MP-SG-002', route: 'Indore → Bhopal', status: 'active' as const, progress: 20, lat: 22.7, lng: 75.9 },
    { id: 'd5', number: 'MP-SG-050', route: 'Bhopal → Jabalpur', status: 'active' as const, progress: 55, lat: 23.5, lng: 78.0 },
    { id: 'd6', number: 'MP-SG-070', route: 'Ujjain → Indore', status: 'active' as const, progress: 90, lat: 22.8, lng: 75.7 },
  ]);

  const filteredBuses = demoBuses.filter(b => 
    b.number.toLowerCase().includes(searchBus.toLowerCase()) || 
    b.route.toLowerCase().includes(searchBus.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-6 h-6 text-emerald-600 animate-pulse" />
          <h1 className="text-2xl font-bold text-navy-900">{t('liveTracking')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                value={searchBus}
                onChange={e => setSearchBus(e.target.value)}
                placeholder="Search bus number or route..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-amber-700">{t('demoMode')}</span>
              </div>
              <p className="text-xs text-navy-500">{t('liveUnavailable')}</p>
              <p className="text-xs text-navy-400 mt-1">Showing simulated bus positions for demonstration purposes only.</p>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredBuses.map(bus => (
                <div key={bus.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-mp-blue" />
                      <span className="font-bold text-sm text-navy-900">{bus.number}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      bus.status === 'active' ? 'bg-green-100 text-green-700' :
                      bus.status === 'delayed' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {bus.status === 'active' ? '🟢 On Time' : bus.status === 'delayed' ? '🟡 Delayed' : '🔴 Not Available'}
                    </span>
                  </div>
                  <div className="text-xs text-navy-600 mb-2">{bus.route}</div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${bus.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-navy-400">
                    <span>Progress: {bus.progress}%</span>
                    <span className="flex items-center gap-1"><Navigation className="w-2.5 h-2.5" /> GPS Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[600px] relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
                <svg className="w-full h-full" viewBox="0 0 800 600">
                  {/* Grid lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 30} x2="800" y2={i * 30} stroke="#e2e8f0" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 27 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="600" stroke="#e2e8f0" strokeWidth="0.5" />
                  ))}
                  
                  {/* MP Outline (simplified) */}
                  <path d="M200 200 L280 160 L380 140 L480 150 L560 180 L620 220 L650 280 L640 350 L600 400 L540 430 L460 440 L380 430 L300 400 L240 350 L210 280 Z" 
                    fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="5 5"/>
                  
                  {/* Route lines */}
                  <path d="M250 350 Q350 300 400 280 T550 250" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" strokeDasharray="8 4"/>
                  <path d="M300 320 Q350 280 380 260" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" strokeDasharray="8 4"/>
                  <path d="M400 280 Q450 320 500 350" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" fill="none" strokeDasharray="6 3"/>
                  
                  {/* City markers */}
                  <circle cx="250" cy="350" r="6" fill="#1e3a5f" />
                  <text x="260" y="355" fontSize="11" fill="#1e3a5f" fontWeight="bold">Indore</text>
                  
                  <circle cx="400" cy="280" r="6" fill="#1e3a5f" />
                  <text x="410" y="285" fontSize="11" fill="#1e3a5f" fontWeight="bold">Bhopal</text>
                  
                  <circle cx="300" cy="320" r="4" fill="#627d98" />
                  <text x="310" y="325" fontSize="10" fill="#627d98">Ujjain</text>
                  
                  <circle cx="550" cy="250" r="5" fill="#627d98" />
                  <text x="560" y="255" fontSize="10" fill="#627d98">Jabalpur</text>
                  
                  <circle cx="380" cy="180" r="4" fill="#627d98" />
                  <text x="390" y="185" fontSize="10" fill="#627d98">Gwalior</text>
                  
                  <circle cx="500" cy="350" r="4" fill="#627d98" />
                  <text x="510" y="355" fontSize="10" fill="#627d98">Sagar</text>
                  
                  <circle cx="600" cy="300" r="4" fill="#627d98" />
                  <text x="610" y="305" fontSize="10" fill="#627d98">Rewa</text>
                  
                  {/* Bus markers */}
                  <g transform="translate(320, 310)">
                    <circle r="8" fill="#10b981" opacity="0.3">
                      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle r="5" fill="#10b981"/>
                    <text x="10" y="4" fontSize="8" fill="#065f46" fontWeight="bold">001</text>
                  </g>
                  
                  <g transform="translate(280, 335)">
                    <circle r="8" fill="#10b981" opacity="0.3">
                      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                    <circle r="5" fill="#10b981"/>
                    <text x="10" y="4" fontSize="8" fill="#065f46" fontWeight="bold">010</text>
                  </g>
                  
                  <g transform="translate(430, 270)">
                    <circle r="8" fill="#eab308" opacity="0.3">
                      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                    <circle r="5" fill="#eab308"/>
                    <text x="10" y="4" fontSize="8" fill="#854d0e" fontWeight="bold">040</text>
                  </g>
                  
                  <g transform="translate(260, 345)">
                    <circle r="8" fill="#10b981" opacity="0.3">
                      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                    </circle>
                    <circle r="5" fill="#10b981"/>
                    <text x="10" y="4" fontSize="8" fill="#065f46" fontWeight="bold">002</text>
                  </g>
                </svg>
              </div>

              {/* Demo badge overlay */}
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {t('demoMode')}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-md">
                <div className="text-[10px] font-semibold text-navy-700 mb-2">Status</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px]"><div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div> On Time</div>
                  <div className="flex items-center gap-2 text-[10px]"><div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div> Delayed</div>
                  <div className="flex items-center gap-2 text-[10px]"><div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div> Not Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
