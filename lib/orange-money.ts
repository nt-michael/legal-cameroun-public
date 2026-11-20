import crypto from 'crypto';

// Orange Money merchant payment (no aggregator): the customer pays RODEC's merchant
// account from their phone, then types the transaction ID from Orange's SMS on the site.
// The team checks the Orange merchant account and validates the order in WooCommerce.
// Server only: the amount and the merchant code always come from here, never from the browser.

/** RODEC's Orange Money merchant code, shown to customers. Override with ORANGE_MONEY_MERCHANT_CODE. */
export const ORANGE_MONEY_MERCHANT_CODE = process.env.ORANGE_MONEY_MERCHANT_CODE || '884659';

/** Name Orange shows on the confirmation screen; the customer checks it before typing their PIN */
export const ORANGE_MONEY_MERCHANT_NAME = 'RODEC';

export const ORANGE_MONEY_METHOD = {
  id: 'orange_money_merchant',
  title: 'Orange Money (code marchand)',
};

/** USSD shortcut tested on a real phone: opens the payment to RODEC with the amount already filled in */
export function ussdCode(amount: number): string {
  return `#150*47*${ORANGE_MONEY_MERCHANT_CODE}*${Math.round(amount)}#`;
}

/** What the browser and the phone need to show the payment step */
export function paymentInstructions(orderId: number, amount: number) {
  return {
    order_id: orderId,
    amount: Math.round(amount),
    merchant_code: ORANGE_MONEY_MERCHANT_CODE,
    merchant_name: ORANGE_MONEY_MERCHANT_NAME,
    ussd: ussdCode(amount),
    payment_token: createPaymentToken(orderId),
  };
}

// ─── Proof that the visitor declaring a payment is the one who placed the order ───
// Same idea as the pack download token: an HMAC of the order ID, so a guessed
// order number is not enough to attach a transaction to someone else's order.

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) throw new Error('DOWNLOAD_TOKEN_SECRET is not set');
  return secret;
}

export function createPaymentToken(orderId: number): string {
  return crypto.createHmac('sha256', getSecret()).update(`om-declare:${orderId}`).digest('hex');
}

export function isValidPaymentToken(orderId: number, token: unknown): boolean {
  if (typeof token !== 'string' || !token) return false;
  const expected = createPaymentToken(orderId);
  const received = token.trim().toLowerCase();
  if (received.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

// ─── Customer input ───

/** Transaction IDs are compared without spaces and case, as people retype them from an SMS */
export function normalizeTransactionId(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\s+/g, '').toUpperCase() : '';
}

/**
 * Loose check only (letters, digits, dots and dashes, 6 to 40 characters): it stops typos and junk,
 * not fraud. The real check is the team finding this exact transaction in the merchant account.
 */
export function isPlausibleTransactionId(value: string): boolean {
  return /^[A-Z0-9][A-Z0-9.\-]{5,39}$/.test(value);
}

// ─── Payment screenshot ───

/** Vercel refuses request bodies above 4.5 MB; the browser shrinks bigger images before sending */
export const SCREENSHOT_MAX_BYTES = 4 * 1024 * 1024;

/**
 * Image type read from the file's first bytes, not from its name or the browser's claim.
 * Returns null for anything that is not a JPEG, PNG or WebP image.
 */
export function detectScreenshotType(data: Buffer): { contentType: string; extension: string } | null {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return { contentType: 'image/jpeg', extension: 'jpg' };
  }
  if (data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { contentType: 'image/png', extension: 'png' };
  }
  if (data.length >= 12 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') {
    return { contentType: 'image/webp', extension: 'webp' };
  }
  return null;
}

/** Random file name: the media URL is public, so it must not be guessable from the order number */
export function screenshotFilename(orderId: number, extension: string): string {
  return `paiement-om-${orderId}-${crypto.randomBytes(16).toString('hex')}.${extension}`;
}

/** Cameroon mobile number, with or without +237 / 237 */
export function normalizeCameroonPhone(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const digits = value.replace(/[^\d]/g, '').replace(/^(00)?237/, '');
  return /^6\d{8}$/.test(digits) ? digits : null;
}
