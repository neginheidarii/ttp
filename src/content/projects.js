// Projects shown on the Projects page and as pins on the map.
// location: map pin (lat/lon). The coordinates below are EXAMPLES: set the real ones.
// Leave location out for projects that shouldn't appear on the map.
export const projectTypes = [
  { id: 'all', label: 'All' },
  { id: 'ground', label: 'On the ground' },
  { id: 'advocacy', label: 'Advocacy' },
  { id: 'story', label: 'Storytelling' }
];

export const projects = [
  {
    id: 'backpack-drive',
    type: 'ground',
    title: 'Backpack drive',
    summary: 'Backpacks filled with school supplies, delivered to students through [Partner NGO] in [Region, Country], so more children can start the school year ready to learn.',
    stats: [
      { label: 'Backpacks', value: '[000]' },
      { label: 'Schools', value: '[00]' },
      { label: 'Delivered', value: '[Year]' }
    ],
    images: [
      { src: '/media/backpack-handout.jpg', alt: 'Adults handing backpacks to children outdoors' },
      { src: '/media/backpacks-kids.jpg', alt: 'Children holding their new backpacks' }
    ],
    location: { lat: 30, lon: 60, label: '[Region, Country]' },
    link: { label: 'Read the story', to: '/blog/inside-our-backpack-drive' }
  },
  {
    id: 'un-unicef-letters',
    type: 'advocacy',
    title: 'Letters to the UN and UNICEF',
    summary: 'Our community emailed the UN and UNICEF, asking them to keep learning poverty at the top of the global education agenda.',
    stats: [
      { label: 'Emails sent', value: '[000]' },
      { label: 'Countries', value: '[00]' }
    ],
    letter: {
      to: '[UNICEF contact]',
      subject: 'Keep learning poverty on the agenda',
      body: [
        'Dear [name],',
        "About 70% of 10-year-olds in low- and middle-income countries can't read and understand a simple text. I'm writing to ask that ending learning poverty stays a priority in your work this year.",
        'Sincerely,\n[Your name]'
      ]
    },
    link: {
      label: 'Add your voice',
      href: 'mailto:?subject=Keep%20learning%20poverty%20on%20the%20agenda&body=About%2070%25%20of%2010-year-olds%20in%20low-%20and%20middle-income%20countries%20can%27t%20read%20and%20understand%20a%20simple%20text.%20Please%20keep%20ending%20learning%20poverty%20a%20priority.'
    }
  },
  {
    id: 'classroom-stories',
    type: 'story',
    title: 'Classroom stories',
    summary: 'We film and photograph partner schools so our community can see the reality of learning poverty, and the progress their support makes possible.',
    stats: [
      { label: 'Schools filmed', value: '[00]' },
      { label: 'Films released', value: '[00]' }
    ],
    video: { src: '/media/window-loop.mp4', poster: '/media/window-poster.jpg', label: 'Children in a classroom, seen through a broken window' },
    images: [{ src: '/media/window-poster.jpg', alt: 'Children in a classroom, seen through a broken window' }],
    location: { lat: 24, lon: 90, label: '[Region, Country]' },
    link: { label: 'Watch the films', to: '/blog' }
  },
  {
    id: 'school-visit',
    type: 'ground',
    listed: false,
    title: '[Partner school visit]',
    images: [{ src: '/media/mountain-class.jpg', alt: 'Children gathered outdoors in the mountains' }],
    location: { lat: 0, lon: 37, label: '[Region, Country]' }
  },
  {
    id: 'upcoming-project',
    type: 'ground',
    listed: false,
    title: '[Upcoming project]',
    images: [{ src: '/media/tree-gathering.jpg', alt: 'Children and adults gathered under a large tree' }],
    location: { lat: 15, lon: -90, label: '[Region, Country]' }
  }
];

export const typeLabel = (id) => (projectTypes.find((t) => t.id === id) || {}).label || '';
export const listedProjects = projects.filter((p) => p.listed !== false);
export const mappedProjects = projects.filter((p) => p.location);
