import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

const expertDetails = [
  {
    id: 'expert-1',
    name: 'Dr. Nozer Sheriar',
    role: 'Gynaecologist',
    image: 'assets/experts/doctor1.png',
    summary:
      'Dr. Nozer Sheriar brings a clinical perspective to women-centric wellness, helping Raw Radicles think carefully about everyday nourishment, balance, and trust.',
    details: [
      'His guidance supports the brand in presenting functional wellness in a way that feels practical, responsible, and easy to understand.',
      'He helps shape conversations around modern health needs while keeping the consumer experience simple and approachable.',
    ],
  },
  {
    id: 'expert-2',
    name: 'Dr. Anjali Desai',
    role: 'Ayurvedic Specialist',
    image: 'assets/experts/doctor2.png',
    summary:
      'Dr. Anjali Desai adds an Ayurvedic lens to the team, focusing on the relationship between traditional botanical knowledge and modern daily routines.',
    details: [
      'Her perspective helps connect classical wellness ideas with product formats that fit naturally into contemporary life.',
      'She supports ingredient storytelling, ritual clarity, and the balance between authenticity and accessibility.',
    ],
  },
  {
    id: 'expert-3',
    name: 'Dr. Rohan Mehra',
    role: 'Nutritionist',
    image: 'assets/experts/doctor3.png',
    summary:
      'Dr. Rohan Mehra brings nutrition-focused thinking to Raw Radicles, helping the brand frame indulgence and wellness as part of a balanced lifestyle.',
    details: [
      'His role supports product communication around mindful consumption, daily habits, and ingredient awareness.',
      'He helps keep the experience rooted in practical choices rather than complicated wellness routines.',
    ],
  },
  {
    id: 'expert-4',
    name: 'Dr. Sarah Khan',
    role: 'Dermatologist',
    image: 'assets/experts/doctor4.png',
    summary:
      'Dr. Sarah Khan contributes skin-health awareness and a wellness-first perspective to the expert panel.',
    details: [
      'Her input helps the team consider how lifestyle, nutrition, and consistency can support a more holistic view of wellbeing.',
      'She strengthens the brand focus on everyday care, confidence, and informed product experiences.',
    ],
  },
  {
    id: 'expert-5',
    name: 'Dr. Vikram Singh',
    role: 'Wellness Expert',
    image: 'assets/experts/doctor5.png',
    summary:
      'Dr. Vikram Singh brings a broad wellness perspective, helping Raw Radicles stay focused on routines that are realistic, premium, and sustainable.',
    details: [
      'His guidance supports the brand mission of making wellness feel less clinical and more enjoyable.',
      'He helps connect product experience, lifestyle habits, and consumer trust into one clear wellness philosophy.',
    ],
  },
]

export function AboutPage() {
  usePageTitle('About Us')

  return (
    <main id="main" role="main" className="about-page-wrapper">
      {/* Hero Section */}
      <header className="PrestigeHero">
        <div className="SectionHeader">
          <h1 className="PrestigeHero__Heading">About Us</h1>
          <p className="PrestigeHero__Subtext">A premium wellness company.</p>
        </div>
      </header>

      {/* Block 1: Image Left, Text Right (Light Gray background) */}
      <section className="FeatureText FeatureText--imageLeft bg--light" id="origin">
        <div className="FeatureText__ImageWrapper">
          <img src={asset('assets/adark/adark-2.png')} alt="Our Origin" />
        </div>
        <div className="FeatureText__Content">
          <div className="FeatureText__Inner">
            <header className="SectionHeader">
              <h3 className="SectionHeader__SubHeading">Our Origin</h3>
              <h2 className="SectionHeader__Heading">A Realization That Sparked a Movement</h2>
              <div className="Rte">
                <p>
                  One evening, <strong>Dr. Dasharathraj K Shetty</strong>, a thought leader in technology management
                  and an influential mentor, faced an unexpected moment of reflection.
                </p>
                <p>
                  His 10-year-old son, unwell with a mild fever and digestive issues, needed a remedy. As always, Dr.
                  Shetty turned to his trusted medical advisor, <strong>Dr. Manu Sudhi</strong>—the Chairman of
                  Dashapatmaja Solutions Pvt. Ltd., a PhD scholar, and a rare expert in both Modern Medicine (MBBS, MD
                  Emergency Medicine) and Ayurveda (BAMS), coming from a fourth-generation Ayurvedic family.
                </p>
                <p>
                  Following Dr. Manu’s prescription, Dr. Shetty prepared a traditional Ayurvedic powder. However, as he
                  handed it to his son, he was met with unexpected resistance: <i>“Papa, Ayurveda is boring! It looks
                  old and tastes bad. Why can’t I have something better?”</i>
                </p>
                <p>
                  Dr. Shetty was left speechless. He looked at the old glass jar with its formula that had stood the
                  test of time but failed the modern age. The science of Ayurveda was timeless, but its delivery had
                  stayed stuck in the past.
                </p>
              </div>
            </header>
          </div>
        </div>
      </section>

      {/* Block 2: Text Left, Image Right (Dark background) */}
      <section className="FeatureText FeatureText--imageRight bg--dark" id="philosophy">
        <div className="FeatureText__Content">
          <div className="FeatureText__Inner">
            <header className="SectionHeader">
              <h3 className="SectionHeader__SubHeading">Our Philosophy</h3>
              <h2 className="SectionHeader__Heading">Elevating Every Journey</h2>
              <div className="Rte">
                <p>
                  Determined to bridge this gap, Dr. Shetty united a team of visionaries. He teamed up with <strong>Dr.
                  Manu Sudhi</strong>, whose dual expertise provided the medical foundation for modernized Ayurveda.
                </p>
                <p>
                  They were joined by <strong>Mr. Shreepathi</strong>, a seasoned CEO with experience scaling
                  world-class companies, <strong>Namesh Malarout</strong>, a results-oriented strategist with an eye for
                  innovation, and <strong>Ms. Anusha Pai</strong>, an award-winning creative who understood how to
                  translate ancient values into a modern visual language.
                </p>
                <p>
                  Together, they vowed to create wellness that is <strong>portable, powerful, and premium.</strong>
                </p>
              </div>
            </header>
          </div>
        </div>
        <div className="FeatureText__ImageWrapper">
          <img src={asset('assets/pure_chocolate_hero.png')} alt="Our Philosophy" />
        </div>
      </section>

      {/* Block 3: Image Left, Text Right (Light Gray background) */}
      <section className="FeatureText FeatureText--imageLeft bg--light">
        <div className="FeatureText__ImageWrapper">
          <img src={asset('assets/bmilk/bmilk-3.png')} alt="Identity" />
        </div>
        <div className="FeatureText__Content">
          <div className="FeatureText__Inner">
            <header className="SectionHeader">
              <h3 className="SectionHeader__SubHeading">The Final Piece</h3>
              <h2 className="SectionHeader__Heading">Authenticity in Product</h2>
              <div className="Rte">
                <p>
                  The journey reached its zenith with <strong>Dr. Vishnu</strong>, a fourth-generation practitioner.
                  His years of researching modernized, authentic formulations provided the final piece of the puzzle.
                </p>
                <p>
                  He focused on "Rawness"—eliminating the need for artificial preservatives and weird pastes,
                  redefining Ayurveda as a form of luxury wellness that fits seamlessly into modern life without
                  compromising core principles.
                </p>
                <p>
                  We believe in wellness reborn—science that honors the past while embracing the future.
                </p>
              </div>
            </header>
          </div>
        </div>
      </section>

      {/* Site Standards Grid Section */}
      <section className="Grid--luxury" id="quality">
        <div className="GridItem--luxury">
          <header className="SectionHeader">
            <h3 className="SectionHeader__SubHeading">Small-Batch</h3>
            <h2 className="SectionHeader__Heading">Quality Production</h2>
            <div className="Rte">
              <p>Prioritizing potency over mass production, ensuring every formulation meets our elite standards.</p>
            </div>
          </header>
        </div>
        <div className="GridItem--luxury">
          <header className="SectionHeader">
            <h3 className="SectionHeader__SubHeading">Modern</h3>
            <h2 className="SectionHeader__Heading">Accessibility</h2>
            <div className="Rte">
              <p>Portable and easy to use. No more complicated preparations—just pure Ayurvedic power.</p>
            </div>
          </header>
        </div>
        <div className="GridItem--luxury">
          <header className="SectionHeader">
            <h3 className="SectionHeader__SubHeading">Pure</h3>
            <h2 className="SectionHeader__Heading">Integrity</h2>
            <div className="Rte">
              <p>100% natural. No synthetic additives or artificial preservatives. Reborn for today.</p>
            </div>
          </header>
        </div>
      </section>

      <section className="ExpertDetails" id="experts">
        <style>{`
          .ExpertDetails{background:#f4f4f4;padding:72px 0 0}
          .ExpertDetails__Header{max-width:940px;margin:0 auto 46px;padding:0 24px;text-align:center}
          .ExpertDetails__Eyebrow{font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8a6a3f;margin:0 0 16px}
          .ExpertDetails__Title{font-family:Montserrat,Arial,sans-serif;font-size:34px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#202020;margin:0 0 18px;line-height:1.3}
          .ExpertDetails__Intro{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.8;color:#666;margin:0 auto;max-width:720px}
          .ExpertDetails .FeatureText{scroll-margin-top:120px;height:min(620px,82vh);min-height:0}
          .ExpertDetails .FeatureText__Content{padding:42px 7%}
          .ExpertDetails .FeatureText__Inner{max-width:560px}
          .ExpertDetails .FeatureText__ImageWrapper img{object-position:top center}
          .ExpertDetails .SectionHeader__Heading{font-size:clamp(24px,2.2vw,34px);line-height:1.22;margin-bottom:18px}
          .ExpertDetails .Rte p,.ExpertDetails__List li{font-size:14px;line-height:1.65}
          .ExpertDetails__Role{display:block;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a6a3f;margin:0 0 16px}
          .ExpertDetails__List{margin:16px 0 0;padding:0;list-style:none}
          .ExpertDetails__List li{position:relative;margin:0 0 10px;padding-left:22px}
          .ExpertDetails__List li:before{content:"";position:absolute;left:0;top:.72em;width:7px;height:7px;border-radius:50%;background:#b08850}
          @media(max-width:900px){.ExpertDetails{padding-top:58px}.ExpertDetails__Title{font-size:24px;letter-spacing:.1em}.ExpertDetails__Header{margin-bottom:34px}.ExpertDetails .FeatureText{height:auto;min-height:0;scroll-margin-top:92px}.ExpertDetails .FeatureText__ImageWrapper{min-height:280px!important}.ExpertDetails .FeatureText__ImageWrapper img{height:320px}.ExpertDetails .FeatureText__Content{padding:30px 22px}}
        `}</style>
        <div className="ExpertDetails__Header">
          <p className="ExpertDetails__Eyebrow">Our Expert Panel</p>
          <h2 className="ExpertDetails__Title">Guided by Specialist Insight</h2>
          <p className="ExpertDetails__Intro">
            The Raw Radicles expert panel helps bridge traditional wellness, modern nutrition, everyday health, and
            consumer trust.
          </p>
        </div>

        {expertDetails.map((expert, index) => {
          const image = (
            <div className="FeatureText__ImageWrapper">
              <img src={asset(expert.image)} alt={expert.name} />
            </div>
          )
          const content = (
            <div className="FeatureText__Content">
              <div className="FeatureText__Inner">
                <header className="SectionHeader">
                  <h3 className="SectionHeader__SubHeading">Expert Profile</h3>
                  <h2 className="SectionHeader__Heading">{expert.name}</h2>
                  <span className="ExpertDetails__Role">{expert.role}</span>
                  <div className="Rte">
                    <p>{expert.summary}</p>
                    <ul className="ExpertDetails__List">
                      {expert.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </header>
              </div>
            </div>
          )

          return (
            <section
              className={`FeatureText ${index % 2 === 0 ? 'FeatureText--imageLeft' : 'FeatureText--imageRight'} ${index % 2 === 0 ? 'bg--light' : 'bg--dark'}`}
              id={expert.id}
              key={expert.id}
            >
              {index % 2 === 0 ? (
                <>
                  {image}
                  {content}
                </>
              ) : (
                <>
                  {content}
                  {image}
                </>
              )}
            </section>
          )
        })}
      </section>

      {/* Block 4: Final Symbolism - Image Right */}
      <section className="FeatureText FeatureText--imageRight bg--light" id="spirit">
        <div className="FeatureText__Content">
          <div className="FeatureText__Inner">
            <header className="SectionHeader">
              <h3 className="SectionHeader__SubHeading">Our Spirit</h3>
              <h2 className="SectionHeader__Heading">The Lion and the Sun</h2>
              <div className="Rte">
                <p>
                  The Sitting Lion represents strength and calm resilience. The Sun symbolizes energy and
                  enlightenment—a new dawn for global wellness.
                </p>
                <div style={{ marginTop: '60px' }}>
                  <div className="SectionHeader__Heading" style={{ letterSpacing: '0.5em', fontSize: '18px', margin: 0, fontWeight: '600' }}>
                    JAI HIND
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
        <div className="FeatureText__ImageWrapper">
          <img
            src={asset('assets/RR_Logo-1.png')}
            alt="Lion and Sun"
            style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain', margin: 'auto' }}
          />
        </div>
      </section>
    </main>
  )
}
