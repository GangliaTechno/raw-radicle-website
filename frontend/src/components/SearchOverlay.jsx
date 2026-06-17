import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { asset } from '../utils/assets.js'

export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const products = useProducts()

  const matches = useMemo(() => {
    if (!query.trim()) return []
    return products.filter((product) =>
      [product.name, product.description].join(' ').toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, products])

  useEffect(() => {
    if (!open) {
      const activeEl = document.activeElement
      const searchContainer = document.getElementById('Search')
      if (searchContainer && searchContainer.contains(activeEl)) {
        const searchBtn = document.querySelector('button[aria-label="Search"]')
        if (searchBtn) {
          searchBtn.focus()
        } else {
          activeEl.blur()
        }
      }
    }
  }, [open])

  return (
    <>
      <div aria-hidden={!open} className="Search" id="Search">
        <div className="Search__Inner">
          <div className="Search__SearchBar">
            <div className="Search__Icon">
              <svg className="Icon Icon--search-desktop" role="presentation" viewBox="0 0 21 21">
                <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="square" strokeWidth="2" transform="translate(1 1)">
                  <path d="M18 18l-5.7096-5.7096" />
                  <circle cx="7.2" cy="7.2" r="7.2" />
                </g>
              </svg>
            </div>
            <form className="Search__Form" onSubmit={(e) => e.preventDefault()}>
              <input
                aria-label="Search..."
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                autoFocus
                className="Search__Input Heading"
                placeholder="SEARCH FOR..."
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <button aria-label="Close search" className="Search__Close" type="button" onClick={onClose}>
              <svg className="Icon Icon--close" role="presentation" viewBox="0 0 16 14" style={{ width: '20px', height: '20px' }}>
                <path d="M15 0L1 14m14 0L1 0" fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="Search__Results" style={{ display: 'block', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}>
            {!query.trim() ? (
              <div className="Search__Suggestions">
                <h3 className="Search__SectionTitle">Suggestions</h3>
                <div id="search-suggestions-list">
                  {products.slice(0, 4).map((product) => (
                    <Link key={product.id} to={`/${product.id}`} className="Search__SuggestionItem" onClick={onClose}>
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="Search__ResultItems" id="search-results-list" style={{ display: 'grid', gap: '8px' }}>
                {matches.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                    No products found
                  </div>
                ) : (
                  matches.map((product) => (
                    <Link key={product.id} to={`/${product.id}`} className="search-result-item" onClick={onClose}>
                      <img src={asset(product.image)} className="search-result-image" alt={product.name} />
                      <div className="search-result-info">
                        <span className="search-result-title">{product.name.toUpperCase()}</span>
                        <span className="search-result-price">MRP ₹ {parseFloat(product.price).toFixed(2)} (inclusive of all taxes)</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {open && <div className="Search__Backdrop" onClick={onClose} style={{ zIndex: 900, position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />}
    </>
  )
}
