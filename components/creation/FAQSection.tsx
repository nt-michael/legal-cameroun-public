'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FAQItem } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, Language, getText } from '@/lib/translations';

const sectionText = {
  moreQuestions: { fr: "Vous avez d'autres questions ?", en: 'Have more questions?' },
  contactExperts: { fr: 'Contactez nos experts', en: 'Contact our experts' },
};

interface FAQSectionProps {
  items: FAQItem[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
  inView,
  language,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
  language: Language;
}) {
  return (
    <div
      className={`border-b border-gray-200 dark:border-gray-700 ${
        inView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors pr-4">
          {item.question[language]}
        </span>
        <span
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-primary-600 text-white rotate-180'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.answer[language]}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ items, title, subtitle }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {getText(title, language)}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getText(subtitle, language)}
              </p>
            )}
          </div>
        )}

        <div ref={ref} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {items.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
              inView={inView}
              language={language}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {sectionText.moreQuestions[language]}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>{sectionText.contactExperts[language]}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
