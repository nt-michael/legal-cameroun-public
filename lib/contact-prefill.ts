// Turns the links to the contact form (/contact?type=sarl&plan=premium, /contact?service=dissolution, ...)
// into a pre-selected subject and a first line of message, so the lawyer knows what the visitor clicked on.
// The query values are the same ones the detailed questionnaire (/devis) accepts.

import type { Language } from '@/lib/translations';
import { companyTypes, plans, modificationServices } from '@/lib/devis-data';
import { contactSubjects } from '@/lib/contact-data';

export interface ContactPrefill {
  subject: string;
  message: string;
  /** True when the visitor came from a "quote" button: the form is brought into view */
  focusForm: boolean;
}

type SearchParams = Record<string, string | string[] | undefined>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

export function contactPrefill(params: SearchParams, language: Language): ContactPrefill {
  const sujet = single(params.sujet);
  const type = single(params.type);
  const plan = single(params.plan);
  const service = single(params.service);

  const companyType = companyTypes.find((item) => item.value === type);
  const planLabel = Object.hasOwn(plans, plan) ? plans[plan][language] : '';
  const serviceLabel = Object.hasOwn(modificationServices, service) ? modificationServices[service][language] : '';

  // Subject: an explicit ?sujet= wins, then what the clicked offer implies
  let subject = contactSubjects.some((item) => item.value === sujet) ? sujet : '';
  if (!subject && serviceLabel) subject = service === 'dissolution' ? 'dissolution' : 'modification';
  if (!subject && (companyType || planLabel)) subject = 'creation';

  // First line of the message, in the page language, only with values we recognise
  const parts: string[] = [];
  if (serviceLabel) parts.push(serviceLabel);
  else if (companyType) parts.push(language === 'fr' ? `création ${companyType.label}` : `${companyType.label} formation`);
  if (planLabel) parts.push(language === 'fr' ? `formule ${planLabel}` : `${planLabel} plan`);
  const message = parts.length > 0 ? `${language === 'fr' ? 'Projet : ' : 'Project: '}${parts.join(', ')}.\n` : '';

  return { subject, message, focusForm: Boolean(sujet || type || plan || service) };
}
