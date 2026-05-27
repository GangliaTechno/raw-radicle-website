export function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="rr-section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </div>
  )
}
