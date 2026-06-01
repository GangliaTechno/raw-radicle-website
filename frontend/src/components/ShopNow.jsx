import homepageData from '../data/homepage.json'
import { asset } from '../utils/assets.js'

const homepageDefaults = homepageData && typeof homepageData === 'object' && !Array.isArray(homepageData) ? homepageData : {}

const fallbackShopOn = {
  title: 'SHOP ON',
  columns: [
    {
      title: 'Quick Commerce',
      items: [
        { name: 'Blinkit', image: 'assets/bkit.png', link: 'https://blinkit.com/' },
        { name: 'Zepto', image: 'assets/zep.png', link: 'https://www.zeptonow.com/' },
        { name: 'Instamart', image: 'assets/imart.png', link: 'https://www.swiggy.com/instamart' },
      ],
    },
    {
      title: 'Ecommerce',
      items: [
        { name: 'Amazon', image: 'assets/azon.png', link: 'https://www.amazon.in/' },
        { name: 'Flipkart', image: 'assets/fkart.png', link: 'https://www.flipkart.com/' },
      ],
    },
  ],
}

const defaultShopOn = homepageDefaults.shopOn || fallbackShopOn

const marketplaceLinks = {
  blinkit: 'https://blinkit.com/',
  zepto: 'https://www.zeptonow.com/',
  instamart: 'https://www.swiggy.com/instamart',
  amazon: 'https://www.amazon.in/',
  flipkart: 'https://www.flipkart.com/',
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export default function ShopNow({ shopOn = defaultShopOn }) {
  const data = shopOn || defaultShopOn
  const columns = data.columns || data.categories || []

  return (
    <section className="rr-shop-now" aria-labelledby="rr-shop-now-title">
      <style>{`
        .rr-shop-now{background:transparent;padding:70px 24px 96px;box-sizing:border-box}
        .rr-shop-now-title{font-family:Montserrat,Arial,sans-serif;font-size:31px;font-weight:400;letter-spacing:14px;text-align:center;text-transform:uppercase;color:#202020;margin:0 0 62px;line-height:1.2}
        .rr-shop-now-wrap{display:grid;grid-template-columns:1fr 1fr;gap:130px;max-width:840px;margin:0 auto}
        .rr-shop-column{padding:0;box-sizing:border-box}
        .rr-shop-column-title{font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1f1f1f;text-align:center;margin:0 0 48px}
        .rr-shop-grid{display:grid;grid-template-columns:repeat(3,74px);justify-content:center;gap:52px;list-style:none;margin:0;padding:0}
        .rr-shop-grid[data-count="2"]{grid-template-columns:repeat(2,74px);gap:70px;max-width:none;margin:0 auto}
        .rr-shop-tile{display:flex;flex-direction:column;align-items:center;text-decoration:none;color:#1d1d1d;border:0;background:transparent;padding:0;min-height:128px;box-sizing:border-box;transition:transform .25s ease}
        .rr-shop-tile[href]:hover{transform:translateY(-4px)}
        .rr-shop-tile:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rr-shop-tile-disabled{opacity:.62;cursor:not-allowed}
        .rr-shop-logo-wrap{width:62px;height:62px;border-radius:13px;background:none;display:flex;align-items:center;justify-content:center;overflow:hidden;margin-bottom:35px}
        .rr-shop-logo{width:62px;height:62px;object-fit:cover;display:block}
        .rr-shop-logo-large{transform:scale(1.3)}
        .rr-shop-placeholder{font-family:Montserrat,Arial,sans-serif;font-size:19px;font-weight:700;color:#777}
        .rr-shop-name{font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.04em;color:#6d6d6d;text-align:center}
        .rr-shop-buy{margin-top:12px;border:1px solid #1c1c1c;background:transparent;color:#1c1c1c;font-family:Montserrat,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:9px 12px;text-decoration:none;transition:color .25s ease}
        .rr-shop-buy:hover{color:#fff}
        @media(max-width:900px){.rr-shop-now-wrap{grid-template-columns:1fr;gap:58px;max-width:420px}.rr-shop-now-title{font-size:24px;letter-spacing:8px}.rr-shop-column-title{margin-bottom:32px}}
        @media(max-width:560px){.rr-shop-now{padding:58px 16px}.rr-shop-grid{grid-template-columns:repeat(3,74px);gap:28px}.rr-shop-grid[data-count="2"]{grid-template-columns:repeat(2,74px);gap:36px 50px;max-width:none}}
      `}</style>
      <h2 id="rr-shop-now-title" className="rr-shop-now-title">
        {data.title || 'SHOP ON'}
      </h2>
      <div className="rr-shop-now-wrap">
        {columns.map((column, columnIndex) => {
          const items = column.items || column.marketplaces || []

          return (
            <div className="rr-shop-column" key={`${column.title || 'shop'}-${columnIndex}`}>
              <h3 className="rr-shop-column-title">{column.title}</h3>
              <ul className="rr-shop-grid" data-count={items.length}>
                {items.map((item, itemIndex) => {
                  const link = item.link || item.url || marketplaceLinks[(item.name || '').toLowerCase()] || ''
                  const image = item.image || item.logo || ''
                  const tile = (
                    <>
                      <span className="rr-shop-logo-wrap">
                        {image ? (
                          <img
                            className={`rr-shop-logo ${['amazon', 'flipkart'].includes((item.name || '').toLowerCase()) ? 'rr-shop-logo-large' : ''}`}
                            src={asset(image)}
                            alt={item.name}
                            loading="lazy"
                          />
                        ) : (
                          <span className="rr-shop-placeholder" aria-hidden="true">
                            {getInitials(item.name)}
                          </span>
                        )}
                      </span>
                      <span className="rr-shop-name">{item.name}</span>
                      {item.productLink ? (
                        <a className="rr-shop-buy" href={item.productLink} target="_blank" rel="noopener noreferrer">
                          Buy
                        </a>
                      ) : null}
                    </>
                  )

                  return (
                    <li key={`${item.name || 'marketplace'}-${itemIndex}`}>
                      {link ? (
                        <a className="rr-shop-tile" href={link} target="_blank" rel="noopener noreferrer" aria-label={`Shop Raw Radicles on ${item.name}`}>
                          {tile}
                        </a>
                      ) : (
                        <span className="rr-shop-tile rr-shop-tile-disabled" aria-disabled="true">
                          {tile}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
