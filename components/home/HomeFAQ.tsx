import FAQSection from '@/components/creation/FAQSection';
import {
  FAQItem,
  pricingTiers,
  associationPricingTiers,
  etablissementPricingTiers,
  PricingTier,
} from '@/lib/creation-data';

// Prices are read from the same lists as the pricing cards, so the answers stay in sync
function lowest(tiers: PricingTier[]): number {
  return Math.min(...tiers.map((tier) => tier.price));
}

const companyFr = new Intl.NumberFormat('fr-FR').format(lowest(pricingTiers));
const companyEn = new Intl.NumberFormat('en-US').format(lowest(pricingTiers));
const smallFr = new Intl.NumberFormat('fr-FR').format(
  Math.min(lowest(etablissementPricingTiers), lowest(associationPricingTiers))
);
const smallEn = new Intl.NumberFormat('en-US').format(
  Math.min(lowest(etablissementPricingTiers), lowest(associationPricingTiers))
);

const items: FAQItem[] = [
  {
    question: {
      fr: 'Combien coûte la création d\'une entreprise ?',
      en: 'How much does it cost to create a company?',
    },
    answer: {
      fr: `Une SAS, une SARL ou une SARLU coûte à partir de ${companyFr} FCFA HT, plus les frais administratifs. Un établissement commercial ou une association coûte à partir de ${smallFr} FCFA HT. Le prix exact dépend de la formule choisie.`,
      en: `A SAS, SARL or SARLU starts from XAF ${companyEn} excl. tax, plus administrative fees. A commercial establishment or an association starts from XAF ${smallEn} excl. tax. The exact price depends on the plan you choose.`,
    },
  },
  {
    question: {
      fr: 'Quel statut choisir pour mon projet ?',
      en: 'Which structure should I choose?',
    },
    answer: {
      fr: 'L\'établissement commercial convient pour tester un projet seul. La SAS offre plus de souplesse dans les statuts. La SARL donne un cadre plus encadré et rassurant. Notre comparateur vous aide à décider.',
      en: 'A commercial establishment suits testing a project alone. A SAS offers more flexibility in its articles. A SARL gives a more regulated and reassuring framework. Our comparison tool helps you decide.',
    },
  },
  {
    question: {
      fr: 'Combien de temps faut-il pour créer mon entreprise ?',
      en: 'How long does it take to create my company?',
    },
    answer: {
      fr: 'Avec l\'offre Premium et un dossier complet, nous engageons les formalités sous 48 heures. Le délai total dépend ensuite du traitement par les autorités compétentes.',
      en: 'With the Premium plan and a complete file, we start the formalities within 48 hours. The total time then depends on processing by the competent authorities.',
    },
  },
  {
    question: {
      fr: 'Le devis est-il gratuit ?',
      en: 'Is the quote free?',
    },
    answer: {
      fr: 'Oui. Le questionnaire en ligne et le devis sont gratuits. Un juriste vous envoie votre devis par e-mail sous 48h. Seule la consultation avec un expert est payante.',
      en: 'Yes. The online questionnaire and the quote are free. A lawyer emails you the quote within 48 hours. Only a consultation with an expert is paid.',
    },
  },
];

export default function HomeFAQ() {
  return (
    <FAQSection
      items={items}
      title={{ fr: 'Questions fréquentes', en: 'Frequently asked questions' }}
      subtitle={{
        fr: 'Les réponses aux questions que l\'on nous pose le plus souvent.',
        en: 'Answers to the questions we hear most often.',
      }}
    />
  );
}
