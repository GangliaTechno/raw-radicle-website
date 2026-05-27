import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

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
      <section className="FeatureText FeatureText--imageLeft bg--light">
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
      <section className="FeatureText FeatureText--imageRight bg--dark">
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
      <section className="Grid--luxury">
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

      {/* Block 4: Final Symbolism - Image Right */}
      <section className="FeatureText FeatureText--imageRight bg--light">
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
