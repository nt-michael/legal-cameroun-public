import crypto from 'crypto';

// Proof that the visitor asking for a pack's files is the one who bought it.
// The token is an HMAC of the order ID: only the server, which holds the secret,
// can produce it, so knowing (or guessing) an order number is not enough.

function getSecret(): string {
    const secret = process.env.DOWNLOAD_TOKEN_SECRET;
    if (!secret) throw new Error('DOWNLOAD_TOKEN_SECRET is not set');
    return secret;
}

export function createDownloadToken(orderId: number): string {
    return crypto.createHmac('sha256', getSecret()).update(`pack-download:${orderId}`).digest('hex');
}

export function isValidDownloadToken(orderId: number, token: string | null): boolean {
    if (!token) return false;
    const expected = createDownloadToken(orderId);
    const received = token.trim().toLowerCase();
    if (received.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}
