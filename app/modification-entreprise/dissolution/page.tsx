import { Metadata } from 'next';
import DissolutionContent from './DissolutionContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/modification-entreprise/dissolution', {
    fr: {
      title: "Dissolution d'Entreprise au Cameroun | Fermer sa Société",
      description: "Dissolvez votre entreprise au Cameroun proprement et en toute légalité. Dissolution et liquidation amiable guidées de A à Z. Clôture des obligations fiscales et sociales incluse.",
      keywords: ['dissolution entreprise cameroun', 'fermer société cameroun', 'liquidation amiable', 'radiation RCCM cameroun', 'clôture entreprise'],
      openGraph: {
        title: "Dissolution d'Entreprise au Cameroun | Fermer sa Société",
        description: "Dissolvez votre entreprise au Cameroun proprement et en toute légalité. Dissolution et liquidation amiable guidées de A à Z. Clôture des obligations fiscales et sociales incluse.",
        type: 'website',
        url: 'https://legalcameroun.com/modification-entreprise/dissolution',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Dissolution d'Entreprise au Cameroun | Fermer sa Société",
        description: "Dissolvez votre entreprise au Cameroun proprement et en toute légalité. Dissolution et liquidation amiable guidées de A à Z. Clôture des obligations fiscales et sociales incluse.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/modification-entreprise/dissolution',
          'en': 'https://legalcameroun.com/modification-entreprise/dissolution',
          'x-default': 'https://legalcameroun.com/modification-entreprise/dissolution',
        },
      },
    },
    en: {
      title: 'Company Dissolution in Cameroon | Legal Cameroun',
      description: 'Dissolve your company legally in Cameroon. Our experts guide you through the process.',
      keywords: ['company dissolution cameroon', 'close company cameroon', 'voluntary liquidation', 'RCCM deregistration cameroon', 'company closure'],
      openGraph: {
        title: 'Company Dissolution in Cameroon | Legal Cameroun',
        description: 'Dissolve your company legally in Cameroon. Our experts guide you through the process.',
        type: 'website',
        url: 'https://legalcameroun.com/modification-entreprise/dissolution',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Company Dissolution in Cameroon | Legal Cameroun',
        description: 'Dissolve your company legally in Cameroon. Our experts guide you through the process.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/modification-entreprise/dissolution',
          'en': 'https://legalcameroun.com/modification-entreprise/dissolution',
          'x-default': 'https://legalcameroun.com/modification-entreprise/dissolution',
        },
      },
    },
  });
}

export default function DissolutionPage() {
  return <DissolutionContent />;
}
