'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  TVAOperation,
  TVAResult,
  calculateTVA,
  htToTTC,
  formatFCFA,
  formatPercent,
  TVA_RATE_STANDARD,
  TVA_RATES,
  WHATSAPP_NUMBER,
} from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';

const simText = {
  salesTab: { fr: 'Ventes (TVA Collect\u00e9e)', en: 'Sales (VAT Collected)' },
  purchasesTab: { fr: 'Achats (TVA D\u00e9ductible)', en: 'Purchases (Deductible VAT)' },
  operationCount: { fr: 'op\u00e9ration(s)', en: 'operation(s)' },
  operation: { fr: 'Op\u00e9ration', en: 'Operation' },
  descriptionLabel: { fr: 'Description (optionnel)', en: 'Description (optional)' },
  descriptionPlaceholder: { fr: 'Ex: Vente marchandises', en: 'E.g.: Merchandise sale' },
  amountHTLabel: { fr: 'Montant HT (FCFA)', en: 'Amount excl. tax (FCFA)' },
  vatRateLabel: { fr: 'Taux TVA', en: 'VAT Rate' },
  addOperation: { fr: 'Ajouter une op\u00e9ration', en: 'Add an operation' },
  results: { fr: 'R\u00e9sultats', en: 'Results' },
  vatCollected: { fr: 'TVA Collect\u00e9e', en: 'VAT Collected' },
  vatDeductible: { fr: 'TVA D\u00e9ductible', en: 'Deductible VAT' },
  netVatPayable: { fr: 'TVA Nette \u00e0 Payer', en: 'Net VAT Payable' },
  vatCredit: { fr: 'Cr\u00e9dit de TVA', en: 'VAT Credit' },
  breakdown: { fr: 'R\u00e9partition', en: 'Breakdown' },
  collected: { fr: 'Collect\u00e9e', en: 'Collected' },
  deductible: { fr: 'D\u00e9ductible', en: 'Deductible' },
  exportPdf: { fr: 'Exporter PDF', en: 'Export PDF' },
  shareWhatsapp: { fr: 'Partager sur WhatsApp', en: 'Share on WhatsApp' },
  disclaimer: { fr: 'Bas\u00e9 sur CGI 2024 \u2014 Non contractuel. Consultez un juriste pour vos d\u00e9clarations fiscales r\u00e9elles.', en: 'Based on CGI 2024 \u2014 Non-contractual. Consult a lawyer for your actual tax filings.' },
};

type TabType = 'ventes' | 'achats';

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultOperation = (): TVAOperation => ({
  id: generateId(),
  description: '',
  montantHT: 0,
  taux: TVA_RATE_STANDARD,
});

export default function TVASimulator() {
  const [activeTab, setActiveTab] = useState<TabType>('ventes');
  const [ventes, setVentes] = useState<TVAOperation[]>([defaultOperation()]);
  const [achats, setAchats] = useState<TVAOperation[]>([defaultOperation()]);
  const [result, setResult] = useState<TVAResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Calculate TVA whenever inputs change
  const handleCalculate = useCallback(() => {
    const validVentes = ventes.filter(v => v.montantHT > 0);
    const validAchats = achats.filter(a => a.montantHT > 0);

    if (validVentes.length === 0 && validAchats.length === 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const newResult = calculateTVA(validVentes, validAchats);
    setResult(newResult);
    setShowResult(true);
  }, [ventes, achats]);

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

  const addOperation = (type: TabType) => {
    if (type === 'ventes') {
      setVentes([...ventes, defaultOperation()]);
    } else {
      setAchats([...achats, defaultOperation()]);
    }
  };

  const removeOperation = (type: TabType, id: string) => {
    if (type === 'ventes') {
      setVentes(ventes.filter(v => v.id !== id));
    } else {
      setAchats(achats.filter(a => a.id !== id));
    }
  };

  const updateOperation = (type: TabType, id: string, field: keyof TVAOperation, value: string | number) => {
    const updateFn = (ops: TVAOperation[]) =>
      ops.map(op => (op.id === id ? { ...op, [field]: value } : op));

    if (type === 'ventes') {
      setVentes(updateFn(ventes));
    } else {
      setAchats(updateFn(achats));
    }
  };

  const operations = activeTab === 'ventes' ? ventes : achats;

  const handleExportPDF = async () => {
    if (!result) return;

    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 107, 107);
    doc.text('Legal Cameroun - Simulateur TVA', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 30);

    // Results
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('R\u00e9sultats', 20, 45);

    doc.setFontSize(11);
    let y = 55;
    doc.text(`TVA Collect\u00e9e (Ventes): ${formatFCFA(result.tvaCollectee)}`, 25, y);
    y += 8;
    doc.text(`TVA D\u00e9ductible (Achats): ${formatFCFA(result.tvaDeductible)}`, 25, y);
    y += 8;

    if (result.tvaNette > 0) {
      doc.setTextColor(220, 53, 69);
      doc.text(`TVA Nette \u00e0 Payer: ${formatFCFA(result.tvaNette)}`, 25, y);
    } else if (result.creditTVA > 0) {
      doc.setTextColor(40, 167, 69);
      doc.text(`Cr\u00e9dit de TVA: ${formatFCFA(result.creditTVA)}`, 25, y);
    }

    // Disclaimer
    y += 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Bas\u00e9 sur CGI 2024 - Non contractuel. Consultez un juriste pour vos d\u00e9clarations.', 20, y);

    doc.save('simulateur-tva-legalcameroun.pdf');
  };

  const handleShareWhatsApp = () => {
    if (!result) return;

    let message = `*Simulation TVA - Legal Cameroun*\n\n`;
    message += `TVA Collect\u00e9e: ${formatFCFA(result.tvaCollectee)}\n`;
    message += `TVA D\u00e9ductible: ${formatFCFA(result.tvaDeductible)}\n`;

    if (result.tvaNette > 0) {
      message += `\n*TVA Nette \u00e0 Payer: ${formatFCFA(result.tvaNette)}*\n`;
    } else if (result.creditTVA > 0) {
      message += `\n*Cr\u00e9dit de TVA: ${formatFCFA(result.creditTVA)}*\n`;
    }

    message += `\n_Calcul bas\u00e9 sur CGI 2024_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('ventes')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'ventes'
              ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {simText.salesTab[language]}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            {ventes.filter(v => v.montantHT > 0).length} {simText.operationCount[language]}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('achats')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'achats'
              ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            {simText.purchasesTab[language]}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            {achats.filter(a => a.montantHT > 0).length} {simText.operationCount[language]}
          </span>
        </button>
      </div>

      {/* Operations Form */}
      <div className="p-6">
        <div className="space-y-4">
          {operations.map((op, index) => (
            <div
              key={op.id}
              className="p-4 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  {simText.operation[language]} {index + 1}
                </span>
                {operations.length > 1 && (
                  <button
                    onClick={() => removeOperation(activeTab, op.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {simText.descriptionLabel[language]}
                  </label>
                  <input
                    type="text"
                    value={op.description}
                    onChange={(e) => updateOperation(activeTab, op.id, 'description', e.target.value)}
                    placeholder={simText.descriptionPlaceholder[language]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Montant HT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {simText.amountHTLabel[language]}
                  </label>
                  <input
                    type="number"
                    value={op.montantHT || ''}
                    onChange={(e) => updateOperation(activeTab, op.id, 'montantHT', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {op.montantHT > 0 && (
                    <span className="text-xs text-gray-400 mt-1 block">
                      TTC: {formatFCFA(htToTTC(op.montantHT, op.taux))}
                    </span>
                  )}
                </div>

                {/* Taux TVA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {simText.vatRateLabel[language]}
                  </label>
                  <select
                    value={op.taux}
                    onChange={(e) => updateOperation(activeTab, op.id, 'taux', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {Object.entries(TVA_RATES).map(([key, { rate, label }]) => (
                      <option key={key} value={rate}>
                        {label[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TVA Amount Preview */}
              {op.montantHT > 0 && (
                <div className="mt-3 text-right">
                  <span className="text-sm text-gray-500">TVA: </span>
                  <span className="font-semibold text-primary-600">
                    {formatFCFA(op.montantHT * op.taux)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Operation Button */}
        <button
          onClick={() => addOperation(activeTab)}
          className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {simText.addOperation[language]}
        </button>
      </div>

      {/* Results Section */}
      {showResult && result && (
        <div ref={resultRef} className="border-t border-gray-200 bg-gray-50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{simText.results[language]}</h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">{simText.vatCollected[language]}</div>
              <div className="text-xl font-bold text-primary-600">
                {formatFCFA(result.tvaCollectee)}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">{simText.vatDeductible[language]}</div>
              <div className="text-xl font-bold text-orange-600">
                {formatFCFA(result.tvaDeductible)}
              </div>
            </div>
            <div className={`rounded-2xl p-4 border ${
              result.tvaNette > 0
                ? 'bg-red-50 border-red-100'
                : 'bg-green-50 border-green-100'
            }`}>
              <div className="text-sm text-gray-500 mb-1">
                {result.tvaNette > 0 ? simText.netVatPayable[language] : simText.vatCredit[language]}
              </div>
              <div className={`text-xl font-bold ${
                result.tvaNette > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {formatFCFA(result.tvaNette > 0 ? result.tvaNette : result.creditTVA)}
              </div>
            </div>
          </div>

          {/* Visual Chart */}
          <div ref={chartRef} className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">{simText.breakdown[language]}</h4>
            <div className="flex items-center gap-4">
              {/* Simple Bar Chart */}
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{simText.collected[language]}</span>
                    <span className="font-medium">{formatPercent(result.tvaCollectee / (result.tvaCollectee + result.tvaDeductible || 1))}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(result.tvaCollectee / (result.tvaCollectee + result.tvaDeductible || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{simText.deductible[language]}</span>
                    <span className="font-medium">{formatPercent(result.tvaDeductible / (result.tvaCollectee + result.tvaDeductible || 1))}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(result.tvaDeductible / (result.tvaCollectee + result.tvaDeductible || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
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
    </div>
  );
}
