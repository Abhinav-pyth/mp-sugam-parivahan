import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CITIES } from '../data/mockData';
import { DollarSign, Calculator, AlertCircle, Bus, Info } from 'lucide-react';

export default function FaresPage() {
  const { t } = useLanguage();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busType, setBusType] = useState('');
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="w-6 h-6 text-mp-blue" />
          <h1 className="text-2xl font-bold text-navy-900">{t('fares')}</h1>
        </div>
        <p className="text-sm text-navy-500 mb-6">Calculate estimated bus fares for your journey.</p>

        <div className="max-w-2xl mx-auto">
          {/* Fare Calculator */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calculator className="w-5 h-5 text-mp-blue" />
              <h2 className="font-bold text-navy-900">Fare Calculator</h2>
            </div>

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
              <div>
                <label className="block text-xs font-semibold text-navy-600 mb-1.5 uppercase">{t('busType')}</label>
                <select value={busType} onChange={e => setBusType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mp-blue/30">
                  <option value="">All Types</option>
                  <option value="AC Electric">AC Electric</option>
                  <option value="AC Seater">AC Seater</option>
                  <option value="AC Sleeper">AC Sleeper</option>
                  <option value="Non-AC Seater">Non-AC Seater</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!from || !to}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-mp-blue text-white font-semibold rounded-xl hover:bg-mp-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5" />
                {t('calculateFare')}
              </button>
            </div>

            {calculated && (
              <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-800 text-sm mb-1">{t('fareUnavailable')}</h3>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      The official fare structure for Sugam Parivahan services is currently under review. 
                      Once published, fare information will be available here. 
                      Please check back for updates or contact the transport department for the latest fare information.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-navy-900 text-sm mb-3">About Fares</h3>
            <ul className="space-y-2 text-sm text-navy-600">
              <li className="flex items-start gap-2">
                <span className="text-mp-blue mt-1">•</span>
                Sugam Parivahan aims to provide affordable public transportation across Madhya Pradesh.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mp-blue mt-1">•</span>
                Fare structure is expected to be competitive with existing state transport services.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mp-blue mt-1">•</span>
                Electric buses may have subsidized fares as part of the green transport initiative.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mp-blue mt-1">•</span>
                Concession fares for students, senior citizens, and differently-abled passengers are expected.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
