import { NextResponse } from 'next/server';

const CF7_FORM_ID = process.env.WC_SITE_APP_CONTACT_FORM_7_ID; // '5d4003b';

const FIELD_MAP: Record<string, string> = {
  fullName: 'full-name',
  email: 'email',
  phone: 'phone-number',
  subject: 'subject',
  message: 'message',
  file: 'file',
};

const CF7_TO_FRONTEND: Record<string, string> = {
  'full-name': 'fullName',
  'email': 'email',
  'phone-number': 'phone',
  'subject': 'subject',
  'message': 'message',
  'file': 'file',
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: Request) {
  try {
    const wpUrl = process.env.WC_SITE_URL;
    if (!wpUrl) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const incoming = await request.formData();

    // Server-side validation
    const requiredFields = ['fullName', 'email', 'phone', 'subject', 'message'];
    const validationErrors: Record<string, string> = {};

    for (const field of requiredFields) {
      const value = incoming.get(field);
      if (!value || (typeof value === 'string' && !value.trim())) {
        validationErrors[field] = `${field} is required`;
      }
    }

    // Validate file if present
    const file = incoming.get('file') as File | null;
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        validationErrors.file = 'File must be less than 2MB';
      }
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        validationErrors.file = 'Only PDF files are accepted';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 422 }
      );
    }

    // Build CF7 FormData
    const cf7Form = new FormData();
    for (const [frontendKey, cf7Key] of Object.entries(FIELD_MAP)) {
      if (frontendKey === 'file') continue;
      const value = incoming.get(frontendKey);
      if (value) cf7Form.append(cf7Key, value);
    }

    if (file && file.size > 0) {
      cf7Form.append('file', file, file.name);
    }

    // append _wpcf7_unit_tag
    cf7Form.append('_wpcf7_unit_tag', `${CF7_FORM_ID}`);

    // POST to CF7
    const cf7Url = `${wpUrl}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;
    const cf7Response = await fetch(cf7Url, {
      method: 'POST',
      body: cf7Form,
    });

    const cf7Data = await cf7Response.json();

    if (cf7Data.status === 'mail_sent') {
      return NextResponse.json({ success: true });
    }

    if (cf7Data.status === 'validation_failed') {
      const errors: Record<string, string> = {};
      if (cf7Data.invalid_fields) {
        for (const field of cf7Data.invalid_fields) {
          const frontendKey = CF7_TO_FRONTEND[field.field] || field.field;
          errors[frontendKey] = field.message;
        }
      }
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // mail_failed or other
    return NextResponse.json(
      { success: false, message: cf7Data.message || 'Failed to send message' },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
