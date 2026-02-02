import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import SalaireSimulator from '@/components/simulateurs/SalaireSimulator';

export const metadata: Metadata = {
  title: 'Simulateur Salaire Cameroun | CNPS, IRPP, TDL, RAV - Legal Cameroun',
  description: 'Calculez le salaire net (salarié) et le coût total (employeur) au Cameroun. Cotisations CNPS, IRPP, TDL, RAV, FNE selon CGI 2024.',
  keywords: ['salaire net Cameroun', 'CNPS', 'IRPP', 'TDL', 'RAV', 'charges patronales', 'coût employeur'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/simulateurs/salaire',
      'en': 'https://legalcameroun.com/simulateurs/salaire',
      'x-default': 'https://legalcameroun.com/simulateurs/salaire',
    },
  },
};

export default function SalairePage() {
  return (
    <SimulateurPageTemplate
      title={{ fr: "Simulateur Impôt sur Salaire", en: "Salary Tax Simulator" }}
      shortTitle={{ fr: "Salaire", en: "Salary" }}
      description={{ fr: "Calculez le salaire net à percevoir et le coût total employeur incluant toutes les cotisations et impôts.", en: "Calculate the net salary to receive and the total employer cost including all contributions and taxes." }}
    >
      <SalaireSimulator />
    </SimulateurPageTemplate>
  );
}
