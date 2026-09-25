import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { announcements } from '../data/mockData';
import { Megaphone, Calendar, Tag, ExternalLink, AlertCircle } from 'lucide-react';

export default function AnnouncementsPage() {
  const { t, language } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = ['New Routes', 'Timetable', 'Fare Updates', 'Service Alerts', 'Bus Launches', 'Safety', 'Infrastructure'];
  
  const filtered = categoryFilter 
    ? announcements.filter(a => a.category === categoryFilter)
    : announcements;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="w-6 h-6 text-mp-blue" />
          <h1 className="text-2xl font-bold text-navy-900">{t('announcements')}</h1>
        </div>
        <p className="text-sm text-navy-500 mb-6">Latest updates about Sugam Parivahan services.</p>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
          <button
            onClick={() => setCategoryFilter('')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!categoryFilter ? 'bg-mp-blue text-white' : 'bg-gray-100 text-navy-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${categoryFilter === cat ? 'bg-mp-blue text-white' : 'bg-gray-100 text-navy-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-4">
          {filtered.map(ann => (
            <article key={ann.id} className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${ann.important ? 'border-saffron-300 bg-saffron-50/30' : 'border-gray-200'}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      ann.category === 'Safety' ? 'bg-red-100 text-red-700' :
                      ann.category === 'Bus Launches' ? 'bg-blue-100 text-blue-700' :
                      ann.category === 'New Routes' ? 'bg-green-100 text-green-700' :
                      ann.category === 'Fare Updates' ? 'bg-purple-100 text-purple-700' :
                      ann.category === 'Service Alerts' ? 'bg-orange-100 text-orange-700' :
                      ann.category === 'Infrastructure' ? 'bg-teal-100 text-teal-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      <Tag className="w-2.5 h-2.5 inline mr-1" />{ann.category}
                    </span>
                    {ann.important && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-saffron-100 text-saffron-700">
                        <AlertCircle className="w-2.5 h-2.5 inline mr-1" />{t('important')}
                      </span>
                    )}
                    <span className="text-[10px] text-navy-400 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {ann.date}
                    </span>
                  </div>
                  <h2 className="font-bold text-navy-900 text-base mb-2">
                    {language === 'hi' ? ann.titleHi : ann.title}
                  </h2>
                  <p className="text-sm text-navy-600 leading-relaxed mb-3">
                    {language === 'hi' ? ann.summaryHi : ann.summary}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-navy-400">
                    <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> {t('source')}: {ann.source}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <p className="text-sm text-navy-500">No announcements in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
