import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

const contactDetails = [
  {
    label: 'Address',
    title: 'Manipal, Karnataka',
    text: 'Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal 576104',
  },
  {
    label: 'Phone',
    title: 'Customer Care',
    links: [
      { label: '+91 88619 42440', href: 'tel:+918861942440' },
      { label: '+91 90725 56665', href: 'tel:+919072556665' },
    ],
  },
  {
    label: 'Email',
    title: 'Partnerships & Support',
    links: [{ label: 'director@darshangatma.in', href: 'mailto:director@darshangatma.in' }],
  },
]

export function ContactPage() {
  usePageTitle('Contact Us')
  const [status, setStatus] = useState('')

  const submit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setStatus('Thanks. We have received your message and will get back to you soon.')
  }

  return (
    <main className="rr-contact-page" id="main" role="main">
      <style>{`
        .rr-contact-page{background:#efefef;color:#1c1c1c}
        .rr-contact-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);height:720px;min-height:0;border-bottom:1px solid rgba(0,0,0,.08)}
        .rr-contact-copy{display:flex;flex-direction:column;justify-content:center;padding:58px 66px;box-sizing:border-box}
        .rr-contact-eyebrow{font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:#b08850;margin:0 0 14px}
        .rr-contact-title{font-family:Montserrat,Arial,sans-serif;font-size:clamp(34px,4vw,52px);font-weight:400;letter-spacing:.05em;line-height:1.08;text-transform:uppercase;margin:0 0 18px}
        .rr-contact-intro{font-family:Montserrat,Arial,sans-serif;font-size:14px;line-height:1.75;color:#5d5d5d;max-width:520px;margin:0}
        .rr-contact-image{height:720px;min-height:0;overflow:hidden;background:#1c1c1c}
        .rr-contact-image img{width:100%;height:100%;object-fit:cover;display:block;opacity:.88}
        .rr-contact-shell{max-width:1240px;margin:0 auto;padding:82px 34px 96px;box-sizing:border-box}
        .rr-contact-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(360px,.95fr);gap:34px;align-items:start}
        .rr-contact-form-card,.rr-contact-info-card{background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 18px 42px rgba(0,0,0,.06)}
        .rr-contact-form-card{padding:42px}
        .rr-contact-section-kicker{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.28em;text-transform:uppercase;color:#b08850;margin:0 0 12px}
        .rr-contact-card-title{font-family:Montserrat,Arial,sans-serif;font-size:28px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;line-height:1.25;margin:0 0 28px}
        .rr-contact-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
        .rr-contact-field{display:grid;gap:8px}
        .rr-contact-field-full{grid-column:1/-1}
        .rr-contact-field label{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#555}
        .rr-contact-field input,.rr-contact-field textarea{width:100%;border:1px solid #d8d2c8;background:#fbfbfb;padding:15px 14px;box-sizing:border-box;font-family:Montserrat,Arial,sans-serif;font-size:14px;color:#1c1c1c;border-radius:0}
        .rr-contact-field textarea{min-height:150px;resize:vertical}
        .rr-contact-field input:focus,.rr-contact-field textarea:focus{outline:3px solid rgba(176,136,80,.28);border-color:#b08850;background:#fff}
        .rr-contact-submit{grid-column:1/-1;border:1px solid #1c1c1c;background:#1c1c1c;color:#fff;padding:15px 28px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;justify-self:start;transition:background .22s ease,color .22s ease}
        .rr-contact-submit:hover{background:#fff;color:#1c1c1c}
        .rr-contact-status{grid-column:1/-1;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#2e7d32;margin:0}
        .rr-contact-info-card{padding:0;overflow:hidden}
        .rr-contact-info-inner{padding:42px}
        .rr-contact-detail-list{display:grid;gap:22px;margin:0 0 34px}
        .rr-contact-detail{border-top:1px solid #e2ded7;padding-top:22px}
        .rr-contact-detail:first-child{border-top:0;padding-top:0}
        .rr-contact-detail-label{font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#b08850;margin:0 0 8px}
        .rr-contact-detail h3{font-family:Montserrat,Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin:0 0 8px}
        .rr-contact-detail p,.rr-contact-detail a{font-family:Montserrat,Arial,sans-serif;font-size:14px;line-height:1.75;color:#555;text-decoration:none;margin:0}
        .rr-contact-detail a:hover{text-decoration:underline;color:#1c1c1c}
        .rr-contact-note{background:#f3f0ea;padding:24px;font-family:Montserrat,Arial,sans-serif;font-size:13px;line-height:1.8;color:#555;margin:0}
        .rr-contact-map{height:360px;border-top:1px solid rgba(0,0,0,.08);background:#ddd}
        .rr-contact-map iframe{width:100%;height:100%;border:0;display:block;filter:grayscale(1) contrast(.94)}
        @media(max-width:980px){.rr-contact-hero,.rr-contact-grid{grid-template-columns:1fr}.rr-contact-hero{height:auto}.rr-contact-copy{padding:44px 34px}.rr-contact-image{height:280px}.rr-contact-shell{padding:64px 24px 82px}}
        @media(max-width:620px){.rr-contact-copy{padding:38px 20px}.rr-contact-title{font-size:32px}.rr-contact-image{height:220px}.rr-contact-form-card,.rr-contact-info-inner{padding:28px 20px}.rr-contact-form{grid-template-columns:1fr}.rr-contact-map{height:300px}}
      `}</style>

      <section className="rr-contact-hero" aria-labelledby="contact-title">
        <div className="rr-contact-copy">
          <p className="rr-contact-eyebrow">Contact Raw Radicles</p>
          <h1 className="rr-contact-title" id="contact-title">
            We would love to hear from you
          </h1>
          <p className="rr-contact-intro">
            Questions about orders, collaborations, corporate gifting, or our functional chocolate range? Send us a note and our team will respond with care.
          </p>
        </div>
        <div className="rr-contact-image">
          <img src={asset('assets/about/origin_story.png')} alt="Raw Radicles chocolate story" />
        </div>
      </section>

      <section className="rr-contact-shell" aria-label="Contact form and details">
        <div className="rr-contact-grid">
          <div className="rr-contact-form-card">
            <p className="rr-contact-section-kicker">Message Us</p>
            <h2 className="rr-contact-card-title">How can we help?</h2>
            <form className="rr-contact-form" onSubmit={submit}>
              <div className="rr-contact-field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="rr-contact-field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="rr-contact-field rr-contact-field-full">
                <label htmlFor="contact-reason">Reason for contact</label>
                <input id="contact-reason" name="reason" type="text" />
              </div>
              <div className="rr-contact-field rr-contact-field-full">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" required />
              </div>
              <button className="rr-contact-submit" type="submit">
                Send Message
              </button>
              {status ? <p className="rr-contact-status">{status}</p> : null}
            </form>
          </div>

          <aside className="rr-contact-info-card" aria-label="Contact details">
            <div className="rr-contact-info-inner">
              <p className="rr-contact-section-kicker">Our Details</p>
              <h2 className="rr-contact-card-title">Visit or reach out</h2>
              <div className="rr-contact-detail-list">
                {contactDetails.map((detail) => (
                  <article className="rr-contact-detail" key={detail.label}>
                    <p className="rr-contact-detail-label">{detail.label}</p>
                    <h3>{detail.title}</h3>
                    {detail.links ? (
                      <p>
                        {detail.links.map((link) => (
                          <span key={link.href}>
                            <a href={link.href}>{link.label}</a>
                            <br />
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p>{detail.text}</p>
                    )}
                  </article>
                ))}
              </div>
              <p className="rr-contact-note">
                Please allow 24-48 hours for order processing. Shipping costs and transit times vary depending on destination and order size.
              </p>
            </div>
            <div className="rr-contact-map">
              <iframe
                title="Raw Radicles Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.4!2d74.7879!3d13.3498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzU5LjMiTiA3NMKwNDcnMTYuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
