import { usePageTitle } from '../hooks/usePageTitle.js'

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'Raw Radicles respects your privacy. This page explains the basic information we collect when you use the website.',
    sections: [
      {
        heading: 'Information We Collect',
        text: 'We may collect contact details you submit through forms, newsletter signups, and basic website analytics used to understand site performance.',
      },
      {
        heading: 'How We Use It',
        text: 'We use submitted information to respond to enquiries, send requested updates, improve the website, and maintain basic business records.',
      },
      {
        heading: 'Contact',
        text: 'For privacy questions, please contact Raw Radicles through the Contact Us page.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'These terms apply to the use of the Raw Radicles website and the information presented here.',
    sections: [
      {
        heading: 'Website Use',
        text: 'Product information, availability, and marketplace links are provided for convenience and may change over time.',
      },
      {
        heading: 'Purchases',
        text: 'Purchases made through third-party marketplaces are subject to the terms, delivery policies, and support processes of those platforms.',
      },
      {
        heading: 'Content',
        text: 'All brand content, product names, images, and written material belong to Raw Radicles unless otherwise noted.',
      },
    ],
  },
}

export function LegalPage({ type }) {
  const content = legalContent[type] || legalContent.privacy
  usePageTitle(content.title)

  return (
    <main className="rr-legal-page" id="main" role="main">
      <style>{`
        .rr-legal-page{background:#f4f4f1;color:#1c1b1b;min-height:70vh;padding:88px 22px 96px;font-family:Montserrat,Arial,sans-serif}
        .rr-legal-shell{max-width:900px;margin:0 auto}
        .rr-legal-kicker{color:#b59055;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;margin:0 0 18px}
        .rr-legal-title{font-size:clamp(34px,5vw,58px);font-weight:500;line-height:1.05;letter-spacing:0;margin:0 0 24px}
        .rr-legal-intro{font-size:16px;line-height:1.8;color:#5f5a52;max-width:700px;margin:0 0 42px}
        .rr-legal-section{border-top:1px solid rgba(28,27,27,.14);padding:24px 0}
        .rr-legal-section h2{font-size:13px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;margin:0 0 12px}
        .rr-legal-section p{font-size:14px;line-height:1.85;color:#5f5a52;margin:0;max-width:760px}
        @media(max-width:640px){.rr-legal-page{padding:68px 18px 72px}.rr-legal-intro{font-size:14px}.rr-legal-section p{font-size:13px}}
      `}</style>
      <div className="rr-legal-shell">
        <p className="rr-legal-kicker">Raw Radicles</p>
        <h1 className="rr-legal-title">{content.title}</h1>
        <p className="rr-legal-intro">{content.intro}</p>
        {content.sections.map((section) => (
          <section className="rr-legal-section" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
