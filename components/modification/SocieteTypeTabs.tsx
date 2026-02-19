'use client';

import { useState } from 'react';
import { societeTypes } from '@/lib/modification-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Différences par Type', en: 'Differences by Type' },
  title: { fr: 'Règles Selon Votre Forme Juridique', en: 'Rules Based on Your Legal Form' },
  subtitle: { fr: 'Les modalités de modification varient selon le type de société', en: 'Modification procedures vary depending on the type of company' },
  flexibility: { fr: 'Flexibilité', en: 'Flexibility' },
  decisionProcess: { fr: 'Processus de décision', en: 'Decision process' },
  majorityRequired: { fr: 'Majorité requise', en: 'Required majority' },
  keyPoints: { fr: 'Points importants', en: 'Key points' },
};

export default function SocieteTypeTabs() {
  const [activeTab, setActiveTab] = useState('sas');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState('sas');
  const { language } = useLanguage();

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setDisplayedTab(tabId);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const activeType = societeTypes.find((t) => t.id === displayedTab);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {societeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTabChange(type.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === type.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.name[language]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-200 ${
            isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
          }`}
        >
          {activeType && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Key Info */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeType.name[language]}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{sectionText.flexibility[language]}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{activeType.flexibility[language]}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{sectionText.decisionProcess[language]}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{activeType.decisionProcess[language]}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{sectionText.majorityRequired[language]}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{activeType.majorityRequired[language]}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Notes */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {sectionText.keyPoints[language]}
                  </h4>
                  <ul className="space-y-3">
                    {activeType.specificNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{note[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
