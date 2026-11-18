export function SectionHeading({ eyebrow, title, description, index, className = "" }: { eyebrow: string; title: string; description?: string; index?: string; className?: string }) {
  return (
    <div className={`section-heading ${className}`}>
      <div className="section-heading-top">
        <p className="section-eyebrow"><span aria-hidden />{eyebrow}</p>
        {index && <span className="section-index" aria-hidden>{index}</span>}
      </div>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
