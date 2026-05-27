import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import HomepageSections from '../HomepageSections.jsx'
import { fallbackHome } from '../data/home.js'
import { useJson } from '../hooks/useJson.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useProducts } from '../hooks/useProducts.js'
import { asset } from '../utils/assets.js'

export function HomePage() {
  usePageTitle('Raw Radicles')
  const home = useJson('/api/homepage', fallbackHome)
  const productList = useProducts()

  // States
  const [bannerIndex, setBannerIndex] = useState(0)
  const [selectedVideoUrl] = useState(() => {
    const videos = [
      'assets/uploads/cms-1776053796791-newad.mp4',
      'assets/uploads/Raw-radicles-video.mp4',
      'assets/uploads/1775732620137-ad.mp4',
      'assets/uploads/1775732688489-ad1.mp4',
    ]
    const randomIndex = Math.floor(Math.random() * videos.length)
    return videos[randomIndex]
  })

  // Carousel Refs
  const productSliderRef = useRef(null)

  // Fallback images for static banner
  const bannerImages = [
    'assets/RRbanner.png',
    'assets/RRbanner_4.png',
    'assets/RRbanner_2.png',
    'assets/RRbanner_3.png',
  ]

  // Banner AutoPlay
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [bannerIndex, bannerImages.length])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [productSlideStep, setProductSlideStep] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const lastClickTime = useRef(0)
  const productAutoplayRef = useRef(null)

  // Measure the exact card width + gap so transforms move by one product.
  useEffect(() => {
    if (!productSliderRef.current || productList.length === 0) return

    const slider = productSliderRef.current
    const measureProductSlide = () => {
      const firstCard = slider.querySelector('.MvstProducts__Card')
      if (!firstCard) return

      const styles = window.getComputedStyle(slider)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0
      setProductSlideStep(firstCard.getBoundingClientRect().width + gap)
    }

    measureProductSlide()

    const resizeObserver = new ResizeObserver(measureProductSlide)
    resizeObserver.observe(slider)
    window.addEventListener('resize', measureProductSlide)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', measureProductSlide)
    }
  }, [productList.length])

  // Reset and start autoplay
  const resetProductAutoplay = useCallback(() => {
    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
    productAutoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 && productList.length > 0 ? productList.length : prev) + 1)
    }, 3500)
  }, [productList.length])

  // Manage Autoplay lifetime
  useEffect(() => {
    if (productList.length > 0) {
      resetProductAutoplay()
    }
    return () => {
      if (productAutoplayRef.current) {
        clearInterval(productAutoplayRef.current)
      }
    }
  }, [productList.length, resetProductAutoplay])

  // Re-enable transition after instant wrapping reflow
  useEffect(() => {
    if (!transitionEnabled) {
      if (productSliderRef.current) {
        // Trigger browser reflow to apply new offset immediately with transition: none
        productSliderRef.current.offsetHeight
      }
      const timer = setTimeout(() => {
        setTransitionEnabled(true)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [transitionEnabled])

  // Seamless wrap-around at cloned boundaries
  const handleTransitionEnd = () => {
    const N = productList.length
    if (N === 0) return
    const activeIndex = currentIndex === 0 ? N : currentIndex

    if (activeIndex >= 2 * N) {
      setTransitionEnabled(false)
      setCurrentIndex(activeIndex - N)
    } else if (activeIndex < N) {
      setTransitionEnabled(false)
      setCurrentIndex(activeIndex + N)
    }
  }

  // Manual scrolling helpers (Arrow navigation)
  const scrollProducts = (direction) => {
    const now = Date.now()
    if (now - lastClickTime.current < 500) return
    lastClickTime.current = now

    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
    setCurrentIndex((prev) => (prev === 0 && productList.length > 0 ? productList.length : prev) + direction)
    resetProductAutoplay()
  }

  const handleSliderMouseEnter = () => {
    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
  }

  const handleSliderMouseLeave = () => {
    if (productList.length > 0) {
      resetProductAutoplay()
    }
  }

  const visibleProductIndex = productList.length > 0 && currentIndex === 0 ? productList.length : currentIndex
  const homepageSections = {
    experts: home.experts?.length ? home.experts : fallbackHome.experts,
    testimonials: {
      videos: home.testimonials?.videos?.length ? home.testimonials.videos : fallbackHome.testimonials.videos,
    },
    instagram: home.instagram?.posts?.length
      ? {
          profileUrl: home.instagram.profileUrl || 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz',
          posts: home.instagram.posts.map((post, index) => ({
            id: post.id || `ig-${index}`,
            image: post.image || post.imageUrl,
            postUrl: post.postUrl || post.link || home.instagram.profileUrl || 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz',
          })),
        }
      : fallbackHome.instagram,
    shopOn: home.shopOn || fallbackHome.shopOn,
    faqs: home.faqs?.length ? home.faqs : fallbackHome.faqs,
  }

  return (
    <>
      {/* 1. Static Banner Slideshow */}
      <div className="shopify-section shopify-section--static-banner">
        <section className="StaticBanner">
          <div className="StaticBanner__Viewport">
            <div
              className="StaticBanner__Track"
              style={{
                transform: `translateX(-${bannerIndex * 100}%)`,
                display: 'flex',
                transition: 'transform 0.65s ease',
              }}
            >
              {bannerImages.map((img, idx) => (
                <div
                  className={`StaticBanner__Slide ${idx === bannerIndex ? 'is-active' : ''}`}
                  key={img}
                >
                  <img src={asset(img)} alt="Raw Radicles Banner" className="StaticBanner__Image" />
                </div>
              ))}
            </div>
          </div>
          <div className="StaticBanner__Content">
            <Link to="/products" className="StaticBanner__Button">
              SHOP NOW
            </Link>
          </div>
          <button
            type="button"
            className="StaticBanner__Arrow StaticBanner__Arrow--prev"
            aria-label="Previous banner"
            onClick={() => setBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="StaticBanner__Arrow StaticBanner__Arrow--next"
            aria-label="Next banner"
            onClick={() => setBannerIndex((prev) => (prev + 1) % bannerImages.length)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="StaticBanner__Dots" aria-label="Banner navigation">
            {bannerImages.map((_, idx) => (
              <button
                type="button"
                className={`StaticBanner__Dot ${idx === bannerIndex ? 'is-active' : ''}`}
                aria-label={`Show banner ${idx + 1}`}
                key={idx}
                onClick={() => setBannerIndex(idx)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 2. All Our Chocolates Product Slider */}
      <div className="shopify-section shopify-section--bordered" id="shopify-section-template--16772990828800__featured-collections">
        <section className="MvstProducts">
          <div className="MvstProducts__Header">
            <h2 className="MvstProducts__Title">ALL OUR CHOCOLATES</h2>
          </div>

          <div
            className="MvstProducts__Carousel"
            style={{ position: 'relative' }}
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
          >
            <div
              className="MvstProducts__Slider"
              ref={productSliderRef}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(-${visibleProductIndex * productSlideStep}px, 0, 0)`,
                transition: transitionEnabled ? 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
              }}
            >
              {[...productList, ...productList, ...productList].map((product, idx) => (
                <div
                  className="MvstProducts__Card"
                  key={`${product.id}-${idx}`}
                >
                  <Link className="MvstProducts__CardInner" to={`/${product.id}`}>
                    <div className="MvstProducts__ImageWrap">
                      <img
                        className="MvstProducts__Image"
                        src={asset(product.image)}
                        alt={product.name}
                      />
                      <img
                        className="MvstProducts__Image MvstProducts__Image--secondary"
                        src={asset(product.hoverImage || product.image)}
                        alt={`${product.name} Hover`}
                      />
                    </div>
                    <h3 className="MvstProducts__Name">{product.name.toUpperCase()}</h3>
                    <p className="MvstProducts__Price">Rs. {product.price}</p>
                  </Link>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="MvstProducts__Arrow MvstProducts__Arrow--prev"
              aria-label="Previous products"
              onClick={() => scrollProducts(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="MvstProducts__Arrow MvstProducts__Arrow--next"
              aria-label="Next products"
              onClick={() => scrollProducts(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="MvstProducts__ViewAll">
            <Link to="/products" className="MvstProducts__ViewAllBtn">
              VIEW ALL
            </Link>
          </div>
        </section>
      </div>

      {/* 3. Ingredient Marquee Ticker */}
      <div className="shopify-section" id="shopify-section-marquee">
        <section className="ScrollingBar">
          <div className="ScrollingBar__Content">
            {['CHYAWANAPRASH', 'ASHWAGANDHA', 'BRAHMI', 'DARK CHOCOLATES', 'MILK CHOCOLATES'].map((item, index) => (
              <span className="ScrollingBar__Item" key={index}>
                {item}
              </span>
            ))}
            {['CHYAWANAPRASH', 'ASHWAGANDHA', 'BRAHMI', 'DARK CHOCOLATES', 'MILK CHOCOLATES'].map((item, index) => (
              <span className="ScrollingBar__Item" key={index + 5}>
                {item}
              </span>
            ))}
            {['CHYAWANAPRASH', 'ASHWAGANDHA', 'BRAHMI', 'DARK CHOCOLATES', 'MILK CHOCOLATES'].map((item, index) => (
              <span className="ScrollingBar__Item" key={index + 10}>
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Video Hero */}
      <div className="shopify-section" id="shopify-section-video-hero">
        <section className="VideoHero">
          <div className="VideoHero__VideoWrapper">
            <video
              className="VideoHero__Video"
              autoPlay
              muted
              loop
              playsInline
              poster={asset('assets/pure_chocolate_hero.png')}
            >
              <source src={asset(selectedVideoUrl)} type="video/mp4" />
            </video>
            <div className="VideoHero__Overlay" />
          </div>
          <div className="VideoHero__ContentOverlay">
            <header className="VideoHero__Text">
              <p className="VideoHero__Subheading">
                {home.videoHero?.subtitle || fallbackHome.videoHero.subtitle}
              </p>
              <h2 className="VideoHero__Heading">
                {home.videoHero?.title || fallbackHome.videoHero.title}
              </h2>
            </header>
          </div>
        </section>
      </div>

      <HomepageSections data={homepageSections} />
    </>
  )
}
