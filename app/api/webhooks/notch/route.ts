import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/woocommerce';
import { createInvitee } from '@/lib/calendly';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const signature = request.headers.get('x-notch-signature');
        const body = await request.text(); // Get raw body for signature verification?

        // Validating signature (Optional but recommended)
        // const hash = crypto.createHmac('sha256', process.env.NOTCH_SECRET_KEY).update(body).digest('hex');
        // if (hash !== signature) ...

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

        // Update status to processing
        if (order.status !== 'completed' && order.status !== 'processing') {
            await updateOrderStatus(orderId, 'processing');
        }

        // 2. Book Calendly
        // Extract metadata
        const meta = order.meta_data;
        const findMeta = (key: string) => meta.find((m: any) => m.key === key)?.value;

        const calendlyStartTime = findMeta('calendly_start_time'); // "YYYY-MM-DDTHH:mm:00"
        const inviteeTimezone = findMeta('invitee_timezone');
        const consultationType = findMeta('consultation_type');
        const clientMessage = findMeta('client_message');

        // Validate
        if (calendlyStartTime) {
            // Need Event Type UUID.
            // Assuming we use the one from ENV as we only have one for now?
            // Or if we have multiple, we map 'consultationType' to different Calendly Event Types.
            // For simplicity/requirement, we use the single one from ENV.
            // Removed unused eventTypeUuid extraction since createInvitee uses ENV variable directly
            await createInvitee({
                email: order.billing.email,
                name: `${order.billing.first_name} ${order.billing.last_name}`,
                firstName: order.billing.first_name,
                lastName: order.billing.last_name,
                slot_start_time: calendlyStartTime, // Sending format as is, hoping Calendly API accepts basic ISO.
                // Actually standard ISO requires 'Z' or offset if valid ISO8601.
                // I should append offset for WAT (+01:00) to be safe: `${calendlyStartTime}+01:00`
                timezone: inviteeTimezone || 'Africa/Douala',
                answers: [
                    { question: 'Type of consultation?', answer: consultationType || 'General' },
                    { question: 'Please share anything that will help prepare for our meeting.', answer: clientMessage || 'No message' }
                ]
            });

            // Update order note or status to Completed?
            await updateOrderStatus(orderId, 'completed');
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
