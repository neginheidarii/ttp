// Partner NGOs. The one marked featured: true appears on the home page.
// The ids are also used by the donation form ("Where should it go?").
export const partners = [
  {
    id: 'partner-one',
    name: '[Partner NGO one]',
    region: '[Region, Country]',
    founded: '[Year]',
    schools: '[00]',
    children: '[0,000]',
    summary: "[Two or three sentences on the NGO's mission, the communities it serves, and what support makes possible.]",
    image: '/media/palms.jpg',
    imageAlt: 'A group of boys gathered by a stone wall under palm trees',
    featured: true
  },
  {
    id: 'partner-two',
    name: '[Partner NGO two]',
    region: '[Region, Country]',
    founded: '[Year]',
    schools: '[00]',
    children: '[0,000]',
    summary: '[Short description of this partner.]',
    image: '/media/mountain-class.jpg',
    imageAlt: 'Children gathered outdoors in the mountains, listening to a teacher',
    featured: false
  }
];

export const donationTargets = [
  { id: 'most', label: "Where it's needed most" },
  ...partners.map((p) => ({ id: p.id, label: p.name }))
];

export const findTarget = (id) => donationTargets.find((t) => t.id === id) || donationTargets[0];
