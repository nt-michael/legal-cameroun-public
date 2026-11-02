import { NextResponse } from 'next/server';
import { plans, modificationServices } from '@/lib/devis-data';

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

// Questions that only make sense for a new company: not sent for a modification request
const CREATION_ONLY_FIELDS = new Set([
  'timeline',
  'businessObject',
  'capital',
  'managerFirstName',
  'managerLastName',
  'managerId',
  'associatesCount',
  'headquarters',
]);

// CF7 treats radio groups as always required: a modification answers "No" to these
const MODIFICATION_RADIO_DEFAULT = 'No';

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
  map['plan'] = 'plan';
  map['service'] = 'service';
  map['companyName'] = 'companyName';
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
    const isModification = body.isNewBusiness === false;

    // Server-side validation
    const validationErrors: Record<string, string> = {};
    if (!body.email?.trim()) validationErrors.email = 'Email is required';
    if (!body.phone?.trim()) validationErrors.phone = 'Phone is required';
    if (!body.companyType?.trim()) validationErrors.companyType = 'Company type is required';
    // Consent to data processing is required (privacy policy, art. 2)
    if (body.consent !== true) validationErrors.consent = 'Consent is required';
    if (isModification) {
      if (!Object.hasOwn(modificationServices, body.service)) validationErrors.service = 'Service is required';
      if (!body.companyName?.trim()) validationErrors.companyName = 'Company name is required';
    }

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
      if (isModification && CREATION_ONLY_FIELDS.has(field)) continue;
      const value = body[field];
      if (value === undefined || value === null) continue;
      cf7Form.append(field, String(value));
    }

    // Boolean radio fields: convert to "Yes"/"No"
    for (const field of BOOLEAN_RADIO_FIELDS) {
      if (isModification && field !== 'isNewBusiness') {
        cf7Form.append(field, MODIFICATION_RADIO_DEFAULT);
        continue;
      }
      const value = body[field];
      if (value === undefined || value === null) continue;
      cf7Form.append(field, value ? 'Yes' : 'No');
    }

    // Checkbox field: send each selected value separately with [] suffix
    const services = body.additionalServices;
    if (!isModification && Array.isArray(services) && services.length > 0) {
      const cf7Values = [...new Set(
        services.map((s: string) => ADDITIONAL_SERVICES_MAP[s] || 'Other')
      )];
      for (const val of cf7Values) {
        cf7Form.append('additionalServices[]', val);
      }
    }

    // Flatten nonAssociateManagers into individual numbered fields
    const managers = body.nonAssociateManagers;
    if (!isModification && Array.isArray(managers)) {
      for (let i = 0; i < Math.min(managers.length, 3); i++) {
        const m = managers[i];
        const idx = i + 1;
        if (m.firstName) cf7Form.append(`nonAssociateManager${idx}FirstName`, m.firstName);
        if (m.lastName) cf7Form.append(`nonAssociateManager${idx}LastName`, m.lastName);
        if (m.id) cf7Form.append(`nonAssociateManager${idx}Id`, m.id);
      }
    }

    // Choices made on the site before the form, sent as readable French labels for the team's email
    const planLabel = Object.hasOwn(plans, body.plan) ? plans[body.plan].fr : undefined;
    if (planLabel) cf7Form.append('plan', planLabel);
    if (isModification) {
      cf7Form.append('service', modificationServices[body.service].fr);
      cf7Form.append('companyName', String(body.companyName).trim());
    }

    // CF7 [acceptance consent] field (ignored by CF7 until the field is added to the form)
    cf7Form.append('consent', 'yes');

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
