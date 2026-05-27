export function PageHero({ title, eyebrow, text }) {
  return (
    <section className="rr-page-hero">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{text}</span>
    </section>
  )
}
