import { useState } from 'react';
import { Link } from 'react-router-dom';
import { typeLabel } from '../content/projects.js';

// The dot map covers latitude 80 to -56 and longitude -180 to 180.
const TOP = 80;
const SPAN = 136;
const pinPosition = ({ lat, lon }) => ({
  left: `${((lon + 180) / 360) * 100}%`,
  top: `${((TOP - lat) / SPAN) * 100}%`
});

export default function ProjectMap({ projects }) {
  const [selected, setSelected] = useState(projects[0] ? projects[0].id : null);
  const current = projects.find((p) => p.id === selected) || projects[0];
  if (!current) return null;
  const image = current.images && current.images[0];

  return (
    <div className="map">
      <div className="map__canvas">
        <img className="map__base" src="/media/world-dots.svg" alt="" aria-hidden="true" />
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`map__pin${p.id === current.id ? ' is-on' : ''}`}
            style={pinPosition(p.location)}
            aria-pressed={p.id === current.id}
            aria-label={`${p.title}, ${p.location.label}`}
            onClick={() => setSelected(p.id)}
          >
            <span />
          </button>
        ))}
      </div>
      <div className="map__card" aria-live="polite">
        {image && <img src={image.src} alt="" />}
        <div className="map__info">
          <span className="map__type">{typeLabel(current.type)}</span>
          <h3 className="map__title">{current.title}</h3>
          <span className="map__place">{current.location.label}</span>
          {current.listed !== false && (
            <Link to={`/projects#${current.id}`} className="text-link">View project</Link>
          )}
        </div>
      </div>
    </div>
  );
}
