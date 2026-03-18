import { Link } from 'react-router-dom';

interface ExploreItem {
  title: string;
  description: string;
  to: string;
  cta: string;
  eyebrow?: string;
}

interface ContinueExploringProps {
  title: string;
  items: ExploreItem[];
  eyebrow?: string;
}

export function ContinueExploring({
  title,
  items,
  eyebrow = 'Continue Exploring',
}: ContinueExploringProps) {
  return (
    <section className="page-stack">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="card-grid">
        {items.map((item) => (
          <article className="archive-card" key={`${item.to}-${item.title}`}>
            {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link className="button button-secondary button-small" to={item.to}>
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
