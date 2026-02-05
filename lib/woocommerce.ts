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
    total: string;
    meta_data: Array<{ key: string; value: string }>;
}) {
    const headers = {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
    };

    const orderData = {
        payment_method: 'notch_pay',
        payment_method_title: 'Notch Pay',
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
