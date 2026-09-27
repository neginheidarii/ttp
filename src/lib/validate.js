// Shared by the browser and the API.
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
export const clean = (value, max = 500) => String(value ?? '').trim().slice(0, max);
