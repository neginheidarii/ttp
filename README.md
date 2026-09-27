# The TEACH Project website

A React site for The TEACH Project (Training & Education for All Children): a scroll-told home page,
events with ticket sales, projects with a map, donations (one-time and monthly), a volunteer form,
a blog and newsletter sign-up.

Built with Vite, React 18 and React Router. The forms and payments run on small serverless functions
in `/api`, ready for Vercel.

## Run it locally

You need Node.js 18 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:5173. The functions in `/api` run inside the dev server, so everything works
locally without extra tools.

## Demo mode

With no keys in `.env.local`, the whole site still works end to end, but nothing is charged, saved
or sent. Each form finishes with a clear "not connected yet" message instead. Add keys one service
at a time; each feature switches to live as soon as its keys are present.

| Feature | Service | Keys |
| --- | --- | --- |
| Donations, ticket sales | Stripe | `STRIPE_SECRET_KEY` |
| Newsletter sign-up | Mailchimp | `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID` |
| Volunteer applications, free event registration | Resend | `RESEND_API_KEY`, `FROM_EMAIL`, `TEAM_INBOX` |

Keep keys in `.env.local` (never committed) or in your host's environment settings. Don't paste them
into chat tools, tickets or documents.

## Connecting the services

### Stripe (donations and tickets)

1. Create a Stripe account and turn on test mode.
2. Copy the secret key (starts with `sk_test_`) from Developers > API keys into `STRIPE_SECRET_KEY`.
3. Try a donation with the test card 4242 4242 4242 4242, any future date and any CVC.
4. Under Settings > Customer emails, turn on receipts for successful payments.
5. When you're ready to go live, swap in the live key (`sk_live_`).

Monthly donations become Stripe subscriptions, so donors can be managed in the Stripe dashboard.
Ticket purchases appear under Payments, labelled with the event and tier; export them for your guest list.

### Mailchimp (newsletter)

1. In Mailchimp, go to Profile > Extras > API keys and create a key.
2. The server prefix is the part after the dash in the key (for example `us21`).
3. The audience ID is under Audience > Settings > Audience name and defaults.

Sign-ups are tagged `newsletter`. Volunteers who opt in are tagged `volunteer`.

### Resend (volunteer and registration emails)

1. Create a Resend account and verify your sending domain.
2. Set `FROM_EMAIL` to an address on that domain, for example `The TEACH Project <hello@yourdomain.org>`.
3. Set `TEAM_INBOX` to the address that should receive applications and registrations.

Volunteer applications arrive with the applicant as the reply-to address, so you can reply directly.
Free-event registrants also get a confirmation email.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import it in Vercel. It detects Vite automatically (build: `npm run build`, output: `dist`).
3. Add the environment variables from `.env.example` under Project Settings > Environment Variables.
   Set `SITE_URL` to your live address (for example `https://theteachproject.org`), or leave it blank to use the current domain.
4. Deploy. `vercel.json` makes page links like `/events` work on refresh.

To host somewhere else, the React site is a standard static build (`dist`), and each file in `/api`
is a plain `(req, res)` handler that can be moved to Netlify Functions or a small Node server.

## Editing content

Everything the site says lives in `src/content`, so most updates don't touch any components.

| File | What it controls |
| --- | --- |
| `site.js` | Contact email, charity number, currency, social links, donation amounts |
| `impact.js` | The four figures under the home page hero |
| `partners.js` | Partner NGOs, the featured partner, and the donation form's "Where should it go?" list |
| `events.js` | Events, dates, venues and ticket prices (in cents). Past events move down automatically |
| `projects.js` | Projects and their map pins (latitude and longitude) |
| `posts.js` | Blog posts |

Images and video live in `public/media`. Reference them as `/media/file-name.jpg`.

## Project structure

```
api/                 Serverless functions (donate, tickets, subscribe, volunteer)
public/media/        Photos, video loops, logos, the world map
src/components/      Nav, footer, popups, forms, map, video and other building blocks
src/content/         Editable site content
src/lib/             Helpers: API calls, formatting, validation, hooks
src/pages/           One file per page
src/styles/          Brand tokens, base styles, components, pages
```

## Before launch

- Replace every value in [square brackets] and everything marked TODO or EXAMPLE in `src/content`.
- Set real event dates, venues and prices, and real map coordinates for each project.
- Set the contact email, charity number and social links in `site.js`.
- Check `currency` and `locale` in `site.js` (for example `cad` and `en-CA` for Canadian dollars).
- Confirm tax receipt requirements for your registration and add the right wording to the Donate FAQ.
- Fonts: the site uses Avenir Next when installed, with Nunito Sans as the web fallback. To serve
  Avenir to everyone, add licensed web font files to `public/fonts` and an `@font-face` rule in `src/styles/tokens.css`.
- Replace the sample blog posts, and check you have consent for every photo and video of children.
- Run a test donation, a ticket purchase and a volunteer application with test keys.

## Good next steps

- A Stripe webhook (`checkout.session.completed`) to email tickets, keep a guest list or send custom thank-you emails.
- A headless CMS (for example Sanity or Contentful) if non-developers will edit events and posts often.
- Analytics, and a cookie notice if your analytics tool needs one.
# ttp
