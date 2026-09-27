// Organisation details used across the site and by the API.
// TODO before launch: replace every value marked TODO.
export const site = {
  name: 'The TEACH Project',
  tagline: 'Training & Education for All Children',
  email: 'hello@example.org', // TODO: your public contact inbox
  charityNumber: '[Registered charity number]', // TODO
  currency: 'usd', // Stripe currency code, e.g. 'usd' or 'cad'
  locale: 'en-US', // Controls number and date formatting, e.g. 'en-CA'
  social: {
    instagram: 'https://www.instagram.com/', // TODO
    linkedin: 'https://www.linkedin.com/', // TODO
    youtube: 'https://www.youtube.com/' // TODO
  },
  statSource: 'World Bank, UNESCO et al., State of Global Learning Poverty, 2022',
  donation: {
    amounts: [25, 50, 100, 250],
    defaultAmount: 50,
    min: 1,
    max: 25000
  }
};
