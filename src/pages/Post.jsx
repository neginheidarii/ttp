import { Link, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import Newsletter from '../components/Newsletter.jsx';
import NotFound from './NotFound.jsx';
import { findPost, latestPosts } from '../content/posts.js';
import { formatDate } from '../lib/format.js';
import { useDocumentTitle } from '../lib/hooks.js';

export default function Post() {
  const { slug } = useParams();
  const post = findPost(slug);
  useDocumentTitle(post ? post.title : 'Story not found');
  if (!post) return <NotFound message="We couldn't find that story. It may have moved." />;
  const more = latestPosts(4).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="post">
        <header className="container post__head">
          <Link to="/blog" className="text-link">All field notes</Link>
          <span className="tag">{post.tag}</span>
          <h1 className="display-2">{post.title}</h1>
          <p className="muted"><time dateTime={post.date}>{formatDate(post.date)}</time></p>
        </header>
        <div className="container">
          <img className="post__hero" src={post.image} alt={post.imageAlt} />
        </div>
        <div className="container post__body">
          {post.body.map((block, i) =>
            typeof block === 'string' ? <p key={i}>{block}</p> : <h2 key={i}>{block.heading}</h2>
          )}
        </div>
      </article>
      {more.length > 0 && (
        <section className="section section--mist" aria-labelledby="more-title">
          <div className="container">
            <h2 id="more-title" className="display-4 section-title">More field notes</h2>
            <div className="card-grid card-grid--2">
              {more.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
      <Newsletter />
    </>
  );
}
