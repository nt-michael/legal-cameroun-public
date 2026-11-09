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
  title: { fr: 'Payer avec Orange Money', en: 'Pay with Orange Money' },
  orderRef: { fr: 'Commande n°', en: 'Order no.' },
  amountLabel: { fr: 'Montant à payer', en: 'Amount to pay' },
  dialButton: { fr: 'Payer avec Orange Money', en: 'Pay with Orange Money' },
  dialHint: {
    fr: 'Ouvre votre téléphone avec le code déjà composé : appuyez sur « Appeler ».',
    en: 'Opens your phone with the code already typed: press "Call".',
  },
  otherDevice: {
    fr: 'Sur iPhone ou sur ordinateur, composez ce code depuis votre téléphone Orange :',
    en: 'On iPhone or on a computer, dial this code from your Orange phone:',
  },
  step1: { fr: 'Composez le code ci-dessous.', en: 'Dial the code below.' },
  step2: { fr: 'Vérifiez que le bénéficiaire affiché est bien', en: 'Check that the payee shown is' },
  step3: { fr: 'Validez avec votre code PIN, sur votre téléphone uniquement.', en: 'Confirm with your PIN, on your phone only.' },
  step4: { fr: 'Gardez le SMS de confirmation d’Orange : il contient le numéro de transaction.', en: 'Keep Orange’s confirmation SMS: it contains the transaction ID.' },
  merchantCode: { fr: 'Code marchand', en: 'Merchant code' },
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
      className="shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-secondary-400"
      aria-label={`${text.copy[language]} : ${label}`}
    >
      {copied ? text.copied[language] : text.copy[language]}
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
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{text.title[language]}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          {text.orderRef[language]} {payment.order_id}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">{text.amountLabel[language]}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{amount}</p>

        {isAndroid && (
          <div className="mb-6">
            <a href={telHref} className="btn-gold w-full justify-center text-lg">
              {text.dialButton[language]}
            </a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">{text.dialHint[language]}</p>
          </div>
        )}

        {!isAndroid && <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{text.otherDevice[language]}</p>}

        <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary-50 dark:bg-gray-900 px-4 py-3 mb-6">
          <code className="text-base sm:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{payment.ussd}</code>
          <CopyButton value={payment.ussd} label={payment.ussd} />
        </div>

        <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal pl-5">
          <li>{text.step1[language]}</li>
          <li>
            {text.step2[language]} <strong>{payment.merchant_name}</strong> ({text.merchantCode[language]} {payment.merchant_code}), {amount}.
          </li>
          <li>{text.step3[language]}</li>
          <li>{text.step4[language]}</li>
        </ol>

        <p className="mt-5 rounded-lg border border-secondary-300 bg-secondary-50 dark:bg-gray-900 px-4 py-3 text-sm font-medium text-secondary-800 dark:text-secondary-200">
          {text.pinWarning[language]}
        </p>
      </div>

      <form
        className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8"
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
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 mb-4 font-mono uppercase text-gray-900 dark:text-white"
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
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 mb-4 text-gray-900 dark:text-white"
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
