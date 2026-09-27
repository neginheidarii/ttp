import { useInView } from '../lib/hooks.js';

// Ten heads drawn from the logo's profile; seven fill with coral when the row scrolls into view.
export default function HeadsRow() {
  const [ref, inView] = useInView({ threshold: 0.6 });
  return (
    <div
      ref={ref}
      className={`heads${inView ? ' is-filled' : ''}`}
      role="img"
      aria-label="Ten figures, seven of them highlighted: seven in ten children"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <svg key={i} className={`head${i < 7 ? ' head--hit' : ''}`} style={{ '--i': i }} viewBox="0 0 64 80" aria-hidden="true">
          <path d="M4 2H28C47 2 58 13 58 26V36L64 43L58 46V56C58 69 46 78 28 78H4Z" />
          <path className="head__eye" d="M36 37Q41 41 46 37" />
        </svg>
      ))}
    </div>
  );
}
