'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText } from '@/lib/translations';
import { legalForms, startingTier } from '@/lib/creation-data';
import {
  modificationTypes,
  hubPricingTiers,
  transfertSiegeData,
  sasVersSarlData,
  sarlVersSasData,
  dissolutionData,
  GestionPricingTier,
} from '@/lib/modification-data';

type Pole = 'creation' | 'gestion' | 'accompagnement';

interface PriceRow {
  id: string;
  name: BilingualText;
  description: BilingualText;
  /** Amount in FCFA, or null when there is no fixed amount to show */
  price: number | null;
  priceLabel?: BilingualText;
  note?: BilingualText;
  detailHref?: string;
  ctaHref: string;
  ctaText: BilingualText;
}

const pageText = {
  badge: { fr: 'Tarifs', en: 'Pricing' },
  title: { fr: 'Nos tarifs', en: 'Our prices' },
  subtitle: {
    fr: 'Pas de surprises. Nous vous fournissons des devis clairs et détaillés avant toute intervention.',
    en: 'No surprises. We provide clear and detailed quotes before any work begins.',
  },
  from: { fr: 'À partir de', en: 'From' },
  details: { fr: 'Voir le détail', en: 'See details' },
  quote: { fr: 'Demander un devis', en: 'Request a quote' },
  free: { fr: 'Gratuit', en: 'Free' },
  ctaTitle: { fr: 'Vous ne savez pas quelle offre choisir ?', en: 'Not sure which plan to choose?' },
  ctaText: {
    fr: 'Répondez à quelques questions et recevez une proposition détaillée sous 48h.',
    en: 'Answer a few questions and receive a detailed proposal within 48 hours.',
  },
  ctaPrimary: { fr: 'Obtenir mon devis gratuit', en: 'Get my free quote' },
  ctaSecondary: { fr: 'Prendre rendez-vous', en: 'Book an appointment' },
};

const poles: Record<Pole, { title: BilingualText; subtitle: BilingualText; bar: string }> = {
  creation: {
    title: { fr: 'Création d\'entreprise', en: 'Company formation' },
    subtitle: { fr: 'Statuts, immatriculation au RCCM et formalités.', en: 'Articles, RCCM registration and formalities.' },
    bar: 'bg-section-creation',
  },
  gestion: {
    title: { fr: 'Modification d\'entreprise', en: 'Company amendments' },
    subtitle: { fr: 'Changements de statuts, transformation et fermeture.', en: 'Changes to articles, conversion and closure.' },
    bar: 'bg-section-gestion',
  },
  accompagnement: {
    title: { fr: 'Accompagnement', en: 'Support' },
    subtitle: { fr: 'Un expert répond à vos questions.', en: 'An expert answers your questions.' },
    bar: 'bg-section-accompagnement',
  },
};

// Modification prices are stored as display strings such as '150 000'
function lowestPrice(tiers: GestionPricingTier[]): number {
  return Math.min(...tiers.map((tier) => Number(tier.price.replace(/\s/g, ''))));
}

// Notes read 'XAF HT'; the amount on this page already ends with FCFA
function taxNote(tier: GestionPricingTier): BilingualText | undefined {
  if (!tier.priceNote) return undefined;
  return {
    fr: tier.priceNote.fr.replace(/^XAF\s+/, ''),
    en: tier.priceNote.en.replace(/^XAF\s+/, ''),
  };
}

// Each operation page keeps its own price list; the ?service= value matches lib/devis-data.ts
const operationPricing: Record<string, { tiers: GestionPricingTier[]; service: string }> = {
  'transfert-siege': { tiers: transfertSiegeData.pricingTiers, service: 'transfert-siege' },
  'sas-vers-sarl': { tiers: sasVersSarlData.pricingTiers, service: 'sas-sarl' },
  'sarl-vers-sas': { tiers: sarlVersSasData.pricingTiers, service: 'sarl-sas' },
  dissolution: { tiers: dissolutionData.pricingTiers, service: 'dissolution' },
};

const creationRows: PriceRow[] = legalForms.map((form) => {
  const tier = startingTier(form.id);
  // The devis wizard calls the commercial establishment 'etablissement'
  const devisType = form.id === 'individual' ? 'etablissement' : form.id;
  return {
    id: form.id,
    name: form.name,
    description: form.description,
    price: tier.price,
    note: tier.period,
    detailHref: form.href,
    ctaHref: `/devis?type=${devisType}`,
    ctaText: pageText.quote,
  };
});

const gestionRows: PriceRow[] = [
  ...modificationTypes.map((operation) => {
    const pricing = operationPricing[operation.id];
    return {
      id: operation.id,
      name: operation.name,
      description: operation.description,
      price: lowestPrice(pricing.tiers),
      note: taxNote(pricing.tiers[0]),
      detailHref: operation.href,
      ctaHref: `/devis?service=${pricing.service}`,
      ctaText: pageText.quote,
    };
  }),
  {
    id: 'modification',
    name: { fr: 'Autres modifications des statuts', en: 'Other amendments to the articles' },
    description: { fr: 'Dirigeant, capital, dénomination, objet social…', en: 'Director, share capital, company name, business purpose…' },
    price: lowestPrice(hubPricingTiers),
    note: taxNote(hubPricingTiers[0]),
    detailHref: '/modification-entreprise',
    ctaHref: '/devis?service=modification',
    ctaText: pageText.quote,
  },
];

function accompagnementRows(consultationPrice: number | null): PriceRow[] {
  return [
    {
      id: 'devis',
      name: { fr: 'Devis personnalisé', en: 'Personalized quote' },
      description: { fr: 'Sans engagement, réponse sous 48h.', en: 'No commitment, answer within 48h.' },
      price: null,
      priceLabel: pageText.free,
      ctaHref: '/devis',
      ctaText: pageText.ctaPrimary,
    },
    {
      id: 'consultation',
      name: { fr: 'Consultation avec un expert', en: 'Consultation with an expert' },
      description: { fr: 'Un juriste ou un expert-comptable étudie votre situation.', en: 'A lawyer or chartered accountant reviews your situation.' },
      price: consultationPrice,
      ctaHref: '/prendre-un-rendez-vous',
      ctaText: pageText.ctaSecondary,
    },
  ];
}

function PriceSection({ pole, rows }: { pole: Pole; rows: PriceRow[] }) {
  const { language } = useLanguage();
  const formatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');
  const { title, subtitle, bar } = poles[pole];

  return (
    <section aria-labelledby={`tarifs-${pole}`} className="mb-12 last:mb-0">
      <div className="flex items-start gap-3 mb-5">
        <span className={`mt-1.5 h-6 w-1.5 rounded-full shrink-0 ${bar}`} aria-hidden="true" />
        <div>
          <h2 id={`tarifs-${pole}`} className="text-2xl font-bold text-gray-900 dark:text-white">
            {title[language]}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{subtitle[language]}</p>
        </div>
      </div>

      <ul className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        {rows.map((row) => (
          <li key={row.id} className="p-5 sm:p-6 grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{row.name[language]}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{row.description[language]}</p>
            </div>

            <div className="md:text-right">
              {row.price !== null ? (
                <>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{pageText.from[language]}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {formatter.format(row.price)} FCFA
                  </p>
                  {row.note && <p className="text-xs text-gray-500 dark:text-gray-400">{row.note[language]}</p>}
                </>
              ) : (
                row.priceLabel && (
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{row.priceLabel[language]}</p>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:justify-end">
              {row.detailHref && (
                <Link href={row.detailHref} className="text-sm font-medium text-primary-600 dark:text-primary-300 hover:underline">
                  {pageText.details[language]}
                </Link>
              )}
              <Link href={row.ctaHref} className="btn-primary text-sm px-4 py-2 whitespace-nowrap">
                {row.ctaText[language]}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function TarifsPageContent({ consultationPrice }: { consultationPrice: number | null }) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section
        className="relative pt-28 pb-14 lg:pt-36 lg:pb-20"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-primary-300 text-sm font-medium mb-4">
            {pageText.badge[language]}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{pageText.title[language]}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{pageText.subtitle[language]}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <PriceSection pole="creation" rows={creationRows} />
        <PriceSection pole="gestion" rows={gestionRows} />
        <PriceSection pole="accompagnement" rows={accompagnementRows(consultationPrice)} />
      </div>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 sm:p-10 text-center bg-primary-900 dark:bg-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{pageText.ctaTitle[language]}</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">{pageText.ctaText[language]}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {pageText.ctaPrimary[language]}
              </Link>
              <Link href="/prendre-un-rendez-vous" className="btn-secondary border-white/30! text-white! hover:bg-white hover:text-gray-900">
                {pageText.ctaSecondary[language]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
