import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageHtmlSetter from "@/components/seo/LanguageHtmlSetter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal Cameroun | Cabinet d'Avocats - RODEC Conseils",
  description: "Cabinet d'avocats de premier plan au Cameroun, offrant des services juridiques de qualite superieure aux entreprises et aux particuliers. Expertise en droit des affaires, immobilier, fiscal et plus.",
  keywords: "avocat cameroun, cabinet d'avocats douala, droit des affaires cameroun, legal cameroun, rodec conseils",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
