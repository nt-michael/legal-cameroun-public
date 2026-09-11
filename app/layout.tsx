import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/common/WhatsAppFAB";
import NewsletterModal from "@/components/common/NewsletterModal";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageHtmlSetter from "@/components/seo/LanguageHtmlSetter";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next";
import { getRequestLanguage } from "@/lib/lang";
import { SITE_URL } from "@/lib/site-config";

const inriaSans = localFont({
  src: [
    { path: '../public/fonts/inria_sans/InriaSans-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/inria_sans/InriaSans-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '../public/fonts/inria_sans/InriaSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/inria_sans/InriaSans-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/inria_sans/InriaSans-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/inria_sans/InriaSans-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-inria-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Legal Cameroun | Accompagnement Juridique, Comptable et Fiscal",
  description: "Plateforme d'accompagnement juridique, comptable et fiscal au Cameroun. Création d'entreprise, modification de statuts, conseil fiscal, expertise comptable. Réponse sous 48h.",
  keywords: "legaltech cameroun, accompagnement juridique douala, droit des affaires cameroun, création entreprise cameroun, conseil fiscal cameroun",
  openGraph: {
    siteName: 'Legal Cameroun',
    locale: 'fr_CM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getRequestLanguage();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inriaSans.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LanguageHtmlSetter />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFAB />
            <NewsletterModal />
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
