import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle.js'

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
        .rr-contact-shell{box-sizing:border-box;margin:0 auto;max-width:742px;padding:118px 24px 82px}
        .rr-contact-title{font-family:Montserrat,Arial,sans-serif;font-size:28px;font-weight:500;letter-spacing:.34em;line-height:1.25;margin:0 0 52px;text-align:center;text-transform:uppercase}
        .rr-contact-copy{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;margin:0 0 62px}
        .rr-contact-copy p{margin:0 0 24px}
        .rr-contact-copy p:last-child{margin-bottom:0}
        .rr-contact-copy strong{font-weight:800;text-transform:uppercase}
        .rr-contact-copy a{border-bottom:1px solid currentColor;color:inherit;text-decoration:none}
        .rr-contact-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px 16px}
        .rr-contact-field{display:block}
        .rr-contact-field-full{grid-column:1/-1}
        .rr-contact-field label{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}
        .rr-contact-field input,.rr-contact-field textarea{background:transparent;border:1px solid #d0d0d0;border-radius:0;box-sizing:border-box;color:#1c1c1c;font-family:Montserrat,Arial,sans-serif;font-size:15px;height:46px;outline:none;padding:0 13px;width:100%}
        .rr-contact-field textarea{height:119px;min-height:119px;padding-top:14px;resize:vertical}
        .rr-contact-field input::placeholder,.rr-contact-field textarea::placeholder{color:#6f6f6f;opacity:1}
        .rr-contact-field input:focus,.rr-contact-field textarea:focus{border-color:#1c1c1c}
        .rr-contact-submit{background:#1c1c1c;border:1px solid #1c1c1c;border-radius:0;color:#fff;cursor:pointer;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;grid-column:1/-1;height:46px;letter-spacing:0;margin-top:3px;padding:0 18px;text-transform:none;transition:background .2s ease,color .2s ease;width:100%}
        .rr-contact-submit:hover{background:#000;color:#fff}
        .rr-contact-status{color:#2e7d32;font-family:Montserrat,Arial,sans-serif;font-size:13px;grid-column:1/-1;margin:0;text-align:center}
        @media(max-width:620px){.rr-contact-shell{padding:78px 18px 64px}.rr-contact-title{font-size:22px;letter-spacing:.26em;margin-bottom:36px}.rr-contact-copy{font-size:14px;margin-bottom:44px}.rr-contact-form{grid-template-columns:1fr}}
      `}</style>

      <section className="rr-contact-shell" aria-labelledby="contact-title">
        <h1 className="rr-contact-title" id="contact-title">
          Contact Us
        </h1>
        <div className="rr-contact-copy">
          <p>Hello! We are available to assist you Monday to Friday, 10 am to 6 pm IST.</p>
          <p>
            <strong>Have a question about your order?</strong> Email{' '}
            <a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a>
          </p>
          <p>
            Please allow 1-2 business days for order processing and fulfillment. You will receive a confirmation once
            your Raw Radicles chocolates are ready for dispatch or pickup coordination.
          </p>
          <p>
            During product launches, restocks, gifting periods, and promotional campaigns, processing may take up to 3-4
            business days due to high volume.
          </p>
          <p>
            Transit times and delivery availability depend on your location. We pack our functional chocolate with care
            so every order reaches you in the best possible condition.
          </p>
          <p>
            For collaborations, corporate gifting, wellness events, or general enquiries, use the form below and our team
            will get back to you.
          </p>
        </div>
        <form className="rr-contact-form" onSubmit={submit}>
          <div className="rr-contact-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" placeholder="Name" autoComplete="name" required />
          </div>
          <div className="rr-contact-field">
            <label htmlFor="contact-email">E-mail</label>
            <input id="contact-email" name="email" type="email" placeholder="E-mail" autoComplete="email" required />
          </div>
          <div className="rr-contact-field rr-contact-field-full">
            <label htmlFor="contact-reason">Reason for contact</label>
            <input id="contact-reason" name="reason" type="text" placeholder="Reason for contact" />
          </div>
          <div className="rr-contact-field rr-contact-field-full">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" placeholder="Message" required />
          </div>
          <button className="rr-contact-submit" type="submit">
            Send message
          </button>
          {status ? <p className="rr-contact-status">{status}</p> : null}
        </form>
      </section>
    </main>
  )
}
