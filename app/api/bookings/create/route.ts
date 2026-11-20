import { NextResponse } from 'next/server';
import { createOrder, updateOrderStatus } from '@/lib/woocommerce';
import { ORANGE_MONEY_METHOD, paymentInstructions } from '@/lib/orange-money';
import { createInvitee } from '@/lib/calendly';
import { TERMS_OF_SALE_VERSION } from '@/lib/legal';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { consultationType, selectedDate, selectedTime, firstName, lastName, email, phone, message, slotStartTime, timezone, isFree } = body;

        // 1. Basic Validation
        if (!consultationType || !selectedDate || !selectedTime || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Consent to data processing is required (privacy policy, art. 2)
        if (body.consent !== true) {
            return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
        }

        // Paid consultations are a sale: the Terms of Sale must be accepted (CGV art. 2.5 and 4.1)
        if (!isFree && body.termsAccepted !== true) {
            return NextResponse.json({ error: 'Terms of Sale must be accepted' }, { status: 400 });
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
            { key: 'privacy_consent', value: 'yes' }, // proof of consent, kept with the order
            ...(isFree ? [] : [{ key: 'terms_of_sale_version', value: TERMS_OF_SALE_VERSION }]), // proof of CGV acceptance

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
            meta_data: orderMeta,
            ...(isFree ? {} : { payment_method: ORANGE_MONEY_METHOD }),
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

        // 3. Orange Money merchant payment: charge exactly the order total, which WooCommerce
        // computes from the "Consultation" product price (the price is managed in WooCommerce only).
        // The order stays "pending" until the customer declares the transaction; the Calendly
        // slot is booked at that moment (see /api/payments/orange-money/declare).
        const amount = Math.round(Number(order.total));
        if (!Number.isFinite(amount) || amount <= 0) {
            await updateOrderStatus(order.id, 'failed').catch(() => {});
            throw new Error('Invalid consultation price in WooCommerce');
        }

        return NextResponse.json({ payment: paymentInstructions(order.id, amount) });

    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
