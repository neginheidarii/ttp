import { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { posts, postTags } from '../content/posts.js';
import { useDocumentTitle } from '../lib/hooks.js';

export default function Blog() {
  useDocumentTitle('Field notes');
  const [tag, setTag] = useState('All');
  const list = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((p) => tag === 'All' || p.tag === tag);

  return (
    <>
      <section className="page-hero" aria-labelledby="blog-title">
        <div className="container page-hero__stack">
          <h1 id="blog-title" className="display-1">Field notes</h1>
          <p className="lede lede--lg">Stories, updates and explainers from our work and our partners.</p>
          <div className="chips" role="group" aria-label="Filter stories">
            {postTags.map((t) => (
              <button key={t} type="button" aria-pressed={tag === t} className={`chip${tag === t ? ' is-on' : ''}`} onClick={() => setTag(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--flush-top">
        <div className="container">
          <div className="card-grid">
            {list.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
