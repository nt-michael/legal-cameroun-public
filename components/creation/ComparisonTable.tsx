'use client';

import { useInView } from 'react-intersection-observer';
import { ComparisonRow } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

interface ComparisonTableProps {
  headers: BilingualText[];
  rows: ComparisonRow[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
}

export default function ComparisonTable({ headers, rows, title, subtitle }: ComparisonTableProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {getText(title as BilingualText, language)}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getText(subtitle as BilingualText, language)}
              </p>
            )}
          </div>
        )}

        <div
          ref={ref}
          className={`overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 ${
            inView ? 'animate-fade-in opacity-100' : 'opacity-0'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-white font-semibold text-left ${
                        index === 0 ? 'w-1/3' : ''
                      }`}
                    >
                      {header[language]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-gray-100 dark:border-gray-700 ${
                      rowIndex % 2 === 0
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : 'bg-white dark:bg-gray-800'
                    } hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.aspect[language]}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="px-6 py-4 text-gray-600 dark:text-gray-300"
                      >
                        {value[language]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
