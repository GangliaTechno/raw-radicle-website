import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')?.toLowerCase() || 'all'
  const category = Object.keys(categoryLabelMap).includes(requestedCategory) ? requestedCategory : 'all'
  const [sort, setSort] = useState('title-ascending')
  const [desktopCount, setDesktopCount] = useState(3)
  const [mobileCount, setMobileCount] = useState(2)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const productList = useProducts()
  const pageHeading = category === 'all' ? 'All Products' : `${categoryLabelMap[category]} Chocolate`

  usePageTitle(pageHeading)

  const chooseCategory = (nextCategory) => {
    setCategoryOpen(false)
    setSortOpen(false)

    if (nextCategory === 'all') {
      setSearchParams({})
      return
    }

    setSearchParams({ category: nextCategory })
  }

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
        .rr-collection-redesign .ProductItem__Wrapper{display:block;position:relative}
        .rr-collection-redesign .ProductItem__LabelList,.rr-collection-redesign .ProductItem__ShopBtn,.rr-collection-redesign .ProductItem__DescriptionText{display:none!important}
        .rr-collection-redesign .ProductItem__ImageShell{position:relative;width:100%;max-width:430px;margin:0 auto 48px}
        .rr-collection-redesign .ProductItem__ImageWrapper{display:block;text-decoration:none;border-radius:12px !important;overflow:hidden !important}
        .rr-collection-redesign .ProductItem__ImageWrapper .AspectRatio{aspect-ratio:1/1.03;padding-bottom:0!important;background:transparent!important;max-width:none!important}
        .rr-collection-redesign .ProductItem__Image{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:contain!important;display:block;border-radius:12px !important;opacity:1!important;transform:scale(1)!important;transform-origin:center;transition:opacity 0.35s cubic-bezier(.37,0,.13,1), transform 0.4s cubic-bezier(.22,1,.36,1), filter 0.35s cubic-bezier(.37,0,.13,1) !important;will-change:opacity,transform,filter}
        .rr-collection-redesign .ProductItem__Image:not(.ProductItem__Image--secondary){filter:blur(0)!important}
        .rr-collection-redesign .ProductItem__Image--secondary{opacity:0!important;filter:blur(3px)!important;transform:scale(1.012)!important}
        .rr-collection-redesign .ProductItem__ImageShell:hover .ProductItem__Image:not(.ProductItem__Image--secondary),.rr-collection-redesign .ProductItem__ImageShell:focus-within .ProductItem__Image:not(.ProductItem__Image--secondary){opacity:0!important;filter:blur(3px)!important;transform:scale(1.012)!important}
        .rr-collection-redesign .ProductItem__ImageShell:hover .ProductItem__Image--secondary,.rr-collection-redesign .ProductItem__ImageShell:focus-within .ProductItem__Image--secondary{opacity:1!important;filter:blur(0)!important;transform:scale(1)!important}
        .rr-collection-redesign .ProductItem__QuickButton{position:absolute;right:16px;bottom:16px;z-index:12;width:44px;height:44px;border:1px solid rgba(17,17,17,.16);border-radius:0;background:#fff;color:#111;display:inline-flex;align-items:center;justify-content:center;font-family:Montserrat,Arial,sans-serif;font-size:27px;font-weight:300;line-height:1;box-shadow:0 12px 28px rgba(0,0,0,.12);cursor:pointer;opacity:0;transform:translateY(10px);transition:opacity .22s ease,transform .22s ease,background .2s ease,color .2s ease,border-color .2s ease}
        .rr-collection-redesign .ProductItem__QuickButton span{display:block;transform:translateY(-1px)}
        .rr-collection-redesign .ProductItem__ImageShell:hover .ProductItem__QuickButton,.rr-collection-redesign .ProductItem__ImageShell:focus-within .ProductItem__QuickButton,.rr-collection-redesign .ProductItem__QuickButton.is-open{opacity:1;transform:translateY(0) scale(1)}
        .rr-collection-redesign .ProductItem__QuickButton:hover,.rr-collection-redesign .ProductItem__QuickButton.is-open{background:#111;color:#fff;border-color:#111}
        .rr-collection-redesign .ProductQuickViewOverlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.42);display:flex;align-items:center;justify-content:center;padding:28px;animation:rrQuickBackdrop .22s ease both}
        .rr-collection-redesign .ProductQuickView{position:relative;width:min(800px,calc(100vw - 56px));min-height:350px;background:#fff;border:1px solid #d8d8d8;box-shadow:0 28px 76px rgba(0,0,0,.28);text-align:left;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(22px) scale(.965);transition:opacity .28s cubic-bezier(.22,1,.36,1),visibility .28s ease,transform .28s cubic-bezier(.22,1,.36,1)}
        .rr-collection-redesign .ProductQuickView.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1)}
        @keyframes rrQuickBackdrop{from{opacity:0}to{opacity:1}}
        .rr-collection-redesign .ProductQuickView__Inner{display:grid;grid-template-columns:minmax(230px,300px) minmax(0,1fr);gap:0;min-height:330px}
        .rr-collection-redesign .ProductQuickView__Close{position:absolute;top:14px;right:14px;z-index:2;width:34px;height:34px;border:1px solid #e5e5e5;background:#fff;color:#111;font-size:18px;line-height:1;cursor:pointer}
        .rr-collection-redesign .ProductQuickView__Media{background:#f6f6f6;border-right:1px solid #e7e7e7;display:flex;align-items:center;justify-content:center;padding:28px}
        .rr-collection-redesign .ProductQuickView__Media img{width:100%;height:100%;max-height:270px;object-fit:contain;display:block}
        .rr-collection-redesign .ProductQuickView__Content{padding:38px 42px 34px;min-width:0}
        .rr-collection-redesign .ProductQuickView__Eyebrow{margin:0 40px 9px 0;font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#8b8b8b}
        .rr-collection-redesign .ProductQuickView__Title{margin:0 40px 9px 0;font-family:Montserrat,Arial,sans-serif;font-size:18px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;line-height:1.35;color:#111}
        .rr-collection-redesign .ProductQuickView__Price{margin:0 0 17px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#7c7c7c}
        .rr-collection-redesign .ProductQuickView__Chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 16px}
        .rr-collection-redesign .ProductQuickView__Chips span{display:inline-flex;align-items:center;min-height:25px;border:1px solid #dedede;background:#f7f7f7;padding:0 9px;font-family:Montserrat,Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#333}
        .rr-collection-redesign .ProductQuickView__Description{margin:0 0 18px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:400;line-height:1.75;color:#585858}
        .rr-collection-redesign .ProductQuickView__Meta{display:grid;gap:0;margin:0 0 22px;border-top:1px solid #e6e6e6}
        .rr-collection-redesign .ProductQuickView__Meta div{min-width:0;display:grid;grid-template-columns:84px minmax(0,1fr);gap:18px;align-items:start;border-bottom:1px solid #e6e6e6;padding:12px 0}
        .rr-collection-redesign .ProductQuickView__Meta dt{font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#909090}
        .rr-collection-redesign .ProductQuickView__Meta dd{margin:0;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:500;line-height:1.45;color:#222}
        .rr-collection-redesign .ProductQuickView__Marketplaces{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 12px}
        .rr-collection-redesign .ProductQuickView__Marketplaces a{display:flex;align-items:center;justify-content:center;min-height:36px;border:1px solid #d9d9d9;color:#222;text-decoration:none;font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:#fff}
        .rr-collection-redesign .ProductQuickView__Marketplaces a:hover{border-color:#111;background:#f5f5f5}
        .rr-collection-redesign .ProductQuickView__Link{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;background:#111;color:#fff;text-decoration:none;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
        .rr-collection-redesign .ProductQuickView__Link:hover{background:#333;color:#fff}
        .rr-collection-redesign .ProductItem__Info{padding:0;text-align:center}
        .rr-collection-redesign .ProductItem__Title{font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;line-height:1.4;margin:0 0 14px;color:#1f1f1f}
        .rr-collection-redesign .ProductItem__Title a{color:inherit;text-decoration:none}
        .rr-collection-redesign .ProductItem__PriceList{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#9a9a9a}
        .rr-collection-redesign .ProductItem__Price{color:#9a9a9a!important}
        @media(max-width:980px){.rr-collection-redesign .ProductList{grid-template-columns:repeat(2,minmax(0,1fr));gap:56px 34px}.rr-collection-redesign .CollectionInner{padding:62px 24px}.rr-toolbar-category .rr-toolbar-button{min-width:190px}.rr-toolbar-sort .rr-toolbar-button{min-width:132px}.rr-collection-redesign .ProductItem__ImageWrapper,.rr-collection-redesign .ProductItem__Image{border-radius:0 !important}.rr-collection-redesign .ProductItem__QuickButton{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:640px){.rr-collection-redesign .PageHeader{padding:42px 16px}.rr-collection-redesign .SectionHeader__Heading{font-size:18px;letter-spacing:.26em}.rr-products-toolbar{height:auto;flex-wrap:wrap}.rr-layout-cell{width:100%;height:50px;border-right:0;border-bottom:1px solid #d2d2d2}.rr-toolbar-controls{width:100%;height:50px}.rr-toolbar-control{width:50%}.rr-toolbar-button{height:50px;min-width:0!important;width:100%;padding:0 12px;font-size:10px;letter-spacing:.18em}.rr-toolbar-popover{top:50px;width:100%}.rr-collection-redesign .ProductList{grid-template-columns:repeat(2,minmax(0,1fr));gap:42px 18px}.rr-collection-redesign .ProductItem__ImageShell{margin-bottom:26px}.rr-collection-redesign .ProductItem__QuickButton{right:10px;bottom:10px;width:38px;height:38px;font-size:23px}.rr-collection-redesign .ProductQuickViewOverlay{align-items:center;padding:16px}.rr-collection-redesign .ProductQuickView{width:100%;min-height:0;max-height:calc(100vh - 32px);overflow:auto;transform:translateY(18px) scale(.98)}.rr-collection-redesign .ProductQuickView.is-open{transform:translateY(0) scale(1)}.rr-collection-redesign .ProductQuickView__Inner{grid-template-columns:1fr;min-height:0}.rr-collection-redesign .ProductQuickView__Media{border-right:0;border-bottom:1px solid #e7e7e7;padding:20px;min-height:160px}.rr-collection-redesign .ProductQuickView__Media img{max-height:160px}.rr-collection-redesign .ProductQuickView__Content{padding:24px}.rr-collection-redesign .ProductQuickView__Title{font-size:15px;letter-spacing:.1em}.rr-collection-redesign .ProductQuickView__Description{font-size:11px}.rr-collection-redesign .ProductQuickView__Meta div{grid-template-columns:1fr;gap:5px}.rr-collection-redesign .ProductQuickView__Marketplaces{grid-template-columns:1fr}.rr-collection-redesign .ProductQuickView__Link{width:100%;box-sizing:border-box}.rr-collection-redesign .ProductItem__Title{font-size:10px;letter-spacing:.13em}.rr-collection-redesign .ProductItem__PriceList{font-size:9px;letter-spacing:.08em}.rr-collection-redesign .CollectionInner{padding:42px 14px}}
      `}</style>
      <section data-section-id="template--16772990435584__main" data-section-type="collection">
        <header className="PageHeader">
          <div className="Container">
            <div className="SectionHeader SectionHeader--center">
              <h1 className="SectionHeader__Heading Heading u-h1">{pageHeading}</h1>
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
                      <button className={`rr-toolbar-option ${category === key ? 'is-selected' : ''}`} type="button" key={key} onClick={() => chooseCategory(key)}>
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
