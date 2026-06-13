import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assets.js'

const footerData = {
  about: {
    title: 'Brand',
    text: 'A premium Ayurvedic wellness company',
    tagline: 'Same Herbs, New Happiness',
    logo: 'assets/RR_logo embossed_tm.png',
  },
  linkGroups: [
    {
      title: 'Our Chocolates',
      links: [
        { label: 'Ashwagandha Chocolate', href: '/products' },
        { label: 'Brahmi Chocolate', href: '/products' },
        { label: 'Chyawanaprash Chocolate', href: '/products' },
        { label: 'View All Products', href: '/products' },
      ],
    },
    {
      title: 'Buy Now',
      links: [
        { label: 'Blinkit', href: 'https://blinkit.com/' },
        { label: 'Zepto', href: 'https://www.zeptonow.com/' },
        { label: 'Swiggy Instamart', href: 'https://www.swiggy.com/instamart' },
        { label: 'Amazon', href: 'https://www.amazon.in/' },
        { label: 'Flipkart', href: 'https://www.flipkart.com/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Experts', href: '/about#expert-1' },
        { label: 'Blog / The Raw Journal', href: '/blog' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ],
  newsletter: {
    title: 'Newsletter',
    text: 'Get updated on new products and stories',
    button: 'Subscribe',
  },
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/raw-radicles/', icon: 'linkedin' },
  ],
  legal: [
    { label: '© Raw Radicles', href: '/' },
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms & Conditions', href: '/' },
  ],
}

const VisaLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#FFFFFF"/>
    <text x="19" y="16" fill="#1A1F71" fontSize="9" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" textAnchor="middle">VISA</text>
  </svg>
)

const MastercardLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#222222"/>
    <circle cx="15" cy="12" r="5" fill="#EB001B"/>
    <circle cx="23" cy="12" r="5" fill="#F79E1B" fillOpacity="0.85"/>
  </svg>
)

const AmexLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#0070CD"/>
    <text x="19" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">AMEX</text>
  </svg>
)

const ApplePayLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#FFFFFF"/>
    <path d="M12.5 15.5c-.8 0-1.4-.5-1.8-.5c-.4 0-.9.4-1.6.4c-.9 0-1.7-.5-2.2-1.3c-.9-1.6-.2-4 1.4-4c.8 0 1.5.5 1.9.5c.4 0 1.3-.6 2.2-.5c.4 0 1.5.1 2.2 1.1c-.1.1-1.3.8-1.3 2.3c0 1.8 1.5 2.4 1.5 2.5c-.1.2-.2.5-.5.9c-.4.6-.9 1.1-1.8 1.1z M12.5 9c0-.9.7-1.8 1.6-1.9c.1.9-.7 1.8-1.6 1.9z" fill="#000000"/>
    <text x="21" y="15.5" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">Pay</text>
  </svg>
)

const GooglePayLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#FFFFFF"/>
    <path d="M11 11v2h2.5c-.1.6-.7 1.7-2.5 1.7-1.6 0-3-1.3-3-3s1.4-3 3-3c.9 0 1.5.4 1.9.8l1.5-1.5C13.5 7 12.3 6.5 11 6.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5c3.2 0 5.3-2.2 5.3-5.4 0-.4 0-.7-.1-.9H11z" fill="#4285F4"/>
    <text x="17" y="15" fill="#5F6368" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Pay</text>
  </svg>
)

const DiscoverLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#1C2B59"/>
    <text x="19" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">DISC<tspan fill="#FF6600">O</tspan>VER</text>
  </svg>
)

const DinersClubLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#0079C1"/>
    <text x="19" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">DINERS</text>
  </svg>
)

const ShopPayLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#5A31F4"/>
    <text x="19" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">shop Pay</text>
  </svg>
)

const MetaLogo = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#FFFFFF"/>
    <text x="19" y="15" fill="#0064E0" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Meta</text>
  </svg>
)

const PaymentIcon = ({ type }) => {
  switch (type) {
    case 'AMEX':
      return <AmexLogo />
    case 'Pay':
      return <ApplePayLogo />
    case 'D':
      return <DinersClubLogo />
    case 'DISCOVER':
      return <DiscoverLogo />
    case 'Meta':
      return <MetaLogo />
    case 'G Pay':
      return <GooglePayLogo />
    case 'Mastercard':
      return <MastercardLogo />
    case 'Shop Pay':
      return <ShopPayLogo />
    case 'VISA':
      return <VisaLogo />
    default:
      return <span className="rr-payment-default-text">{type}</span>
  }
}

const PAYMENT_METHODS = [
  'AMEX',
  'Pay',
  'D',
  'DISCOVER',
  'Meta',
  'G Pay',
  'Mastercard',
  'Shop Pay',
  'VISA',
]

const isExternal = (href = '') => /^https?:\/\//.test(href)

const FooterLink = ({ href, children, className, ...props }) =>
  isExternal(href) ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <Link className={className} to={href || '/'} {...props}>
      {children}
    </Link>
  )

const SocialIcon = ({ icon }) => {
  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M29.219 2.188c.83 0 1.503.67 1.503 1.499v24.626c0 .83-.673 1.5-1.503 1.5H2.781c-.83 0-1.502-.67-1.502-1.5V3.687c0-.829.672-1.499 1.502-1.499h26.438zM9.825 25.688v-12.01H5.827v12.01h3.998zM7.828 12.055c1.278 0 2.313-1.026 2.313-2.292 0-1.266-1.035-2.292-2.313-2.292-1.277 0-2.312 1.026-2.312 2.292 0 1.266 1.035 2.292 2.312 2.292zM25.684 25.688v-6.887c0-3.69-1.971-5.407-4.595-5.407-2.117 0-3.066 1.166-3.596 1.986v-1.702h-3.998c.053 1.127 0 12.01 0 12.01h3.998v-6.708c0-.358.026-.717.132-.973.288-.717.947-1.462 2.05-1.462 1.446 0 2.023 1.103 2.023 2.72v6.425h3.986z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z" />
    </svg>
  )
}

export default function Footer({ data = footerData }) {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('')

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return

    setNewsletterStatus('Submitting...')

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: trimmedEmail,
          phone: '',
        }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      setEmail('')
      setNewsletterStatus('Thank you for subscribing.')
    } catch {
      setNewsletterStatus('Please try again.')
    }
  }

  return (
    <footer className="rr-footer" role="contentinfo">
      <style>{`
        .rr-footer{background:#1c1c1c;border:2px solid #333;padding:18px 66px 12px;color:#f3f3f3;box-sizing:border-box;min-height:auto;display:flex;flex-direction:column}
        .rr-footer-inner{display:grid;grid-template-columns:1.35fr .95fr .95fr .95fr 1.05fr;gap:32px;width:100%;max-width:none;margin:0 auto;text-align:left;align-items:start}
        .rr-footer-title{font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;margin:0 0 9px;color:#f5f5f5;line-height:1.2}
        .rr-footer-text{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.5;color:#f1f1f1;margin:0 0 8px;max-width:250px}
        .rr-footer-tagline{font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b59055;margin:0 0 12px;line-height:1.45}
        .rr-footer-logo{width:245px;max-width:100%;height:auto;display:block;margin:0 0 6px;opacity:1}
        .rr-footer-social{display:flex;gap:28px;list-style:none;margin:0;padding:0}
        .rr-footer-social-link{display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;color:#fff}
        .rr-footer-social-link svg{width:15px;height:15px;fill:currentColor}
        .rr-footer-social-link:focus-visible,.rr-footer-link:focus-visible,.rr-footer-legal-link:focus-visible,.rr-footer-submit:focus-visible{outline:3px solid #b08850;outline-offset:4px}
        .rr-footer-links{list-style:none;margin:0;padding:0;display:grid;gap:6px}
        .rr-footer-link{font-family:Montserrat,Arial,sans-serif;font-size:14px;font-weight:400;color:#f1f1f1;text-decoration:none;line-height:1.35}
        .rr-footer-inner>nav .rr-footer-title,.rr-footer-inner>section:not(:first-child) .rr-footer-title{margin-bottom:20px}
        .rr-footer-inner>nav .rr-footer-links{gap:14px}
        .rr-footer-inner>section:not(:first-child) .rr-footer-text{margin-bottom:20px}
        .rr-footer-inner>section:not(:first-child) .rr-footer-submit{margin-top:8px}
        .rr-footer-link:hover,.rr-footer-legal-link:hover,.rr-footer-submit:hover{color:#bfbfbf}
        .rr-footer-submit{align-items:center;background:#1c1c1c;border:1px solid #f5f5f5;border-radius:0;color:#f5f5f5;cursor:pointer;display:inline-flex;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;justify-content:center;letter-spacing:.18em;min-height:42px;padding:10px 14px;text-transform:uppercase;text-decoration:none;transition:background .25s ease,color .25s ease,border-color .25s ease;width:100%}
        .rr-footer-submit:hover{background:#f5f5f5;border-color:#f5f5f5;color:#1c1c1c}
        .rr-footer-newsletter-form{display:grid;gap:10px;max-width:260px}
        .rr-footer .rr-footer-newsletter-input{background:transparent!important;border:1px solid rgba(255,255,255,.72)!important;border-radius:0!important;color:#f5f5f5!important;font-family:Montserrat,Arial,sans-serif;font-size:13px;min-height:42px;padding:10px 12px;width:100%;box-sizing:border-box}
        .rr-footer .rr-footer-newsletter-input::placeholder{color:rgba(255,255,255,.68)!important}
        .rr-footer .rr-footer-newsletter-input:focus{background:#1c1c1c!important;border-color:#f5f5f5!important;outline:0}
        .rr-footer-newsletter-status{font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#d8c49a;margin:0;min-height:18px}
        .rr-footer-aside{margin:-62px 0 0;display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%}
        .rr-footer-legal{display:flex;align-items:center;justify-content:flex-end;gap:7px;flex-wrap:wrap;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#f3f3f3;text-align:right}
        .rr-footer-legal-link{color:#f3f3f3;text-decoration:none}
        @media(max-width:1180px){.rr-footer{padding:20px 32px 14px}.rr-footer-inner{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 32px}.rr-footer-aside{margin-top:8px;width:100%}}
        @media(max-width:900px){.rr-footer-inner{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:760px){.rr-footer-aside{align-items:flex-start;flex-direction:column;justify-content:flex-start;margin:8px 0 0;width:100%}.rr-footer-legal{justify-content:flex-start;text-align:left}}
        @media(max-width:640px){.rr-footer{padding:18px 20px 14px}.rr-footer-inner{grid-template-columns:1fr;gap:18px}.rr-footer-text{max-width:none}.rr-footer-logo{width:220px}}
      `}</style>
      <div className="rr-footer-inner">
        <section aria-labelledby="rr-footer-about">
          <h2 id="rr-footer-about" className="rr-footer-title">
            {data.about.title}
          </h2>
          <p className="rr-footer-text">{data.about.text}</p>
          <p className="rr-footer-tagline">{data.about.tagline}</p>
          <FooterLink href="/" aria-label="Raw Radicles home">
            <img className="rr-footer-logo" src={asset(data.about.logo)} alt="Raw Radicles Logo" loading="lazy" />
          </FooterLink>
        </section>

        {data.linkGroups.map((group) => (
          <nav aria-labelledby={`rr-footer-${group.title}`} key={group.title}>
            <h2 id={`rr-footer-${group.title}`} className="rr-footer-title">
              {group.title}
            </h2>
            <ul className="rr-footer-links">
              {group.links.map((link) => (
                <li key={link.label}>
                  <FooterLink className={`rr-footer-link ${group.title === 'Buy Now' ? 'rr-footer-link--marketplace' : ''}`} href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <section aria-labelledby="rr-footer-newsletter">
          <h2 id="rr-footer-newsletter" className="rr-footer-title">
            {data.newsletter.title}
          </h2>
          <p className="rr-footer-text">{data.newsletter.text}</p>
          <form className="rr-footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              className="rr-footer-newsletter-input"
              type="email"
              name="email"
              placeholder="Email address"
              aria-label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button className="rr-footer-submit" type="submit">
              {data.newsletter.button}
            </button>
            <p className="rr-footer-newsletter-status" aria-live="polite">{newsletterStatus}</p>
          </form>
        </section>
      </div>

      <div className="rr-footer-aside">
        <ul className="rr-footer-social" aria-label="Social links">
          {data.social.map((item) => (
            <li key={item.label}>
              <FooterLink className="rr-footer-social-link" href={item.href} aria-label={item.label}>
                <SocialIcon icon={item.icon} />
              </FooterLink>
            </li>
          ))}
        </ul>
        <div className="rr-footer-legal">
          {data.legal.map((link, index) => (
            <React.Fragment key={link.label}>
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <FooterLink className="rr-footer-legal-link" href={link.href}>
                {link.label}
              </FooterLink>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  )
}
