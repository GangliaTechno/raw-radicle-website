import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useProducts } from '../hooks/useProducts.js'

const categoryLabelMap = {
  all: 'ALL',
  ashwagandha: 'ASHWAGANDHA',
  chyawanaprash: 'CHYAWANAPRASH',
  brahmi: 'BRAHMI',
}

const sortLabelMap = {
  'title-ascending': 'ALPHABETICALLY, A-Z',
  'title-descending': 'ALPHABETICALLY, Z-A',
  'price-ascending': 'PRICE, LOW TO HIGH',
  'price-descending': 'PRICE, HIGH TO LOW',
}

const DownIcon = () => (
  <svg className="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12" style={{ width: '12px', height: '8px', marginLeft: '8px' }}>
    <polyline fill="none" fillRule="evenodd" points="17 2 9.5 10 2 2" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
  </svg>
)

export function ProductsPage() {
  usePageTitle('All Products')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('title-ascending')
  const [desktopCount, setDesktopCount] = useState(3)
  const [mobileCount, setMobileCount] = useState(2)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const productList = useProducts()

  const products = useMemo(() => {
    const visible = category === 'all' ? [...productList] : productList.filter((product) => product.tags.includes(category))

    return visible.sort((a, b) => {
      if (sort === 'title-ascending') return a.name.localeCompare(b.name)
      if (sort === 'title-descending') return b.name.localeCompare(a.name)
      if (sort === 'price-ascending') return a.price - b.price
      if (sort === 'price-descending') return b.price - a.price
      return 0
    })
  }, [category, sort, productList])

  return (
    <main className="rr-collection-redesign" id="main" role="main">
      <style>{`
        .rr-collection-redesign{background:#efefef;color:#1c1c1c;min-height:100vh}
        .rr-collection-redesign .PageHeader{background:#000;padding:72px 20px 74px;border-bottom:1px solid #000;margin:0;display:flex;align-items:center;justify-content:center}
        .rr-collection-redesign .PageHeader .Container{max-width:none;width:100%;padding:0!important;margin:0!important;display:flex;align-items:center;justify-content:center}
        .rr-collection-redesign .SectionHeader{text-align:center;width:100%;display:flex;align-items:center;justify-content:center;margin:0!important}
        .rr-collection-redesign .SectionHeader__Heading{font-family:Montserrat,Arial,sans-serif;font-size:22px;font-weight:500;letter-spacing:.42em;text-transform:uppercase;color:#fff;margin:0;padding-left:.42em;text-align:center}
        .rr-collection-redesign .CollectionMain{background:#efefef}
        .rr-products-toolbar{height:56px;border-bottom:1px solid #d2d2d2;background:#efefef;display:flex;align-items:stretch;justify-content:space-between}
        .rr-layout-cell{width:116px;border-right:1px solid #d2d2d2;display:flex;align-items:center;justify-content:center}
        .rr-layout-switch{display:flex;align-items:center;gap:18px}
        .rr-layout-button{background:none;border:0;color:#1c1c1c;opacity:.28;padding:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
        .rr-layout-button.is-active{opacity:1}.rr-layout-button svg{width:18px;height:18px}
        .rr-toolbar-controls{margin-left:auto;display:flex;align-items:stretch;height:56px}
        .rr-toolbar-control{position:relative;display:flex;align-items:stretch}
        .rr-toolbar-button{height:56px;border:0;border-left:1px solid #d2d2d2;background:none;padding:0 34px;display:flex;align-items:center;justify-content:center;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:#777;white-space:nowrap;cursor:pointer}
        .rr-toolbar-sort .rr-toolbar-button{min-width:154px}.rr-toolbar-category .rr-toolbar-button{min-width:222px}
        .rr-toolbar-popover{position:absolute;top:56px;right:0;z-index:80;width:260px;background:#fff;border:1px solid #d2d2d2;box-shadow:0 14px 36px rgba(0,0,0,.12);opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease}
        .rr-toolbar-popover.is-open{opacity:1;visibility:visible;transform:translateY(0)}
        .rr-toolbar-popover-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #ededed;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
        .rr-toolbar-close{background:none;border:0;cursor:pointer;color:#1c1c1c;font-size:18px;line-height:1}
        .rr-toolbar-options{display:grid;padding:8px 0}
        .rr-toolbar-option{background:none;border:0;text-align:left;padding:13px 20px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#555;cursor:pointer}
        .rr-toolbar-option:hover,.rr-toolbar-option.is-selected{background:#f4f4f4;color:#1c1c1c}
        .rr-collection-redesign button:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rr-collection-redesign .CollectionInner{padding:52px 42px 54px}
        .rr-collection-redesign .CollectionInner__Products,.rr-collection-redesign .ProductListWrapper{width:100%}
        .rr-collection-redesign .ProductList{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:74px 104px;max-width:1560px;margin:0 auto}
        .rr-collection-redesign .ProductList[data-desktop-count="2"]{grid-template-columns:repeat(2,minmax(0,1fr));max-width:1120px}
        .rr-collection-redesign .Grid__Cell{width:100%!important;padding:0!important;margin:0!important}
        .rr-collection-redesign .ProductItem{background:transparent;text-align:center}
        .rr-collection-redesign .ProductItem__Wrapper{display:block}
        .rr-collection-redesign .ProductItem__LabelList,.rr-collection-redesign .ProductItem__ShopBtn,.rr-collection-redesign .ProductItem__DescriptionText{display:none!important}
        .rr-collection-redesign .ProductItem__ImageWrapper{display:block;max-width:430px;margin:0 auto 48px;text-decoration:none}
        .rr-collection-redesign .ProductItem__ImageWrapper .AspectRatio{aspect-ratio:1/1.03;padding-bottom:0!important;background:transparent!important;max-width:none!important}
        .rr-collection-redesign .ProductItem__Image{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:contain!important;display:block}
        .rr-collection-redesign .ProductItem__Image--secondary{opacity:0}
        .rr-collection-redesign .ProductItem__Info{padding:0;text-align:center}
        .rr-collection-redesign .ProductItem__Title{font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;line-height:1.4;margin:0 0 14px;color:#1f1f1f}
        .rr-collection-redesign .ProductItem__Title a{color:inherit;text-decoration:none}
        .rr-collection-redesign .ProductItem__PriceList{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#9a9a9a}
        .rr-collection-redesign .ProductItem__Price{color:#9a9a9a!important}
        @media(max-width:980px){.rr-collection-redesign .ProductList{grid-template-columns:repeat(2,minmax(0,1fr));gap:56px 34px}.rr-collection-redesign .CollectionInner{padding:62px 24px}.rr-toolbar-category .rr-toolbar-button{min-width:190px}.rr-toolbar-sort .rr-toolbar-button{min-width:132px}}
        @media(max-width:640px){.rr-collection-redesign .PageHeader{padding:42px 16px}.rr-collection-redesign .SectionHeader__Heading{font-size:18px;letter-spacing:.26em}.rr-products-toolbar{height:auto;flex-wrap:wrap}.rr-layout-cell{width:100%;height:50px;border-right:0;border-bottom:1px solid #d2d2d2}.rr-toolbar-controls{width:100%;height:50px}.rr-toolbar-control{width:50%}.rr-toolbar-button{height:50px;min-width:0!important;width:100%;padding:0 12px;font-size:10px;letter-spacing:.18em}.rr-toolbar-popover{top:50px;width:100%}.rr-collection-redesign .ProductList{grid-template-columns:repeat(2,minmax(0,1fr));gap:42px 18px}.rr-collection-redesign .ProductItem__ImageWrapper{margin-bottom:26px}.rr-collection-redesign .ProductItem__Title{font-size:10px;letter-spacing:.13em}.rr-collection-redesign .ProductItem__PriceList{font-size:9px;letter-spacing:.08em}.rr-collection-redesign .CollectionInner{padding:42px 14px}}
      `}</style>
      <section data-section-id="template--16772990435584__main" data-section-type="collection">
        <header className="PageHeader">
          <div className="Container">
            <div className="SectionHeader SectionHeader--center">
              <h1 className="SectionHeader__Heading Heading u-h1">All Products</h1>
            </div>
          </div>
        </header>

        <div className="CollectionMain">
          <div className="rr-products-toolbar">
            <div className="rr-layout-cell">
              <div className="rr-layout-switch hidden-phone">
                <button className={`rr-layout-button ${desktopCount === 2 ? 'is-active' : ''}`} type="button" aria-label="Show two products per row" onClick={() => setDesktopCount(2)}>
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z" fill="currentColor" />
                  </svg>
                </button>
                <button className={`rr-layout-button ${desktopCount === 3 ? 'is-active' : ''}`} type="button" aria-label="Show three products per row" onClick={() => setDesktopCount(3)}>
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M28 36v-8h8v8h-8zm0-22h8v8h-8v-8zm0-14h8v8h-8V0zM14 28h8v8h-8v-8zm0-14h8v8h-8v-8zm0-14h8v8h-8V0zM0 28h8v8H0v-8zm0-14h8v8H0v-8zM0 0h8v8H0V0z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div className="rr-layout-switch hidden-tablet-and-up">
                <button className={`rr-layout-button ${mobileCount === 1 ? 'is-active' : ''}`} type="button" aria-label="Show one product per row" onClick={() => setMobileCount(1)}>
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <rect fill="currentColor" height="36" width="36" />
                  </svg>
                </button>
                <button className={`rr-layout-button ${mobileCount === 2 ? 'is-active' : ''}`} type="button" aria-label="Show two products per row" onClick={() => setMobileCount(2)}>
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="rr-toolbar-controls">
              <div className="rr-toolbar-control rr-toolbar-sort">
                <button className="rr-toolbar-button" type="button" aria-expanded={sortOpen} aria-haspopup="true" onClick={() => { setSortOpen(!sortOpen); setCategoryOpen(false) }}>
                  Sort <DownIcon />
                </button>
                <div className={`rr-toolbar-popover ${sortOpen ? 'is-open' : ''}`} aria-hidden={!sortOpen}>
                  <div className="rr-toolbar-popover-header">
                    <span>Sort</span>
                    <button className="rr-toolbar-close" type="button" aria-label="Close sort menu" onClick={() => setSortOpen(false)}>
                      x
                    </button>
                  </div>
                  <div className="rr-toolbar-options">
                    {Object.entries(sortLabelMap).map(([key, label]) => (
                      <button className={`rr-toolbar-option ${sort === key ? 'is-selected' : ''}`} type="button" key={key} onClick={() => { setSort(key); setSortOpen(false) }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rr-toolbar-control rr-toolbar-category">
                <button className="rr-toolbar-button" type="button" aria-expanded={categoryOpen} aria-haspopup="true" onClick={() => { setCategoryOpen(!categoryOpen); setSortOpen(false) }}>
                  By Category <DownIcon />
                </button>
                <div className={`rr-toolbar-popover ${categoryOpen ? 'is-open' : ''}`} aria-hidden={!categoryOpen}>
                  <div className="rr-toolbar-popover-header">
                    <span>Category</span>
                    <button className="rr-toolbar-close" type="button" aria-label="Close category menu" onClick={() => setCategoryOpen(false)}>
                      x
                    </button>
                  </div>
                  <div className="rr-toolbar-options">
                    {Object.entries(categoryLabelMap).map(([key, label]) => (
                      <button className={`rr-toolbar-option ${category === key ? 'is-selected' : ''}`} type="button" key={key} onClick={() => { setCategory(key); setCategoryOpen(false) }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(categoryOpen || sortOpen) ? (
            <div
              className="Popover__Backdrop"
              onClick={() => {
                setCategoryOpen(false)
                setSortOpen(false)
              }}
              style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'transparent' }}
            />
          ) : null}

          <div className="CollectionInner">
            <div className="CollectionInner__Products">
              <div className="ProductListWrapper">
                <div className="ProductList ProductList--grid Grid" data-desktop-count={desktopCount} data-mobile-count={mobileCount}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
