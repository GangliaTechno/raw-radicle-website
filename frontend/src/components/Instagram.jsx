import { useRef } from 'react'

const profileUrl = 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz'

const defaultInstagram = {
  profileUrl,
  posts: [
    { id: 'ig1', image: '/assets/instagram/choco1.png', postUrl: profileUrl },
    { id: 'ig2', image: '/assets/instagram/choco2.png', postUrl: profileUrl },
    { id: 'ig3', image: '/assets/instagram/choco3.png', postUrl: profileUrl },
    { id: 'ig4', image: '/assets/instagram/choco4.png', postUrl: profileUrl },
    { id: 'ig5', image: '/assets/instagram/choco5.png', postUrl: profileUrl },
    { id: 'ig6', image: '/assets/instagram/choco6.png', postUrl: profileUrl },
    { id: 'ig7', image: '/assets/instagram/choco7.png', postUrl: profileUrl },
    { id: 'ig8', image: '/assets/instagram/choco8.webp', postUrl: profileUrl },
    { id: 'ig9', image: '/assets/amilk/amilk-2.png', postUrl: profileUrl },
    { id: 'ig10', image: '/assets/cdark/cdark-3.png', postUrl: profileUrl },
    { id: 'ig11', image: '/assets/bmilk/bmilk-3.png', postUrl: profileUrl },
    { id: 'ig12', image: '/assets/bdark/bdark-3.png', postUrl: profileUrl },
  ],
}

const fallbackPosts = [
  { id: 'mock1', image: '/assets/instagram/choco1.png' },
  { id: 'mock2', image: '/assets/choco/adark.png' },
  { id: 'mock3', image: '/assets/experts/doctor1.png' },
]

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
)

export default function Instagram({ instagram = defaultInstagram, title = 'RAW RADICLES on Instagram' }) {
  const data = instagram || defaultInstagram
  const posts = data.posts || []
  const hasPosts = posts.length > 0
  const rowRef = useRef(null)

  const scroll = (direction) => {
    rowRef.current?.scrollBy({ left: rowRef.current.clientWidth * 0.8 * direction, behavior: 'smooth' })
  }

  return (
    <section className="rrx-instagram" aria-labelledby="rrx-instagram-title">
      <style>{`
        .rrx-instagram{padding:30px 10px;background:#efefef;box-sizing:border-box}
        .rrx-instagram-title{font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:400;letter-spacing:8px;text-transform:uppercase;color:#1c1c1c;text-align:center;margin:0 0 50px}
        .rrx-instagram-shell{position:relative;width:100%;margin:0 auto;padding:0}
        .rrx-instagram-row{display:flex;gap:4px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;scroll-snap-type:x mandatory}
        .rrx-instagram-row::-webkit-scrollbar{display:none}
        .rrx-instagram-item{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:#ddd;border-radius:8px}
        .rrx-instagram-row .rrx-instagram-item{flex:0 0 calc((100% - 20px)/6);min-width:calc((100% - 20px)/6);scroll-snap-align:start}
        .rrx-instagram-img{display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit;transition:transform .4s ease}
        .rrx-instagram-overlay{position:absolute;inset:0;border-radius:inherit;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}
        .rrx-instagram-overlay svg{width:28px;height:28px}
        .rrx-instagram-item:hover .rrx-instagram-img{transform:scale(1.05)}
        .rrx-instagram-item:hover .rrx-instagram-overlay,.rrx-instagram-item:focus-visible .rrx-instagram-overlay{opacity:1}
        .rrx-instagram-item:focus-visible,.rrx-follow:focus-visible{outline:3px solid #b08850;outline-offset:3px}
        .rrx-instagram-empty{max-width:560px;margin:0 auto;text-align:center}
        .rrx-instagram-mock{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-bottom:24px}
        .rrx-follow{display:inline-block;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#fff;background:#1c1c1c;border:1px solid #1c1c1c;padding:14px 28px;text-decoration:none;transition:background .25s ease,color .25s ease}
        .rrx-follow:hover{background:#fff;color:#1c1c1c}
        .rrx-instagram-arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 4px 12px rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;z-index:3;cursor:pointer;color:#1c1c1c}
        .rrx-instagram-arrow:hover{background:#1c1c1c;color:#fff}.rrx-instagram-prev{left:12px}.rrx-instagram-next{right:12px}.rrx-instagram-arrow svg{width:18px;height:18px}
        @media(max-width:1024px){.rrx-instagram-row .rrx-instagram-item{flex-basis:calc((100% - 12px)/4);min-width:calc((100% - 12px)/4)}}
        @media(max-width:768px){.rrx-instagram-title{font-size:22px;letter-spacing:4px}.rrx-instagram-row .rrx-instagram-item{flex-basis:calc((100% - 8px)/3);min-width:calc((100% - 8px)/3)}}
        @media(max-width:480px){.rrx-instagram{padding:30px 8px}.rrx-instagram-row .rrx-instagram-item{flex-basis:calc((100% - 4px)/2);min-width:calc((100% - 4px)/2)}.rrx-instagram-arrow{width:34px;height:34px}}
      `}</style>
      <h2 id="rrx-instagram-title" className="rrx-instagram-title">
        {title}
      </h2>
      {hasPosts ? (
        <div className="rrx-instagram-shell">
          <div className="rrx-instagram-row" ref={rowRef} tabIndex={0} aria-label="Raw Radicles Instagram posts">
            {posts.map((post) => (
              <a className="rrx-instagram-item" href={post.postUrl || data.profileUrl} target="_blank" rel="noopener noreferrer" key={post.id} aria-label="Open Raw Radicles Instagram post">
                <img className="rrx-instagram-img" src={post.image} alt="Raw Radicles Instagram" loading="lazy" />
                <span className="rrx-instagram-overlay">
                  <InstagramIcon />
                </span>
              </a>
            ))}
          </div>
          <button className="rrx-instagram-arrow rrx-instagram-prev" type="button" aria-label="Previous Instagram posts" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="rrx-instagram-arrow rrx-instagram-next" type="button" aria-label="Next Instagram posts" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="rrx-instagram-empty">
          <div className="rrx-instagram-mock">
            {fallbackPosts.map((post) => (
              <span className="rrx-instagram-item" key={post.id}>
                <img className="rrx-instagram-img" src={post.image} alt="Raw Radicles Instagram preview" loading="lazy" />
                <span className="rrx-instagram-overlay">
                  <InstagramIcon />
                </span>
              </span>
            ))}
          </div>
          <a className="rrx-follow" href={data.profileUrl || profileUrl} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </a>
        </div>
      )}
    </section>
  )
}
