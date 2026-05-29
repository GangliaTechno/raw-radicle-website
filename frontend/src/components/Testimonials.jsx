import { useCallback, useEffect, useRef, useState } from 'react'

const defaultVideos = [
  { id: 'v1', url: '/assets/video/video-1.mp4', productId: 'adarkc', productName: 'Ashwagandha Dark Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/adark.png', views: '1.2K Views' },
  { id: 'v2', url: '/assets/video/video-2.mp4', productId: 'amilkc', productName: 'Ashwagandha Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/apmilk.png', views: '2.5K Views' },
  { id: 'v3', url: '/assets/video/video-3.mp4', productId: 'cdarkc', productName: 'Chyawanaprash Dark', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/cdark.png', views: '950 Views' },
  { id: 'v4', url: '/assets/video/video-4.mp4', productId: 'cmilkc', productName: 'Chyawanaprash Milk', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/cmilk.png', views: '3.1K Views' },
  { id: 'v5', url: '/assets/video/video-5.mp4', productId: 'bmilkc', productName: 'Brahmi Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/bmilk.png', views: '1.8K Views' },
  { id: 'v6', url: '/assets/video/video-6.mp4', productId: 'bdarkc', productName: 'Brahmi Dark Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/bdark.png', views: '4.2K Views' },
  { id: 'v7', url: '/assets/video/video-7.mp4', productId: 'amilkc', productName: 'Ashwagandha Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/apmilk.png', views: '2.1K Views' },
  { id: 'v8', url: '/assets/video/video-8.mp4', productId: 'cdarkc', productName: 'Chyawanaprash Dark', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: '/assets/choco/cdark.png', views: '5.7K Views' },
]

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 11.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const SoundIcon = ({ muted }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
    {muted ? (
      <>
        <path d="M17 9l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 9l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <path d="M16 8.5c1 1 1.5 2.2 1.5 3.5S17 14.5 16 15.5M18.5 6c1.7 1.7 2.5 3.7 2.5 6s-.8 4.3-2.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    )}
  </svg>
)

const ChevronIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={direction === 'next' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const formatPrice = (price) => {
  if (price === undefined || price === null || price === '') return ''
  const value = String(price)
  return value.includes('Rs.') || value.includes('₹') ? value : `Rs. ${value}`
}

export default function Testimonials({ videos = defaultVideos, title = 'Testimonials' }) {
  const list = videos?.length ? videos : defaultVideos
  const trackRef = useRef(null)
  const videoRefs = useRef({})
  const [unmuted, setUnmuted] = useState({})
  const [liked, setLiked] = useState({})
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return
      video.muted = true
      video.play().catch(() => {})
    })
  }, [list])

  const scroll = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return

    const maxScrollLeft = track.scrollWidth - track.clientWidth
    if (direction > 0 && track.scrollLeft >= maxScrollLeft - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    if (direction < 0 && track.scrollLeft <= 8) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
      return
    }

    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isPaused || list.length <= 1) return undefined

    const timer = window.setInterval(() => {
      scroll(1)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [isPaused, list.length, scroll])

  const toggleMute = (id) => {
    const video = videoRefs.current[id]
    if (!video) return
    video.muted = !video.muted
    setUnmuted((current) => ({ ...current, [id]: !video.muted }))
    video.play().catch(() => {})
  }

  return (
    <section className="rrx-testimonials" aria-labelledby="rrx-testimonials-title">
      <style>{`
        .rrx-testimonials{padding:70px 0 20px;background:#efefef;overflow:hidden}
        .rrx-testimonials-title{font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:400;letter-spacing:8px;text-transform:uppercase;color:#1c1c1c;text-align:center;margin:0 0 50px}
        .rrx-testimonials-wrap{position:relative;width:100%;padding:0 25px;box-sizing:border-box}
        .rrx-testimonials-track{display:flex;gap:20px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;padding:10px 0 30px;scroll-snap-type:x mandatory}
        .rrx-testimonials-track::-webkit-scrollbar{display:none}
        .rrx-testimonial-card{flex:0 0 250px;min-width:250px;background:#fff;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.06);display:flex;flex-direction:column;scroll-snap-align:start;transition:transform .4s cubic-bezier(.4,0,.2,1),box-shadow .4s cubic-bezier(.4,0,.2,1)}
        .rrx-testimonial-card:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(0,0,0,.15)}
        .rrx-video-wrap{position:relative;aspect-ratio:9/16;background:#000;overflow:hidden}
        .rrx-video{width:100%;height:100%;object-fit:cover;display:block}
        .rrx-video-missing{height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#fff;font:600 12px Montserrat,Arial,sans-serif;text-transform:uppercase;letter-spacing:1px}
        .rrx-overlay{position:absolute;left:0;right:0;bottom:0;padding:16px;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);display:flex;justify-content:space-between;align-items:flex-end;opacity:0;transition:opacity .3s ease;z-index:4}
        .rrx-video-wrap:hover .rrx-overlay,.rrx-video-wrap:focus-within .rrx-overlay{opacity:1}
        .rrx-views{display:flex;align-items:center;gap:5px;background:rgba(0,0,0,.5);color:#fff;font:500 11px Montserrat,Arial,sans-serif;padding:4px 10px}.rrx-views svg{width:14px;height:14px}
        .rrx-actions{display:flex;gap:10px}.rrx-round{width:34px;height:34px;border:0;border-radius:999px;background:rgba(255,255,255,.15);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .25s ease,background .25s ease,color .25s ease}.rrx-round svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6}.rrx-round svg path[fill="currentColor"]{stroke:none}
        .rrx-round:hover{background:rgba(255,255,255,.35);transform:scale(1.15)}.rrx-round.is-active{background:rgba(255,68,68,.4);color:#ff4444}
        .rrx-card-content{padding:20px 15px;text-align:center;background:#fff;flex:1;display:flex;flex-direction:column;justify-content:center}
        .rrx-product{display:flex;align-items:center;gap:12px;margin-bottom:20px;text-align:left}
        .rrx-product-img{width:45px;height:45px;object-fit:contain;background:#f5f5f5;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.05);border:1px solid rgba(0,0,0,.03)}
        .rrx-product-name{font-family:Montserrat,Arial,sans-serif;font-size:14px;font-weight:600;color:#1c1c1c;margin:0;line-height:1.4;height:2.8em;overflow:hidden}
        .rrx-price{display:flex;align-items:center;gap:6px;font-family:Montserrat,Arial,sans-serif}.rrx-current{font-size:14px;font-weight:700;color:#1c1c1c}.rrx-original{font-size:13px;color:#888;text-decoration:line-through}
        .rrx-discount{font-size:13px;color:#2e7d32;font-weight:600;margin-top:2px;display:block}
        .rrx-buy{width:100%;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#fff;background:#1c1c1c;border:1px solid #1c1c1c;padding:12px 24px;cursor:pointer;transition:background .25s ease,color .25s ease}
        .rrx-buy:hover{background:#fff;color:#1c1c1c}
        .rrx-arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid rgba(0,0,0,.1);box-shadow:0 4px 16px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10}.rrx-arrow svg{width:18px;height:18px}
        .rrx-arrow:hover{background:#1c1c1c;color:#fff}.rrx-prev{left:8px}.rrx-next{right:8px}
        .rrx-testimonials button:focus-visible,.rrx-testimonial-card:focus-visible,.rrx-testimonials-track:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        @media(max-width:768px){.rrx-testimonials{padding:40px 0}.rrx-testimonials-title{font-size:24px;letter-spacing:4px;margin-bottom:30px}.rrx-testimonial-card{flex-basis:215px;min-width:215px}.rrx-testimonials-wrap{padding:0 20px}}
        @media(max-width:480px){.rrx-testimonial-card{flex-basis:240px;min-width:240px}.rrx-arrow{width:34px;height:34px}}
      `}</style>
      <h2 id="rrx-testimonials-title" className="rrx-testimonials-title">
        {title}
      </h2>
      <div
        className="rrx-testimonials-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') scroll(1)
          if (event.key === 'ArrowLeft') scroll(-1)
        }}
      >
        <div className="rrx-testimonials-track" ref={trackRef} role="list" tabIndex={0} aria-label="Customer testimonial videos">
          {list.map((item) => (
            <article className="rrx-testimonial-card" key={item.id} role="listitem" tabIndex={0}>
              <div className="rrx-video-wrap">
                {item.url ? (
                  <video
                    ref={(node) => {
                      videoRefs.current[item.id] = node
                    }}
                    className="rrx-video"
                    src={item.url}
                    muted={!unmuted[item.id]}
                    loop
                    playsInline
                    preload="metadata"
                    poster={item.productImg}
                    autoPlay
                  />
                ) : (
                  <div className="rrx-video-missing">Video unavailable</div>
                )}
                <div className="rrx-overlay">
                  <span className="rrx-views">
                    <EyeIcon /> {item.views}
                  </span>
                  <div className="rrx-actions">
                    <button
                      className={`rrx-round ${liked[item.id] ? 'is-active' : ''}`}
                      type="button"
                      aria-label="Like"
                      onClick={() => setLiked((current) => ({ ...current, [item.id]: !current[item.id] }))}
                    >
                      <HeartIcon />
                    </button>
                    <button className="rrx-round" type="button" aria-label={unmuted[item.id] ? 'Mute video' : 'Unmute video'} onClick={() => toggleMute(item.id)}>
                      <SoundIcon muted={!unmuted[item.id]} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="rrx-card-content">
                <div className="rrx-product">
                  <img className="rrx-product-img" src={item.productImg} alt={item.productName} loading="lazy" />
                  <div>
                    <h3 className="rrx-product-name">{item.productName}</h3>
                    <div className="rrx-price">
                      <span className="rrx-current">{formatPrice(item.price)}</span>
                      {item.originalPrice ? <span className="rrx-original">{formatPrice(item.originalPrice)}</span> : null}
                    </div>
                    <span className="rrx-discount">14% Off</span>
                  </div>
                </div>
                <button className="rrx-buy" type="button" onClick={() => console.log('buy', item.productId || item.id)}>
                  View Product
                </button>
              </div>
            </article>
          ))}
        </div>
        <button className="rrx-arrow rrx-prev" type="button" aria-label="Previous testimonials" onClick={() => scroll(-1)}>
          <ChevronIcon direction="previous" />
        </button>
        <button className="rrx-arrow rrx-next" type="button" aria-label="Next testimonials" onClick={() => scroll(1)}>
          <ChevronIcon direction="next" />
        </button>
      </div>
    </section>
  )
}
