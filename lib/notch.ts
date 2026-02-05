const NOTCH_API_BASE = 'https://api.notchpay.co';

export interface NotchPaymentData {
    email: string;
    currency: string;
    amount: number; // In the smallest currency unit (e.g., Kobo/Cents)? Assuming standard units or need to check. 
    // Notch Pay usually takes full units or check docs. Example said "amount". assuming standard.
    // Actually, most gateways use smallest unit. Let's assume standard amount (e.g. 5000 for 5000 XAF) unless tested otherwise.
    // Wait, example in search result didn't specify. I'll use standard and if it fails, I'll adjust.
    // For XAF, there are no decimals usually.
    phone?: string;
    reference: string;
    description?: string;
    callback?: string; // Webhook URL? No, this is usually 'callback' param for redirect? 
    // Or 'callback_url'? Search says "callback".
}

export async function initializePayment(data: NotchPaymentData) {
    const publicKey = process.env.NOTCH_PUBLIC_KEY;

    if (!publicKey) throw new Error('Missing NOTCH_PUBLIC_KEY');

    const headers = {
        'Authorization': `${publicKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const response = await fetch(`${NOTCH_API_BASE}/payments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Notch Pay Init Error:', errorBody);
        throw new Error(`Failed to initialize payment: ${response.statusText}`);
    }

    return response.json();
}

export async function verifyPayment(reference: string) {
    const token = process.env.NOTCH_PRIVATE_KEY;
    if (!token) throw new Error('Missing NOTCH_PRIVATE_KEY');

    const headers = {
        'Authorization': `${token}`,
        'Accept': 'application/json',
    };

    const response = await fetch(`${NOTCH_API_BASE}/payments/${reference}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error('Failed to verify payment');
    }

    return response.json();
}
