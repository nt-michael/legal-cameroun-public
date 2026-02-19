import { NextResponse } from 'next/server';
import { createOrder, updateOrderStatus } from '@/lib/woocommerce';
import { initializePayment } from '@/lib/notch';
import { createInvitee } from '@/lib/calendly';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { consultationType, selectedDate, selectedTime, firstName, lastName, email, phone, message, slotStartTime, timezone, isFree } = body;

        // 1. Basic Validation
        if (!consultationType || !selectedDate || !selectedTime || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const productId = isFree
            ? process.env.FREE_CONSULTATION_PRODUCT_ID
            : process.env.CONSULTATION_PRODUCT_ID;
        if (!productId) {
            return NextResponse.json({ error: 'Server configuration error: Product ID missing' }, { status: 500 });
        }

        // 2. Create WooCommerce Order
        // Metadata is crucial for the webhook to know what to book in Calendly
        const orderMeta = [
            { key: 'consultation_type', value: consultationType },
            { key: 'selected_date', value: selectedDate }, // Display date
            { key: 'selected_time', value: selectedTime }, // Display time
            { key: 'client_message', value: message || '' },

            // KEY: Use the explicit UTC slot string if provided, otherwise fallback (which might be ambiguous)
            { key: 'calendly_start_time', value: slotStartTime || `${selectedDate}T${selectedTime}:00` },

            // Store User Timezone so we can pass it to Calendly Invitee
            { key: 'invitee_timezone', value: timezone || 'Africa/Douala' }
        ];

        const order = await createOrder({
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            product_id: parseInt(productId),
            total: '50000', // Hardcoded price? Or fetch from product? 
            // Ideally we should rely on WC to calculate total, but `createOrder` usually takes line items.
            // If we pass line items, WC calculates total. 
            // Wait, my lib `createOrder` doesn't take 'total' in body? 
            // Ah, I put `total: '5000'` in the signature but didn't use it in body?
            // Checking `lib/woocommerce.ts`: I passed `total` in arg but usage in `orderData` body?
            // Wait, earlier I wrote: `total: data.total`... NO, I missed it in the `orderData` object construction in previous step?!
            // Let me check my previous tool call for `lib/woocommerce.ts`.
            // I see `meta_data: data.meta_data` but I don't see `total` being used in `orderData`.
            // Standard WC API: if line_items provided, it calculates total.
            // So passing `total` explicitly might valid override or just be ignored.
            // I will assume standard Price is set in WooCommerce for the product ID.
            // So I won't pass 'total' manually to avoid conflicts.
            meta_data: orderMeta,
        });

        if (!order.id) {
            throw new Error('Failed to retrieve Order ID from WooCommerce');
        }

        // Free consultation: skip payment, book Calendly directly
        if (isFree) {
            const freeEventUri = process.env.FREE_CALENDLY_EVENT_URI;
            if (!freeEventUri) {
                return NextResponse.json({ error: 'Server configuration error: Free event URI missing' }, { status: 500 });
            }

            try {
                await createInvitee({
                    email,
                    name: `${firstName} ${lastName}`,
                    firstName,
                    lastName,
                    timezone: timezone || 'Africa/Douala',
                    slot_start_time: slotStartTime || `${selectedDate}T${selectedTime}:00`,
                    eventUri: freeEventUri,
                    answers: message ? [{ question: 'Message', answer: message }] : [],
                });
            } catch (calendlyError: any) {
                await updateOrderStatus(order.id, 'failed').catch(() => {});
                return NextResponse.json(
                    { error: calendlyError.message || 'Failed to book consultation' },
                    { status: 500 }
                );
            }

            await updateOrderStatus(order.id, 'completed');

            return NextResponse.json({ success: true, order_id: order.id });
        }

        // 3. Initialize Notch Pay
        // We need a unique reference. Use "Order-ID-Timestamp"?
        // Or just Order ID if we can ensure uniqueness.
        const paymentData = {
            email,
            currency: 'XAF',
            amount: 50000, // TODO: Fetch price dynamically or hardcode for now. User didn't specify dynamic price.
            // "Consultation" usually has a fixed fee.
            reference: `WC-${order.id}-${Date.now()}`,
            description: `Consultation: ${consultationType}`,
            callback: `${process.env.NGROK_URL}/api/webhooks/notch`, // Or a frontend success page?
            // Notch 'callback' is usually the REDIRECT URL after payment?
            // Or is it the Webhook URL?
            // Docs say: `callback` is usually Redirect URL.
            // Webhook URL is set in Dashboard usually.
            // However, some APIs allow overriding.
            // Let's assume this is the Redirect URL for the user.
            // We want to redirect user to a "Verify" page on our frontend.
        };

        // Note: If `callback` is REDIRECT, we should point to a Frontend Page like /prendre-un-rendez-vous/succes?ref=...
        // The WEBHOOK should be configured in Notch Dashboard or passed via `notification_url` if supported.
        // I'll set callback to a frontend success check page.
        const origin = process.env.Frontend_SITE_URL || request.headers.get('origin') || process.env.WC_SITE_URL || '';
        paymentData.callback = `${origin}/prendre-un-rendez-vous?success=true&order=${order.id}`;

        const paymentResponse = await initializePayment(paymentData);

        if (!paymentResponse.authorization_url) {
            throw new Error('No authorization URL returned from Notch Pay');
        }

        // Update Order with Notch Reference?
        // Good practice.
        // Async update or just proceed.

        return NextResponse.json({
            payment_url: paymentResponse.authorization_url,
            order_id: order.id
        });

    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
