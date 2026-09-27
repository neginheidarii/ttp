import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      <img src={post.image} alt="" loading="lazy" />
      <span className="tag">{post.tag}</span>
      <h3 className="post-card__title">{post.title}</h3>
      <p>{post.excerpt}</p>
    </Link>
  );
}
