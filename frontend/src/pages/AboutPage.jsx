import { useEffect, useRef, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

const aboutPanels = [
  {
    id: 'origin',
    index: 'i',
    label: 'Our Origin',
    heading: 'It started with a child saying no.',
    paragraphs: [
      <>
        A father handed his ten-year-old son an Ayurvedic remedy for a fever. The boy looked at the dull jar, the thick
        paste, the bitter smell, and refused. <span className="rr-about-pull">"Why can't I have something better?"</span>
      </>,
      'Dr. Dasharathraj Shetty had no answer. He had trusted this science his whole life. Now his own son found it old and unpleasant.',
      'One thought stayed with him. The medicine was never the problem. Everything around it was. The jar. The taste. The look. Ayurveda had not aged. Its presentation had. Raw Radicles began with that quiet realisation.',
    ],
  },
  {
    id: 'philosophy',
    index: 'ii',
    label: 'Our Philosophy',
    heading: 'Wellness should never feel like a punishment.',
    paragraphs: [
      'For too long, the Ayurvedic way meant holding your breath and swallowing something bitter. We did not accept that. Good for you and good to taste can live in the same bite.',
      'So we kept the science exactly as it should be and changed everything else. The form. The flavour. The feel in your hand. What you get is Ayurveda you actually look forward to.',
      <span className="rr-about-pull">Rooted in tradition. Made for the way you live now.</span>,
    ],
  },
  {
    id: 'source',
    index: 'iii',
    label: 'Sourcing & Craft',
    heading: 'Every formula carries a name and a lineage.',
    paragraphs: [
      'Our recipes come from Dr. Manu Sudhi and Dr. Vishnu, both from families that have practised Ayurveda for four generations. One trained in modern medicine and Ayurveda together. The other spent years making old formulations work for modern life.',
      'We make in small batches, so nothing is rushed and nothing loses its strength. No artificial preservatives. No synthetic additives. What goes in is what should go in.',
      <span className="rr-about-pull">This is the part you cannot see. It is the part that matters most.</span>,
    ],
  },
  {
    id: 'spirit',
    index: 'iv',
    label: 'The Lion & the Sun',
    heading: 'Our mark is a lion seated beneath the sun.',
    paragraphs: [
      'The lion sits calm, not because it is tired, but because it has nothing to prove. That is how we see this science. Strong, settled, sure of itself.',
      'The sun is older than all of us and rises every single day. Ancient source, new light. That is Ayurveda. Proven over centuries, made fresh for now.',
    ],
    hasEmblem: true,
  },
]

function getPanelFromHash() {
  if (typeof window === 'undefined') return aboutPanels[0].id
  const hash = window.location.hash.replace('#', '')
  return aboutPanels.some((panel) => panel.id === hash) ? hash : aboutPanels[0].id
}

export function AboutPage() {
  usePageTitle('About Us')
  const [activePanel, setActivePanel] = useState(getPanelFromHash)
  const [mobileAboutPanel, setMobileAboutPanel] = useState(null)
  const tabRefs = useRef([])

  useEffect(() => {
    const handleHashChange = () => {
      setActivePanel(getPanelFromHash())
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const showPanel = (id, updateHash = true) => {
    setActivePanel(id)

    if (updateHash && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}#${id}`)
    }
  }

  const showAboutPanel = (panel) => {
    showPanel(panel.id)

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
      setMobileAboutPanel(panel)
    }
  }

  const handleKeyDown = (event, index) => {
    const nextKeys = ['ArrowDown', 'ArrowRight']
    const previousKeys = ['ArrowUp', 'ArrowLeft']

    if (!nextKeys.includes(event.key) && !previousKeys.includes(event.key)) return

    event.preventDefault()
    const direction = nextKeys.includes(event.key) ? 1 : -1
    const nextIndex = (index + direction + aboutPanels.length) % aboutPanels.length
    const nextPanel = aboutPanels[nextIndex]

    tabRefs.current[nextIndex]?.focus()
    showPanel(nextPanel.id)
  }

  const closeMobileAboutPanel = () => {
    setMobileAboutPanel(null)
  }

  useEffect(() => {
    if (!mobileAboutPanel) return undefined

    const handleKeyUp = (event) => {
      if (event.key === 'Escape') {
        closeMobileAboutPanel()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [mobileAboutPanel])

  return (
    <main id="main" role="main" className="about-page-wrapper rr-about-page">
      <div className="rr-about-ambient" aria-hidden="true">
        <img src={asset('assets/RR_logo embossed_tm.png')} alt="" />
      </div>

      <section className="rr-about-stage" aria-labelledby="about-title">
        <div className="rr-about-index">
          <p className="rr-about-eyebrow">About Raw Radicles</p>
          <h1 id="about-title" className="rr-about-thesis">
            Ayurveda, in a form you will <span>want to keep close</span>.
          </h1>

          <ul className="rr-about-facets" role="tablist" aria-label="About sections">
            {aboutPanels.map((panel, index) => {
              const isActive = activePanel === panel.id

              return (
                <li key={panel.id}>
                  <button
                    ref={(node) => { tabRefs.current[index] = node }}
                    aria-controls={`about-panel-${panel.id}`}
                    aria-selected={isActive}
                    id={`about-tab-${panel.id}`}
                    onClick={() => showAboutPanel(panel)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                  >
                    <span className="rr-about-tab-index">{panel.index}</span>
                    {panel.label}
                    <span className="rr-about-tab-line" />
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="rr-about-tag">Leo & Sol / Strength and Light</p>
        </div>

        <div className="rr-about-emblem" aria-hidden="true">
          <div className="rr-about-emblem-ring" />
          <img src={asset('assets/RR_logo embossed_tm.png')} alt="" />
        </div>

        <div className="rr-about-panels">
          {aboutPanels.map((panel) => {
            const isActive = activePanel === panel.id

            return (
              <article
                aria-hidden={!isActive}
                aria-labelledby={`about-tab-${panel.id}`}
                className={`rr-about-panel ${isActive ? 'is-active' : ''} ${panel.hasEmblem ? 'rr-about-panel--spirit' : ''}`}
                id={`about-panel-${panel.id}`}
                key={panel.id}
                role="tabpanel"
              >
                <p className="rr-about-eyebrow">{panel.label}</p>
                <h2>{panel.heading}</h2>
                {panel.paragraphs.map((paragraph, index) => (
                  <p key={`${panel.id}-${index}`}>{paragraph}</p>
                ))}
                {panel.hasEmblem ? <p className="rr-about-leo">Leo & Sol</p> : null}
              </article>
            )
          })}
        </div>

        {mobileAboutPanel ? (
          <div className="rr-about-modal" role="presentation" onClick={closeMobileAboutPanel}>
            <article
              aria-labelledby="rr-about-modal-title"
              aria-modal="true"
              className="rr-about-modal-card"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <button
                aria-label="Close about details"
                className="rr-about-modal-close"
                onClick={closeMobileAboutPanel}
                type="button"
              >
                x
              </button>
              <p className="rr-about-eyebrow">{mobileAboutPanel.label}</p>
              <h2 id="rr-about-modal-title">{mobileAboutPanel.heading}</h2>
              {mobileAboutPanel.paragraphs.map((paragraph, index) => (
                <p key={`${mobileAboutPanel.id}-modal-${index}`}>{paragraph}</p>
              ))}
              {mobileAboutPanel.hasEmblem ? <p className="rr-about-leo">Leo & Sol</p> : null}
            </article>
          </div>
        ) : null}
      </section>
    </main>
  )
}
