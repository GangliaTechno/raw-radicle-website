import { useEffect, useMemo, useRef, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useJson } from '../hooks/useJson.js'
import { fallbackHome } from '../data/home.js'
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

const expertDetails = [
  {
    id: 'expert-1',
    index: 'i',
    heading: 'Clinical perspective for women-centric wellness.',
    paragraphs: [
      'Dr. Nozer Sheriar brings a clinical perspective to women-centric wellness, helping Raw Radicles think carefully about everyday nourishment, balance, and trust.',
    ],
  },
  {
    id: 'expert-2',
    index: 'ii',
    heading: 'Traditional knowledge, translated for daily life.',
    paragraphs: [
      'Dr. Anjali Desai adds an Ayurvedic lens to the team, focusing on the relationship between traditional botanical knowledge and modern daily routines.',
    ],
  },
  {
    id: 'expert-3',
    index: 'iii',
    heading: 'A balanced view of indulgence and nutrition.',
    paragraphs: [
      'Dr. Rohan Mehra brings nutrition-focused thinking to Raw Radicles, helping the brand frame indulgence and wellness as part of a balanced lifestyle.',
    ],
  },
  {
    id: 'expert-4',
    index: 'iv',
    heading: 'Skin-health awareness with a wellness-first view.',
    paragraphs: [
      'Dr. Sarah Khan contributes skin-health awareness and a wellness-first perspective to the expert panel.',
    ],
  },
  {
    id: 'expert-5',
    index: 'v',
    heading: 'Realistic routines for modern wellness.',
    paragraphs: [
      'Dr. Vikram Singh brings a broad wellness perspective, helping Raw Radicles stay focused on routines that are realistic, premium, and sustainable.',
    ],
  },
]

function getPanelFromHash() {
  if (typeof window === 'undefined') return aboutPanels[0].id
  const hash = window.location.hash.replace('#', '')
  return aboutPanels.some((panel) => panel.id === hash) ? hash : aboutPanels[0].id
}

function getExpertFromHash() {
  if (typeof window === 'undefined') return expertDetails[0].id
  const hash = window.location.hash.replace('#', '')
  const expert = expertDetails.find((item) => item.id === hash)
  return expert ? expert.id : expertDetails[0].id
}

export function AboutPage() {
  usePageTitle('About Us')
  const home = useJson('/api/homepage', fallbackHome)
  const expertsList = useMemo(() => {
    const homepageExperts = home.experts?.length ? home.experts : fallbackHome.experts

    return expertDetails.map((details, index) => {
      const homepageExpert = homepageExperts[index] || fallbackHome.experts[index] || {}
      const name = homepageExpert.name || fallbackHome.experts[index]?.name || ''

      return {
        ...details,
        name,
        role: homepageExpert.role || fallbackHome.experts[index]?.role || '',
        image: homepageExpert.image || fallbackHome.experts[index]?.image || '',
        paragraphs: details.paragraphs.map((paragraph) => paragraph.replace(/^Dr\.\s+[A-Za-z\s.]+/, name)),
      }
    })
  }, [home.experts])

  const [activeView, setActiveView] = useState(() => {
    if (typeof window === 'undefined') return 'about'
    return window.location.hash.replace('#', '').startsWith('expert-') ? 'experts' : 'about'
  })
  const [activePanel, setActivePanel] = useState(getPanelFromHash)
  const [activeExpert, setActiveExpert] = useState(getExpertFromHash)
  const tabRefs = useRef([])
  const expertTabRefs = useRef([])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')

      if (hash.startsWith('expert-')) {
        setActiveView('experts')
        setActiveExpert(getExpertFromHash())
        return
      }

      setActiveView('about')
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

  const handleExpertKeyDown = (event, index) => {
    const nextKeys = ['ArrowDown', 'ArrowRight']
    const previousKeys = ['ArrowUp', 'ArrowLeft']

    if (!nextKeys.includes(event.key) && !previousKeys.includes(event.key)) return

    event.preventDefault()
    const direction = nextKeys.includes(event.key) ? 1 : -1
    const nextIndex = (index + direction + expertDetails.length) % expertDetails.length

    expertTabRefs.current[nextIndex]?.focus()
    setActiveExpert(expertDetails[nextIndex].id)
  }

  return (
    <main id="main" role="main" className="about-page-wrapper rr-about-page">
      <div className="rr-about-ambient" aria-hidden="true">
        <img src={asset('assets/RR_logo embossed_tm.png')} alt="" />
      </div>

      {/* ── Top view switcher ───────────────────────────────────────── */}
      <div className="rr-view-switcher" role="tablist" aria-label="Page sections">
        <button
          role="tab"
          aria-selected={activeView === 'about'}
          className={`rr-view-switcher__btn ${activeView === 'about' ? 'is-active' : ''}`}
          onClick={() => setActiveView('about')}
          type="button"
        >
          About Raw Radicles
        </button>
        <button
          role="tab"
          aria-selected={activeView === 'experts'}
          className={`rr-view-switcher__btn ${activeView === 'experts' ? 'is-active' : ''}`}
          onClick={() => setActiveView('experts')}
          type="button"
        >
          Our Experts
        </button>
      </div>

      {/* ── About view ─────────────────────────────────────────────── */}
      {activeView === 'about' && (
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
                      onClick={() => showPanel(panel.id)}
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
        </section>
      )}

      {/* ── Experts view ───────────────────────────────────────────── */}
      {activeView === 'experts' && (
        <section className="rr-about-stage rr-experts-stage" aria-labelledby="experts-title">
          <div className="rr-about-index">
            <p className="rr-about-eyebrow">The People Behind the Science</p>
            <h1 id="experts-title" className="rr-about-thesis">
              Meet the experts <span>behind Raw Radicles</span>.
            </h1>

            <ul className="rr-about-facets rr-experts-facets" role="tablist" aria-label="Our experts">
              {expertsList.map((expert, index) => {
                const isActive = activeExpert === expert.id

                return (
                  <li key={expert.id}>
                    <button
                      ref={(node) => { expertTabRefs.current[index] = node }}
                      aria-controls={`expert-panel-${expert.id}`}
                      aria-selected={isActive}
                      id={`expert-tab-${expert.id}`}
                      onClick={() => setActiveExpert(expert.id)}
                      onKeyDown={(event) => handleExpertKeyDown(event, index)}
                      role="tab"
                      tabIndex={isActive ? 0 : -1}
                      type="button"
                    >
                      <span className="rr-about-tab-index">{expert.index}</span>
                      <span className="rr-experts-tab-name">
                        <span className="rr-experts-tab-fullname">{expert.name}</span>
                        <span className="rr-experts-tab-role">{expert.role}</span>
                      </span>
                      <span className="rr-about-tab-line" />
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="rr-about-tag">Raw Radicles / Our Formulation Team</p>
          </div>

          <div className="rr-about-panels">
            {expertsList.map((expert) => {
              const isActive = activeExpert === expert.id

              return (
                <article
                  aria-hidden={!isActive}
                  aria-labelledby={`expert-tab-${expert.id}`}
                  className={`rr-about-panel rr-expert-panel ${isActive ? 'is-active' : ''}`}
                  id={`expert-panel-${expert.id}`}
                  key={expert.id}
                  role="tabpanel"
                >
                  <div className="rr-expert-panel-photo-wrap">
                    <img
                      className="rr-expert-panel-photo"
                      src={asset(expert.image)}
                      alt={expert.name}
                    />
                  </div>
                  <div className="rr-expert-panel-copy">
                    <p className="rr-about-eyebrow">{expert.role}</p>
                    <h2>{expert.heading}</h2>
                    <p className="rr-expert-panel-name">{expert.name}</p>
                    {expert.paragraphs.map((paragraph, index) => (
                      <p key={`${expert.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}