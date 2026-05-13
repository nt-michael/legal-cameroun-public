import { NextResponse } from 'next/server';
import { getOrder, getOrderDownloads } from '@/lib/woocommerce';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('order');

        if (!orderId || isNaN(parseInt(orderId))) {
            return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
        }

        const order = await getOrder(parseInt(orderId));

        if (order.status !== 'completed') {
            return NextResponse.json(
                { error: 'Order not yet completed' },
                { status: 403 }
            );
        }

        const orderType = order.meta_data?.find((m: any) => m.key === 'order_type')?.value;
        if (orderType !== 'pack_purchase') {
            return NextResponse.json({ error: 'Not a pack purchase order' }, { status: 400 });
        }

        const downloads = await getOrderDownloads(parseInt(orderId));

        return NextResponse.json({ downloads });
    } catch (error: any) {
        console.error('Downloads Fetch Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
