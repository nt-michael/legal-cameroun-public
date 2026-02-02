// Fiscal Simulators Data
// Based on CGI 2024 (DGI/CNPS rates)
// Legal Cameroun / RODEC Conseils

import { BilingualText } from '@/lib/translations';

// ============================================
// CONSTANTS & TAX RATES
// ============================================

// TVA Rates
export const TVA_RATE_STANDARD = 0.1925; // 19.25%
export const TVA_RATES = {
  standard: { rate: 0.1925, label: { fr: 'Standard (19,25%)', en: 'Standard (19.25%)' } as BilingualText },
  reduced: { rate: 0.0, label: { fr: 'Exonéré (0%)', en: 'Exempt (0%)' } as BilingualText },
};

// IS (Impôt sur les Sociétés) Rates
export const IS_THRESHOLD = 3000000000; // 3 milliards FCFA
export const IS_RATE_SMALL = 0.285; // 28.5% for CA <= 3B
export const IS_RATE_LARGE = 0.33; // 33% for CA > 3B

// CNPS Constants
export const CNPS_PLAFOND = 750000; // 750,000 FCFA/month

// CNPS Cotisations Rates
export const CNPS_RATES = {
  // Employee contributions (salarié)
  pension_employee: 0.042, // 4.2%

  // Employer contributions (patronale)
  prestation_familiale: 0.07, // 7%
  accident_travail: 0.025, // 2.5% (on full salary, not capped)
  pension_employer: 0.042, // 4.2%
};

// Impôts sur Salaire Rates
export const SALARY_TAX_RATES = {
  // Employee taxes
  centimes_additionnels: 0.10, // 10% of IRPP
  credit_foncier_employee: 0.01, // 1%

  // Employer taxes
  fne: 0.01, // 1% - Fonds National de l'Emploi
  credit_foncier_employer: 0.015, // 1.5%
};

// ============================================
// IRPP BRACKETS (Impôt sur le Revenu des Personnes Physiques)
// Annual progressive brackets
// ============================================
export const IRPP_BRACKETS = [
  { min: 0, max: 2000000, rate: 0.10 },
  { min: 2000000, max: 3000000, rate: 0.15 },
  { min: 3000000, max: 5000000, rate: 0.25 },
  { min: 5000000, max: Infinity, rate: 0.35 },
];

// ============================================
// TDL (Taxe de Développement Local) - Annual brackets based on monthly salary
// ============================================
export const TDL_BRACKETS = [
  { min: 0, max: 62000, amount: 0 },
  { min: 62000, max: 75000, amount: 3000 },
  { min: 75000, max: 100000, amount: 6000 },
  { min: 100000, max: 150000, amount: 9000 },
  { min: 150000, max: 200000, amount: 12000 },
  { min: 200000, max: 300000, amount: 18000 },
  { min: 300000, max: 500000, amount: 24000 },
  { min: 500000, max: Infinity, amount: 30000 },
];

// ============================================
// RAV (Redevance Audio-Visuelle) - Monthly brackets
// ============================================
export const RAV_BRACKETS = [
  { min: 0, max: 50000, amount: 0 },
  { min: 50000, max: 100000, amount: 750 },
  { min: 100000, max: 200000, amount: 1950 },
  { min: 200000, max: 300000, amount: 3250 },
  { min: 300000, max: 400000, amount: 4550 },
  { min: 400000, max: 500000, amount: 5850 },
  { min: 500000, max: 600000, amount: 7150 },
  { min: 600000, max: 700000, amount: 8450 },
  { min: 700000, max: 800000, amount: 9750 },
  { min: 800000, max: 900000, amount: 11050 },
  { min: 900000, max: 1000000, amount: 12350 },
  { min: 1000000, max: Infinity, amount: 13000 },
];

// ============================================
// CALCULATION FUNCTIONS
// ============================================

// Format number as FCFA
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + ' FCFA';
}

// Format percentage
export function formatPercent(rate: number): string {
  return (rate * 100).toFixed(1) + '%';
}

// ============================================
// TVA CALCULATIONS
// ============================================
export interface TVAOperation {
  id: string;
  description: string;
  montantHT: number;
  taux: number;
}

export interface TVAResult {
  totalHT: number;
  tvaCollectee: number;
  tvaDeductible: number;
  tvaNette: number;
  creditTVA: number;
  operations: {
    ventes: TVAOperation[];
    achats: TVAOperation[];
  };
}

export function calculateTVA(ventes: TVAOperation[], achats: TVAOperation[]): TVAResult {
  const tvaCollectee = ventes.reduce((sum, op) => sum + (op.montantHT * op.taux), 0);
  const tvaDeductible = achats.reduce((sum, op) => sum + (op.montantHT * op.taux), 0);
  const tvaNette = tvaCollectee - tvaDeductible;

  return {
    totalHT: ventes.reduce((sum, op) => sum + op.montantHT, 0),
    tvaCollectee,
    tvaDeductible,
    tvaNette: tvaNette >= 0 ? tvaNette : 0,
    creditTVA: tvaNette < 0 ? Math.abs(tvaNette) : 0,
    operations: { ventes, achats },
  };
}

export function htToTTC(ht: number, taux: number = TVA_RATE_STANDARD): number {
  return ht * (1 + taux);
}

export function ttcToHT(ttc: number, taux: number = TVA_RATE_STANDARD): number {
  return ttc / (1 + taux);
}

// ============================================
// IS (IMPÔT SUR LES SOCIÉTÉS) CALCULATIONS
// ============================================
export interface ISResult {
  chiffreAffaires: number;
  benefice: number;
  taux: number;
  impot: number;
  seuilApplique: string;
}

export function calculateIS(chiffreAffaires: number, benefice: number): ISResult {
  const taux = chiffreAffaires <= IS_THRESHOLD ? IS_RATE_SMALL : IS_RATE_LARGE;
  const impot = benefice * taux;

  return {
    chiffreAffaires,
    benefice,
    taux,
    impot: Math.max(0, impot),
    seuilApplique: chiffreAffaires <= IS_THRESHOLD
      ? `CA ≤ 3 milliards → ${formatPercent(IS_RATE_SMALL)}`
      : `CA > 3 milliards → ${formatPercent(IS_RATE_LARGE)}`,
  };
}

// ============================================
// SALARY TAX CALCULATIONS
// ============================================
export interface SalaireResult {
  brut: number;
  basePlafonnee: number;

  // Employee contributions
  cotisationsSalariales: {
    pension: number;
    total: number;
  };

  // Employee taxes
  impotsSalariaux: {
    irpp: number;
    centimes: number;
    tdl: number;
    rav: number;
    creditFoncier: number;
    total: number;
  };

  // Employer contributions
  cotisationsPatronales: {
    prestationFamiliale: number;
    accidentTravail: number;
    pension: number;
    total: number;
  };

  // Employer taxes
  impotsPatronaux: {
    fne: number;
    creditFoncier: number;
    total: number;
  };

  // Totals
  netSalaire: number;
  coutTotal: number;

  // Breakdown for charts
  deductionsSalariales: number;
  chargesPatronales: number;
}

// Calculate IRPP (progressive tax)
function calculateIRPP(annualIncome: number): number {
  let irpp = 0;
  let remaining = annualIncome;

  for (const bracket of IRPP_BRACKETS) {
    if (remaining <= 0) break;

    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
    irpp += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
  }

  return irpp;
}

// Calculate TDL (annual, based on monthly salary)
function calculateTDL(monthlySalary: number): number {
  for (const bracket of TDL_BRACKETS) {
    if (monthlySalary > bracket.min && monthlySalary <= bracket.max) {
      return bracket.amount;
    }
  }
  return TDL_BRACKETS[TDL_BRACKETS.length - 1].amount;
}

// Calculate RAV (monthly)
function calculateRAV(monthlySalary: number): number {
  for (const bracket of RAV_BRACKETS) {
    if (monthlySalary > bracket.min && monthlySalary <= bracket.max) {
      return bracket.amount;
    }
  }
  return RAV_BRACKETS[RAV_BRACKETS.length - 1].amount;
}

export function calculateSalaire(brutMensuel: number): SalaireResult {
  // Base plafonnée pour CNPS
  const basePlafonnee = Math.min(brutMensuel, CNPS_PLAFOND);

  // ================
  // COTISATIONS SALARIALES (Employee CNPS)
  // ================
  const pensionSalariale = basePlafonnee * CNPS_RATES.pension_employee;
  const totalCotisationsSalariales = pensionSalariale;

  // ================
  // COTISATIONS PATRONALES (Employer CNPS)
  // ================
  const prestationFamiliale = basePlafonnee * CNPS_RATES.prestation_familiale;
  const accidentTravail = brutMensuel * CNPS_RATES.accident_travail; // On full salary
  const pensionPatronale = basePlafonnee * CNPS_RATES.pension_employer;
  const totalCotisationsPatronales = prestationFamiliale + accidentTravail + pensionPatronale;

  // ================
  // IMPÔTS SALARIAUX (Employee Taxes)
  // ================
  // IRPP: Calculate on annual basis, then divide by 12
  const annualGross = brutMensuel * 12;
  const annualIRPP = calculateIRPP(annualGross);
  const monthlyIRPP = annualIRPP / 12;

  // Centimes additionnels: 10% of IRPP
  const centimes = monthlyIRPP * SALARY_TAX_RATES.centimes_additionnels;

  // TDL: Annual amount, divide by 12 for monthly
  const annualTDL = calculateTDL(brutMensuel);
  const monthlyTDL = annualTDL / 12;

  // RAV: Monthly
  const rav = calculateRAV(brutMensuel);

  // Crédit Foncier (Employee): 1% of gross
  const creditFoncierSalariale = brutMensuel * SALARY_TAX_RATES.credit_foncier_employee;

  const totalImpotsSalariaux = monthlyIRPP + centimes + monthlyTDL + rav + creditFoncierSalariale;

  // ================
  // IMPÔTS PATRONAUX (Employer Taxes)
  // ================
  const fne = brutMensuel * SALARY_TAX_RATES.fne;
  const creditFoncierPatronale = brutMensuel * SALARY_TAX_RATES.credit_foncier_employer;
  const totalImpotsPatronaux = fne + creditFoncierPatronale;

  // ================
  // TOTALS
  // ================
  const deductionsSalariales = totalCotisationsSalariales + totalImpotsSalariaux;
  const chargesPatronales = totalCotisationsPatronales + totalImpotsPatronaux;

  const netSalaire = brutMensuel - deductionsSalariales;
  const coutTotal = brutMensuel + chargesPatronales;

  return {
    brut: brutMensuel,
    basePlafonnee,

    cotisationsSalariales: {
      pension: pensionSalariale,
      total: totalCotisationsSalariales,
    },

    impotsSalariaux: {
      irpp: monthlyIRPP,
      centimes,
      tdl: monthlyTDL,
      rav,
      creditFoncier: creditFoncierSalariale,
      total: totalImpotsSalariaux,
    },

    cotisationsPatronales: {
      prestationFamiliale,
      accidentTravail,
      pension: pensionPatronale,
      total: totalCotisationsPatronales,
    },

    impotsPatronaux: {
      fne,
      creditFoncier: creditFoncierPatronale,
      total: totalImpotsPatronaux,
    },

    netSalaire,
    coutTotal,
    deductionsSalariales,
    chargesPatronales,
  };
}

// ============================================
// REVERSE SALARY CALCULATION (Net → Gross)
// Uses binary search to find gross that yields target net
// ============================================
export interface ReverseSalaireResult extends SalaireResult {
  targetNet: number;
  isEstimate: boolean;
  accuracy: number; // Difference between calculated net and target
  iterations: number;
}

export function calculateSalaireFromNet(targetNet: number): ReverseSalaireResult {
  const TOLERANCE = 100; // ±100 FCFA accuracy
  const MAX_ITERATIONS = 100;

  // Edge cases
  if (targetNet <= 0) {
    const result = calculateSalaire(0);
    return {
      ...result,
      targetNet: 0,
      isEstimate: false,
      accuracy: 0,
      iterations: 0,
    };
  }

  // Binary search: find gross G such that calculateSalaire(G).netSalaire ≈ targetNet
  let low = targetNet; // Minimum possible gross (net can't exceed gross)
  let high = targetNet * 3; // Upper bound (accounting for ~50%+ deductions max)
  let iterations = 0;
  let bestResult = calculateSalaire(targetNet);
  let bestAccuracy = Math.abs(bestResult.netSalaire - targetNet);

  while (iterations < MAX_ITERATIONS && high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    const result = calculateSalaire(mid);
    const computedNet = result.netSalaire;
    const accuracy = Math.abs(computedNet - targetNet);

    // Track best result
    if (accuracy < bestAccuracy) {
      bestResult = result;
      bestAccuracy = accuracy;
    }

    // Check if within tolerance
    if (accuracy <= TOLERANCE) {
      return {
        ...result,
        targetNet,
        isEstimate: true,
        accuracy,
        iterations: iterations + 1,
      };
    }

    // Adjust search range
    if (computedNet < targetNet) {
      low = mid;
    } else {
      high = mid;
    }

    iterations++;
  }

  // Return best approximation found
  return {
    ...bestResult,
    targetNet,
    isEstimate: true,
    accuracy: bestAccuracy,
    iterations,
  };
}

// ============================================
// UI DATA
// ============================================

export const simulatorsData = [
  {
    id: 'tva',
    title: { fr: 'Simulateur TVA', en: 'VAT Simulator' } as BilingualText,
    shortTitle: { fr: 'TVA', en: 'VAT' } as BilingualText,
    description: {
      fr: 'Calculez votre TVA collectée, déductible et nette. Gérez vos opérations de vente et d\'achat avec le taux standard de 19,25%.',
      en: 'Calculate your collected, deductible and net VAT. Manage your sales and purchase operations with the standard rate of 19.25%.',
    } as BilingualText,
    icon: 'percent',
    href: '/simulateurs/tva',
    color: 'teal',
    features: [
      { fr: 'TVA collectée sur ventes', en: 'VAT collected on sales' } as BilingualText,
      { fr: 'TVA déductible sur achats', en: 'Deductible VAT on purchases' } as BilingualText,
      { fr: 'Calcul du crédit TVA', en: 'VAT credit calculation' } as BilingualText,
      { fr: 'Conversion HT/TTC', en: 'Excl./Incl. tax conversion' } as BilingualText,
    ],
  },
  {
    id: 'is',
    title: { fr: 'Simulateur Impôt sur les Sociétés', en: 'Corporate Tax Simulator' } as BilingualText,
    shortTitle: { fr: 'IS', en: 'CIT' } as BilingualText,
    description: {
      fr: 'Estimez votre impôt sur les sociétés selon votre chiffre d\'affaires. Taux de 28,5% ou 33% selon le seuil de 3 milliards FCFA.',
      en: 'Estimate your corporate tax based on your turnover. Rate of 28.5% or 33% depending on the 3 billion FCFA threshold.',
    } as BilingualText,
    icon: 'building',
    href: '/simulateurs/is',
    color: 'gold',
    features: [
      { fr: 'Calcul automatique du taux', en: 'Automatic rate calculation' } as BilingualText,
      { fr: 'Seuil 3 milliards FCFA', en: '3 billion FCFA threshold' } as BilingualText,
      { fr: 'Estimation de l\'impôt', en: 'Tax estimation' } as BilingualText,
      { fr: 'Comparaison des taux', en: 'Rate comparison' } as BilingualText,
    ],
  },
  {
    id: 'salaire',
    title: { fr: 'Simulateur Impôt sur Salaire', en: 'Salary Tax Simulator' } as BilingualText,
    shortTitle: { fr: 'Salaire', en: 'Salary' } as BilingualText,
    description: {
      fr: 'Calculez le salaire net (salarié) et le coût total (employeur) incluant CNPS, IRPP, TDL, RAV et autres cotisations.',
      en: 'Calculate net salary (employee) and total cost (employer) including CNPS, IRPP, TDL, RAV and other contributions.',
    } as BilingualText,
    icon: 'users',
    href: '/simulateurs/salaire',
    color: 'beige',
    features: [
      { fr: 'Vue salarié et employeur', en: 'Employee and employer view' } as BilingualText,
      { fr: 'Cotisations CNPS', en: 'CNPS contributions' } as BilingualText,
      { fr: 'IRPP progressif', en: 'Progressive IRPP' } as BilingualText,
      { fr: 'TDL, RAV, Crédit Foncier', en: 'TDL, RAV, Land Credit' } as BilingualText,
    ],
  },
];

export const heroData = {
  badge: { fr: 'Outils Fiscaux', en: 'Tax Tools' } as BilingualText,
  title: { fr: 'Simulateurs Fiscaux', en: 'Tax Simulators' } as BilingualText,
  subtitle: { fr: 'Cameroun CGI 2024', en: 'Cameroon Tax Code 2024' } as BilingualText,
  description: {
    fr: 'Estimez vos impôts et cotisations en quelques clics. Calculs basés sur le Code Général des Impôts 2024 et les taux DGI/CNPS en vigueur.',
    en: 'Estimate your taxes and contributions in just a few clicks. Calculations based on the 2024 General Tax Code and current DGI/CNPS rates.',
  } as BilingualText,
  privacyNote: {
    fr: 'Calculs 100% locaux — Aucune donnée sauvegardée',
    en: '100% local calculations — No data saved',
  } as BilingualText,
  disclaimer: {
    fr: 'Ces simulateurs sont fournis à titre indicatif. Pour vos déclarations fiscales réelles, consultez un expert-comptable ou juriste.',
    en: 'These simulators are provided for informational purposes only. For your actual tax filings, consult an accountant or legal advisor.',
  } as BilingualText,
};

export const WHATSAPP_NUMBER = '237659810228';
export const WHATSAPP_MESSAGE_SIMULATEUR: BilingualText = {
  fr: 'Bonjour, j\'ai utilisé vos simulateurs fiscaux et j\'aimerais avoir l\'avis d\'un expert sur mes résultats.',
  en: 'Hello, I used your tax simulators and would like to get an expert\'s opinion on my results.',
};
