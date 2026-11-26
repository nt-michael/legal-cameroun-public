// Visitor's choice about audience-measurement cookies (Google Analytics), kept in this browser only

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'cookie_consent';
// Fired to reopen the banner, for example from the footer link
export const OPEN_SETTINGS_EVENT = 'open-cookie-settings';
// Fired after the choice is saved, so every component reading it updates
const CHANGE_EVENT = 'cookie-consent-change';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

// Fallback when the browser blocks localStorage (private mode): the choice then lasts until the page reloads
let choiceInMemory: ConsentChoice | null = null;

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : choiceInMemory;
  } catch {
    return choiceInMemory;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  choiceInMemory = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// For useSyncExternalStore: calls back when the choice changes in this tab or in another one
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

// True while Google Analytics is set up and the visitor has not answered yet
export function consentPending(): boolean {
  return GA_ID !== '' && readConsent() === null;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

// Removes the cookies Google Analytics set (_ga, _ga_XXXX) on this domain and its parent domain
export function deleteAnalyticsCookies(): void {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
}
