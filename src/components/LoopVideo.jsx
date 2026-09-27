import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/hooks.js';
import { PauseIcon, PlayIcon } from './Icons.jsx';

// Silent looping clip with a visible pause control.
// It doesn't start on its own for people who have asked for reduced motion.
export default function LoopVideo({ src, poster, label, className = '' }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (playing) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <div className={`loop-video ${className}`}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
      <button
        type="button"
        className="loop-video__toggle"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
