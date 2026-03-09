import Link from 'next/link';
import { WPPage } from '@/lib/wordpress';
import { sanitizeContent, formatDate } from '@/lib/wordpress-utils';

interface Props {
  page: WPPage;
  lang?: 'fr' | 'en';
}

export default function LegalPageContent({ page, lang = 'fr' }: Props) {
  const title = page.title.rendered;
  const content = sanitizeContent(page.content.rendered);
  const updatedAt = formatDate(page.modified, lang);

  const ui = lang === 'en'
    ? {
        home: 'Home',
        breadcrumbLabel: 'Breadcrumb',
        updatedLabel: 'Last updated:',
        ctaText: 'Questions? Our legal team is available to assist you.',
        ctaButton: 'Contact us',
      }
    : {
        home: 'Accueil',
        breadcrumbLabel: "Fil d'Ariane",
        updatedLabel: 'Dernière mise à jour :',
        ctaText: 'Des questions ? Notre équipe juridique est disponible pour vous accompagner.',
        ctaButton: 'Nous contacter',
      };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 pt-[130px] px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6" aria-label={ui.breadcrumbLabel}>
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  {ui.home}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-600">/</li>
              <li className="text-gray-300" aria-current="page"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </ol>
          </nav>

          <h1
            className="text-3xl md:text-4xl font-bold"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="mt-4 text-gray-400 text-sm">
            {ui.updatedLabel} {updatedAt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-700 prose-ul:space-y-1
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-700 prose-ol:space-y-1
              prose-a:text-primary-600 prose-a:underline hover:prose-a:text-primary-800
              prose-strong:font-semibold prose-strong:text-gray-900
              prose-table:w-full prose-table:border-collapse
              prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-gray-300
              prose-td:p-3 prose-td:border prose-td:border-gray-200
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            {ui.ctaText}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {ui.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
