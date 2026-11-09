'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BilingualText } from '@/lib/translations';

/** What /api/bookings/create and /api/purchases/create return for an Orange Money payment */
export interface OrangeMoneyInstructions {
  order_id: number;
  amount: number;
  merchant_code: string;
  merchant_name: string;
  ussd: string;
  payment_token: string;
}

const text = {
  orderRef: { fr: 'Commande n°', en: 'Order no.' },
  amountLabel: { fr: 'Montant à payer', en: 'Amount to pay' },
  dialButton: { fr: 'Payer avec Orange Money', en: 'Pay with Orange Money' },
  dialHint: {
    fr: 'Ouvre votre téléphone avec le code déjà composé : appuyez sur « Appeler ».',
    en: 'Opens your phone with the code already typed: press "Call".',
  },
  otherDevice: {
    fr: 'Composez ce code depuis votre téléphone Orange',
    en: 'Dial this code from your Orange phone',
  },
  orDial: { fr: 'ou composez ce code', en: 'or dial this code' },
  step1Android: { fr: 'Appuyez sur le bouton, ou composez le code.', en: 'Press the button, or dial the code.' },
  step1: { fr: 'Composez le code ci-dessus.', en: 'Dial the code above.' },
  step2: { fr: 'Vérifiez que le bénéficiaire affiché est bien', en: 'Check that the payee shown is' },
  step3: { fr: 'Validez avec votre code PIN, sur votre téléphone uniquement.', en: 'Confirm with your PIN, on your phone only.' },
  step4: { fr: 'Gardez le SMS de confirmation d’Orange : il contient le numéro de transaction.', en: 'Keep Orange’s confirmation SMS: it contains the transaction ID.' },
  copy: { fr: 'Copier', en: 'Copy' },
  copied: { fr: 'Copié', en: 'Copied' },
  pinWarning: {
    fr: 'Legal Cameroun ne vous demandera jamais votre code PIN, ni par téléphone ni sur WhatsApp.',
    en: 'Legal Cameroun will never ask for your PIN, neither by phone nor on WhatsApp.',
  },
  declareTitle: { fr: 'Après le paiement', en: 'After paying' },
  transactionLabel: { fr: 'Numéro de transaction (dans le SMS Orange)', en: 'Transaction ID (in the Orange SMS)' },
  transactionHint: { fr: 'Recopiez-le tel quel, lettres et chiffres.', en: 'Copy it exactly, letters and digits.' },
  phoneLabel: { fr: 'Numéro Orange qui a payé', en: 'Orange number that paid' },
  phoneHint: { fr: 'Exemple : 6XX XX XX XX', en: 'Example: 6XX XX XX XX' },
  submit: { fr: 'J’ai payé, envoyer', en: 'I have paid, send' },
  sending: { fr: 'Envoi…', en: 'Sending…' },
  successTitle: { fr: 'Merci, paiement reçu pour vérification', en: 'Thank you, payment received for checking' },
  successText: {
    fr: 'Nous vérifions votre paiement sous 2h ouvrées (du lundi au vendredi, de 9h à 19h). Vous recevez une confirmation par e-mail. Un paiement fait le soir ou le week-end est confirmé le jour ouvré suivant, avant 11h.',
    en: 'We check your payment within 2 working hours (Monday to Friday, 9 AM to 7 PM). You will get a confirmation by email. A payment made in the evening or at the weekend is confirmed the next working day, before 11 AM.',
  },
} satisfies Record<string, BilingualText>;

const errorText: Record<string, BilingualText> = {
  invalid_transaction: {
    fr: 'Ce numéro de transaction ne semble pas valide. Vérifiez le SMS d’Orange.',
    en: 'This transaction ID does not look valid. Check Orange’s SMS.',
  },
  invalid_phone: { fr: 'Entrez un numéro camerounais à 9 chiffres, commençant par 6.', en: 'Enter a 9-digit Cameroonian number starting with 6.' },
  transaction_used: {
    fr: 'Ce numéro de transaction a déjà été utilisé pour une autre commande.',
    en: 'This transaction ID has already been used for another order.',
  },
  already_declared: {
    fr: 'Le paiement de cette commande a déjà été déclaré. Nous le vérifions.',
    en: 'The payment for this order has already been declared. We are checking it.',
  },
  default: {
    fr: 'Une erreur est survenue. Réessayez ou contactez-nous.',
    en: 'Something went wrong. Try again or contact us.',
  },
};

const formatter = new Intl.NumberFormat('fr-FR');

function CopyButton({ value, label }: { value: string; label: string }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {});
      }}
      className="shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-gray-800"
      aria-label={`${text.copy[language]} : ${label}`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {copied ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        )}
      </svg>
      <span className="hidden min-[400px]:inline">{copied ? text.copied[language] : text.copy[language]}</span>
    </button>
  );
}

export default function OrangeMoneyPayment({
  payment,
  successExtra,
}: {
  payment: OrangeMoneyInstructions;
  /** Shown under the success message (e.g. the link to the pack files) */
  successExtra?: ReactNode;
}) {
  const { language } = useLanguage();
  // The tel: link with # only works on Android; iPhones block it from web pages
  const isAndroid = useSyncExternalStore(
    () => () => {},
    () => /android/i.test(navigator.userAgent),
    () => false
  );

  const [transactionId, setTransactionId] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const telHref = `tel:${payment.ussd.replace(/#/g, '%23')}`;
  const amount = `${formatter.format(payment.amount)} FCFA`;

  const declare = async () => {
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/payments/orange-money/declare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: payment.order_id,
          token: payment.payment_token,
          transactionId,
          payerPhone,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((errorText[data.error] ?? errorText.default)[language]);
        return;
      }
      setDone(true);
    } catch {
      setError(errorText.default[language]);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-secondary-300 bg-secondary-50 dark:bg-gray-800 p-6 sm:p-8 text-center" role="status">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{text.successTitle[language]}</h3>
        <p className="text-gray-700 dark:text-gray-300">{text.successText[language]}</p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {text.orderRef[language]} {payment.order_id}
        </p>
        {successExtra}
      </div>
    );
  }

  return (
    <div>
      {/* The amount: the one figure the customer must find again on their phone */}
      <div className="rounded-2xl bg-secondary-50 dark:bg-gray-900 px-5 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{text.amountLabel[language]}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {text.orderRef[language]}&nbsp;{payment.order_id}
          </p>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{amount}</p>
      </div>

      <div className="mt-6">
        {isAndroid ? (
          <>
            <a href={telHref} className="btn-gold w-full justify-center text-lg">
              {text.dialButton[language]}
            </a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">{text.dialHint[language]}</p>
            <p className="mt-5 mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {text.orDial[language]}
            </p>
          </>
        ) : (
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{text.otherDevice[language]}</p>
        )}

        <div className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 dark:border-gray-700 pl-4 pr-1.5 py-1.5">
          <span className="min-w-0 text-base sm:text-xl font-bold tracking-wide text-gray-900 dark:text-white whitespace-nowrap">{payment.ussd}</span>
          <CopyButton value={payment.ussd} label={payment.ussd} />
        </div>
      </div>

      <ol className="mt-6 space-y-3">
        {[
          isAndroid ? text.step1Android[language] : text.step1[language],
          <>
            {text.step2[language]} <strong className="text-gray-900 dark:text-white">{payment.merchant_name}</strong>, {amount}.
          </>,
          text.step3[language],
          text.step4[language],
        ].map((step, index) => (
          <li key={index} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white" aria-hidden="true">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-5 flex gap-2 text-sm text-secondary-800 dark:text-secondary-200">
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {text.pinWarning[language]}
      </p>

      <form
        className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (!sending) declare();
        }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{text.declareTitle[language]}</h3>

        <label htmlFor="om-transaction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {text.transactionLabel[language]}
        </label>
        <p id="om-transaction-hint" className="text-xs text-gray-500 dark:text-gray-400 mb-1">{text.transactionHint[language]}</p>
        <input
          id="om-transaction"
          aria-describedby="om-transaction-hint"
          required
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={60}
          value={transactionId}
          onChange={(event) => setTransactionId(event.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 mb-4 uppercase tracking-wide text-gray-900 dark:text-white focus:border-secondary-400 focus:outline-none"
        />

        <label htmlFor="om-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {text.phoneLabel[language]}
        </label>
        <p id="om-phone-hint" className="text-xs text-gray-500 dark:text-gray-400 mb-1">{text.phoneHint[language]}</p>
        <input
          id="om-phone"
          aria-describedby="om-phone-hint"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          value={payerPhone}
          onChange={(event) => setPayerPhone(event.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 mb-4 text-gray-900 dark:text-white focus:border-secondary-400 focus:outline-none"
        />

        {error && (
          <p className="mb-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={sending} className="btn-gold w-full justify-center disabled:opacity-60">
          {sending ? text.sending[language] : text.submit[language]}
        </button>
      </form>
    </div>
  );
}
