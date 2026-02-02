'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SalaireResult,
  ReverseSalaireResult,
  calculateSalaire,
  calculateSalaireFromNet,
  formatFCFA,
  formatPercent,
  CNPS_PLAFOND,
  CNPS_RATES,
  SALARY_TAX_RATES,
  WHATSAPP_NUMBER,
} from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';

const simText = {
  brutToNet: { fr: 'Brut vers Net', en: 'Gross to Net' },
  netToBrut: { fr: 'Net vers Brut', en: 'Net to Gross' },
  modeDescBrut: { fr: 'Entrez le salaire brut pour calculer le net et les charges', en: 'Enter gross salary to calculate net pay and charges' },
  modeDescNet: { fr: 'Entrez le salaire net souhait\u00e9 pour calculer le brut correspondant', en: 'Enter desired net salary to calculate the corresponding gross' },
  employeeView: { fr: 'Vue Salari\u00e9', en: 'Employee View' },
  employerView: { fr: 'Vue Employeur', en: 'Employer View' },
  netTakeHome: { fr: 'Salaire net \u00e0 percevoir', en: 'Net take-home pay' },
  totalEmployerCost: { fr: 'Co\u00fbt total employeur', en: 'Total employer cost' },
  desiredNetSalary: { fr: 'Salaire Net Souhait\u00e9', en: 'Desired Net Salary' },
  grossMonthlySalary: { fr: 'Salaire Brut Mensuel', en: 'Gross Monthly Salary' },
  desiredNet: { fr: 'Net souhait\u00e9', en: 'Desired net' },
  grossAmount: { fr: 'Montant brut', en: 'Gross amount' },
  enterDesiredNet: { fr: 'Saisir le net souhait\u00e9', en: 'Enter desired net' },
  enterGrossAmount: { fr: 'Saisir le montant brut', en: 'Enter gross amount' },
  cnpsCeiling: { fr: 'Plafond CNPS', en: 'CNPS Ceiling' },
  cnpsCeilingExceeded: { fr: 'Plafond CNPS d\u00e9pass\u00e9', en: 'CNPS Ceiling exceeded' },
  cnpsCeilingNote: { fr: 'Les cotisations CNPS sont calcul\u00e9es sur une base plafonn\u00e9e \u00e0', en: 'CNPS contributions are calculated on a base capped at' },
  perMonth: { fr: '/mois', en: '/month' },
  estimate: { fr: 'Estimation', en: 'Estimate' },
  estimateAccuracy: { fr: 'Pr\u00e9cision du calcul inverse:', en: 'Reverse calculation accuracy:' },
  appliedRates: { fr: 'Taux appliqu\u00e9s', en: 'Applied Rates' },
  cnpsEmployee: { fr: 'CNPS Salari\u00e9:', en: 'CNPS Employee:' },
  cnpsEmployer: { fr: 'CNPS Employeur:', en: 'CNPS Employer:' },
  creditFoncierE: { fr: 'Cr\u00e9dit Foncier (E):', en: 'Housing Fund (E):' },
  fne: { fr: 'FNE:', en: 'FNE:' },
  targetNet: { fr: 'Net souhait\u00e9', en: 'Desired net' },
  requiredGross: { fr: 'Brut n\u00e9cessaire', en: 'Required gross' },
  employeeDetail: { fr: 'D\u00e9tail Salari\u00e9', en: 'Employee Detail' },
  employerDetail: { fr: 'D\u00e9tail Employeur', en: 'Employer Detail' },
  gross: { fr: 'Brut', en: 'Gross' },
  deductions: { fr: 'D\u00e9ductions', en: 'Deductions' },
  netTakeHomePay: { fr: 'Net \u00e0 percevoir', en: 'Net take-home' },
  element: { fr: '\u00c9l\u00e9ment', en: 'Item' },
  rate: { fr: 'Taux', en: 'Rate' },
  amount: { fr: 'Montant', en: 'Amount' },
  cnpsContributions: { fr: 'Cotisations CNPS', en: 'CNPS Contributions' },
  pensionOldAge: { fr: 'Pension vieillesse', en: 'Old-age pension' },
  taxes: { fr: 'Imp\u00f4ts', en: 'Taxes' },
  progressive: { fr: 'Progressif', en: 'Progressive' },
  additionalCentimes: { fr: 'Centimes additionnels', en: 'Additional centimes' },
  scale: { fr: 'Bar\u00e8me', en: 'Scale' },
  housingFund: { fr: 'Cr\u00e9dit Foncier', en: 'Housing Fund' },
  totalDeductions: { fr: 'Total D\u00e9ductions', en: 'Total Deductions' },
  grossSalaryBreakdown: { fr: 'R\u00e9partition du salaire brut', en: 'Gross Salary Breakdown' },
  grossSalary: { fr: 'Salaire Brut', en: 'Gross Salary' },
  employerCharges: { fr: 'Charges Patronales', en: 'Employer Charges' },
  totalEmployerCostLabel: { fr: 'Co\u00fbt Total Employeur', en: 'Total Employer Cost' },
  cnpsEmployerContributions: { fr: 'Cotisations CNPS Patronales', en: 'Employer CNPS Contributions' },
  familyBenefits: { fr: 'Prestations familiales', en: 'Family benefits' },
  workAccident: { fr: 'Accident du travail', en: 'Work accident' },
  employerTaxes: { fr: 'Taxes Patronales', en: 'Employer Taxes' },
  totalEmployerCharges: { fr: 'Total Charges Patronales', en: 'Total Employer Charges' },
  totalCostComposition: { fr: 'Composition du co\u00fbt total', en: 'Total Cost Composition' },
  charges: { fr: 'Charges', en: 'Charges' },
  net: { fr: 'Net', en: 'Net' },
  exportPdf: { fr: 'Exporter PDF', en: 'Export PDF' },
  shareWhatsapp: { fr: 'Partager sur WhatsApp', en: 'Share on WhatsApp' },
  disclaimer: { fr: 'Bas\u00e9 sur CGI 2024 et taux CNPS \u2014 Non contractuel. Consultez un expert pour vos calculs de paie r\u00e9els.', en: 'Based on CGI 2024 and CNPS rates \u2014 Non-contractual. Consult an expert for your actual payroll calculations.' },
};

type ViewType = 'salarie' | 'employeur';
type CalculationMode = 'brut_to_net' | 'net_to_brut';

export default function SalaireSimulator() {
  const [activeView, setActiveView] = useState<ViewType>('salarie');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('brut_to_net');
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<SalaireResult | ReverseSalaireResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const isReverseMode = calculationMode === 'net_to_brut';

  // Calculate salary whenever input changes
  const handleCalculate = useCallback(() => {
    if (inputValue <= 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    if (isReverseMode) {
      const newResult = calculateSalaireFromNet(inputValue);
      setResult(newResult);
    } else {
      const newResult = calculateSalaire(inputValue);
      setResult(newResult);
    }
    setShowResult(true);
  }, [inputValue, isReverseMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  // Reset input when mode changes
  useEffect(() => {
    setInputValue(0);
    setResult(null);
    setShowResult(false);
  }, [calculationMode]);

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
    doc.text('Legal Cameroun - Simulateur Salaire', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 30);

    // Mode indicator
    const modeText = isReverseMode
      ? 'Mode: Net vers Brut (calcul inverse)'
      : 'Mode: Brut vers Net';
    doc.text(modeText, 20, 36);

    // Basic Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let y = 50;

    if (isReverseMode) {
      const reverseResult = result as ReverseSalaireResult;
      doc.text(`Salaire Net Souhait\u00e9: ${formatFCFA(reverseResult.targetNet)}`, 20, y);
      y += 8;
      doc.setTextColor(0, 107, 107);
      doc.text(`Salaire Brut Calcul\u00e9: ${formatFCFA(reverseResult.brut)}`, 20, y);
      doc.setTextColor(0, 0, 0);
      y += 4;
      if (reverseResult.isEstimate) {
        doc.setFontSize(9);
        doc.setTextColor(220, 120, 60);
        doc.text(`(Estimation avec pr\u00e9cision de ${formatFCFA(reverseResult.accuracy)})`, 20, y);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
      }
    } else {
      doc.text(`Salaire Brut Mensuel: ${formatFCFA(result.brut)}`, 20, y);
    }
    y += 12;

    // Employee Section
    doc.setFontSize(14);
    doc.setTextColor(0, 107, 107);
    doc.text('Vue Salari\u00e9', 20, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Cotisations CNPS: ${formatFCFA(result.cotisationsSalariales.total)}`, 25, y);
    y += 6;
    doc.text(`Imp\u00f4ts: ${formatFCFA(result.impotsSalariaux.total)}`, 25, y);
    y += 6;
    doc.text(`  - IRPP: ${formatFCFA(result.impotsSalariaux.irpp)}`, 30, y);
    y += 5;
    doc.text(`  - TDL: ${formatFCFA(result.impotsSalariaux.tdl)}`, 30, y);
    y += 5;
    doc.text(`  - RAV: ${formatFCFA(result.impotsSalariaux.rav)}`, 30, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(40, 167, 69);
    doc.text(`Salaire Net: ${formatFCFA(result.netSalaire)}`, 25, y);
    y += 15;

    // Employer Section
    doc.setFontSize(14);
    doc.setTextColor(0, 107, 107);
    doc.text('Vue Employeur', 20, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Cotisations CNPS: ${formatFCFA(result.cotisationsPatronales.total)}`, 25, y);
    y += 6;
    doc.text(`Taxes: ${formatFCFA(result.impotsPatronaux.total)}`, 25, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(220, 53, 69);
    doc.text(`Co\u00fbt Total Employeur: ${formatFCFA(result.coutTotal)}`, 25, y);

    // Disclaimer
    y += 25;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Bas\u00e9 sur CGI 2024 et taux CNPS - Non contractuel.', 20, y);

    doc.save('simulateur-salaire-legalcameroun.pdf');
  };

  const handleShareWhatsApp = () => {
    if (!result) return;

    let message = `*Simulation Salaire - Legal Cameroun*\n\n`;

    if (isReverseMode) {
      const reverseResult = result as ReverseSalaireResult;
      message += `*Mode: Net vers Brut*\n`;
      message += `Net souhait\u00e9: ${formatFCFA(reverseResult.targetNet)}\n`;
      message += `*Brut calcul\u00e9: ${formatFCFA(reverseResult.brut)}*\n\n`;
    } else {
      message += `*Mode: Brut vers Net*\n`;
      message += `Salaire Brut: ${formatFCFA(result.brut)}\n\n`;
    }

    message += `*Vue Salari\u00e9:*\n`;
    message += `- Cotisations CNPS: ${formatFCFA(result.cotisationsSalariales.total)}\n`;
    message += `- Imp\u00f4ts: ${formatFCFA(result.impotsSalariaux.total)}\n`;
    message += `- *Net \u00e0 percevoir: ${formatFCFA(result.netSalaire)}*\n\n`;
    message += `*Vue Employeur:*\n`;
    message += `- Charges patronales: ${formatFCFA(result.chargesPatronales)}\n`;
    message += `- *Co\u00fbt total: ${formatFCFA(result.coutTotal)}*\n`;
    message += `\n_Calcul bas\u00e9 sur CGI 2024 et CNPS_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Check if salary exceeds CNPS cap (using brut value)
  const isAbovePlafond = isReverseMode
    ? (result?.brut || 0) > CNPS_PLAFOND
    : inputValue > CNPS_PLAFOND;

  // Slider max values based on mode
  const sliderMax = isReverseMode ? 1500000 : 2000000;
  const displayValue = inputValue;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Mode Toggle */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4">
        <div className="flex items-center justify-center gap-2">
          <span className={`text-sm font-medium transition-colors ${!isReverseMode ? 'text-primary-700' : 'text-gray-500'}`}>
            {simText.brutToNet[language]}
          </span>
          <button
            onClick={() => setCalculationMode(isReverseMode ? 'brut_to_net' : 'net_to_brut')}
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-white shadow-inner border border-gray-200 transition-colors"
            aria-label="Toggle calculation mode"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-primary-600 shadow-md transition-transform ${
                isReverseMode ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isReverseMode ? 'text-primary-700' : 'text-gray-500'}`}>
            {simText.netToBrut[language]}
          </span>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          {isReverseMode ? simText.modeDescNet[language] : simText.modeDescBrut[language]}
        </p>
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveView('salarie')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeView === 'salarie'
              ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {simText.employeeView[language]}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            {simText.netTakeHome[language]}
          </span>
        </button>
        <button
          onClick={() => setActiveView('employeur')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeView === 'employeur'
              ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {simText.employerView[language]}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            {simText.totalEmployerCost[language]}
          </span>
        </button>
      </div>

      {/* Form Section */}
      <div className="p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {isReverseMode ? simText.desiredNetSalary[language] : simText.grossMonthlySalary[language]}
        </h3>

        {/* Salary Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {isReverseMode ? simText.desiredNet[language] : simText.grossAmount[language]}
            </label>
            <span className="text-lg font-bold text-primary-600">
              {formatFCFA(displayValue)}
            </span>
          </div>

          {/* Custom Slider */}
          <div className="relative mt-4">
            <input
              type="range"
              min="0"
              max={sliderMax}
              step={10000}
              value={displayValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${isAbovePlafond ? '#f59e0b' : '#0d9488'} ${(displayValue / sliderMax) * 100}%, #e5e7eb ${(displayValue / sliderMax) * 100}%)`,
              }}
            />

            {/* Plafond Marker - only show in brut mode */}
            {!isReverseMode && (
              <div
                className="absolute top-6 transform -translate-x-1/2"
                style={{ left: `${(CNPS_PLAFOND / sliderMax) * 100}%` }}
              >
                <div className="w-0.5 h-3 bg-red-500" />
                <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                  {simText.cnpsCeiling[language]}
                </span>
              </div>
            )}
          </div>

          {/* Quick Values */}
          <div className="flex justify-between mt-8 text-xs text-gray-500">
            {isReverseMode ? (
              <>
                <button onClick={() => setInputValue(100000)} className="hover:text-primary-600">100K</button>
                <button onClick={() => setInputValue(200000)} className="hover:text-primary-600">200K</button>
                <button onClick={() => setInputValue(350000)} className="hover:text-primary-600">350K</button>
                <button onClick={() => setInputValue(500000)} className="hover:text-primary-600">500K</button>
                <button onClick={() => setInputValue(750000)} className="hover:text-primary-600">750K</button>
              </>
            ) : (
              <>
                <button onClick={() => setInputValue(150000)} className="hover:text-primary-600">150K</button>
                <button onClick={() => setInputValue(350000)} className="hover:text-primary-600">350K</button>
                <button onClick={() => setInputValue(500000)} className="hover:text-primary-600">500K</button>
                <button onClick={() => setInputValue(750000)} className="hover:text-primary-600">750K</button>
                <button onClick={() => setInputValue(1000000)} className="hover:text-primary-600">1M</button>
              </>
            )}
          </div>

          {/* Manual Input */}
          <div className="mt-4">
            <input
              type="number"
              value={displayValue || ''}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              placeholder={isReverseMode ? simText.enterDesiredNet[language] : simText.enterGrossAmount[language]}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>

          {/* Plafond Notice */}
          {isAbovePlafond && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-yellow-800">
                  <strong>{simText.cnpsCeilingExceeded[language]}</strong>
                  <p className="text-yellow-700 text-xs mt-1">
                    {simText.cnpsCeilingNote[language]} {formatFCFA(CNPS_PLAFOND)}{simText.perMonth[language]}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reverse calculation accuracy notice */}
          {isReverseMode && result && 'isEstimate' in result && result.isEstimate && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <strong>{simText.estimate[language]}</strong>
                  <p className="text-blue-700 text-xs mt-1">
                    {simText.estimateAccuracy[language]} \u00b1{formatFCFA(result.accuracy)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rates Info */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{simText.appliedRates[language]}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{simText.cnpsEmployee[language]}</span>
              <span className="ml-2 font-medium">{formatPercent(CNPS_RATES.pension_employee)}</span>
            </div>
            <div>
              <span className="text-gray-500">{simText.cnpsEmployer[language]}</span>
              <span className="ml-2 font-medium">{formatPercent(CNPS_RATES.prestation_familiale + CNPS_RATES.accident_travail + CNPS_RATES.pension_employer)}</span>
            </div>
            <div>
              <span className="text-gray-500">{simText.creditFoncierE[language]}</span>
              <span className="ml-2 font-medium">{formatPercent(SALARY_TAX_RATES.credit_foncier_employee)}</span>
            </div>
            <div>
              <span className="text-gray-500">{simText.fne[language]}</span>
              <span className="ml-2 font-medium">{formatPercent(SALARY_TAX_RATES.fne)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResult && result && (
        <div ref={resultRef} className="border-t border-gray-200 bg-gray-50 p-6 md:p-8">
          {/* Reverse Mode Result Banner */}
          {isReverseMode && (
            <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-primary-600 font-medium">{simText.targetNet[language]}</div>
                  <div className="text-xl font-bold text-primary-700">{formatFCFA((result as ReverseSalaireResult).targetNet)}</div>
                </div>
                <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div>
                  <div className="text-sm text-primary-600 font-medium">{simText.requiredGross[language]}</div>
                  <div className="text-xl font-bold text-primary-700">{formatFCFA(result.brut)}</div>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {activeView === 'salarie' ? simText.employeeDetail[language] : simText.employerDetail[language]}
          </h3>

          {activeView === 'salarie' ? (
            // Employee View
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.gross[language]}</div>
                  <div className="text-xl font-bold text-gray-900">{formatFCFA(result.brut)}</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.deductions[language]}</div>
                  <div className="text-xl font-bold text-red-600">-{formatFCFA(result.deductionsSalariales)}</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.netTakeHomePay[language]}</div>
                  <div className="text-xl font-bold text-green-600">{formatFCFA(result.netSalaire)}</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600">{simText.element[language]}</th>
                      <th className="text-right px-4 py-3 text-gray-600">{simText.rate[language]}</th>
                      <th className="text-right px-4 py-3 text-gray-600">{simText.amount[language]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-primary-50">
                      <td colSpan={3} className="px-4 py-2 font-medium text-primary-700">{simText.cnpsContributions[language]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.pensionOldAge[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(CNPS_RATES.pension_employee)}</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.cotisationsSalariales.pension)}</td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td colSpan={3} className="px-4 py-2 font-medium text-primary-700">{simText.taxes[language]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">IRPP</td>
                      <td className="px-4 py-2 text-right text-gray-500">{simText.progressive[language]}</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.impotsSalariaux.irpp)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.additionalCentimes[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">10% IRPP</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.impotsSalariaux.centimes)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">TDL</td>
                      <td className="px-4 py-2 text-right text-gray-500">{simText.scale[language]}</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.impotsSalariaux.tdl)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">RAV</td>
                      <td className="px-4 py-2 text-right text-gray-500">{simText.scale[language]}</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.impotsSalariaux.rav)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.housingFund[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(SALARY_TAX_RATES.credit_foncier_employee)}</td>
                      <td className="px-4 py-2 text-right font-medium text-red-600">-{formatFCFA(result.impotsSalariaux.creditFoncier)}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 font-bold">{simText.totalDeductions[language]}</td>
                      <td className="px-4 py-3 text-right font-bold text-red-600">-{formatFCFA(result.deductionsSalariales)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Visual Chart */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{simText.grossSalaryBreakdown[language]}</h4>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-red-400 transition-all duration-1000"
                    style={{ width: `${(result.cotisationsSalariales.total / result.brut) * 100}%` }}
                    title="CNPS"
                  />
                  <div
                    className="absolute top-0 h-full bg-orange-400 transition-all duration-1000"
                    style={{
                      left: `${(result.cotisationsSalariales.total / result.brut) * 100}%`,
                      width: `${(result.impotsSalariaux.total / result.brut) * 100}%`,
                    }}
                    title={simText.taxes[language]}
                  />
                  <div
                    className="absolute top-0 h-full bg-green-500 transition-all duration-1000"
                    style={{
                      left: `${(result.deductionsSalariales / result.brut) * 100}%`,
                      width: `${(result.netSalaire / result.brut) * 100}%`,
                    }}
                    title="Net"
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    CNPS ({formatPercent(result.cotisationsSalariales.total / result.brut)})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-orange-400 rounded-full" />
                    {simText.taxes[language]} ({formatPercent(result.impotsSalariaux.total / result.brut)})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                    {simText.net[language]} ({formatPercent(result.netSalaire / result.brut)})
                  </span>
                </div>
              </div>
            </>
          ) : (
            // Employer View
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.grossSalary[language]}</div>
                  <div className="text-xl font-bold text-gray-900">{formatFCFA(result.brut)}</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.employerCharges[language]}</div>
                  <div className="text-xl font-bold text-orange-600">+{formatFCFA(result.chargesPatronales)}</div>
                </div>
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <div className="text-sm text-gray-500 mb-1">{simText.totalEmployerCostLabel[language]}</div>
                  <div className="text-xl font-bold text-red-600">{formatFCFA(result.coutTotal)}</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600">{simText.element[language]}</th>
                      <th className="text-right px-4 py-3 text-gray-600">{simText.rate[language]}</th>
                      <th className="text-right px-4 py-3 text-gray-600">{simText.amount[language]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-orange-50">
                      <td colSpan={3} className="px-4 py-2 font-medium text-orange-700">{simText.cnpsEmployerContributions[language]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.familyBenefits[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(CNPS_RATES.prestation_familiale)}</td>
                      <td className="px-4 py-2 text-right font-medium text-orange-600">+{formatFCFA(result.cotisationsPatronales.prestationFamiliale)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.workAccident[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(CNPS_RATES.accident_travail)}</td>
                      <td className="px-4 py-2 text-right font-medium text-orange-600">+{formatFCFA(result.cotisationsPatronales.accidentTravail)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.pensionOldAge[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(CNPS_RATES.pension_employer)}</td>
                      <td className="px-4 py-2 text-right font-medium text-orange-600">+{formatFCFA(result.cotisationsPatronales.pension)}</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td colSpan={3} className="px-4 py-2 font-medium text-orange-700">{simText.employerTaxes[language]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">FNE</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(SALARY_TAX_RATES.fne)}</td>
                      <td className="px-4 py-2 text-right font-medium text-orange-600">+{formatFCFA(result.impotsPatronaux.fne)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600">{simText.housingFund[language]}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatPercent(SALARY_TAX_RATES.credit_foncier_employer)}</td>
                      <td className="px-4 py-2 text-right font-medium text-orange-600">+{formatFCFA(result.impotsPatronaux.creditFoncier)}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 font-bold">{simText.totalEmployerCharges[language]}</td>
                      <td className="px-4 py-3 text-right font-bold text-orange-600">+{formatFCFA(result.chargesPatronales)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Visual Chart */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{simText.totalCostComposition[language]}</h4>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary-500 transition-all duration-1000"
                    style={{ width: `${(result.brut / result.coutTotal) * 100}%` }}
                    title={simText.grossSalary[language]}
                  />
                  <div
                    className="absolute top-0 h-full bg-orange-500 transition-all duration-1000"
                    style={{
                      left: `${(result.brut / result.coutTotal) * 100}%`,
                      width: `${(result.chargesPatronales / result.coutTotal) * 100}%`,
                    }}
                    title={simText.charges[language]}
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-primary-500 rounded-full" />
                    {simText.gross[language]} ({formatPercent(result.brut / result.coutTotal)})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-orange-500 rounded-full" />
                    {simText.charges[language]} ({formatPercent(result.chargesPatronales / result.coutTotal)})
                  </span>
                </div>
              </div>
            </>
          )}

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
          border: 3px solid ${isAbovePlafond ? '#f59e0b' : '#0d9488'};
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${isAbovePlafond ? '#f59e0b' : '#0d9488'};
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
