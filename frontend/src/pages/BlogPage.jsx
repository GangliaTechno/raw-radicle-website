import { fallbackBlogData, fallbackBlogs } from '../data/blogs.js'
import { useJson } from '../hooks/useJson.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

const readingTime = (body = '') => `${Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 180))} min read`

export function BlogPage() {
  usePageTitle('The Raw Journal')
  const data = useJson('/api/blogs', fallbackBlogData)
  const blogs = data.blogs?.length ? data.blogs : fallbackBlogs
  const [featured] = blogs

  return (
    <main className="rr-blog-page" id="main" role="main">
      <style>{`
        .rr-blog-page{background:#efefef;color:#1c1c1c}
        .rr-blog-hero{padding:86px 28px 72px;text-align:center;border-bottom:1px solid rgba(0,0,0,.1);background:#000}
        .rr-blog-eyebrow{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.32em;text-transform:uppercase;color:#b08850;margin:0 0 18px}
        .rr-blog-title{font-family:Montserrat,Arial,sans-serif;font-size:clamp(36px,5vw,76px);font-weight:400;letter-spacing:.04em;line-height:1.04;text-transform:uppercase;max-width:920px;margin:0 auto 22px;color:#fff}
        .rr-blog-intro{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.8;color:#fff;max-width:620px;margin:0 auto}
        .rr-blog-featured{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(380px,.88fr);gap:24px;max-width:1320px;margin:0 auto;padding:70px 34px 46px}
        .rr-blog-featured-media{display:block;background:#111;min-height:520px;overflow:hidden;border-radius:8px}
        .rr-blog-featured-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;border-radius:inherit}
        .rr-blog-featured:hover .rr-blog-featured-media img{transform:scale(1.025)}
        .rr-blog-featured-copy{background:#fff;padding:58px 54px;display:flex;flex-direction:column;justify-content:center;border:1px solid rgba(0,0,0,.08);border-radius:8px}
        .rr-blog-meta{font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#9a7440;margin:0 0 18px}
        .rr-blog-featured-copy h2{font-family:Montserrat,Arial,sans-serif;font-size:clamp(28px,3vw,44px);font-weight:500;line-height:1.18;letter-spacing:.02em;margin:0 0 18px;color:#1c1c1c}
        .rr-blog-featured-copy p{font-family:Montserrat,Arial,sans-serif;font-size:15px;line-height:1.8;color:#555;margin:0 0 28px}
        .rr-blog-link{display:inline-flex;align-items:center;align-self:flex-start;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#1c1c1c;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:7px}
        .rr-blog-link:focus-visible,.rr-blog-card:focus-visible{outline:3px solid #b08850;outline-offset:4px}
        .rr-blog-grid-section{padding:34px 34px 78px;max-width:1320px;margin:0 auto}
        .rr-blog-section-title{font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;text-align:center;margin:0 0 42px;color:#1c1c1c}
        .rr-blog-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}
        .rr-blog-card{background:#fff;color:#1c1c1c;text-decoration:none;border:1px solid rgba(0,0,0,.08);border-radius:8px;overflow:hidden;display:flex;flex-direction:column;min-height:100%;transition:transform .28s ease,box-shadow .28s ease}
        .rr-blog-card:hover{transform:translateY(-6px);box-shadow:0 18px 36px rgba(0,0,0,.1)}
        .rr-blog-card-image{aspect-ratio:4/3;background:#ddd;overflow:hidden;border-top-left-radius:8px;border-top-right-radius:8px}
        .rr-blog-card-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease;border-top-left-radius:inherit;border-top-right-radius:inherit}
        .rr-blog-card:hover .rr-blog-card-image img{transform:scale(1.04)}
        .rr-blog-card-body{display:flex;flex-direction:column;gap:12px;padding:26px 24px 28px;flex:1}
        .rr-blog-card h3{font-family:Montserrat,Arial,sans-serif;font-size:19px;font-weight:600;line-height:1.35;margin:0;color:#1c1c1c}
        .rr-blog-card p{font-family:Montserrat,Arial,sans-serif;font-size:14px;line-height:1.7;color:#606060;margin:0}
        .rr-blog-card span:last-child{margin-top:auto;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#1c1c1c}
        .rr-blog-articles{background:#fff;padding:82px 34px 96px}
        .rr-blog-article{display:grid;grid-template-columns:minmax(280px,.74fr) minmax(0,1fr);gap:54px;align-items:start;max-width:1160px;margin:0 auto;padding:0 0 72px;border-bottom:1px solid #e3e0dc}
        .rr-blog-article + .rr-blog-article{padding-top:72px}
        .rr-blog-article:last-child{border-bottom:0;padding-bottom:0}
        .rr-blog-article img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#ddd;border-radius:8px}
        .rr-blog-article-content{max-width:720px}
        .rr-blog-article h2{font-family:Montserrat,Arial,sans-serif;font-size:clamp(25px,3vw,40px);font-weight:500;line-height:1.22;margin:0 0 20px;color:#1c1c1c}
        .rr-blog-article p:not(.rr-blog-meta){font-family:Montserrat,Arial,sans-serif;font-size:16px;line-height:1.9;color:#4f4f4f;margin:0 0 18px}
        @media(max-width:980px){.rr-blog-featured{grid-template-columns:1fr;padding:50px 22px}.rr-blog-featured-copy{border-left:1px solid rgba(0,0,0,.08);padding:38px 30px}.rr-blog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rr-blog-article{grid-template-columns:1fr;gap:28px}}
        @media(max-width:620px){.rr-blog-hero{padding:60px 18px 52px}.rr-blog-title{font-size:34px}.rr-blog-featured-media{min-height:340px}.rr-blog-grid-section,.rr-blog-articles{padding-left:18px;padding-right:18px}.rr-blog-grid{grid-template-columns:1fr}.rr-blog-article + .rr-blog-article{padding-top:48px}.rr-blog-article{padding-bottom:48px}}
      `}</style>

      <header className="rr-blog-hero">
        <p className="rr-blog-eyebrow">The Raw Journal</p>
        <h1 className="rr-blog-title">Chocolate, herbs, and mindful indulgence</h1>
        <p className="rr-blog-intro">
          Ingredient stories, everyday rituals, and thoughtful notes from the world of functional chocolate.
        </p>
      </header>

      {featured ? (
        <section className="rr-blog-featured" aria-labelledby="featured-blog-title">
          <a className="rr-blog-featured-media" href={`#${featured.id}`} aria-label={featured.title}>
            <img src={asset(featured.image)} alt={featured.title} />
          </a>
          <div className="rr-blog-featured-copy">
            <p className="rr-blog-meta">
              Featured / {featured.category} / {readingTime(featured.body)}
            </p>
            <h2 id="featured-blog-title">{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <a className="rr-blog-link" href={`#${featured.id}`}>
              Read article
            </a>
          </div>
        </section>
      ) : null}

      <section className="rr-blog-grid-section" aria-labelledby="latest-stories-title">
        <h2 className="rr-blog-section-title" id="latest-stories-title">
          Latest Stories
        </h2>
        <div className="rr-blog-grid">
          {blogs.map((blog) => (
            <a className="rr-blog-card" href={`#${blog.id}`} key={blog.id}>
              <span className="rr-blog-card-image">
                <img src={asset(blog.image)} alt={blog.title} loading="lazy" />
              </span>
              <span className="rr-blog-card-body">
                <span className="rr-blog-meta">
                  {blog.category} / {readingTime(blog.body)}
                </span>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <span>Read article</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="rr-blog-articles" aria-label="Full articles">
        {blogs.map((blog) => (
          <article className="rr-blog-article" id={blog.id} key={blog.id}>
            <img src={asset(blog.image)} alt={blog.title} loading="lazy" />
            <div className="rr-blog-article-content">
              <p className="rr-blog-meta">
                {blog.category} / {readingTime(blog.body)}
              </p>
              <h2>{blog.title}</h2>
              {blog.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((para, index) => (
                  <p key={`${blog.id}-${index}`}>{para.trim()}</p>
                ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
