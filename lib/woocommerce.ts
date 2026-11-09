const WC_API_URL = process.env.WC_SITE_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

function getAuthHeader() {
    if (!CK || !CS) throw new Error('Missing WooCommerce Keys');
    return 'Basic ' + Buffer.from(`${CK}:${CS}`).toString('base64');
}

export async function createOrder(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    product_id: number;
    total?: string;
    meta_data: Array<{ key: string; value: string }>;
    /** Defaults to Notch Pay, the previous payment provider */
    payment_method?: { id: string; title: string };
}) {
    const headers = {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
    };

    const orderData = {
        payment_method: data.payment_method?.id ?? 'notch_pay',
        payment_method_title: data.payment_method?.title ?? 'Notch Pay',
        set_paid: false,
        billing: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
        },
        line_items: [
            {
                product_id: data.product_id,
                quantity: 1,
            }
        ],
        meta_data: data.meta_data,
    };

    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('WC Create Order Error:', errorText);
        throw new Error(`Failed to create WooCommerce order: ${response.statusText}`);
    }

    return response.json();
}

export async function getOrder(orderId: number) {
    const headers = { 'Authorization': getAuthHeader() };
    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch WooCommerce order');
    return response.json();
}

/** Current price of a product, as set in WooCommerce (single source of truth for paid services) */
export async function getProductPrice(productId: number): Promise<number> {
    const headers = { 'Authorization': getAuthHeader() };
    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/products/${productId}`, {
        headers,
        next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error('Failed to fetch WooCommerce product');
    const product = await response.json();
    const price = Number(product.price);
    if (!Number.isFinite(price) || price <= 0) throw new Error('Invalid WooCommerce product price');
    return price;
}

/** Private note on an order, visible to the team in the WooCommerce order screen */
export async function addOrderNote(orderId: number, note: string) {
    const headers = {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ note, customer_note: false }),
    });

    if (!response.ok) {
        throw new Error('Failed to add WooCommerce order note');
    }

    return response.json();
}

export async function getOrderDownloads(orderId: number) {
    const headers = { 'Authorization': getAuthHeader() };
    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}/downloads`, { headers });
    if (!response.ok) throw new Error('Failed to fetch order downloads');
    return response.json() as Promise<Array<{ name: string; download_url: string }>>;
}

export async function updateOrderStatus(orderId: number, status: 'processing' | 'completed' | 'failed' | 'cancelled') {
    const headers = {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update WooCommerce order status');
    }

    return response.json();
}

/** Changes several fields of an order at once (status, transaction ID, metadata...) */
export async function updateOrder(orderId: number, data: Record<string, unknown>) {
    const headers = {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update WooCommerce order');
    }

    return response.json();
}

/**
 * True when an order of the last `days` days already carries this payment transaction ID.
 * The REST API cannot filter on the transaction ID, so recent orders are read page by page:
 * fine for the current volume (a few orders a day).
 */
export async function isTransactionIdUsed(transactionId: string, days = 90): Promise<boolean> {
    const headers = { 'Authorization': getAuthHeader() };
    const after = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    for (let page = 1; page <= 10; page++) {
        const query = new URLSearchParams({
            after,
            per_page: '100',
            page: String(page),
            status: 'on-hold,processing,completed',
            _fields: 'id,transaction_id',
        });
        const response = await fetch(`${WC_API_URL}/wp-json/wc/v3/orders?${query}`, { headers, cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to list WooCommerce orders');
        const orders: Array<{ id: number; transaction_id?: string }> = await response.json();
        if (orders.some((order) => (order.transaction_id || '').replace(/\s+/g, '').toUpperCase() === transactionId)) {
            return true;
        }
        if (orders.length < 100) return false;
    }
    // More than 1 000 recent orders: stop here, the team still checks every payment by hand
    return false;
}
