import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/woocommerce';
import { initializePayment } from '@/lib/notch';
import { getPackBySlug } from '@/lib/packs-config';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { packSlug, firstName, lastName, email, phone } = body;

        if (!packSlug || !firstName || !lastName || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const pack = getPackBySlug(packSlug);
        if (!pack) {
            return NextResponse.json({ error: 'Invalid pack slug' }, { status: 400 });
        }

        const productId = process.env[pack.envKey];
        if (!productId) {
            return NextResponse.json(
                { error: `Server configuration error: product ID missing for ${packSlug}` },
                { status: 500 }
            );
        }

        const order = await createOrder({
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            product_id: parseInt(productId),
            total: String(pack.price),
            meta_data: [
                { key: 'order_type', value: 'pack_purchase' },
                { key: 'pack_slug', value: packSlug },
                { key: 'pack_name', value: pack.name.fr },
            ],
        });

        if (!order.id) {
            throw new Error('Failed to retrieve Order ID from WooCommerce');
        }

        const origin =
            process.env.Frontend_SITE_URL ||
            request.headers.get('origin') ||
            '';

        const paymentResponse = await initializePayment({
            email,
            currency: 'XAF',
            amount: pack.price,
            reference: `WC-${order.id}-${Date.now()}`,
            description: pack.name.fr,
            callback: `${origin}/fiches-pratiques?success=true&order=${order.id}`,
        });

        if (!paymentResponse.authorization_url) {
            throw new Error('No authorization URL returned from Notch Pay');
        }

        return NextResponse.json({
            payment_url: paymentResponse.authorization_url,
            order_id: order.id,
        });
    } catch (error: any) {
        console.error('Purchase Creation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
