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
                    <img src={asset(product.image)} alt={product.name} />
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
