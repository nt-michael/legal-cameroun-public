// Legal secretariat services (legal team audit, Nov 2026).
// Each card on /secretariat-juridique opens the contact form with ?besoin=<key>,
// which lib/contact-prefill.ts turns into a subject and a first line of message.

import type { BilingualText } from '@/lib/translations';

export interface SecretariatService {
  name: BilingualText;
  /** Value of the contact form subject list (lib/contact-data.ts) */
  subject: 'modification' | 'autre-juridique';
  /** File name in /public/custom-icons/SVG (official charter icons) */
  icon: string;
}

export const secretariatServices: Record<string, SecretariatService> = {
  statuts: {
    name: { fr: 'Rédaction des statuts', en: 'Drafting of articles of association' },
    subject: 'autre-juridique',
    icon: '6ICONE_BICHROME.svg',
  },
  assemblees: {
    name: {
      fr: 'Tenue des AGO, AGE ou assemblées générales mixtes',
      en: 'Ordinary, extraordinary or combined general meetings',
    },
    subject: 'autre-juridique',
    icon: '36ICONE_BICHROME.svg',
  },
  'transfert-siege': {
    name: { fr: 'Formalités de transfert de siège', en: 'Registered office transfer formalities' },
    subject: 'modification',
    icon: '32ICONE_BICHROME.svg',
  },
  contrats: {
    name: { fr: 'Rédaction de contrats', en: 'Contract drafting' },
    subject: 'autre-juridique',
    icon: '9ICONE_BICHROME.svg',
  },
  baux: {
    name: { fr: 'Rédaction de baux commerciaux', en: 'Commercial lease drafting' },
    subject: 'autre-juridique',
    icon: '27ICONE_BICHROME.svg',
  },
  capital: {
    name: {
      fr: 'Formalités d’augmentation et de diminution du capital',
      en: 'Share capital increase and reduction formalities',
    },
    subject: 'modification',
    icon: '10ICONE_BICHROME.svg',
  },
};
