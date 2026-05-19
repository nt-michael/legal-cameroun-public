'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PACKS, Pack } from '@/lib/packs-config';
import { useLanguage } from '@/contexts/LanguageContext';
import PackCard from './PackCard';
import PurchaseStepper from './PurchaseStepper';

interface Download {
  name: string;
  download_url: string;
}

export default function PacksSection() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingDownloads, setLoadingDownloads] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  // Capture initial URL params during first render, before replaceState clears them.
  // Using a ref avoids re-triggering the effect when the URL changes.
  const initParams = useRef<{ success: string | null; orderId: string | null } | null>(null);
  if (initParams.current === null) {
    initParams.current = {
      success: searchParams?.get('success') ?? null,
      orderId: searchParams?.get('order') ?? null,
    };
  }

  useEffect(() => {
    const { success, orderId } = initParams.current!;
    if (success !== 'true' || !orderId) return;

    setShowSuccess(true);
    setLoadingDownloads(true);
    window.history.replaceState(null, '', window.location.pathname);

    // Delay fetch to allow the NotchPay webhook to complete the WooCommerce order
    const timer = setTimeout(() => {
      fetch(`/api/purchases/downloads?order=${orderId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Order not ready');
          return res.json();
        })
        .then((data) => {
          if (data.downloads?.length > 0) {
            setDownloads(data.downloads);
            const dl = data.downloads[0];
            const a = document.createElement('a');
            a.href = dl.download_url;
            a.download = dl.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            setDownloadError(true);
          }
        })
        .catch(() => setDownloadError(true))
        .finally(() => setLoadingDownloads(false));
    }, 8000);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {language === 'fr' ? 'Ressources Premium' : 'Premium Resources'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'fr'
              ? 'Packs de documents prêts à l\'emploi'
              : 'Ready-to-use document packs'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Des modèles juridiques et administratifs vérifiés par nos experts, téléchargeables immédiatement après paiement.'
              : 'Legal and administrative templates verified by our experts, downloadable immediately after payment.'}
          </p>
        </div>

        {/* Pack grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PACKS.map((pack) => (
            <PackCard key={pack.slug} pack={pack} onBuy={() => setSelectedPack(pack)} />
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          {[
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: { fr: 'Documents vérifiés par des experts', en: 'Expert-verified documents' } },
            { icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', label: { fr: 'Téléchargement immédiat', en: 'Immediate download' } },
            { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: { fr: 'Paiement sécurisé Notch Pay', en: 'Secure payment via Notch Pay' } },
          ].map(({ icon, label }) => (
            <div key={label.fr} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span>{label[language]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase stepper modal */}
      {selectedPack && (
        <PurchaseStepper pack={selectedPack} onClose={() => setSelectedPack(null)} />
      )}

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {language === 'fr' ? 'Paiement réussi !' : 'Payment successful!'}
            </h3>

            {loadingDownloads ? (
              <div className="text-center py-6">
                <svg className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {language === 'fr' ? 'Préparation de votre document...' : 'Preparing your document...'}
                </p>
              </div>
            ) : downloadError ? (
              <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl text-sm text-amber-800 dark:text-amber-300 text-center leading-relaxed">
                {language === 'fr'
                  ? 'Vérifiez votre boîte email. Si vous avez été débité sans recevoir votre document, contactez Legal Cameroun avec votre preuve de paiement et vous serez servi.'
                  : 'Check your email inbox. If you were debited but didn\'t receive your document, contact Legal Cameroun with proof of payment and you\'ll be served.'}
              </div>
            ) : downloads.length > 0 ? (
              <div className="my-6 space-y-2">
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4">
                  {language === 'fr'
                    ? 'Votre téléchargement a démarré. Si ce n\'est pas le cas, utilisez le lien ci-dessous.'
                    : 'Your download has started. If not, use the link below.'}
                </p>
                {downloads.map((dl, i) => (
                  <a
                    key={i}
                    href={dl.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-xl transition-colors group"
                  >
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300 group-hover:underline flex-1 truncate">
                      {dl.name}
                    </span>
                  </a>
                ))}
              </div>
            ) : null}

            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {language === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
