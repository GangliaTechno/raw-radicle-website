import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assets.js'

const marketplaceLinks = [
  { name: 'Amazon', href: 'https://www.amazon.in/' },
  { name: 'Flipkart', href: 'https://www.flipkart.com/' },
  { name: 'Blinkit', href: 'https://blinkit.com/' },
]

const getBenefitChips = (product) => {
  const herb = String(product.herb || '').toLowerCase()

  if (herb.includes('ashwagandha')) return ['Calm', 'Energy', 'Adaptogenic']
  if (herb.includes('chyawanaprash')) return ['Immunity', 'Vitality', 'Daily ritual']
  if (herb.includes('brahmi')) return ['Focus', 'Memory', 'Clarity']

  return ['Natural', 'Vegetarian', 'Crafted']
}

function SwipeableGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1)
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const nextSlide = (e) => {
    e.stopPropagation()
    if (activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <div
      className="ProductQuickView__Gallery"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="ProductQuickView__GalleryTrack"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {images.map((imgUrl, idx) => (
          <div key={idx} className="ProductQuickView__GallerySlide">
            <img src={asset(imgUrl)} alt={`${name} - View ${idx + 1}`} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="ProductQuickView__GalleryArrow ProductQuickView__GalleryArrow--prev"
            onClick={prevSlide}
            disabled={activeIndex === 0}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="ProductQuickView__GalleryArrow ProductQuickView__GalleryArrow--next"
            onClick={nextSlide}
            disabled={activeIndex === images.length - 1}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="ProductQuickView__GalleryDots">
            {images.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`ProductQuickView__GalleryDot ${index === activeIndex ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const productPath = `/${product.id}`
  const benefitChips = getBenefitChips(product)

  useEffect(() => {
    if (!quickViewOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setQuickViewOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [quickViewOpen])

  const labelHtml = product.badge ? (
    <div className="ProductItem__LabelList">
      <span className="ProductItem__Label ProductItem__Label--onSale Heading Text--subdued">
        {product.badge}
      </span>
    </div>
  ) : null

  return (
    <div className="Grid__Cell 1/2--phone 1/2--tablet-and-up 1/3--desk">
      <div className="ProductItem" style={{ visibility: 'visible', opacity: 1 }}>
        <div className="ProductItem__Wrapper">
          {labelHtml}
          <div className="ProductItem__ImageShell">
            <Link className="ProductItem__ImageWrapper" to={productPath} aria-label={`View ${product.name}`}>
              <div className="AspectRatio AspectRatio--withFallback" style={{ maxWidth: '2000px', paddingBottom: '100.0%', '--aspect-ratio': '1.0' }}>
                <img alt={product.name} className="ProductItem__Image" src={asset(product.image)} />
                <img alt={`${product.name} Hover`} className="ProductItem__Image ProductItem__Image--secondary" src={asset(product.hoverImage || product.image)} />
                <span className="Image__Loader" />
              </div>
            </Link>
            <button
              className={`ProductItem__QuickButton ${quickViewOpen ? 'is-open' : ''}`}
              type="button"
              aria-expanded={quickViewOpen}
              aria-label={`Quick view ${product.name}`}
              onClick={() => setQuickViewOpen((open) => !open)}
            >
              <span aria-hidden="true">{quickViewOpen ? '-' : '+'}</span>
            </button>
          </div>
          {quickViewOpen ? (
            <div className="ProductQuickViewOverlay" role="presentation" onMouseDown={() => setQuickViewOpen(false)}>
              <div className={`ProductQuickView ${quickViewOpen ? 'is-open' : ''}`} aria-hidden={!quickViewOpen}>
                <button className="ProductQuickView__Close" type="button" aria-label="Close quick view" onClick={() => setQuickViewOpen(false)}>
                  x
                </button>
                <div className="ProductQuickView__Inner" role="dialog" aria-modal="true" aria-labelledby={`quick-view-${product.id}`} onMouseDown={(event) => event.stopPropagation()}>
                  <div className="ProductQuickView__Media">
                    <SwipeableGallery images={product.gallery && product.gallery.length ? product.gallery : [product.image, product.hoverImage || product.image]} name={product.name} />
                  </div>
                  <div className="ProductQuickView__Content">
                    <p className="ProductQuickView__Eyebrow">{product.badge || 'Quick view'}</p>
                    <h3 className="ProductQuickView__Title" id={`quick-view-${product.id}`}>{product.shortName || product.name}</h3>
                    <p className="ProductQuickView__Price">MRP ₹ {parseFloat(product.price).toFixed(2)}</p>
                    <div className="ProductQuickView__Chips" aria-label="Product benefits">
                      {benefitChips.map((chip) => (
                        <span key={chip}>{chip}</span>
                      ))}
                    </div>
                    <p className="ProductQuickView__Description">{product.description}</p>
                    <dl className="ProductQuickView__Meta">
                      <div>
                        <dt>Cocoa</dt>
                        <dd>{product.cocoa || product.type}</dd>
                      </div>
                      <div>
                        <dt>Blend</dt>
                        <dd>{product.content || product.herb}</dd>
                      </div>
                    </dl>
                    <div className="ProductQuickView__Marketplaces" aria-label="Shop on marketplaces">
                      {marketplaceLinks.map((marketplace) => (
                        <a href={marketplace.href} key={marketplace.name} rel="noreferrer" target="_blank">
                          {marketplace.name}
                        </a>
                      ))}
                    </div>
                    <Link className="ProductQuickView__Link" to={productPath}>
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="ProductItem__Info ProductItem__Info--center">
            <h2 className="ProductItem__Title Heading">
              <Link to={productPath}>{product.name.toUpperCase()}</Link>
            </h2>
            <p className="ProductItem__DescriptionText" style={{ fontSize: '11px', color: '#7f7f7f', margin: '4px 0 8px', lineHeight: '1.4', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
              {product.description || ''}
            </p>
            <div className="ProductItem__PriceList Heading">
              <span className="ProductItem__Price Price Text--subdued">MRP ₹ {parseFloat(product.price).toFixed(2)} (inclusive of all taxes)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
