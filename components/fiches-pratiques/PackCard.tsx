'use client';

import { Pack } from '@/lib/packs-config';
import { useLanguage } from '@/contexts/LanguageContext';

interface PackCardProps {
  pack: Pack;
  onBuy: () => void;
}

export default function PackCard({ pack, onBuy }: PackCardProps) {
  const { language } = useLanguage();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{pack.icon}</span>
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {language === 'fr' ? '1 document' : '1 document'}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{pack.name[language]}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{pack.description[language]}</p>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {language === 'fr' ? 'Téléchargement immédiat' : 'Immediate download'}
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(pack.price)}
          </span>
        </div>
        <button
          onClick={onBuy}
          className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {language === 'fr' ? 'Obtenir ce pack' : 'Get this pack'}
        </button>
      </div>
    </div>
  );
}
