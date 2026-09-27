// Blog posts ("Field notes"). These are SAMPLE posts: replace with your own.
// body: an array of paragraphs; use { heading: '...' } for a subheading.
export const posts = [
  {
    slug: 'inside-our-backpack-drive',
    title: 'Inside our backpack drive',
    tag: 'Projects',
    date: '2026-09-10',
    image: '/media/backpacks-kids.jpg',
    imageAlt: 'Children holding new backpacks',
    excerpt: 'How a simple idea turned into school bags, supplies and a better first day back for students.',
    body: [
      '[Sample post. Open with the moment that sparked the backpack drive.]',
      { heading: 'Packing day' },
      '[Describe how volunteers and donors came together, and what went into each backpack.]',
      { heading: 'Handing them over' },
      '[Share what the day of delivery looked like with our partner NGO, and what students and teachers told us.]'
    ]
  },
  {
    slug: 'why-we-wrote-to-the-un-and-unicef',
    title: 'Why we wrote to the UN and UNICEF',
    tag: 'Advocacy',
    date: '2026-07-22',
    image: '/media/mountain-class.jpg',
    imageAlt: 'Children gathered outdoors in the mountains, listening to a teacher',
    excerpt: "Our community asked for learning poverty to stay on the global agenda. Here's what we asked for, and why.",
    body: [
      '[Sample post. Explain the campaign and why advocacy matters alongside direct support.]',
      { heading: 'What we asked for' },
      '[Summarise the letter and the response so far.]'
    ]
  },
  {
    slug: 'learning-poverty-explained',
    title: 'Learning poverty, explained',
    tag: 'Explainer',
    date: '2026-06-03',
    image: '/media/girl-pink.jpg',
    imageAlt: 'A girl in a pink headscarf, seen through the wall of a reed hut',
    excerpt: 'What the 70% figure means, where it comes from, and why it matters for every child.',
    body: [
      'Learning poverty means being unable to read and understand a simple text by age 10. In low- and middle-income countries, about 70% of 10-year-olds are in this situation.',
      { heading: 'Two gaps at once' },
      "The figure reflects both children who can't get to school and schools that don't have what they need to teach.",
      { heading: 'Why it matters' },
      'Reading is the foundation for everything else a child learns. With education, children can reach their full potential and contribute to the world around them.',
      'Source: World Bank, UNESCO et al., State of Global Learning Poverty, 2022.'
    ]
  }
];

export const findPost = (slug) => posts.find((p) => p.slug === slug);
export const latestPosts = (n = 3) => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
export const postTags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];
