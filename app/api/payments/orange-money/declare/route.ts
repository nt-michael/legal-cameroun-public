import { NextResponse } from 'next/server';
import { getOrder, updateOrder, addOrderNote, isTransactionIdUsed } from '@/lib/woocommerce';
import { createInvitee } from '@/lib/calendly';
import {
  ORANGE_MONEY_METHOD,
  isValidPaymentToken,
  normalizeTransactionId,
  isPlausibleTransactionId,
  normalizeCameroonPhone,
} from '@/lib/orange-money';

type OrderMeta = Array<{ key: string; value: unknown }>;

// The customer has paid with Orange Money and types the transaction ID from Orange's SMS.
// Nothing is delivered here: the order goes "on-hold" (WooCommerce then emails the team and
// the customer), and the team validates it after finding the payment in the merchant account.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const orderId = Number(body?.orderId);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json({ error: 'invalid_order' }, { status: 400 });
    }

    // Only the visitor who placed the order holds this token
    if (!isValidPaymentToken(orderId, body?.token)) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 403 });
    }

    const transactionId = normalizeTransactionId(body?.transactionId);
    if (!isPlausibleTransactionId(transactionId)) {
      return NextResponse.json({ error: 'invalid_transaction' }, { status: 422 });
    }

    const payerPhone = normalizeCameroonPhone(body?.payerPhone);
    if (!payerPhone) {
      return NextResponse.json({ error: 'invalid_phone' }, { status: 422 });
    }

    const order = await getOrder(orderId);

    // One declaration per order, and only on orders paid by merchant code
    if (order.payment_method !== ORANGE_MONEY_METHOD.id) {
      return NextResponse.json({ error: 'invalid_order' }, { status: 400 });
    }
    if (order.status !== 'pending') {
      return NextResponse.json({ error: 'already_declared' }, { status: 409 });
    }

    // The same SMS cannot pay for two orders
    if (await isTransactionIdUsed(transactionId)) {
      return NextResponse.json({ error: 'transaction_used' }, { status: 409 });
    }

    await updateOrder(orderId, {
      status: 'on-hold',
      transaction_id: transactionId,
      meta_data: [
        { key: 'om_payer_phone', value: payerPhone },
        { key: 'om_declared_at', value: new Date().toISOString() },
      ],
    });

    const amount = Math.round(Number(order.total));
    await addOrderNote(
      orderId,
      `Paiement Orange Money déclaré par le client, à vérifier dans l'espace marchand.\n` +
        `Transaction : ${transactionId}\nTéléphone payeur : ${payerPhone}\nMontant attendu : ${amount} FCFA\n` +
        `Si les trois correspondent : passer la commande en « Terminée ». Sinon : « Annulée »` +
        (findMeta(order.meta_data, 'calendly_start_time') ? ' et annuler le rendez-vous dans Calendly.' : '.')
    ).catch((error) => console.error('Order note error:', error));

    // Consultation: the slot is booked now so nobody else takes it during the check.
    // If the payment is not found, the team cancels the order and the Calendly event.
    let bookingFailed = false;
    const slot = findMeta(order.meta_data, 'calendly_start_time');
    if (slot) {
      try {
        await createInvitee({
          email: order.billing.email,
          name: `${order.billing.first_name} ${order.billing.last_name}`,
          firstName: order.billing.first_name,
          lastName: order.billing.last_name,
          slot_start_time: slot,
          timezone: findMeta(order.meta_data, 'invitee_timezone') || 'Africa/Douala',
          answers: [
            { question: 'Type of consultation?', answer: findMeta(order.meta_data, 'consultation_type') || 'General' },
            {
              question: 'Please share anything that will help prepare for our meeting.',
              answer: findMeta(order.meta_data, 'client_message') || 'No message',
            },
          ],
        });
      } catch (calendlyError) {
        bookingFailed = true;
        console.error('Calendly booking error:', calendlyError);
        await addOrderNote(
          orderId,
          `Le rendez-vous n'a pas pu être créé dans Calendly : ${calendlyError instanceof Error ? calendlyError.message : 'erreur inconnue'}. ` +
            `Créneau demandé : ${slot}. À planifier à la main avec le client une fois le paiement vérifié.`
        ).catch((error) => console.error('Order note error:', error));
      }
    }

    return NextResponse.json({ success: true, booking_failed: bookingFailed });
  } catch (error) {
    console.error('Orange Money declaration error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

function findMeta(meta: OrderMeta | undefined, key: string): string | undefined {
  const value = meta?.find((item) => item.key === key)?.value;
  return typeof value === 'string' && value ? value : undefined;
}
