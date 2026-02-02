'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ISResult,
  calculateIS,
  formatFCFA,
  formatPercent,
  IS_THRESHOLD,
  IS_RATE_SMALL,
  IS_RATE_LARGE,
  WHATSAPP_NUMBER,
} from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';

const simText = {
  calculationParams: { fr: 'Param\u00e8tres de calcul', en: 'Calculation Parameters' },
  annualTurnover: { fr: 'Chiffre d\u2019Affaires Annuel', en: 'Annual Turnover' },
  threshold3B: { fr: 'Seuil 3 Mrd', en: 'Threshold 3 Bn' },
  enterExactCA: { fr: 'Saisir le CA exact', en: 'Enter exact turnover' },
  taxableProfit: { fr: 'B\u00e9n\u00e9fice Imposable (FCFA)', en: 'Taxable Profit (FCFA)' },
  taxableProfitPlaceholder: { fr: 'Ex: 150 000 000', en: 'E.g.: 150,000,000' },
  profitNote: { fr: 'L\u2019imp\u00f4t est calcul\u00e9 sur le b\u00e9n\u00e9fice, pas sur le CA', en: 'Tax is calculated on profit, not on turnover' },
  rateComparison: { fr: 'Comparaison des taux', en: 'Rate Comparison' },
  yourRate: { fr: 'Votre taux', en: 'Your rate' },
  results: { fr: 'R\u00e9sultats', en: 'Results' },
  appliedRate: { fr: 'Taux Appliqu\u00e9', en: 'Applied Rate' },
  corporateTax: { fr: 'Imp\u00f4t sur les Soci\u00e9t\u00e9s', en: 'Corporate Tax' },
  profitBreakdown: { fr: 'R\u00e9partition du b\u00e9n\u00e9fice', en: 'Profit Breakdown' },
  exportPdf: { fr: 'Exporter PDF', en: 'Export PDF' },
  shareWhatsapp: { fr: 'Partager sur WhatsApp', en: 'Share on WhatsApp' },
  disclaimer: { fr: 'Bas\u00e9 sur CGI 2024 \u2014 Non contractuel. Consultez un juriste pour vos d\u00e9clarations fiscales r\u00e9elles.', en: 'Based on CGI 2024 \u2014 Non-contractual. Consult a lawyer for your actual tax filings.' },
};

export default function ISSimulator() {
  const [chiffreAffaires, setChiffreAffaires] = useState<number>(0);
  const [benefice, setBenefice] = useState<number>(0);
  const [result, setResult] = useState<ISResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Format large numbers for display
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' Mrd';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' M';
    }
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  // Calculate IS whenever inputs change
  const handleCalculate = useCallback(() => {
    if (chiffreAffaires <= 0 && benefice <= 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const newResult = calculateIS(chiffreAffaires, benefice);
    setResult(newResult);
    setShowResult(true);
  }, [chiffreAffaires, benefice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  // Animate results
  useEffect(() => {
    if (showResult && resultRef.current) {
      const loadGSAP = async () => {
        const gsap = (await import('gsap')).default;
        gsap.fromTo(
          resultRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      };
      loadGSAP();
    }
  }, [showResult, result]);

  const handleExportPDF = async () => {
    if (!result) return;

    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 107, 107);
    doc.text('Legal Cameroun - Simulateur IS', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 30);

    // Results
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('R\u00e9sultats', 20, 45);

    doc.setFontSize(11);
    let y = 55;
    doc.text(`Chiffre d'Affaires: ${formatFCFA(result.chiffreAffaires)}`, 25, y);
    y += 8;
    doc.text(`B\u00e9n\u00e9fice Imposable: ${formatFCFA(result.benefice)}`, 25, y);
    y += 8;
    doc.text(`Taux Appliqu\u00e9: ${formatPercent(result.taux)}`, 25, y);
    y += 8;
    doc.text(`Seuil: ${result.seuilApplique}`, 25, y);
    y += 12;

    doc.setFontSize(13);
    doc.setTextColor(220, 53, 69);
    doc.text(`Imp\u00f4t sur les Soci\u00e9t\u00e9s: ${formatFCFA(result.impot)}`, 25, y);

    // Disclaimer
    y += 25;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Bas\u00e9 sur CGI 2024 - Non contractuel. Consultez un juriste pour vos d\u00e9clarations.', 20, y);

    doc.save('simulateur-is-legalcameroun.pdf');
  };

  const handleShareWhatsApp = () => {
    if (!result) return;

    let message = `*Simulation Imp\u00f4t sur les Soci\u00e9t\u00e9s - Legal Cameroun*\n\n`;
    message += `Chiffre d'Affaires: ${formatFCFA(result.chiffreAffaires)}\n`;
    message += `B\u00e9n\u00e9fice Imposable: ${formatFCFA(result.benefice)}\n`;
    message += `Taux Appliqu\u00e9: ${formatPercent(result.taux)}\n`;
    message += `\n*IS \u00e0 Payer: ${formatFCFA(result.impot)}*\n`;
    message += `\n_${result.seuilApplique}_\n`;
    message += `\n_Calcul bas\u00e9 sur CGI 2024_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Calculate slider position for visual feedback
  const sliderPosition = Math.min(100, (chiffreAffaires / (IS_THRESHOLD * 2)) * 100);
  const isAboveThreshold = chiffreAffaires > IS_THRESHOLD;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Form Section */}
      <div className="p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">{simText.calculationParams[language]}</h3>

        {/* Chiffre d'Affaires Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {simText.annualTurnover[language]}
            </label>
            <span className="text-lg font-bold text-primary-600">
              {formatFCFA(chiffreAffaires)}
            </span>
          </div>

          {/* Custom Slider */}
          <div className="relative mt-4">
            <input
              type="range"
              min="0"
              max={IS_THRESHOLD * 2}
              step={10000000}
              value={chiffreAffaires}
              onChange={(e) => setChiffreAffaires(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, ${isAboveThreshold ? '#f59e0b' : '#0d9488'} ${sliderPosition}%, #e5e7eb ${sliderPosition}%)`,
              }}
            />

            {/* Threshold Marker */}
            <div
              className="absolute top-6 transform -translate-x-1/2"
              style={{ left: '50%' }}
            >
              <div className="w-0.5 h-3 bg-red-500" />
              <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                {simText.threshold3B[language]}
              </span>
            </div>
          </div>

          {/* Quick Values */}
          <div className="flex justify-between mt-8 text-xs text-gray-500">
            <button
              onClick={() => setChiffreAffaires(500000000)}
              className="hover:text-primary-600"
            >
              500M
            </button>
            <button
              onClick={() => setChiffreAffaires(1500000000)}
              className="hover:text-primary-600"
            >
              1.5 Mrd
            </button>
            <button
              onClick={() => setChiffreAffaires(3000000000)}
              className="hover:text-primary-600"
            >
              3 Mrd
            </button>
            <button
              onClick={() => setChiffreAffaires(5000000000)}
              className="hover:text-primary-600"
            >
              5 Mrd
            </button>
          </div>

          {/* Manual Input */}
          <div className="mt-4">
            <input
              type="number"
              value={chiffreAffaires || ''}
              onChange={(e) => setChiffreAffaires(parseFloat(e.target.value) || 0)}
              placeholder={simText.enterExactCA[language]}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>

        {/* B\u00e9n\u00e9fice Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {simText.taxableProfit[language]}
          </label>
          <input
            type="number"
            value={benefice || ''}
            onChange={(e) => setBenefice(parseFloat(e.target.value) || 0)}
            placeholder={simText.taxableProfitPlaceholder[language]}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            {simText.profitNote[language]}
          </p>
        </div>

        {/* Rate Comparison */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{simText.rateComparison[language]}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border-2 ${
              !isAboveThreshold ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="text-2xl font-bold text-primary-600">{formatPercent(IS_RATE_SMALL)}</div>
              <div className="text-sm text-gray-500">CA ≤ 3 Mrd FCFA</div>
              {!isAboveThreshold && (
                <span className="inline-block mt-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {simText.yourRate[language]}
                </span>
              )}
            </div>
            <div className={`p-4 rounded-xl border-2 ${
              isAboveThreshold ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white'
            }`}>
              <div className="text-2xl font-bold text-yellow-600">{formatPercent(IS_RATE_LARGE)}</div>
              <div className="text-sm text-gray-500">CA &gt; 3 Mrd FCFA</div>
              {isAboveThreshold && (
                <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  {simText.yourRate[language]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResult && result && (
        <div ref={resultRef} className="border-t border-gray-200 bg-gray-50 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{simText.results[language]}</h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">{simText.appliedRate[language]}</div>
              <div className={`text-2xl font-bold ${isAboveThreshold ? 'text-yellow-600' : 'text-primary-600'}`}>
                {formatPercent(result.taux)}
              </div>
              <div className="text-xs text-gray-400 mt-1">{result.seuilApplique}</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
              <div className="text-sm text-gray-500 mb-1">{simText.corporateTax[language]}</div>
              <div className="text-2xl font-bold text-red-600">
                {formatFCFA(result.impot)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatPercent(result.taux)} × {formatLargeNumber(result.benefice)} FCFA
              </div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">{simText.profitBreakdown[language]}</h4>
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-red-500 transition-all duration-1000"
                style={{ width: `${(result.impot / result.benefice || 0) * 100}%` }}
              />
              <div
                className="absolute top-0 h-full bg-green-500 transition-all duration-1000"
                style={{
                  left: `${(result.impot / result.benefice || 0) * 100}%`,
                  width: `${((result.benefice - result.impot) / result.benefice || 0) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-600">IS: {formatFCFA(result.impot)}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-600">Net: {formatFCFA(result.benefice - result.impot)}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportPDF}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {simText.exportPdf[language]}
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {simText.shareWhatsapp[language]}
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-gray-100 text-center">
        <p className="text-xs text-gray-500">
          {simText.disclaimer[language]}
        </p>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${isAboveThreshold ? '#f59e0b' : '#0d9488'};
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${isAboveThreshold ? '#f59e0b' : '#0d9488'};
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
