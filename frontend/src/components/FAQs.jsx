import { useState } from 'react'
import homepageData from '../data/homepage.json'

const homepageDefaults = homepageData && typeof homepageData === 'object' && !Array.isArray(homepageData) ? homepageData : {}

const fallbackFaqs = [
  {
    question: 'What Ayurvedic ingredients are in your chocolates?',
    answer: 'Our chocolates are infused with whole Ayurvedic herbs: Ashwagandha, Brahmi, and Chyawanaprash, blended with high-quality cacao.',
  },
  {
    question: 'Are your chocolates vegan and gluten-free?',
    answer: 'Our dark chocolate slabs are vegan. Our milk chocolate slabs contain dairy. None of our products contain gluten.',
  },
  {
    question: 'How much chocolate should I eat per day?',
    answer: 'We recommend enjoying 2-3 squares per day as part of a balanced diet.',
  },
]

const defaultFaqs = Array.isArray(homepageDefaults.faqs) && homepageDefaults.faqs.length ? homepageDefaults.faqs : fallbackFaqs

export default function FAQs({ faqs = defaultFaqs }) {
  const list = Array.isArray(faqs) && faqs.length ? faqs : defaultFaqs
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section className="rr-faqs" aria-labelledby="rr-faqs-title">
      <style>{`
        .rr-faqs{background:#efefef;padding:80px 24px;box-sizing:border-box}
        .rr-faqs-inner{max-width:860px;margin:0 auto}
        .rr-faqs-kicker{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:#b08850;text-align:center;margin:0 0 10px}
        .rr-faqs-title{font-family:Montserrat,Arial,sans-serif;font-size:28px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#202020;text-align:center;margin:0 0 48px;line-height:1.3}
        .rr-faqs-category{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:#202020;margin:0 0 16px}
        .rr-faqs-list{list-style:none;margin:0;padding:0;border-bottom:1px solid #d8d8d8}
        .rr-faq-item{border-top:1px solid #d8d8d8}
        .rr-faq-button{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:0;padding:22px 0;text-align:left;cursor:pointer;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:.02em;color:#1f1f1f}
        .rr-faq-button:focus-visible{outline:3px solid #b08850;outline-offset:4px}
        .rr-faq-icon{font-size:22px;font-weight:300;line-height:1;margin-left:16px;transition:transform .28s ease;flex:0 0 auto}
        .rr-faq-icon-open{transform:rotate(45deg)}
        .rr-faq-answer-wrap{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .36s ease,opacity .28s ease}
        .rr-faq-answer-wrap-open{grid-template-rows:1fr;opacity:1}
        .rr-faq-answer-inner{overflow:hidden}
        .rr-faq-answer{font-family:Montserrat,Arial,sans-serif;font-size:14px;line-height:1.7;color:#555;padding:0 0 22px;margin:0;transform:translateY(-8px);transition:transform .36s ease}
        .rr-faq-answer-wrap-open .rr-faq-answer{transform:translateY(0)}
        @media(max-width:700px){.rr-faqs{padding:62px 18px}.rr-faqs-title{font-size:22px;letter-spacing:.08em}.rr-faq-button{font-size:14px}}
      `}</style>
      <div className="rr-faqs-inner">
        <p className="rr-faqs-kicker">Need Help?</p>
        <h2 id="rr-faqs-title" className="rr-faqs-title">
          Frequently Asked Questions
        </h2>
        <p className="rr-faqs-category">Our Products</p>
        <ul className="rr-faqs-list">
          {list.map((faq, index) => {
            const isOpen = activeIndex === index
            const answerId = `rr-faq-answer-${index}`

            return (
              <li className="rr-faq-item" key={`${faq.question}-${index}`}>
                <button
                  className="rr-faq-button"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className={`rr-faq-icon ${isOpen ? 'rr-faq-icon-open' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
                <div className={`rr-faq-answer-wrap ${isOpen ? 'rr-faq-answer-wrap-open' : ''}`} id={answerId}>
                  <div className="rr-faq-answer-inner">
                    <p className="rr-faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
