// Organisation details used across the site and by the API.
// TODO before launch: replace every value marked TODO.
export const site = {
  name: 'The TEACH Project',
  tagline: 'Connecting global resources to expand equitable education',
  email: 'hello@example.org', // TODO: your public contact inbox
  charityNumber: 'The TEACH Project Foundation is federally incorporated in Canada (Corporation No. 1648069-1).',
  currency: 'cad', // Stripe currency code, e.g. 'usd' or 'cad'
  locale: 'en-CA', // Controls number and date formatting, e.g. 'en-CA'
  social: {
    instagram: 'https://www.instagram.com/the.teach.project/',
    linkedin: 'https://www.linkedin.com/company/the-teach-project'
  },
  statSource: 'World Bank, UNESCO et al., State of Global Learning Poverty, 2022',
  donation: {
    amounts: [25, 50, 100, 250],
    defaultAmount: 50,
    min: 1,
    max: 25000
  }
};
