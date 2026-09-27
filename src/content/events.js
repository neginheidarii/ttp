// Events. Dates, venues and prices below are EXAMPLES: replace them before launch.
// An event moves from "Upcoming" to "Past events" automatically once its date passes.
// Prices are in cents (15000 = 150.00). Set free: true for free registration with no payment.
export const events = [
  {
    id: 'teach-gala-2026',
    title: 'The TEACH Gala',
    kind: 'Gala',
    date: '2026-11-21T19:00:00',
    venue: '[Venue name]',
    city: '[City]',
    summary: 'An evening of stories from our partner NGOs, with dinner, a short film and a live auction. All proceeds support education.',
    image: '/media/mountain-class.jpg',
    imageAlt: 'Children gathered outdoors in the mountains',
    free: false,
    tiers: [
      { id: 'general', name: 'General admission', note: 'Dinner, film and auction', priceCents: 15000 },
      { id: 'supporter', name: 'Supporter ticket', note: 'Includes a gift to our partner NGOs', priceCents: 25000 }
    ]
  },
  {
    id: 'film-night-2027',
    title: 'Film night: Inside the classroom',
    kind: 'Screening',
    date: '2027-01-28T19:00:00',
    venue: '[Venue name]',
    city: '[City]',
    summary: 'Footage from partner classrooms on the big screen, followed by a conversation with our team.',
    image: '/media/desk-feet.jpg',
    imageAlt: "Students' feet beneath classroom desks",
    free: false,
    tiers: [{ id: 'general', name: 'General admission', note: 'Screening and conversation', priceCents: 2500 }]
  },
  {
    id: 'backpack-day-2027',
    title: 'Backpack packing day',
    kind: 'Volunteer day',
    date: '2027-02-13T10:00:00',
    venue: '[Venue name]',
    city: '[City]',
    summary: 'Spend an afternoon packing backpacks with school supplies for students.',
    image: '/media/backpacks-kids.jpg',
    imageAlt: 'Children holding new backpacks',
    free: true,
    tiers: [{ id: 'spot', name: 'Volunteer spot', note: 'Free', priceCents: 0 }]
  },
  {
    id: 'spring-celebration-2026',
    title: '[Past event name]',
    kind: 'Celebration',
    date: '2026-05-16T18:00:00',
    city: '[City]',
    image: '/media/celebration.jpg',
    imageAlt: 'A schoolyard celebration with balloons, seen from above',
    recap: 'Raised [$00,000] for [Partner NGO].',
    photosUrl: '#'
  },
  {
    id: 'autumn-dinner-2025',
    title: '[Past event name]',
    kind: 'Dinner',
    date: '2025-11-08T19:00:00',
    city: '[City]',
    image: '/media/lineup-wall.jpg',
    imageAlt: 'A row of children standing against a concrete wall',
    recap: 'Raised [$00,000] for [Partner NGO].',
    photosUrl: '#'
  },
  {
    id: 'backpack-handover-2025',
    title: '[Past event name]',
    kind: 'Handover',
    date: '2025-09-06T11:00:00',
    city: '[City]',
    image: '/media/backpack-handout.jpg',
    imageAlt: 'Adults handing backpacks to children outdoors',
    recap: 'Raised [$00,000] for [Partner NGO].',
    photosUrl: '#'
  }
];

export const isUpcoming = (event, now = new Date()) => new Date(event.date) >= now;
export const findEvent = (id) => events.find((e) => e.id === id);
export const upcomingEvents = (now = new Date()) =>
  events.filter((e) => isUpcoming(e, now)).sort((a, b) => new Date(a.date) - new Date(b.date));
export const pastEvents = (now = new Date()) =>
  events.filter((e) => !isUpcoming(e, now)).sort((a, b) => new Date(b.date) - new Date(a.date));
