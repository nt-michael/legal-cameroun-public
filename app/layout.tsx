import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageHtmlSetter from "@/components/seo/LanguageHtmlSetter";

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
  title: "Legal Cameroun | Plateforme d'accompagnement juridique, comptable et fiscale - RODEC Conseils",
  description: "Plateforme d'accompagnement juridique, comptable et fiscale de premier choix au Cameroun, offrant des services de qualité supérieure aux entreprises et aux particuliers. Expertise en droit des affaires, immobilier, fiscal et plus.",
  keywords: "legaltech cameroun, accompagnement juridique douala, droit des affaires cameroun, legal cameroun, rodec conseils",
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com',
      'en': 'https://legalcameroun.com',
      'x-default': 'https://legalcameroun.com',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inriaSans.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LanguageHtmlSetter />
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
