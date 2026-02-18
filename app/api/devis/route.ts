import { NextResponse } from 'next/server';

const CF7_FORM_ID = process.env.WC_SITE_APP_CONTACT_FORM_7_DEVIS_FORM_ID;

// Fields sent as-is (frontend name === CF7 tag name, value passes through)
const TEXT_FIELDS = [
  'companyType',
  'timeline',
  'businessObject',
  'capital',
  'managerFirstName',
  'managerLastName',
  'managerId',
  'associatesCount',
  'headquarters',
  'city',
  'email',
  'phone',
  'additionalInfo',
];

// CF7 radio fields expect "Yes"/"No" (not true/false)
const BOOLEAN_RADIO_FIELDS = [
  'isNewBusiness',
  'hasNonAssociateManagers',
  'needsAccountant',
];

// CF7 checkbox: [checkbox additionalServices "Accountant" "Legal" "Domiciliation" "Other"]
// Frontend values → CF7 option values
const ADDITIONAL_SERVICES_MAP: Record<string, string> = {
  accountant: 'Accountant',
  legal: 'Legal',
  domiciliation: 'Domiciliation',
  trademark: 'Other',
  contracts: 'Other',
};

// Reverse map for CF7 validation errors
function buildCf7ToFrontendMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const field of TEXT_FIELDS) {
    map[field] = field;
  }
  for (const field of BOOLEAN_RADIO_FIELDS) {
    map[field] = field;
  }
  map['additionalServices'] = 'additionalServices';
  for (let i = 1; i <= 3; i++) {
    map[`nonAssociateManager${i}FirstName`] = `nonAssociateManagers`;
    map[`nonAssociateManager${i}LastName`] = `nonAssociateManagers`;
    map[`nonAssociateManager${i}Id`] = `nonAssociateManagers`;
  }
  return map;
}

const CF7_TO_FRONTEND = buildCf7ToFrontendMap();

export async function POST(request: Request) {
  try {
    const wpUrl = process.env.WC_SITE_URL;
    if (!wpUrl || !CF7_FORM_ID) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Server-side validation
    const validationErrors: Record<string, string> = {};
    if (!body.email?.trim()) validationErrors.email = 'Email is required';
    if (!body.phone?.trim()) validationErrors.phone = 'Phone is required';
    if (!body.companyType?.trim()) validationErrors.companyType = 'Company type is required';

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 422 }
      );
    }

    // Build CF7 FormData
    const cf7Form = new FormData();

    // Text fields: pass through as strings
    for (const field of TEXT_FIELDS) {
      const value = body[field];
      if (value === undefined || value === null) continue;
      cf7Form.append(field, String(value));
    }

    // Boolean radio fields: convert to "Yes"/"No"
    for (const field of BOOLEAN_RADIO_FIELDS) {
      const value = body[field];
      if (value === undefined || value === null) continue;
      cf7Form.append(field, value ? 'Yes' : 'No');
    }

    // Checkbox field: send each selected value separately with [] suffix
    const services = body.additionalServices;
    if (Array.isArray(services) && services.length > 0) {
      const cf7Values = [...new Set(
        services.map((s: string) => ADDITIONAL_SERVICES_MAP[s] || 'Other')
      )];
      for (const val of cf7Values) {
        cf7Form.append('additionalServices[]', val);
      }
    }

    // Flatten nonAssociateManagers into individual numbered fields
    const managers = body.nonAssociateManagers;
    if (Array.isArray(managers)) {
      for (let i = 0; i < Math.min(managers.length, 3); i++) {
        const m = managers[i];
        const idx = i + 1;
        if (m.firstName) cf7Form.append(`nonAssociateManager${idx}FirstName`, m.firstName);
        if (m.lastName) cf7Form.append(`nonAssociateManager${idx}LastName`, m.lastName);
        if (m.id) cf7Form.append(`nonAssociateManager${idx}Id`, m.id);
      }
    }

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
    console.error('Devis form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
