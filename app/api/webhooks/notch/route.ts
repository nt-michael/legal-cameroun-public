import { NextResponse } from 'next/server';
import { updateOrderStatus, addOrderNote } from '@/lib/woocommerce';
import { createInvitee } from '@/lib/calendly';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const signature = request.headers.get('x-notch-signature');
        const body = await request.text(); // Raw body: the signature is computed on these exact bytes

        // Reject any request not signed by Notch Pay (HMAC SHA-256 of the raw body with the webhook Hash Key)
        const hashKey = process.env.NOTCH_WEBHOOK_HASH;
        if (!hashKey) {
            console.error('Webhook Error: NOTCH_WEBHOOK_HASH is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }
        if (!isValidSignature(body, signature, hashKey)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const payload = JSON.parse(body);

        // Check event type
        if (payload.event !== 'payment.complete') {
            return NextResponse.json({ message: `Ignored: Event is ${payload.event}` });
        }

        // Check status
        if (payload.data.status !== 'complete') {
            return NextResponse.json({ message: `Ignored: Payment status is ${payload.data.status}` });
        }

        // Reference format: WC-{orderId}-{timestamp}
        // Use merchant_reference or trxref from data object
        const reference = payload.data.merchant_reference || payload.data.trxref;
        if (!reference) {
            return NextResponse.json({ message: 'Ignored: No reference found' });
        }

        const parts = reference.split('-');
        if (parts[0] !== 'WC') {
            return NextResponse.json({ message: 'Ignored: Not a WC order' });
        }

        const orderId = parseInt(parts[1]);

        // 1. Update WooCommerce Order
        // Fetch order first to get metadata? 
        // Optimization: We pass metadata via Notch? No, we likely need to fetch the WC order to get the 'calendly_start_time' etc.
        // BUT we didn't implement 'getOrder' in lib/woocommerce.ts.
        // I need to add that helper or implement here.

        // Fetch Order Details
        // Re-using fetch logic
        const WC_API_URL = process.env.WC_SITE_URL;
        const CK = process.env.WC_CONSUMER_KEY;
        const CS = process.env.WC_CONSUMER_SECRET;
        const auth = 'Basic ' + Buffer.from(`${CK}:${CS}`).toString('base64');

        const orderRes = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}`, {
            headers: { 'Authorization': auth }
        });

        if (!orderRes.ok) throw new Error('Failed to fetch order');
        const order = await orderRes.json();

        // Already handled (Notch Pay retries webhooks): do not book Calendly twice
        if (order.status === 'completed') {
            return NextResponse.json({ message: 'Ignored: Order already completed' });
        }

        // Update status to processing
        if (order.status !== 'processing') {
            await updateOrderStatus(orderId, 'processing');
        }

        // Pack purchase: just complete the order — WooCommerce emails the download link
        const meta = order.meta_data;
        const findMeta = (key: string) => meta.find((m: any) => m.key === key)?.value;

        if (findMeta('order_type') === 'pack_purchase') {
            await updateOrderStatus(orderId, 'completed');
            return NextResponse.json({ success: true });
        }

        // 2. Book Calendly (consultation orders only)

        const calendlyStartTime = findMeta('calendly_start_time'); // "YYYY-MM-DDTHH:mm:00"
        const inviteeTimezone = findMeta('invitee_timezone');
        const consultationType = findMeta('consultation_type');
        const clientMessage = findMeta('client_message');

        // Validate
        if (calendlyStartTime) {
            try {
                await createInvitee({
                    email: order.billing.email,
                    name: `${order.billing.first_name} ${order.billing.last_name}`,
                    firstName: order.billing.first_name,
                    lastName: order.billing.last_name,
                    slot_start_time: calendlyStartTime,
                    timezone: inviteeTimezone || 'Africa/Douala',
                    answers: [
                        { question: 'Type of consultation?', answer: consultationType || 'General' },
                        { question: 'Please share anything that will help prepare for our meeting.', answer: clientMessage || 'No message' }
                    ]
                });
            } catch (calendlyError) {
                // The client has paid: leave the order "processing" and tell the team why,
                // so the appointment can be scheduled by hand. Answer 200 so Notch Pay does not retry.
                console.error('Webhook Calendly Error:', calendlyError);
                await addOrderNote(
                    orderId,
                    `Paiement reçu, mais le rendez-vous n'a pas pu être créé dans Calendly : ${calendlyError instanceof Error ? calendlyError.message : 'erreur inconnue'}. ` +
                    `Créneau demandé : ${calendlyStartTime} (${inviteeTimezone || 'Africa/Douala'}). À planifier à la main avec le client.`
                ).catch((noteError) => console.error('Webhook Order Note Error:', noteError));
                return NextResponse.json({ success: false, message: 'Paid, but Calendly booking failed' });
            }

            await updateOrderStatus(orderId, 'completed');
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function isValidSignature(body: string, signature: string | null, hashKey: string): boolean {
    if (!signature) return false;
    const expected = crypto.createHmac('sha256', hashKey).update(body).digest('hex');
    const received = signature.trim().toLowerCase();
    if (received.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}
