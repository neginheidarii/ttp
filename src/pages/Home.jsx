import { Link } from 'react-router-dom';
import { useDonate } from '../components/DonateContext.jsx';
import ChapterMark from '../components/ChapterMark.jsx';
import HeadsRow from '../components/HeadsRow.jsx';
import LoopVideo from '../components/LoopVideo.jsx';
import ProjectMap from '../components/ProjectMap.jsx';
import PostCard from '../components/PostCard.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { impact } from '../content/impact.js';
import { partners } from '../content/partners.js';
import { mappedProjects } from '../content/projects.js';
import { latestPosts } from '../content/posts.js';
import { site } from '../content/site.js';
import { useDocumentTitle, useInView } from '../lib/hooks.js';

const BEATS = [
  {
    title: "It changes a child's life.",
    text: 'Education empowers children to reach their full potential. Reading is where it starts, and everything else follows from it.'
  },
  {
    title: 'Then a whole community.',
    text: 'Children who learn go on to contribute to the world around them, and their communities change with them.'
  },
  {
    title: 'And it opens doors.',
    text: "With education, we can open doors to brighter futures for children everywhere. That's the work our partners do every day.",
    link: true
  }
];

const STEPS = [
  { title: 'Learn', text: 'Understand learning poverty around the world, and why education changes lives.' },
  { title: 'Meet', text: 'Get to know the vetted NGOs working on the ground, through their own stories.' },
  { title: 'Give', text: 'Support their work directly, once or every month. Your donation goes to our partner NGOs.' }
];

function Beat({ beat }) {
  const [ref, active] = useInView({ rootMargin: '-35% 0px -35% 0px', threshold: 0, once: false });
  return (
    <div ref={ref} className={`beat${active ? ' is-active' : ''}`}>
      <h3 className="beat__title">{beat.title}</h3>
      <p>{beat.text}</p>
      {beat.link && <a href="#partners" className="text-link text-link--light">Meet our partners</a>}
    </div>
  );
}

export default function Home() {
  useDocumentTitle();
  const { openDonate } = useDonate();
  const featured = partners.find((p) => p.featured) || partners[0];

  return (
    <>
      <section className="hero" aria-label="Introduction">
        <img className="hero__img" src="/media/hero-hills.jpg" alt="Two children running along a dirt path in the hills at dusk" />
        <div className="hero__shade" />
        <div className="container hero__copy">
          <h1 className="hero__title">Every child should be able to read this sentence.</h1>
          <p className="hero__lede">
            The TEACH Project shares the stories of carefully vetted NGOs fighting learning poverty,
            and gives you a direct way to support their work.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn--coral btn--lg" onClick={() => openDonate()}>Donate</button>
            <a href="#story" className="btn btn--ghost-light btn--lg">Read the story</a>
          </div>
        </div>
      </section>

      <section className="impact-strip" aria-label="Our impact so far">
        <div className="container impact-strip__grid">
          {impact.map((item) => (
            <div key={item.label} className="impact-strip__item">
              <span className="impact-strip__value">{item.value}</span>
              <span className="impact-strip__label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="story" className="section problem" aria-labelledby="problem-title">
        <div className="container problem__grid">
          <div>
            <ChapterMark numeral="I">The problem</ChapterMark>
            <h2 id="problem-title" className="display-2">Seven in ten can't.</h2>
            <p className="lede">
              In low- and middle-income countries, about 70% of 10-year-olds can't read and understand
              a simple text. It's called learning poverty.
            </p>
            <p className="lede">
              The number reflects two gaps at once: children who can't get to a classroom, and classrooms
              that can't teach the children who do.
            </p>
            <HeadsRow />
            <p className="source">
              Each figure stands for one in ten children aged 10 in low- and middle-income countries.
              Source: {site.statSource}.
            </p>
          </div>
          <figure className="problem__figure">
            <img src="/media/desks.jpg" alt="Broken desks and chairs piled up in an empty classroom" loading="lazy" />
            <figcaption>Where schools do exist, many lack the basics children need to learn.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--navy why" aria-labelledby="why-title">
        <div className="container">
          <ChapterMark numeral="II" tone="dark">Why education</ChapterMark>
          <h2 id="why-title" className="display-2 why__title">Education opens every other door.</h2>
          <div className="why__grid">
            <div className="why__media">
              <LoopVideo src="/media/dance-loop.mp4" poster="/media/dance-poster.jpg" label="Children dancing together in a schoolyard" className="why__video" />
            </div>
            <div className="why__beats">
              {BEATS.map((b) => <Beat key={b.title} beat={b} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="interlude" aria-label="Inside a classroom">
        <div className="interlude__media">
          <LoopVideo src="/media/window-loop.mp4" poster="/media/window-poster.jpg" label="Children in a classroom, seen through a broken window" className="interlude__video" />
        </div>
        <div className="container interlude__copy">
          <p>The people closing this gap are already there.</p>
        </div>
      </section>

      <section id="partners" className="section partners" aria-labelledby="partners-title">
        <div className="container">
          <div className="partners__head">
            <div>
              <ChapterMark numeral="III">Who we feature</ChapterMark>
              <h2 id="partners-title" className="display-3">Local organisations, carefully vetted.</h2>
            </div>
            <div className="partners__intro">
              <p className="lede">
                We seek out NGOs already working to end learning poverty. Each one goes through our vetting
                process before we tell its story across our platform: film, social media, events and this site.
              </p>
              <Link to="/donate#faq" className="text-link">How we choose partners</Link>
            </div>
          </div>
          <article className="featured">
            <img src={featured.image} alt={featured.imageAlt} loading="lazy" />
            <div className="featured__body">
              <span className="featured__label">Featured partner</span>
              <h3 className="featured__name">{featured.name}</h3>
              <span className="featured__region">{featured.region}</span>
              <p>{featured.summary}</p>
              <dl className="facts">
                <div><dt>Founded</dt><dd>{featured.founded}</dd></div>
                <div><dt>Schools supported</dt><dd>{featured.schools}</dd></div>
                <div><dt>Children reached</dt><dd>{featured.children}</dd></div>
              </dl>
              <div className="featured__actions">
                <button type="button" className="btn btn--coral" onClick={() => openDonate(featured.id)}>Support this partner</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="impact" className="section section--mist" aria-labelledby="impact-title">
        <div className="container">
          <ChapterMark numeral="IV" tone="mist">The real impact</ChapterMark>
          <h2 id="impact-title" className="display-2">Learn. Meet. Give.</h2>
          <p className="lede">Our platform turns awareness into action. Here's how it works.</p>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="steps__num">Step {i + 1}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="map-head">
            <h3 className="display-4">Where our partners work</h3>
            <p className="muted">Select a pin to see the project.</p>
          </div>
          <ProjectMap projects={mappedProjects} />
        </div>
      </section>

      <section className="section" aria-labelledby="notes-title">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="notes-title" className="display-3">Field notes</h2>
              <p className="lede">Stories, updates and explainers from our work.</p>
            </div>
            <Link to="/blog" className="text-link">View all stories</Link>
          </div>
          <div className="card-grid">
            {latestPosts(3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
