'use client';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP_NUMBER = '+237659810228';
const MESSAGES = {
  fr: "Bonjour, j'ai une question concernant vos services juridiques.",
  en: "Hello, I have a question about your legal services.",
};

export default function WhatsAppFAB() {
  const { language } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGES[language])}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30 transition-transform hover:scale-110"
    >
      <Image
        src="/custom-icons/SVG/52ICONE_bleue.svg"
        alt="WhatsApp"
        width={28}
        height={28}
        className="brightness-0 invert"
      />
    </a>
  );
}
