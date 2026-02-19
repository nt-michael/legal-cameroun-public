import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email: string = typeof body.email === 'string' ? body.email.trim() : '';

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !listId || !serverPrefix) {
    console.error('Mailchimp environment variables are not configured');
    return NextResponse.json({ error: 'mailchimp_error' }, { status: 500 });
  }

  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${emailHash}`;
  const credentials = Buffer.from(`anystring:${apiKey}`).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Mailchimp API error:', errorData);
      return NextResponse.json({ error: 'mailchimp_error' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Mailchimp fetch error:', err);
    return NextResponse.json({ error: 'mailchimp_error' }, { status: 500 });
  }
}
