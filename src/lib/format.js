import { site } from '../content/site.js';

export function money(amount) {
  const whole = Number(amount) % 1 === 0;
  return new Intl.NumberFormat(site.locale, {
    style: 'currency',
    currency: site.currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2
  }).format(Number(amount) || 0);
}

// Date-only strings ('2026-09-10') are read as midday local time so they never shift a day.
const toDate = (iso) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00` : iso);

export const formatDate = (iso) =>
  toDate(iso).toLocaleDateString(site.locale, { day: 'numeric', month: 'long', year: 'numeric' });

export const formatTime = (iso) =>
  toDate(iso).toLocaleTimeString(site.locale, { hour: 'numeric', minute: '2-digit' });

export function dateParts(iso) {
  const d = toDate(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString(site.locale, { month: 'short' }),
    year: d.getFullYear()
  };
}

export function currencySymbol() {
  const part = new Intl.NumberFormat(site.locale, { style: 'currency', currency: site.currency.toUpperCase() })
    .formatToParts(0)
    .find((p) => p.type === 'currency');
  return part ? part.value : '$';
}
