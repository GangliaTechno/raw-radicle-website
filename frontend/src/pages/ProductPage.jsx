import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductDetailsTable } from '../components/ProductDetailsTable.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useProductCms } from '../hooks/useProductCms.js'
import { useProducts } from '../hooks/useProducts.js'
import { asset } from '../utils/assets.js'

const defaultMarketplaces = [
  { name: 'Blinkit', link: 'https://blinkit.com/', logo: 'assets/bkit.png' },
  { name: 'Zepto', link: 'https://www.zeptonow.com/', logo: 'assets/zep.png' },
  { name: 'Amazon', link: 'https://www.amazon.in/', logo: 'assets/azon.png' },
  { name: 'Instamart', link: 'https://www.swiggy.com/instamart', logo: 'assets/imart.png' },
  { name: 'Flipkart', link: 'https://www.flipkart.com/', logo: 'assets/fkart.png' },
]

const featureFallbacks = [
  {
    image: 'assets/features/choco-1.png',
    title: 'Ancient Herbs',
    text: 'Infused with authentic Ayurvedic herbs like Ashwagandha, Brahmi, and Amla for targeted wellness.',
  },
  {
    image: 'assets/features/choco-2.png',
    title: 'Pure Cocoa',
    text: 'Hand-selected premium cocoa for a rich, velvety texture and deep, satisfying chocolate experience.',
  },
  {
    image: 'assets/features/choco-3.png',
    title: 'Artisan Crafted',
    text: 'Small-batch production ensures maximum potency of herbs and artisanal quality in every bite.',
  },
]

const featureCopyByHerb = {
  ashwagandha: [
    {
      title: 'The Power of "Ancient Calm"',
      text: 'In a world that never stops, Wrath Relief offers the "Pleasure of a Pause." By infusing premium chocolate with the stress-relieving properties of Ashwagandha, this bar is designed to help you unwind and reclaim your inner peace.',
    },
    {
      title: '20% Ashwagandha Atibaladi Blend',
      text: 'A functional wellness snack using a potent 20% concentration of an Atibaladi formulation. Includes Ashwagandha for stress management, Atibala for vitality, and a traditional infusion of Ghee and Honey for maximum absorption.',
    },
    {
      title: 'Creamy 35% Milk Chocolate',
      text: 'The chocolate base is crafted with cocoa and rich milk solids. This luscious texture masks the earthy notes of Ashwagandha for a smooth, malt-like flavor profile.',
    },
    {
      title: '"Gold & Textured Blue" Aesthetics',
      text: "Wrath Relief features deep blue packaging chosen to evoke tranquility and relaxation. It is not just a snack; it is a lifestyle upgrade for the modern soul.",
    },
  ],
  chyawanaprash: [
    {
      title: 'The Power of Daily Immunity',
      text: 'Holy Sin brings the heritage of Chyawanaprash into a refined chocolate ritual, created for moments when nourishment and indulgence should feel equally considered.',
    },
    {
      title: 'Chyawanaprash Herbal Blend',
      text: 'A functional wellness chocolate built around Amla and traditional Ayurvedic botanicals associated with vitality, resilience, and everyday immune support.',
    },
    {
      title: 'Rich Chocolate Finish',
      text: 'A smooth chocolate base balances the herbal depth with a rounded cocoa profile, giving every square a polished and satisfying finish.',
    },
    {
      title: '"Gold & Deep Green" Aesthetics',
      text: 'Holy Sin uses a rich green visual language that reflects botanical strength, calm ritual, and premium Ayurvedic indulgence.',
    },
  ],
  brahmi: [
    {
      title: 'The Power of Focused Calm',
      text: 'Smart Sin is crafted as a mindful chocolate ritual for clarity, focus, and composed energy through the revered Ayurvedic herb Brahmi.',
    },
    {
      title: 'Brahmi Herbal Blend',
      text: 'A functional wellness chocolate using Brahmi to support a centered daily routine, pairing cognitive tradition with a premium cocoa experience.',
    },
    {
      title: 'Balanced Chocolate Texture',
      text: 'The chocolate base is designed to soften the botanical profile while keeping the experience smooth, rich, and easy to enjoy.',
    },
    {
      title: '"Gold & Red" Aesthetics',
      text: 'Smart Sin carries a confident red packaging style that signals energy, intent, and a refined approach to everyday wellness.',
    },
  ],
}

const reviewCopyByHerb = {
  ashwagandha: [
    {
      name: 'Sneha D.',
      date: '3/20/2026',
      rating: 5,
      text: 'This milk chocolate version is incredibly smooth. My kids love it too and I feel good knowing they are getting the benefits of Ashwagandha.',
    },
    {
      name: 'Rahul K.',
      date: '3/5/2026',
      rating: 5,
      text: 'I bought this as a gift for my wife and she absolutely loved it. The milk chocolate base makes the Ashwagandha very approachable. Already reordered twice!',
    },
    {
      name: 'Meera J.',
      date: '2/18/2026',
      rating: 4,
      text: 'Lovely chocolate with a purpose. I have been eating a square daily after lunch and my afternoon stress levels have noticeably improved.',
    },
  ],
  chyawanaprash: [
    {
      name: 'Ananya R.',
      date: '3/18/2026',
      rating: 5,
      text: 'A beautiful way to enjoy Chyawanaprash. The chocolate feels premium and the herbal note is balanced instead of overpowering.',
    },
    {
      name: 'Karthik S.',
      date: '3/2/2026',
      rating: 5,
      text: 'Rich, smooth, and surprisingly comforting. I keep one at my desk and it has become my evening wellness ritual.',
    },
    {
      name: 'Nisha M.',
      date: '2/16/2026',
      rating: 4,
      text: 'The packaging feels luxurious and the chocolate tastes refined. Great functional treat for gifting too.',
    },
  ],
  brahmi: [
    {
      name: 'Devika P.',
      date: '3/16/2026',
      rating: 5,
      text: 'Smooth chocolate with a clean finish. I like having it during work breaks when I want something indulgent but not heavy.',
    },
    {
      name: 'Arjun N.',
      date: '3/4/2026',
      rating: 5,
      text: 'The Brahmi blend is subtle and the chocolate quality is excellent. It feels like a premium product from the first bite.',
    },
    {
      name: 'Isha V.',
      date: '2/12/2026',
      rating: 4,
      text: 'Great texture and thoughtful concept. The flavor is distinctive in a good way and pairs very well with coffee.',
    },
  ],
}

const getProductMetaInfo = (id = '') => {
  if (id.includes('amilk')) return { sku: 'CB-AP-ML-60G', rating: '4.9', reviewsCount: 5, tagline: 'Strength, stamina & energy' }
  if (id.includes('adark')) return { sku: 'CB-AP-DK-60G', rating: '5.0', reviewsCount: 3, tagline: 'Strength, stamina & calm' }
  if (id.includes('bmilk')) return { sku: 'CB-BP-ML-60G', rating: '4.8', reviewsCount: 4, tagline: 'Memory, focus & calm' }
  if (id.includes('bdark')) return { sku: 'CB-BP-DK-60G', rating: '5.0', reviewsCount: 2, tagline: 'Memory, focus & cognition' }
  if (id.includes('cmilk')) return { sku: 'CB-CP-ML-60G', rating: '4.7', reviewsCount: 6, tagline: 'Immunity, vigor & health' }
  if (id.includes('cdark')) return { sku: 'CB-CP-DK-60G', rating: '4.9', reviewsCount: 4, tagline: 'Immunity, vigor & anti-ageing' }
  return { sku: 'CB-AP-DK-60G', rating: '5.0', reviewsCount: 3, tagline: 'Strength, stamina & calm' }
}

const getProductDisplayInfo = (product) => {
  const herb = String(product?.herb || '').toLowerCase()
  const isMilk = String(product?.type || '').toLowerCase().includes('milk')

  if (herb.includes('ashwagandha')) {
    return {
      title: 'Wrath Relief',
      subtitle: `${isMilk ? '35% milk chocolate' : '55% dark chocolate'} with ashwagandha herbs`,
    }
  }

  if (herb.includes('chyawanaprash')) {
    return {
      title: 'Holy Sin',
      subtitle: `${isMilk ? '35% milk chocolate' : '55% dark chocolate'} with chyawanaprash herbs`,
    }
  }

  if (herb.includes('brahmi')) {
    return {
      title: 'Smart Sin',
      subtitle: `${isMilk ? '35% milk chocolate' : '55% dark chocolate'} with brahmi herbs`,
    }
  }

  return {
    title: product?.shortName || product?.name || 'Chocolate',
    subtitle: product?.subtitle || '',
  }
}

const normalizeMarketplace = (marketplace) => {
  const fallback = defaultMarketplaces.find((item) => item.name.toLowerCase() === String(marketplace.name || '').toLowerCase())

  return {
    name: marketplace.name || fallback?.name || 'Marketplace',
    link: marketplace.link && marketplace.link !== '#' ? marketplace.link : fallback?.link || '',
    logo: marketplace.logo || marketplace.img || marketplace.image || fallback?.logo || '',
  }
}

const Accordion = ({ id, title, open, onToggle, children }) => (
  <div className="rr-product-accordion">
    <button className="rr-product-accordion-button" type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
      <span>{title}</span>
      <span className={`rr-product-accordion-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
        {open ? '-' : '+'}
      </span>
    </button>
    <div className={`rr-product-accordion-panel ${open ? 'is-open' : ''}`} id={id}>
      <div className="rr-product-accordion-inner">{children}</div>
    </div>
  </div>
)

const ReviewStars = ({ rating = 5 }) => (
  <span className="rr-review-stars" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, index) => (
      <span className={index < rating ? 'is-filled' : ''} aria-hidden="true" key={index}>
        ★
      </span>
    ))}
  </span>
)

export function ProductPage() {
  const { productId } = useParams()
  const productList = useProducts()
  const product = productList.find((item) => item.id === productId)
  const cms = useProductCms(productId, product)
  const gallery = useMemo(() => (cms.gallery?.length ? cms.gallery : product?.gallery || []), [cms.gallery, product?.gallery])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [expandedTabs, setExpandedTabs] = useState({
    features: false,
    specs: false,
    quality: false,
  })
  const productSliderRef = useRef(null)
  const productAutoplayRef = useRef(null)
  const lastClickTime = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [productSlideStep, setProductSlideStep] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [submittedReviews, setSubmittedReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: '5',
    text: '',
  })

  const displayProduct = product
    ? {
        ...product,
        gallery,
        name: cms.title || product.name,
        subtitle: cms.subtitle || product.subtitle,
        price: cms.price || product.price,
        mrp: cms.mrp || product.mrp,
        badge: cms.badge || product.badge,
      }
    : null

  usePageTitle(displayProduct?.name || 'Product')

  const metaInfo = getProductMetaInfo(displayProduct?.id)
  const displayInfo = getProductDisplayInfo(displayProduct)
  const image = gallery[selectedImageIndex] || gallery[0] || displayProduct?.image || ''

  const marketplaces = useMemo(() => {
    const cmsMarketplaces = cms.marketplaces?.length ? cms.marketplaces : []
    return (cmsMarketplaces.length ? cmsMarketplaces : defaultMarketplaces).map(normalizeMarketplace)
  }, [cms.marketplaces])

  const features = cms.features?.length
    ? cms.features
    : featureCopyByHerb[String(displayProduct?.herb || '').toLowerCase()] || featureCopyByHerb.ashwagandha

  const productReviews = cms.reviews?.length
    ? cms.reviews.map((review, index) => ({
        name: review.name || 'Guest',
        date: review.date || review.createdAt || `3/${20 - index}/2026`,
        rating: Number(review.rating) || 5,
        text: review.body || review.text || '',
      }))
    : reviewCopyByHerb[String(displayProduct?.herb || '').toLowerCase()] || reviewCopyByHerb.ashwagandha
  const visibleReviews = [...submittedReviews, ...productReviews]

  const cmsRelated =
    cms.related
      ?.map((item) => {
        const id = String(item.link || '').replace(/^.*\/|\?.*$/g, '').replace(/\.html$/, '')
        const existing = productList.find((relatedProduct) => relatedProduct.id === id)

        if (existing) return existing

        return {
          id: item.title || item.link,
          name: item.title,
          price: Number.parseFloat(String(item.price || '').replace(/[^\d.]/g, '')) || displayProduct?.price,
          mrp: Number.parseFloat(String(item.price || '').replace(/[^\d.]/g, '')) || displayProduct?.mrp,
          image: item.image,
          hoverImage: item.hoverImage || item.image,
          badge: 'Related',
        }
      })
      .filter(Boolean) || []

  const related = cmsRelated.length ? cmsRelated : productList
  const relatedCount = related.length

  useEffect(() => {
    if (!productSliderRef.current || relatedCount === 0) return

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
  }, [relatedCount])

  const resetProductAutoplay = useCallback(() => {
    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
    productAutoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 && relatedCount > 0 ? relatedCount : prev) + 1)
    }, 3500)
  }, [relatedCount])

  useEffect(() => {
    if (relatedCount > 0) {
      resetProductAutoplay()
    }

    return () => {
      if (productAutoplayRef.current) {
        clearInterval(productAutoplayRef.current)
      }
    }
  }, [relatedCount, resetProductAutoplay])

  useEffect(() => {
    if (!transitionEnabled) {
      if (productSliderRef.current) {
        productSliderRef.current.offsetHeight
      }
      const timer = setTimeout(() => {
        setTransitionEnabled(true)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [transitionEnabled])

  if (!displayProduct) return <Navigate to="/products" replace />

  const toggleTab = (tabName) => {
    setExpandedTabs((current) => ({ ...current, [tabName]: !current[tabName] }))
  }

  const handleTransitionEnd = () => {
    const productCount = relatedCount
    if (productCount === 0) return
    const activeIndex = currentIndex === 0 ? productCount : currentIndex

    if (activeIndex >= 2 * productCount) {
      setTransitionEnabled(false)
      setCurrentIndex(activeIndex - productCount)
    } else if (activeIndex < productCount) {
      setTransitionEnabled(false)
      setCurrentIndex(activeIndex + productCount)
    }
  }

  const scrollProducts = (direction) => {
    const now = Date.now()
    if (now - lastClickTime.current < 500) return
    lastClickTime.current = now

    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
    setCurrentIndex((prev) => (prev === 0 && relatedCount > 0 ? relatedCount : prev) + direction)
    resetProductAutoplay()
  }

  const handleSliderMouseEnter = () => {
    if (productAutoplayRef.current) {
      clearInterval(productAutoplayRef.current)
    }
  }

  const handleSliderMouseLeave = () => {
    if (relatedCount > 0) {
      resetProductAutoplay()
    }
  }

  const visibleProductIndex = relatedCount > 0 && currentIndex === 0 ? relatedCount : currentIndex

  const submitReview = (event) => {
    event.preventDefault()
    if (!reviewForm.text.trim()) return

    setSubmittedReviews((current) => [
      {
        name: reviewForm.name.trim() || 'Guest',
        date: new Date().toLocaleDateString('en-US'),
        rating: Number(reviewForm.rating) || 5,
        text: reviewForm.text.trim(),
      },
      ...current,
    ])
    setReviewForm({ name: '', rating: '5', text: '' })
    setReviewModalOpen(false)
  }

  return (
    <main className="rr-product-redesign" id="main" role="main">
      <style>{`
        .rr-product-redesign{background:#efefef;color:#1c1c1c}
        .rr-product-shell{max-width:1420px;margin:0 auto;padding:70px 34px 50px;box-sizing:border-box}
        .rr-product-breadcrumb{display:none}
        .rr-product-breadcrumb a{color:#1c1c1c;text-decoration:none}.rr-product-breadcrumb a:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rr-product-hero{display:grid;grid-template-columns:minmax(0,820px) minmax(480px,560px);gap:48px;align-items:start}
        .rr-product-gallery{display:grid;grid-template-columns:80px minmax(0,1fr);gap:84px;position:sticky;top:94px;align-items:start}
        .rr-product-thumbs{display:grid;gap:22px;align-content:start;padding-top:2px}
        .rr-product-thumb{width:80px;aspect-ratio:1;border:1px solid #101010;border-radius:7px;background:#efefef;cursor:pointer;padding:7px;box-sizing:border-box;transition:border-color .2s ease,box-shadow .2s ease,opacity .2s ease}
        .rr-product-thumb img{width:100%;height:100%;object-fit:contain;display:block}
        .rr-product-thumb:not(.is-selected){border-color:transparent;opacity:.96}.rr-product-thumb.is-selected{border-color:#111;box-shadow:none}
        .rr-product-thumb:focus-visible,.rr-product-market-link:focus-visible,.rr-product-accordion-button:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rr-product-main-image{margin:0;background:transparent;border:0;min-height:595px;display:flex;align-items:center;justify-content:center;padding:0 10px;box-sizing:border-box;box-shadow:none}
        .rr-product-main-image img{width:auto;height:auto;max-width:100%;max-height:620px;object-fit:contain;display:block}
        .rr-product-info-panel{background:transparent;border:0;padding:0;box-shadow:none}
        .rr-product-badge{display:none}
        .rr-product-title{font-family:Montserrat,Arial,sans-serif;font-size:27px;font-weight:700;letter-spacing:.34em;line-height:1.16;text-transform:uppercase;margin:0 0 8px;color:#242424}
        .rr-product-subtitle{font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#262626;line-height:1.55;margin:0 0 14px;white-space:nowrap}
        .rr-product-description{display:none}
        .rr-product-meta-row{display:flex;flex-direction:column;align-items:flex-start;border:0;padding:0;margin:0 0 52px}
        .rr-product-rating{display:flex;align-items:center;gap:12px;margin:30px 0 0;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:500;color:#262626;text-transform:uppercase;letter-spacing:.03em;order:2}
        .rr-product-stars{display:inline-flex;gap:1px;color:#000}.rr-product-stars svg{width:13px;height:13px}
        .rr-product-sku{display:block;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:#9a9a9a;order:1}
        .rr-product-price-row{display:flex;align-items:baseline;gap:8px;margin:0 0 26px;flex-wrap:wrap}
        .rr-product-price-row:before{content:'MRP';font-family:Montserrat,Arial,sans-serif;font-size:17px;font-weight:500;letter-spacing:.14em;color:#1f1f1f}
        .rr-product-price{font-family:Montserrat,Arial,sans-serif;font-size:17px;font-weight:500;letter-spacing:.08em;color:#1c1c1c}
        .rr-product-mrp{font-family:Montserrat,Arial,sans-serif;font-size:15px;color:#888;text-decoration:line-through}
        .rr-product-tax{font-family:Montserrat,Arial,sans-serif;font-size:12px;letter-spacing:0;color:#8f8f8f;margin:0}
        .rr-product-tagline{display:flex;width:max-content;max-width:100%;background:#f72b25;color:#fff;padding:8px 34px 8px 20px;margin:0 0 36px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.01em;text-transform:uppercase;line-height:1.2;white-space:nowrap}
        .rr-product-section-label{display:none}
        .rr-product-market-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0 0 80px;padding-top:24px;border-top:1px solid #d4d4d4}
        .rr-product-market-link{display:flex;align-items:center;justify-content:center;gap:14px;min-height:70px;border:1px solid #d1d1d1;border-radius:12px;background:transparent;color:#1c1c1c;text-decoration:none;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:background .22s ease,border-color .22s ease,transform .22s ease}
        .rr-product-market-link:hover{background:#fff;border-color:#aaa;transform:translateY(-1px)}
        .rr-product-market-link img{max-width:82px;max-height:32px;object-fit:contain;display:block}
        .rr-product-market-link.is-wide{grid-column:span 2}
        .rr-product-accordions{border-top:1px solid #cfcfcf;margin-left:50px}
        .rr-product-accordion{border-bottom:1px solid #cfcfcf}
        .rr-product-accordion-button{display:flex;align-items:center;justify-content:space-between;width:100%;border:0;background:transparent;padding:28px 0;cursor:pointer;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:#1c1c1c;text-align:left}
        .rr-product-accordion-icon{font-size:24px;font-weight:300;line-height:1;color:#555;transition:transform .28s ease}
        .rr-product-accordion-panel{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .34s ease,opacity .28s ease}.rr-product-accordion-panel.is-open{grid-template-rows:1fr;opacity:1}
        .rr-product-accordion-inner{overflow:hidden}
        .rr-product-feature-list{display:grid;gap:24px;padding:0 0 30px}
        .rr-product-feature-list strong{display:block;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin:0 0 7px;color:#242424}
        .rr-product-feature-list p,.rr-product-quality{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.52;color:#666;margin:0}
        .rr-detail-table{width:100%;border-collapse:collapse;background:transparent!important;font-family:Montserrat,Arial,sans-serif;font-size:13px;margin:0 0 22px}
        .rr-detail-table th,.rr-detail-table td{border-top:1px solid #e6e1da;padding:13px 0;text-align:left;vertical-align:top}.rr-detail-table th{width:42%;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#555}.rr-detail-table td{color:#1c1c1c;line-height:1.5}
        .rr-reviews{display:grid;gap:16px;padding:0 0 24px}.rr-reviews form{display:grid;gap:10px}.rr-reviews textarea{min-height:92px;border:1px solid #d9d3ca;padding:13px;font-family:Montserrat,Arial,sans-serif;resize:vertical}.rr-reviews article{border-top:1px solid #e6e1da;padding-top:14px}.rr-reviews strong{color:#b08850;letter-spacing:.08em}.rr-reviews h3{margin:6px 0 4px;font-family:Montserrat,Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:.12em}.rr-reviews p{margin:0;color:#555;line-height:1.6}.rr-button{border:1px solid #1c1c1c;background:#1c1c1c;color:#fff;padding:12px 18px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
        .rr-product-feature-band{background:#efefef;padding:0 34px 72px}.rr-product-section-heading{text-align:left;max-width:1520px;margin:0 auto 44px;font-family:Montserrat,Arial,sans-serif;font-size:24px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#1c1c1c}
        .rr-product-feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;max-width:1520px;margin:0 auto}.rr-product-feature-card{text-align:left;background:transparent;padding:0;border:0}.rr-product-feature-card img{width:100%;height:480px;object-fit:cover;margin:0 0 30px;display:block;border-radius:6px}.rr-product-feature-card h3{font-family:Montserrat,Arial,sans-serif;font-size:19px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin:0 0 24px;color:#242424}.rr-product-feature-card p{font-family:Montserrat,Arial,sans-serif;font-size:16px;line-height:1.95;color:#8b8b8b;margin:0;max-width:510px}
        .rr-product-luxury{display:grid;grid-template-columns:1fr 1fr;background:#1c1c1c;color:#fff}.rr-product-luxury-image{aspect-ratio:16/10;min-height:0;background:#111}.rr-product-luxury-image img{width:100%;height:100%;object-fit:cover;display:block}.rr-product-luxury-copy{display:flex;flex-direction:column;justify-content:center;padding:56px 64px}.rr-product-luxury-kicker{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:#b08850;margin:0 0 18px}.rr-product-luxury-copy h2{font-family:Montserrat,Arial,sans-serif;font-size:30px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;line-height:1.3;margin:0 0 22px}.rr-product-luxury-copy p{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.8;color:#dedede;max-width:520px;margin:0}
        .rr-product-related{background:transparent;padding:84px 0 72px;overflow:hidden}.rr-product-related .MvstProducts{padding:0}.rr-product-related .MvstProducts__Title{font-size:28px}.rr-product-related .MvstProducts__Carousel{max-width:100%;margin:0}.rr-product-related .MvstProducts__Slider{padding-top:42px;padding-bottom:50px}
        .rr-product-review-section{background:#efefef;padding:0 34px 90px}.rr-product-review-shell{max-width:1020px;margin:0 auto}.rr-product-review-top{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:0 0 20px}.rr-product-review-summary{display:flex;align-items:center;gap:16px;font-family:Montserrat,Arial,sans-serif;font-size:16px;font-weight:500;color:#111}.rr-review-stars{display:inline-flex;gap:4px;font-size:20px;line-height:1;color:#d0d0d0}.rr-review-stars .is-filled{color:#000}.rr-product-review-count{display:inline-flex;align-items:center;gap:6px}.rr-product-review-count:after{content:'';display:block;width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px)}.rr-product-review-actions{display:flex;align-items:center;gap:12px}.rr-product-review-write,.rr-product-review-filter{height:46px;border:1px solid #e1e1e1;border-radius:8px;background:#f3f3f3;color:#111;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:.02em;cursor:pointer}.rr-product-review-write{padding:0 26px}.rr-product-review-filter{width:46px;display:flex;align-items:center;justify-content:center}.rr-product-review-write:hover,.rr-product-review-filter:hover{background:#fff}.rr-product-review-write:focus-visible,.rr-product-review-filter:focus-visible{outline:3px solid #b08850;outline-offset:3px}.rr-product-review-list{display:grid;gap:20px}.rr-product-review-card{background:#fff;border-radius:8px;padding:25px 24px 28px;box-shadow:0 8px 22px rgba(0,0,0,.08);font-family:Montserrat,Arial,sans-serif}.rr-product-review-author{display:flex;align-items:center;gap:8px;margin:0 0 5px}.rr-product-review-author strong{font-size:17px;font-weight:800;color:#111}.rr-product-review-verified{display:inline-flex;align-items:center;gap:5px;font-size:14px;color:#9a9a9a}.rr-product-review-check{display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;background:#161616;color:#fff;font-size:9px;font-weight:800;line-height:1}.rr-product-review-date{font-size:15px;color:#9a9a9a;margin:0 0 11px}.rr-product-review-card .rr-review-stars{font-size:15px;gap:2px;margin:0 0 20px}.rr-product-review-text{font-size:15px;line-height:1.65;color:#333;margin:0 0 18px}.rr-product-review-product{display:flex;align-items:center;gap:18px;border:1px solid #ececec;border-radius:8px;padding:18px 12px;margin-top:16px}.rr-product-review-product img{width:30px;height:30px;object-fit:contain;display:block}.rr-product-review-product span{font-size:14px;color:#333}
        .rr-review-modal-backdrop{position:fixed;inset:0;z-index:1200;background:rgba(0,0,0,.48);display:flex;align-items:center;justify-content:center;padding:20px}.rr-review-modal{width:min(520px,100%);background:#fff;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.28);padding:28px;font-family:Montserrat,Arial,sans-serif}.rr-review-modal-header{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 22px}.rr-review-modal-header h2{font-size:20px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin:0;color:#111}.rr-review-modal-close{width:36px;height:36px;border:1px solid #e1e1e1;background:#fff;border-radius:50%;font-size:22px;line-height:1;cursor:pointer}.rr-review-form{display:grid;gap:16px}.rr-review-field{display:grid;gap:8px}.rr-review-field span{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#555}.rr-review-input,.rr-review-select,.rr-review-textarea{width:100%;border:1px solid #d8d8d8;border-radius:6px;background:#fff;padding:13px 14px;font-family:Montserrat,Arial,sans-serif;font-size:14px;color:#111;box-sizing:border-box}.rr-review-textarea{min-height:130px;resize:vertical}.rr-review-submit{height:48px;border:1px solid #111;border-radius:6px;background:#111;color:#fff;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}.rr-review-modal-close:focus-visible,.rr-review-input:focus-visible,.rr-review-select:focus-visible,.rr-review-textarea:focus-visible,.rr-review-submit:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rr-product-main-image, .rr-product-main-image img { border-radius: 12px; }
        .rr-product-thumb { border-radius: 8px; }
        .rr-product-thumb img { border-radius: 6px; }
        .MvstProducts__ImageWrap, .MvstProducts__Image { border-radius: 8px; }
        .rr-product-feature-card img { border-radius: 8px; }
        .rr-product-luxury-image, .rr-product-luxury-image img { border-radius: 8px; }
        @media(max-width:1050px) {
          .rr-product-hero {
            grid-template-columns: 1fr;
          }
          .rr-product-gallery {
            position: static;
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 28px !important;
            align-items: center !important;
          }
          .rr-product-thumbs {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 12px !important;
            width: 100% !important;
            padding-top: 0 !important;
          }
          .rr-product-thumb {
            width: 76px !important;
            flex: 0 0 76px !important;
            aspect-ratio: 1 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          .rr-product-thumb img {
            border-radius: 6px !important;
          }
          .rr-product-main-image {
            min-height: auto !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0 !important;
          }
          .rr-product-main-image img {
            max-width: 100% !important;
            max-height: 480px !important;
            border-radius: 12px !important;
            object-fit: contain !important;
          }
          .rr-product-info-panel {
            padding: 0;
          }
          .rr-product-accordions {
            margin-left: 0;
          }
          .rr-product-luxury-copy {
            padding: 54px 42px;
          }
          .rr-product-feature-grid {
            gap: 22px;
          }
          .rr-product-feature-card img {
            height: 320px;
            border-radius: 8px !important;
          }
          .rr-product-luxury-image img {
            border-radius: 8px !important;
          }
          .MvstProducts__ImageWrap, .MvstProducts__Image {
            border-radius: 8px !important;
          }
          .rr-product-market-link {
            min-height: 52px !important;
          }
        }
        @media(max-width:760px) {
          .rr-product-shell {
            padding: 54px 18px 44px;
          }
          .rr-product-gallery {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 20px !important;
            align-items: center !important;
          }
          .rr-product-thumbs {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 10px !important;
            width: 100% !important;
            overflow-x: visible !important;
          }
          .rr-product-thumb {
            flex: 0 0 68px !important;
            width: 68px !important;
            border-radius: 8px !important;
          }
          .rr-product-thumb img {
            border-radius: 6px !important;
          }
          .rr-product-main-image {
            min-height: auto !important;
            padding: 0 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .rr-product-main-image img {
            max-width: 90% !important;
            max-height: 360px !important;
            border-radius: 12px !important;
          }
          .rr-product-title {
            font-size: 22px;
            letter-spacing: .22em;
          }
          .rr-product-subtitle {
            font-size: 11px;
            letter-spacing: .12em;
            white-space: normal;
          }
          .rr-product-tagline {
            width: auto;
            white-space: normal;
          }
          .rr-product-market-grid {
            grid-template-columns: 1fr;
            margin-bottom: 48px;
          }
          .rr-product-market-link.is-wide {
            grid-column: auto;
          }
          .rr-product-feature-grid, .rr-product-luxury {
            grid-template-columns: 1fr;
          }
          .rr-product-feature-band {
            padding: 0 18px 56px;
          }
          .rr-product-related {
            padding: 62px 0 54px;
          }
          .rr-product-related .MvstProducts__Title {
            font-size: 22px;
          }
          .rr-product-review-section {
            padding: 0 18px 64px;
          }
          .rr-product-review-top {
            align-items: flex-start;
            flex-direction: column;
          }
          .rr-product-review-actions {
            width: 100%;
          }
          .rr-product-review-write {
            flex: 1;
          }
          .rr-product-review-card {
            padding: 22px 18px;
          }
          .rr-product-section-heading {
            font-size: 22px;
            margin-bottom: 28px;
          }
          .rr-product-feature-card img {
            height: 280px;
            margin-bottom: 22px;
            border-radius: 8px !important;
          }
          .rr-product-feature-card h3 {
            font-size: 16px;
            margin-bottom: 14px;
          }
          .rr-product-feature-card p {
            font-size: 14px;
            line-height: 1.75;
          }
          .rr-product-luxury-image {
            aspect-ratio: 4/3;
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          .rr-product-luxury-image img {
            border-radius: 8px !important;
          }
          .rr-product-luxury-copy {
            padding: 42px 24px;
          }
          .rr-product-luxury-copy h2 {
            font-size: 24px;
          }
          .MvstProducts__ImageWrap, .MvstProducts__Image {
            border-radius: 8px !important;
          }
          .rr-product-market-link {
            min-height: 52px !important;
          }
        }
      `}</style>

      <section className="rr-product-shell" aria-labelledby="rr-product-title">
        <nav className="rr-product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/products">All Products</Link>
          <span aria-hidden="true">/</span>
          <span>{displayProduct.shortName || displayProduct.name}</span>
        </nav>

        <div className="rr-product-hero">
          <div className="rr-product-gallery">
            <div className="rr-product-thumbs" aria-label="Product images">
              {gallery.map((item, index) => (
                <button className={`rr-product-thumb ${image === item ? 'is-selected' : ''}`} type="button" key={item} onClick={() => setSelectedImageIndex(index)} aria-label={`Show product image ${index + 1}`}>
                  <img src={asset(item)} alt={`${displayProduct.name} thumbnail ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
            <figure className="rr-product-main-image">
              <img src={asset(image || displayProduct.image)} alt={displayProduct.name} />
            </figure>
          </div>

          <aside className="rr-product-info-panel" aria-label="Product information">
            {displayProduct.badge ? <span className="rr-product-badge">{displayProduct.badge}</span> : null}
            <h1 className="rr-product-title" id="rr-product-title">
              {displayInfo.title}
            </h1>
            <p className="rr-product-subtitle">{displayInfo.subtitle}</p>
            <p className="rr-product-description">{displayProduct.description}</p>

            <div className="rr-product-meta-row">
              <div className="rr-product-rating" aria-label={`${metaInfo.rating} stars`}>
                <span className="rr-product-stars" aria-hidden="true">
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L10 15.5l-5.7 3 1.1-6.3L.8 7.7l6.4-.9L10 1z" />
                    </svg>
                  ))}
                </span>
                {metaInfo.rating} ({metaInfo.reviewsCount} reviews)
              </div>
              <span className="rr-product-sku">SKU: {metaInfo.sku}</span>
            </div>

            <div className="rr-product-price-row">
              <span className="rr-product-price">₹ {Number(displayProduct.price).toFixed(2)}</span>
              <span className="rr-product-tax">(inclusive of all taxes)</span>
            </div>
            <p className="rr-product-tagline">
              {displayProduct.herb} {displayProduct.type}: {metaInfo.tagline}
            </p>

            <p className="rr-product-section-label">Shop On</p>
            <div className="rr-product-market-grid">
              {marketplaces.map((marketplace, index) => (
                <a
                  className={`rr-product-market-link ${index === marketplaces.length - 1 && marketplaces.length % 2 === 1 ? 'is-wide' : ''}`}
                  href={marketplace.link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  key={marketplace.name}
                  onClick={(event) => !marketplace.link && event.preventDefault()}
                >
                  <span>Buy on</span>
                  {marketplace.logo ? <img src={asset(marketplace.logo)} alt={marketplace.name} loading="lazy" /> : <strong>{marketplace.name}</strong>}
                </a>
              ))}
            </div>

            <div className="rr-product-accordions">
              <Accordion id="product-features" title="Features" open={expandedTabs.features} onToggle={() => toggleTab('features')}>
                <div className="rr-product-feature-list">
                  {features.map((feature, index) => (
                    <div key={`${feature.title}-${index}`}>
                      <strong>{feature.title}</strong>
                      <p>{feature.text || feature.desc}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion id="product-specs" title="Specifications" open={expandedTabs.specs} onToggle={() => toggleTab('specs')}>
                <ProductDetailsTable product={displayProduct} specs={cms.specs} />
              </Accordion>
              <Accordion id="product-quality" title="Quality & Safety Certified" open={expandedTabs.quality} onToggle={() => toggleTab('quality')}>
                <div className="rr-product-quality">
                  <p>
                    {cms.quality ||
                      'Developed and manufactured by Cacobean Chocolate Factory at the Advanced Research Center (MUTBI), Manipal. Our products bridge lab-tested precision and ancient wellness traditions, helping botanical actives remain stable and bio-available.'}
                  </p>
                  <p style={{ marginTop: '10px' }}>
                    100% natural, vegetarian, gluten-free, and crafted with organic cocoa and sustainably-sourced Ayurvedic ingredients.
                  </p>
                </div>
              </Accordion>
            </div>
          </aside>
        </div>
      </section>

      <section className="rr-product-feature-band" aria-labelledby="rr-product-features-title">
        <h2 className="rr-product-section-heading" id="rr-product-features-title">
          Features
        </h2>
        <div className="rr-product-feature-grid">
          {featureFallbacks.map((feature) => (
            <article className="rr-product-feature-card" key={feature.title}>
              <img src={asset(feature.image)} alt={feature.title} loading="lazy" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rr-product-luxury">
        <div className="rr-product-luxury-image">
          <img src={asset('assets/features/luxury-chocolate.png')} alt="Refined chocolate craftsmanship" loading="lazy" />
        </div>
        <div className="rr-product-luxury-copy">
          <p className="rr-product-luxury-kicker">Elite Craftsmanship</p>
          <h2>Refined Elegance and Luxury</h2>
          <p>
            Meticulously handcrafted to exceed high expectations. The ideal functional chocolate bar for a mindful luxury ritual.
          </p>
        </div>
      </section>

      <section className="rr-product-related" aria-labelledby="rr-related-title">
        <div className="MvstProducts">
          <div className="MvstProducts__Header">
            <h2 className="MvstProducts__Title" id="rr-related-title">
              All Products
            </h2>
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
              {[...related, ...related, ...related].map((item, idx) => (
                <div className="MvstProducts__Card" key={`${item.id}-${idx}`}>
                  <Link className="MvstProducts__CardInner" to={`/${item.id}`}>
                    <div className="MvstProducts__ImageWrap">
                      <img className="MvstProducts__Image" src={asset(item.image)} alt={item.name} loading="lazy" />
                      <img className="MvstProducts__Image MvstProducts__Image--secondary" src={asset(item.hoverImage || item.image)} alt={`${item.name} Hover`} loading="lazy" />
                    </div>
                    <h3 className="MvstProducts__Name">{item.name.toUpperCase()}</h3>
                    <p className="MvstProducts__Price">Rs. {item.price}</p>
                  </Link>
                </div>
              ))}
            </div>

            <button type="button" className="MvstProducts__Arrow MvstProducts__Arrow--prev" aria-label="Previous products" onClick={() => scrollProducts(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="MvstProducts__Arrow MvstProducts__Arrow--next" aria-label="Next products" onClick={() => scrollProducts(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="rr-product-review-section" aria-labelledby="rr-product-reviews-title">
        <div className="rr-product-review-shell">
          <div className="rr-product-review-top">
            <div className="rr-product-review-summary">
              <ReviewStars rating={5} />
              <span className="rr-product-review-count" id="rr-product-reviews-title">
                {visibleReviews.length} Reviews
              </span>
            </div>
            <div className="rr-product-review-actions">
              <button className="rr-product-review-write" type="button" onClick={() => setReviewModalOpen(true)}>
                Write a review
              </button>
              <button className="rr-product-review-filter" type="button" aria-label="Review filters">
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M4 7h10M18 7h2M4 17h2M10 17h10M8 5v4M16 15v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="rr-product-review-list">
            {visibleReviews.map((review) => (
              <article className="rr-product-review-card" key={`${review.name}-${review.date}`}>
                <div className="rr-product-review-author">
                  <strong>{review.name}</strong>
                  <span className="rr-product-review-verified">
                    <span className="rr-product-review-check" aria-hidden="true">✓</span>
                    Verified
                  </span>
                </div>
                <p className="rr-product-review-date">{review.date}</p>
                <ReviewStars rating={review.rating} />
                <p className="rr-product-review-text">{review.text}</p>
                <div className="rr-product-review-product">
                  <img src={asset(displayProduct.image)} alt={displayProduct.name} loading="lazy" />
                  <span>{displayProduct.name} Slab</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {reviewModalOpen ? (
        <div className="rr-review-modal-backdrop" role="presentation" onMouseDown={() => setReviewModalOpen(false)}>
          <div className="rr-review-modal" role="dialog" aria-modal="true" aria-labelledby="rr-review-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="rr-review-modal-header">
              <h2 id="rr-review-modal-title">Write a review</h2>
              <button className="rr-review-modal-close" type="button" aria-label="Close review form" onClick={() => setReviewModalOpen(false)}>
                ×
              </button>
            </div>
            <form className="rr-review-form" onSubmit={submitReview}>
              <label className="rr-review-field">
                <span>Name</span>
                <input
                  className="rr-review-input"
                  type="text"
                  value={reviewForm.name}
                  onChange={(event) => setReviewForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                />
              </label>
              <label className="rr-review-field">
                <span>Rating</span>
                <select
                  className="rr-review-select"
                  value={reviewForm.rating}
                  onChange={(event) => setReviewForm((current) => ({ ...current, rating: event.target.value }))}
                >
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </label>
              <label className="rr-review-field">
                <span>Review</span>
                <textarea
                  className="rr-review-textarea"
                  value={reviewForm.text}
                  onChange={(event) => setReviewForm((current) => ({ ...current, text: event.target.value }))}
                  placeholder="Share your experience"
                  required
                />
              </label>
              <button className="rr-review-submit" type="submit">
                Submit review
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}
