import { SITE_URL, absoluteUrl, DEFAULT_SHARE_IMAGE } from '@/lib/site-config';

// Structured data: a short, invisible description of the firm that Google reads
// (name, address, phone, hours, social accounts). It can show up in search results
// and in the Google knowledge panel. Keep it in line with the footer and the contact page.
export default function OrganizationJsonLd({ lang }: { lang: 'fr' | 'en' }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Legal Cameroun',
    url: absoluteUrl('/', lang),
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}${DEFAULT_SHARE_IMAGE.url}`,
    description:
      lang === 'en'
        ? 'Legal, accounting and tax support for businesses in Cameroon: company formation, amendments and dissolution.'
        : "Accompagnement juridique, comptable et fiscal des entreprises au Cameroun : création, modification et dissolution d'entreprise.",
    telephone: '+237659810228',
    email: 'contact@legalcameroun.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Immeuble Elite Offices, Rue Dubois de Saligny, 5e étage',
      addressLocality: 'Douala',
      addressRegion: 'Littoral',
      addressCountry: 'CM',
    },
    areaServed: { '@type': 'Country', name: 'Cameroun' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    priceRange: 'FCFA',
    parentOrganization: { '@type': 'Organization', name: 'RODEC Conseils' },
    sameAs: ['https://www.linkedin.com/company/legal-cameroun/'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
