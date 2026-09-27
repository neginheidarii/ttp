import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectMap from '../components/ProjectMap.jsx';
import LoopVideo from '../components/LoopVideo.jsx';
import { listedProjects, mappedProjects, projectTypes, typeLabel } from '../content/projects.js';
import { useDocumentTitle } from '../lib/hooks.js';

function ProjectMedia({ project }) {
  if (project.letter) {
    const { letter } = project;
    return (
      <div className="letter-wrap">
        <div className="letter" aria-label="Example email">
          <div className="letter__line"><span>To</span><span>{letter.to}</span></div>
          <div className="letter__line"><span>Subject</span><strong>{letter.subject}</strong></div>
          {letter.body.map((para) => <p key={para}>{para}</p>)}
        </div>
      </div>
    );
  }
  if (project.video) {
    return <LoopVideo src={project.video.src} poster={project.video.poster} label={project.video.label} className="project__video" />;
  }
  return (
    <div className={`project__images project__images--${project.images.length}`}>
      {project.images.map((img) => <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />)}
    </div>
  );
}

function ProjectRow({ project, flip }) {
  return (
    <article id={project.id} className={`project${flip ? ' project--flip' : ''}`}>
      <div className="project__media"><ProjectMedia project={project} /></div>
      <div className="project__body">
        <span className="tag">{typeLabel(project.type)}</span>
        <h3 className="display-3 project__title">{project.title}</h3>
        <p className="lede">{project.summary}</p>
        {project.stats && (
          <dl className="facts">
            {project.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
          </dl>
        )}
        {project.link && (project.link.to
          ? <Link to={project.link.to} className="text-link">{project.link.label}</Link>
          : <a href={project.link.href} className="btn btn--navy">{project.link.label}</a>)}
      </div>
    </article>
  );
}

export default function Projects() {
  useDocumentTitle('Projects');
  const [filter, setFilter] = useState('all');
  const shown = listedProjects.filter((p) => filter === 'all' || p.type === filter);

  return (
    <>
      <section className="page-hero" aria-labelledby="projects-title">
        <div className="container page-hero__stack">
          <h1 id="projects-title" className="display-1">Projects</h1>
          <p className="lede lede--lg">Beyond events, our community takes on projects that put resources and attention where children need them most.</p>
        </div>
      </section>

      <section className="section section--mist section--tight" aria-labelledby="map-title">
        <div className="container">
          <div className="map-head">
            <h2 id="map-title" className="display-4">Project map</h2>
            <p className="muted">Select a pin to see the project.</p>
          </div>
          <ProjectMap projects={mappedProjects} />
        </div>
      </section>

      <section className="section" aria-labelledby="list-title">
        <div className="container">
          <div className="section-head section-head--center">
            <h2 id="list-title" className="display-3">All projects</h2>
            <div className="chips" role="group" aria-label="Filter projects">
              {projectTypes.map((t) => (
                <button key={t.id} type="button" aria-pressed={filter === t.id} className={`chip${filter === t.id ? ' is-on' : ''}`} onClick={() => setFilter(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="project-list">
            {shown.map((p, i) => <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />)}
          </div>
          {shown.length === 0 && <p className="empty">No projects in this category yet.</p>}
        </div>
      </section>

      <section className="cta-band cta-band--navy" aria-labelledby="idea-title">
        <div className="container cta-band__inner">
          <div>
            <h2 id="idea-title" className="display-3">Have an idea for a project?</h2>
            <p className="lede">We're always looking for new ways to support education. Tell us what you'd like to make happen.</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/volunteer#apply" className="btn btn--coral btn--lg">Share your idea</Link>
          </div>
        </div>
      </section>
    </>
  );
}
