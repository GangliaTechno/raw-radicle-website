const defaultExperts = [
  { name: 'Dr. Nozer Sheriar', role: 'Gynaecologist', image: '/assets/experts/doctor1.png' },
  { name: 'Dr. Anjali Desai', role: 'Ayurvedic Specialist', image: '/assets/experts/doctor2.png' },
  { name: 'Dr. Rohan Mehra', role: 'Nutritionist', image: '/assets/experts/doctor3.png' },
  { name: 'Dr. Sarah Khan', role: 'Dermatologist', image: '/assets/experts/doctor4.png' },
  { name: 'Dr. Vikram Singh', role: 'Wellness Expert', image: '/assets/experts/doctor5.png' },
  { name: 'Dr. Priya Sharma', role: 'Holistic Health Consultant', image: '/assets/experts/doctor6.png' },
]

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export default function Experts({ experts = defaultExperts, title = 'Meet the Experts Behind Raw Radicles' }) {
  const list = experts?.length ? experts : defaultExperts

  return (
    <section className="rrx-experts" aria-labelledby="rrx-experts-title">
      <style>{`
        .rrx-experts{padding:86px 0 104px;background:#efefef;box-sizing:border-box}
        .rrx-experts-title{font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:400;letter-spacing:10px;text-transform:uppercase;color:#242424;text-align:center;margin:0 0 68px;line-height:1.25}
        .rrx-experts-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;width:100%;margin:0 auto}
        .rrx-expert-card{margin:0;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:8px;box-shadow:0 13px 28px rgba(0,0,0,.07);text-align:center;overflow:hidden;transition:transform .28s ease,box-shadow .28s ease}
        .rrx-expert-card:hover{transform:translateY(-5px);box-shadow:0 18px 34px rgba(0,0,0,.1)}
        .rrx-expert-photo{width:100%;height:362px;object-fit:cover;display:block;background:#f5f5f5;border-top-left-radius:8px;border-top-right-radius:8px}
        .rrx-expert-fallback{width:100%;height:362px;background:#ded8cf;color:#1c1c1c;display:flex;align-items:center;justify-content:center;font:700 38px Montserrat,Arial,sans-serif;border-top-left-radius:8px;border-top-right-radius:8px}
        .rrx-expert-caption{padding:21px 12px 18px;min-height:91px;box-sizing:border-box}
        .rrx-expert-name{display:block;font-family:Montserrat,Arial,sans-serif;font-size:16px;font-weight:700;color:#202020;margin:0 0 12px;line-height:1.25}
        .rrx-expert-role{display:block;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:400;color:#7f7f7f;line-height:1.35}
        @media(max-width:1400px){.rrx-expert-photo,.rrx-expert-fallback{height:330px}.rrx-experts-grid{gap:8px}}
        @media(max-width:1200px){.rrx-experts-title{font-size:24px;letter-spacing:4px}.rrx-experts-grid{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(260px,36vw);grid-template-columns:none;gap:16px;overflow-x:auto;overscroll-behavior-x:contain;padding:0 24px 18px;scroll-padding:24px;scroll-snap-type:x mandatory;scrollbar-color:#1c1c1c33 transparent;scrollbar-width:thin;-webkit-overflow-scrolling:touch}.rrx-experts-grid::-webkit-scrollbar{height:4px}.rrx-experts-grid::-webkit-scrollbar-track{background:linear-gradient(90deg,transparent 0,transparent calc(50% - 58px),rgba(28,28,28,.12) calc(50% - 58px),rgba(28,28,28,.12) calc(50% + 58px),transparent calc(50% + 58px),transparent 100%)}.rrx-experts-grid::-webkit-scrollbar-thumb{background:#1c1c1c66;border-radius:999px}.rrx-expert-card{scroll-snap-align:start}.rrx-expert-photo,.rrx-expert-fallback{height:360px}}
        @media(max-width:720px){.rrx-experts{padding:64px 0 78px}.rrx-experts-grid{grid-auto-columns:minmax(238px,72vw);gap:14px;padding:0 18px 16px;scroll-padding:18px}.rrx-expert-photo,.rrx-expert-fallback{height:320px}}
        @media(max-width:480px){.rrx-experts-grid{grid-auto-columns:minmax(230px,82vw)}}
      `}</style>
      <h2 id="rrx-experts-title" className="rrx-experts-title">
        {title}
      </h2>
      <div className="rrx-experts-grid">
        {list.map((expert, index) => (
          <figure className="rrx-expert-card" key={`${expert.name}-${index}`}>
            {expert.image ? (
              <img className="rrx-expert-photo" src={expert.image} alt={expert.name} loading="lazy" />
            ) : (
              <div className="rrx-expert-fallback" aria-label={expert.name}>
                {getInitials(expert.name)}
              </div>
            )}
            <figcaption className="rrx-expert-caption">
              <span className="rrx-expert-name">{expert.name}</span>
              <span className="rrx-expert-role">{expert.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
