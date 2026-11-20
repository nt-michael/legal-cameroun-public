import { NextResponse } from 'next/server';
import { getOrder, updateOrder, addOrderNote, isTransactionIdUsed } from '@/lib/woocommerce';
import { uploadPrivateMedia } from '@/lib/wordpress';
import { createInvitee } from '@/lib/calendly';
import {
  ORANGE_MONEY_METHOD,
  SCREENSHOT_MAX_BYTES,
  isValidPaymentToken,
  normalizeTransactionId,
  isPlausibleTransactionId,
  normalizeCameroonPhone,
  detectScreenshotType,
  screenshotFilename,
} from '@/lib/orange-money';

type OrderMeta = Array<{ key: string; value: unknown }>;

// The customer has paid with Orange Money and gives at least one proof: the transaction ID
// from Orange's SMS, the paying phone number, or a screenshot. Each one is optional, but one
// is required, so an empty "I have paid" cannot hold a booking slot.
// Nothing is delivered here: the order goes "on-hold" (WooCommerce then emails the team and
// the customer), and the team validates it after finding the payment in the merchant account.
// A screenshot only helps the team find the payment; it is never proof on its own.
export async function POST(request: Request) {
  try {
    const form = await request.formData().catch(() => null);
    if (!form) {
      return NextResponse.json({ error: 'invalid_order' }, { status: 400 });
    }

    const orderId = Number(form.get('orderId'));
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json({ error: 'invalid_order' }, { status: 400 });
    }

    // Only the visitor who placed the order holds this token
    if (!isValidPaymentToken(orderId, form.get('token'))) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 403 });
    }

    // Transaction ID: optional, but checked when given
    const transactionId = normalizeTransactionId(form.get('transactionId'));
    if (transactionId && !isPlausibleTransactionId(transactionId)) {
      return NextResponse.json({ error: 'invalid_transaction' }, { status: 422 });
    }

    // Paying phone: optional, but checked when given
    const rawPhone = String(form.get('payerPhone') ?? '').trim();
    const payerPhone = rawPhone ? normalizeCameroonPhone(rawPhone) : null;
    if (rawPhone && !payerPhone) {
      return NextResponse.json({ error: 'invalid_phone' }, { status: 422 });
    }

    // Screenshot: optional, but must really be a JPEG, PNG or WebP image under the size limit
    const file = form.get('screenshot');
    let screenshot: { data: Buffer; contentType: string; extension: string } | null = null;
    if (file instanceof File && file.size > 0) {
      if (file.size > SCREENSHOT_MAX_BYTES) {
        return NextResponse.json({ error: 'screenshot_too_large' }, { status: 413 });
      }
      const data = Buffer.from(await file.arrayBuffer());
      const type = detectScreenshotType(data);
      if (!type) {
        return NextResponse.json({ error: 'invalid_screenshot' }, { status: 422 });
      }
      screenshot = { data, ...type };
    }

    if (!transactionId && !payerPhone && !screenshot) {
      return NextResponse.json({ error: 'missing_proof' }, { status: 422 });
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
    if (transactionId && (await isTransactionIdUsed(transactionId))) {
      return NextResponse.json({ error: 'transaction_used' }, { status: 409 });
    }

    // Upload before touching the order: if it fails, the customer can retry or give the
    // transaction ID instead, and the order is still pending.
    let screenshotUrl: string | undefined;
    if (screenshot) {
      try {
        const media = await uploadPrivateMedia({
          data: screenshot.data,
          filename: screenshotFilename(orderId, screenshot.extension),
          contentType: screenshot.contentType,
          title: `Capture paiement Orange Money, commande ${orderId}`,
        });
        screenshotUrl = media.url;
      } catch (uploadError) {
        console.error('Screenshot upload error:', uploadError);
        return NextResponse.json({ error: 'upload_failed' }, { status: 502 });
      }
    }

    await updateOrder(orderId, {
      status: 'on-hold',
      ...(transactionId ? { transaction_id: transactionId } : {}),
      meta_data: [
        ...(payerPhone ? [{ key: 'om_payer_phone', value: payerPhone }] : []),
        ...(screenshotUrl ? [{ key: 'om_screenshot_url', value: screenshotUrl }] : []),
        { key: 'om_declared_at', value: new Date().toISOString() },
      ],
    });

    const amount = Math.round(Number(order.total));
    const hasSlot = Boolean(findMeta(order.meta_data, 'calendly_start_time'));
    await addOrderNote(
      orderId,
      `Paiement Orange Money déclaré par le client, à vérifier dans l'espace marchand.\n` +
        `Montant attendu : ${amount} FCFA\n` +
        `Transaction : ${transactionId || 'non fournie'}\n` +
        `Téléphone payeur : ${payerPhone || 'non fourni'}\n` +
        `Capture : ${screenshotUrl || 'non fournie'}\n` +
        (screenshotUrl ? `Une capture se falsifie facilement : elle aide à retrouver le paiement, elle ne le prouve pas.\n` : '') +
        `Si le paiement est trouvé dans l'espace marchand : passer la commande en « Terminée ». Sinon : « Annulée »` +
        (hasSlot ? ' et annuler le rendez-vous dans Calendly.' : '.')
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
