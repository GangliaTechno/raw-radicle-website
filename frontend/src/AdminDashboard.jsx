import { useEffect, useMemo, useState } from 'react'
import './AdminDashboard.css'
import { ensureAdmins, upsertAdminUser, getSession, setSession, clearSession, ADMIN_EMAILS, DEFAULT_PASSWORD, USERS_KEY, ADMIN_SESSION_TIMEOUT_MS } from './services/authService.js';

// ─── KPI Chart Helpers ────────────────────────────────────────────────────────

function fmtTime(secs) {
  if (!secs) return '0s';
  if (secs < 60) return secs + 's';
  return Math.floor(secs / 60) + 'm ' + (secs % 60) + 's';
}

function AdminIcon({ type }) {
  const icons = {
    views: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    clicks: (
      <>
        <path d="M8 3v11l3-3 3 7 3-1.5-3-6h4L8 3z" />
      </>
    ),
    time: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    products: (
      <>
        <path d="M6 2h12l3 5v15H3V7l3-5z" />
        <path d="M3 7h18" />
        <path d="M9 11a3 3 0 0 0 6 0" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21a7 7 0 0 1 14 0" />
        <path d="M17 11a4 4 0 0 1 0 8" />
      </>
    ),
    subscribers: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {icons[type] || icons.views}
    </svg>
  )
}

function SparkCard({ actionLabel, label, value, trend, icon, onClick }) {
  const up = trend >= 0;
  return (
    <button className="kpi-card" onClick={onClick} type="button">
      <div className="kpi-card__icon">{icon}</div>
      <div className="kpi-card__body">
        <p className="kpi-card__label">{label}</p>
        <p className="kpi-card__value">{value}</p>
        {trend !== undefined ? (
          <p className={`kpi-card__trend ${up ? 'up' : 'down'}`}>
            {up ? '+' : '-'}{Math.abs(trend)}% vs previous 7d
          </p>
        ) : actionLabel ? (
          <p className="kpi-card__action">{actionLabel}</p>
        ) : null}
      </div>
    </button>
  );
}

function LineChart({ data, colorStroke = '#e85d26' }) {
  const W = 640, H = 140;
  const PAD = { t: 14, r: 14, b: 28, l: 34 };
  const cW = W - PAD.l - PAD.r;
  const cH = H - PAD.t - PAD.b;
  const max = Math.max(...data.map(d => d.value), 1);
  const pts = data.map((d, i) => ({
    x: PAD.l + (i / Math.max(data.length - 1, 1)) * cW,
    y: PAD.t + cH - (d.value / max) * cH,
    ...d,
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${pts[pts.length - 1].x.toFixed(1)},${(PAD.t + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(PAD.t + cH).toFixed(1)} Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * max));
  return (
    <svg className="kpi-line-chart" viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
      {yTicks.map((v, i) => {
        const y = PAD.t + cH - (v / max) * cH;
        return (
          <g className="kpi-line-grid" key={i}>
            <line x1={PAD.l} y1={y} x2={PAD.l + cW} y2={y} />
            <text x={PAD.l - 8} y={y + 4} textAnchor="end">{v}</text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorStroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colorStroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="kpi-line-area" d={areaD} fill="url(#lc-fill)" />
      <path className="kpi-line-path" d={pathD} fill="none" stroke={colorStroke} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g className="kpi-line-point" key={i}>
          <circle cx={p.x} cy={p.y} r="2.6" fill={colorStroke} />
          <title>{p.label}: {p.value}</title>
        </g>
      ))}
      {pts.filter((_, i) => i % 2 === 0 || i === pts.length - 1).map((p, i) => (
        <text className="kpi-line-label" key={i} x={p.x} y={H - 8} textAnchor="middle">{p.label}</text>
      ))}
    </svg>
  );
}

function HBar({ items, color = '#e85d26' }) {
  const max = Math.max(...items.map(d => d.value), 1);
  return (
    <div className="hbar-list">
      {items.map((item, i) => (
        <div className="hbar-row" key={i}>
          <span className="hbar-label" title={item.label}>{item.label}</span>
          <div className="hbar-track">
            <div className="hbar-fill" style={{ width: `${(item.value / max) * 100}%`, background: color }} />
          </div>
          <span className="hbar-val">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const r = 46, cx = 60, cy = 60, sw = 14;
  const circ = 2 * Math.PI * r;
  const segmentData = segments.map((seg, index) => {
    const previousTotal = segments.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    return {
      ...seg,
      rotation: (previousTotal / Math.max(total, 1)) * 360 - 90,
      offset: circ * (1 - (total > 0 ? seg.value / total : 0)),
    };
  });
  return (
    <svg className="kpi-donut-chart" viewBox="0 0 120 120" style={{ width: '120px', height: '120px', flexShrink: 0 }}>
      <circle className="kpi-donut-track" cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      {segmentData.map((seg, i) => (
        <circle className="kpi-donut-segment" key={i} cx={cx} cy={cy} r={r}
          fill="none" stroke={seg.color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={seg.offset}
          style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${seg.rotation}deg)`, transition: 'stroke-dashoffset 0.6s ease' }}
        >
          <title>{seg.label}: {seg.value}</title>
        </circle>
      ))}
      <text className="kpi-donut-total" x={cx} y={cy - 5} textAnchor="middle">{total}</text>
      <text className="kpi-donut-caption" x={cx} y={cy + 11} textAnchor="middle">CLICKS</text>
    </svg>
  );
}

function ActivityDot({ type }) {
  const colors = { pageview: '#e85d26', click: '#3b82f6', time_on_page: '#10b981' };
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: colors[type] || '#9e9789', marginRight: 6 }} />;
}

const normalizeProducts = (products) =>
  Object.entries(products || {}).map(([id, product]) => ({
    id,
    name: product.name || id,
    price: product.price || '',
    image: product.image || '',
    page: product.page || '',
    ...product,
  }))

const defaultHeroSlides = [
  { title: 'Banner 1', subtitle: '', image: 'assets/RRbanner_11.png', link: '/products' },
  { title: 'Banner 2', subtitle: '', image: 'assets/RRbanner_4.png', link: '/products' },
  { title: 'Banner 3', subtitle: '', image: 'assets/RRbanner_2.png', link: '/products' },
  { title: 'Banner 4', subtitle: '', image: 'assets/RRbanner_3.png', link: '/products' },
]

const defaultTestimonialVideos = [
  { id: 'v1', url: 'assets/video/video-1.mp4', productId: 'adarkc', productName: 'Ashwagandha Dark Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/adark.png', views: '1.2K Views' },
  { id: 'v2', url: 'assets/video/video-2.mp4', productId: 'amilkc', productName: 'Ashwagandha Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/apmilk.png', views: '2.5K Views' },
  { id: 'v3', url: 'assets/video/video-3.mp4', productId: 'cdarkc', productName: 'Chyawanaprash Dark', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/cdark.png', views: '950 Views' },
  { id: 'v4', url: 'assets/video/video-4.mp4', productId: 'cmilkc', productName: 'Chyawanaprash Milk', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/cmilk.png', views: '3.1K Views' },
  { id: 'v5', url: 'assets/video/video-5.mp4', productId: 'bmilkc', productName: 'Brahmi Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/bmilk.png', views: '1.8K Views' },
  { id: 'v6', url: 'assets/video/video-6.mp4', productId: 'bdarkc', productName: 'Brahmi Dark Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/bdark.png', views: '4.2K Views' },
  { id: 'v7', url: 'assets/video/video-7.mp4', productId: 'amilkc', productName: 'Ashwagandha Milk Slab', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/apmilk.png', views: '2.1K Views' },
  { id: 'v8', url: 'assets/video/video-8.mp4', productId: 'cdarkc', productName: 'Chyawanaprash Dark', price: 'Rs. 300', originalPrice: 'Rs. 350', productImg: 'assets/choco/cdark.png', views: '5.7K Views' },
]

const defaultFaqs = [
  {
    question: 'What Ayurvedic ingredients are in your chocolates?',
    answer: 'Our chocolates are infused with whole Ayurvedic herbs: Ashwagandha, Brahmi, and Chyawanaprash, blended with high-quality cacao.',
  },
  {
    question: 'Are your chocolates vegan and gluten-free?',
    answer: 'Our dark chocolate slabs are vegan. Our milk chocolate slabs contain dairy. None of our products contain gluten.',
  },
  {
    question: 'How much chocolate should I eat per day?',
    answer: 'We recommend enjoying 2-3 squares per day as part of a balanced diet.',
  },
]

const defaultInstagram = {
  profileUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz',
  posts: [
    { id: 'ig1', image: 'assets/instagram/choco1.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig2', image: 'assets/instagram/choco2.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig3', image: 'assets/instagram/choco3.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig4', image: 'assets/instagram/choco4.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig5', image: 'assets/instagram/choco5.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig6', image: 'assets/instagram/choco6.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig7', image: 'assets/instagram/choco7.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig8', image: 'assets/instagram/choco8.webp', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig9', image: 'assets/amilk/amilk-2.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig10', image: 'assets/cdark/cdark-3.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig11', image: 'assets/bmilk/bmilk-3.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
    { id: 'ig12', image: 'assets/bdark/bdark-3.png', postUrl: 'https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz' },
  ],
}

const cloneData = (data) => JSON.parse(JSON.stringify(data || {}))

const normalizeHomepageData = (data) => {
  const next = data && typeof data === 'object' && !Array.isArray(data) ? cloneData(data) : {}
  if (!Array.isArray(next.hero?.slides) || next.hero.slides.length === 0) {
    next.hero = { ...(next.hero || {}), slides: cloneData(defaultHeroSlides) }
  }
  if (!Array.isArray(next.testimonials?.videos) || next.testimonials.videos.length === 0) {
    next.testimonials = { ...(next.testimonials || {}), videos: cloneData(defaultTestimonialVideos) }
  }
  if (!Array.isArray(next.faqs) || next.faqs.length === 0) {
    next.faqs = cloneData(defaultFaqs)
  }
  if (!Array.isArray(next.instagram?.posts) || next.instagram.posts.length === 0) {
    next.instagram = { ...cloneData(defaultInstagram), ...(next.instagram || {}), posts: cloneData(defaultInstagram.posts) }
  }
  return next
}

const emptyHomePage = {
  hero: { slides: defaultHeroSlides },
  products: [],
  instagram: defaultInstagram,
  testimonials: { videos: defaultTestimonialVideos },
  faqs: defaultFaqs,
}

const dataChanged = (current, saved) => JSON.stringify(current || {}) !== JSON.stringify(saved || {})
const stripAdminHtml = (value) => String(value || '').replace(/<[^>]*>/g, '').trim()

const defaultBlogs = [
  {
    id: 'blog-chyawanaprash',
    category: 'Ingredients',
    title: 'Why chyawanaprash and dark chocolate belong together',
    excerpt: 'A look at how deep cacao notes pair with the warm, spiced complexity of a classic ayurvedic blend.',
    image: 'assets/chocolate.jpg',
    body: 'Dark chocolate has a natural bitterness that makes it a beautiful canvas for layered flavors. Chyawanaprash brings warmth, spice, and fruit-forward depth, so the final bite feels more rounded than ordinary chocolate.\n\nThe best way to enjoy it is slowly. Let the chocolate soften, notice the cacao first, then the herbal notes that arrive after. It is a small pause with a lot of character.',
  },
  {
    id: 'blog-ashwagandha',
    category: 'Rituals',
    title: 'A calmer snack break with ashwagandha chocolate',
    excerpt: 'Build a small afternoon ritual around flavor, pause, and a square of chocolate that feels considered.',
    image: 'assets/bentogrid.webp',
    body: 'Snack breaks often happen on autopilot. A square of ashwagandha chocolate invites a different rhythm: sit down, breathe, taste, and give the day one quiet minute.\n\nPair it with warm milk, herbal tea, or just a glass of water. The point is not ceremony for ceremony\'s sake, but a simple repeatable habit that feels good.',
  },
  {
    id: 'blog-brahmi',
    category: 'Wellness',
    title: 'Brahmi, focus, and the art of slow chocolate',
    excerpt: 'How to turn a simple treat into a more attentive moment during busy workdays.',
    image: 'assets/pure_chocolate_hero.png',
    body: 'Brahmi has long been associated with clarity and attention. In chocolate, it becomes approachable: a familiar treat with an herbal edge that makes you pay attention to the bite.\n\nTry keeping one bar for focused work sessions. One piece before a task can mark the start of a cleaner, calmer block of time.',
  },
]

const adminPanels = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'homepage', label: 'Homepage' },
  { id: 'products', label: 'Products' },
  { id: 'blog', label: 'Blog' },
  { id: 'users', label: 'Users' },
  { id: 'subscribed', label: 'Subscribed' },
]

const SidebarIcon = ({ type }) => {
  const icons = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
    homepage: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
    products: (
      <>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
    blog: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    subscribed: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {icons[type] || icons.dashboard}
    </svg>
  )
}

function AdminDashboard() {
  const [user, setUser] = useState(() => getSession())
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')
  const [activePanel, setActivePanel] = useState('dashboard')
  const [products, setProducts] = useState({})
  const [homepage, setHomepage] = useState(emptyHomePage)
  const [savedHomepage, setSavedHomepage] = useState(emptyHomePage)
  const [blogs, setBlogs] = useState(defaultBlogs)
  const [savedBlogs, setSavedBlogs] = useState(defaultBlogs)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [productCms, setProductCms] = useState({})
  const [savedProductCms, setSavedProductCms] = useState({})
  const [productCmsEditorResetKey, setProductCmsEditorResetKey] = useState(0)
  const [, setPendingReviews] = useState({})
  const [subscribers, setSubscribers] = useState([])
  const [activity, setActivity] = useState(['Opened React admin dashboard'])
  const [status, setStatus] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  useEffect(() => {
    document.title = 'Admin Dashboard | Raw Radicles'
  }, [])

  // Users state management
  const [users, setUsers] = useState(() => {
    ensureAdmins()
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  })
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' | 'edit'
  const [modalError, setModalError] = useState('')
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'manager',
    password: '',
  })

  useEffect(() => {
    if (!user?.expiresAt) return undefined

    const syncSession = () => {
      const currentSession = getSession()

      if (!currentSession) {
        setUser(null)
        setLoginError('Your admin session expired. Please log in again.')
        return
      }

      setUser(currentSession)
    }

    const timeUntilExpiry = Math.max(user.expiresAt - Date.now(), 0)
    const timeout = window.setTimeout(syncSession, timeUntilExpiry)
    const interval = window.setInterval(syncSession, 60 * 1000)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [user?.expiresAt])

  // Product state management
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [productModalMode, setProductModalMode] = useState('add') // 'add' | 'edit'
  const [activeProductTab, setActiveProductTab] = useState('basic')
  const [activeHomepageTab, setActiveHomepageTab] = useState('hero')
  const [productFormError, setProductFormError] = useState('')
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    price: '',
    sku: '',
    description: '',
    pageBadge: '',
    badge: '',
    image: '',
    hoverImage: '',
    gallery: ['', '', '', ''],
    marketplaces: {
      blinkit: '',
      zepto: '',
      amazon: '',
      instamart: '',
      flipkart: ''
    },
    features: [
      { title: '', desc: '' }
    ],
    specs: {
      series: '',
      chocolateType: '',
      keyIngredient: '',
      weight: '',
      storage: '',
      license: ''
    },
    quality: ''
  })

  const productList = useMemo(() => normalizeProducts(products), [products])
  const homepageHasChanges = useMemo(() => dataChanged(homepage, savedHomepage), [homepage, savedHomepage])
  const blogsHaveChanges = useMemo(() => dataChanged(blogs, savedBlogs), [blogs, savedBlogs])
  const productCmsHasChanges = useMemo(() => dataChanged(productCms, savedProductCms), [productCms, savedProductCms])

  const selectedProduct = productList.find((product) => product.id === selectedProductId)
  useEffect(() => {
    ensureAdmins()
  }, [])

  useEffect(() => {
    if (!user) return

    const loadData = async () => {
      const [productsResult, homepageResult, pendingResult, blogsResult, subscribersResult] = await Promise.all([
        fetch('/api/products').then((response) => response.json()).catch(() => ({})),
        fetch('/api/homepage').then((response) => response.json()).catch(() => emptyHomePage),
        fetch('/api/reviews/pending').then((response) => response.json()).catch(() => ({})),
        fetch('/api/blogs').then((response) => response.json()).catch(() => ({ blogs: defaultBlogs })),
        fetch('/api/subscribers').then((response) => response.json()).catch(() => ({ subscribers: [] })),
      ])

      const nextHomepage = normalizeHomepageData(homepageResult)
      setProducts(productsResult)
      setHomepage(nextHomepage)
      setSavedHomepage(cloneData(nextHomepage))
      setPendingReviews(pendingResult)
      const nextBlogs = Array.isArray(blogsResult.blogs) && blogsResult.blogs.length > 0 ? blogsResult.blogs : defaultBlogs
      setBlogs(nextBlogs)
      setSavedBlogs(cloneData(nextBlogs))
      setSubscribers(Array.isArray(subscribersResult.subscribers) ? subscribersResult.subscribers : [])

      const firstProductId = Object.keys(productsResult || {})[0] || ''
      setSelectedProductId((current) => current || firstProductId)

      // Load analytics
      setAnalyticsLoading(true)
      try {
        const aData = await fetch('/api/analytics').then(r => r.json())
        setAnalytics(aData)
      } catch (e) {
        console.warn('Analytics unavailable:', e)
      } finally {
        setAnalyticsLoading(false)
      }
    }

    loadData()
  }, [user])

  useEffect(() => {
    if (!selectedProductId) return

    fetch(`/api/product-cms/${selectedProductId}`)
      .then((response) => response.json())
      .then((data) => {
        const nextData = data || {}
        setProductCms(nextData)
        setSavedProductCms(cloneData(nextData))
        setProductCmsEditorResetKey((key) => key + 1)
      })
      .catch(() => {
        setProductCms({})
        setSavedProductCms({})
        setProductCmsEditorResetKey((key) => key + 1)
      })
  }, [selectedProductId])

  const showStatus = (message) => {
    setStatus(message)
    window.setTimeout(() => setStatus(''), 2600)
  }

  const addActivity = (message) => {
    setActivity((items) => [message, ...items].slice(0, 6))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const email = loginForm.email.trim().toLowerCase()
    const isDefaultAdminLogin =
      ADMIN_EMAILS.includes(email) && loginForm.password === DEFAULT_PASSWORD

    const found = isDefaultAdminLogin
      ? upsertAdminUser(email)
      : ensureAdmins().find(
          (item) => item.email?.toLowerCase() === email && item.password === loginForm.password,
        )

    if (!found) {
      setLoginError('Incorrect email or password.')
      return
    }

    if (found.role !== 'admin' && !ADMIN_EMAILS.includes(found.email.toLowerCase())) {
      setLoginError('This account is not an admin account.')
      return
    }

    setSession(found)
    setUser(getSession())
    window.history.replaceState(null, '', '/admin')
    setLoginError('')
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  const saveHomepage = async () => {
    const result = await fetch('/api/homepage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(homepage),
    }).then((response) => response.json())

    if (result.success) {
      setSavedHomepage(cloneData(homepage))
      addActivity('Saved homepage content')
      showStatus('Homepage content saved')
    }
  }

  const cancelHomepageChanges = () => {
    setHomepage(cloneData(savedHomepage))
    showStatus('Homepage changes discarded')
  }

  const updateBlog = (index, key, value) => {
    setBlogs((current) => {
      const next = [...current]
      next[index] = {
        ...next[index],
        [key]: value,
        updatedAt: new Date().toISOString(),
      }
      return next
    })
  }

  const addBlog = () => {
    setBlogs((current) => [
      ...current,
      {
        id: '',
        category: '',
        title: '',
        excerpt: '',
        image: '',
        body: '',
        draftKey: `blog-draft-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const removeBlog = (index) => {
    if (!window.confirm('Delete this blog entry?')) return

    setBlogs((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  const saveBlogs = async () => {
    const result = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blogs: blogs.map((blog) => {
          const { draftKey, ...blogContent } = blog
          return {
            ...blogContent,
            id: (blog.id || blog.title || `blog-${Date.now()}`)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, ''),
          }
        }),
        updatedAt: new Date().toISOString(),
      }),
    }).then((response) => response.json())

    if (result.success) {
      const nextBlogs = result.blogs || blogs
      setBlogs(nextBlogs)
      setSavedBlogs(cloneData(nextBlogs))
      addActivity('Saved blog content')
      showStatus('Blog content saved')
    }
  }

  const cancelBlogChanges = () => {
    setBlogs(cloneData(savedBlogs))
    showStatus('Blog changes discarded')
  }

  const saveProductCms = async () => {
    if (!selectedProductId) return

    const nextProductCms = {
      ...productCms,
      updatedAt: new Date().toISOString(),
    }

    const result = await fetch(`/api/product-cms/${selectedProductId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextProductCms),
    }).then((response) => response.json())

    if (result.success) {
      setProductCms(nextProductCms)
      setSavedProductCms(cloneData(nextProductCms))
      setProductCmsEditorResetKey((key) => key + 1)
      addActivity(`Saved CMS for ${selectedProductId}`)
      showStatus('Product CMS saved')
    }
  }

  const cancelProductCmsChanges = () => {
    setProductCms(cloneData(savedProductCms))
    setProductCmsEditorResetKey((key) => key + 1)
    showStatus('Product CMS changes discarded')
  }

  const openAddUserModal = () => {
    setModalMode('add')
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      role: 'manager',
      password: '',
    })
    setModalError('')
    setIsUserModalOpen(true)
  }

  const openEditUserModalFor = (userItem) => {
    setModalMode('edit')
    setSelectedUserId(userItem.id)
    setUserForm({
      firstName: userItem.firstName || '',
      lastName: userItem.lastName || '',
      email: userItem.email || '',
      role: userItem.role || 'manager',
      password: '',
    })
    setModalError('')
    setIsUserModalOpen(true)
  }

  const closeUserModal = () => {
    setIsUserModalOpen(false)
    setModalError('')
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((u) => u.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
      if (selectedUserId === userId) {
        setSelectedUserId(null)
      }
      addActivity('Deleted a user')
      showStatus('User deleted successfully')
    }
  }

  const handleSaveUser = (event) => {
    event.preventDefault()
    const email = userForm.email.trim().toLowerCase()

    if (!email || !email.includes('@')) {
      setModalError('Please enter a valid email address.')
      return
    }

    const duplicate = users.find(
      (u) => u.email?.toLowerCase() === email && (modalMode === 'add' || u.id !== selectedUserId),
    )
    if (duplicate) {
      setModalError('A user with this email address already exists.')
      return
    }

    if (modalMode === 'add') {
      const newUser = {
        id: `user-${Date.now()}`,
        firstName: userForm.firstName.trim(),
        lastName: userForm.lastName.trim(),
        email,
        role: userForm.role,
        password: userForm.password.trim() || DEFAULT_PASSWORD,
        createdAt: new Date().toISOString(),
      }
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
      addActivity(`Added user: ${newUser.firstName}`)
      showStatus('User added successfully')
    } else {
      const updatedUsers = users.map((u) => {
        if (u.id === selectedUserId) {
          return {
            ...u,
            firstName: userForm.firstName.trim(),
            lastName: userForm.lastName.trim(),
            email,
            role: userForm.role,
            password: userForm.password.trim() || u.password || DEFAULT_PASSWORD,
          }
        }
        return u
      })
      setUsers(updatedUsers)
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
      addActivity(`Updated user: ${userForm.firstName}`)
      showStatus('User updated successfully')
    }

    setIsUserModalOpen(false)
  }

  // Product management actions
  const handleAddFeature = () => {
    setProductForm(current => ({
      ...current,
      features: [...current.features, { title: '', desc: '' }]
    }))
  }

  const handleRemoveFeature = (index) => {
    setProductForm(current => ({
      ...current,
      features: current.features.filter((_, i) => i !== index)
    }))
  }

  const openAddProductModal = () => {
    setProductFormError('')
    setProductModalMode('add')
    setActiveProductTab('basic')
    setProductForm({
      id: '',
      name: '',
      price: '',
      sku: '',
      description: '',
      pageBadge: '',
      badge: '',
      image: '',
      hoverImage: '',
      gallery: ['', '', '', ''],
      marketplaces: {
        blinkit: '',
        zepto: '',
        amazon: '',
        instamart: '',
        flipkart: ''
      },
      features: [
        { title: '', desc: '' }
      ],
      specs: {
        series: '',
        chocolateType: '',
        keyIngredient: '',
        weight: '',
        storage: '',
        license: ''
      },
      quality: ''
    })
    setIsProductModalOpen(true)
  }

  const openEditProductModal = async (product) => {
    setProductFormError('')
    setProductModalMode('edit')
    setActiveProductTab('basic')

    let cmsData = {}
    try {
      const res = await fetch(`/api/product-cms/${product.id}`)
      cmsData = await res.json()
    } catch (e) {
      console.error('Failed to fetch product CMS', e)
    }

    const bi = cmsData.basicInfo || {}
    const details = cmsData.details || {}
    const marketplaces = bi.marketplaces || {}

    const features = [...(details.features || [])]
    if (features.length === 0) {
      features.push({ title: '', desc: '' })
    }

    const specFields = {
      series: '',
      chocolateType: '',
      keyIngredient: '',
      weight: '60g',
      storage: '18°C – 24°C (Cool & Dry)',
      license: 'FSSAI, GS-1, Made in India'
    }
    ;(details.specs || []).forEach(spec => {
      const title = (spec.title || '').toLowerCase()
      if (title.includes('series')) specFields.series = spec.desc
      else if (title.includes('type')) specFields.chocolateType = spec.desc
      else if (title.includes('herb') || title.includes('ingredient')) specFields.keyIngredient = spec.desc
      else if (title.includes('weight')) specFields.weight = spec.desc
      else if (title.includes('storage')) specFields.storage = spec.desc
      else if (title.includes('license')) specFields.license = spec.desc
    })

    const gallery = [...(cmsData.gallery || [])]
    while (gallery.length < 4) {
      gallery.push('')
    }

    setProductForm({
      id: product.id,
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      pageBadge: stripAdminHtml(bi.badge),
      badge: product.badge || '',
      image: product.image || '',
      hoverImage: product.hoverImage || '',
      gallery: gallery.slice(0, 4),
      marketplaces: {
        blinkit: marketplaces.blinkit || '',
        zepto: marketplaces.zepto || '',
        amazon: marketplaces.amazon || '',
        instamart: marketplaces.instamart || '',
        flipkart: marketplaces.flipkart || ''
      },
      features: features,
      specs: specFields,
      quality: stripAdminHtml(details.quality)
    })

    setIsProductModalOpen(true)
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm(`Are you sure you want to delete the product "${id}"? This will delete its page template and all database entries.`)) {
      try {
        const result = await fetch(`/api/products/${id}`, {
          method: 'DELETE'
        }).then(res => res.json())

        if (result.success) {
          setProducts(current => {
            const updated = { ...current }
            delete updated[id]
            return updated
          })
          addActivity(`Deleted product: ${id}`)
          showStatus('Product deleted successfully')
        } else {
          alert('Failed to delete product: ' + (result.error || 'Unknown error'))
        }
      } catch (e) {
        console.error(e)
        alert('Failed to delete product: ' + e.message)
      }
    }
  }

  const handleSaveProduct = async (event) => {
    event.preventDefault()
    setProductFormError('')

    const id = productForm.id.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!id) {
      setProductFormError('Please enter a valid product ID (alphanumeric).')
      return
    }

    if (productModalMode === 'add' && products[id]) {
      setProductFormError('A product with this ID already exists.')
      return
    }

    if (!productForm.name.trim()) {
      setProductFormError('Please enter a product name.')
      return
    }

    if (!productForm.image.trim()) {
      setProductFormError('Please upload a primary catalog image.')
      setActiveProductTab('media')
      return
    }

    if (!productForm.hoverImage.trim()) {
      setProductFormError('Please upload a hover catalog image.')
      setActiveProductTab('media')
      return
    }

    const galleryImages = productForm.gallery.filter(g => g.trim() !== '')
    if (galleryImages.length < 4) {
      setProductFormError('Please upload at least 4 gallery images.')
      setActiveProductTab('media')
      return
    }

    const priceNum = parseFloat(productForm.price)
    if (isNaN(priceNum)) {
      setProductFormError('Please enter valid numeric price.')
      return
    }
    const mrpNum = priceNum

    const pagePath = `/${id}`
    const updatedCatalogEntry = {
      id: id,
      name: productForm.name.trim(),
      price: priceNum,
      mrp: mrpNum,
      description: productForm.description.trim(),
      image: productForm.image.trim(),
      hoverImage: productForm.hoverImage.trim(),
      page: pagePath,
      badge: productForm.badge.trim() || null
    }

    const updatedCatalog = {
      ...products,
      [id]: updatedCatalogEntry
    }

    try {
      const catalogResult = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCatalog)
      }).then(res => res.json())

      if (!catalogResult.success) {
        setProductFormError('Failed to save product catalog.')
        return
      }

      let existingCms = {}
      try {
        const res = await fetch(`/api/product-cms/${id}`)
        existingCms = await res.json()
      } catch {
        existingCms = {}
      }

      const updatedCms = {
        ...existingCms,
        gallery: galleryImages,
        basicInfo: {
          title: productForm.name.trim().toUpperCase(),
          subtitle: '',
          price: priceNum.toFixed(2),
          mrp: mrpNum.toFixed(2),
          badge: stripAdminHtml(productForm.pageBadge) || '',
          sku: productForm.sku.trim() || '',
          marketplaces: productForm.marketplaces
        },
        details: {
          features: productForm.features.filter(f => f.title.trim() || f.desc.trim()),
          specs: [
            { title: 'Series', desc: productForm.specs.series.trim() },
            { title: 'Chocolate Type', desc: productForm.specs.chocolateType.trim() },
            { title: 'Key Ingredient', desc: productForm.specs.keyIngredient.trim() },
            { title: 'Weight', desc: productForm.specs.weight.trim() },
            { title: 'Storage', desc: productForm.specs.storage.trim() },
            { title: 'License', desc: productForm.specs.license.trim() }
          ],
          quality: stripAdminHtml(productForm.quality)
        },
        featureGrid: existingCms.featureGrid || [
          {
            image: '/assets/features/choco-1.png',
            title: 'ANCIENT HERBS',
            description: 'Infused with authentic Ayurvedic herbs like Ashwagandha, Brahmi, and Amla for targeted wellness.'
          },
          {
            image: '/assets/features/choco-2.png',
            title: 'PURE COCOA',
            description: 'Hand-selected premium cocoa for a rich, velvety texture and deep, satisfying chocolate experience.'
          },
          {
            image: '/assets/features/choco-3.png',
            title: 'ARTISAN CRAFTED',
            description: 'Small-batch production ensures maximum potency of herbs and artisanal quality in every bite.'
          }
        ],
        related: existingCms.related || [
          {
            image: '/assets/choco/adark.png',
            hoverImage: '/assets/choco/adark-1.png',
            title: 'Ashwagandha Dark',
            price: 'MRP ₹ 300.00',
            link: 'adarkc.html'
          },
          {
            image: '/assets/choco/apmilk.png',
            hoverImage: '/assets/choco/apmilk-1.png',
            title: 'ASHWAGANDHA MILK CHOCOLATE SLAB',
            price: 'MRP ₹ 300.00',
            link: 'amilkc.html'
          },
          {
            image: '/assets/choco/bdark.png',
            hoverImage: '/assets/choco/bdark-1.png',
            title: 'BRAHMI DARK CHOCOLATE SLAB',
            price: 'MRP ₹ 300.00',
            link: 'bdarkc.html'
          }
        ],
        reviews: existingCms.reviews || [],
        updatedAt: new Date().toISOString()
      }

      const cmsResult = await fetch(`/api/product-cms/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCms)
      }).then(res => res.json())

      if (!cmsResult.success) {
        setProductFormError('Failed to save product CMS details.')
        return
      }

      setProducts(updatedCatalog)
      if (selectedProductId === id) {
        setProductCms(updatedCms)
        setSavedProductCms(cloneData(updatedCms))
        setProductCmsEditorResetKey((key) => key + 1)
      }

      addActivity(`${productModalMode === 'add' ? 'Added' : 'Updated'} product: ${productForm.name}`)
      showStatus(`Product ${productModalMode === 'add' ? 'added' : 'updated'} successfully`)
      setIsProductModalOpen(false)

    } catch (e) {
      console.error(e)
      setProductFormError('Server error when saving product: ' + e.message)
    }
  }

  if (!user) {
    return (
      <main className="rr-admin rr-admin-login">
        <form className="rr-login-card" onSubmit={handleLogin}>
          <img src="/assets/RR_Logo-1.png" alt="Raw Radicles" />
          <h1>Admin Login</h1>
          {loginError ? <div className="rr-alert">{loginError}</div> : null}
          <input
            aria-label="Email"
            placeholder="Username or email"
            type="email"
            value={loginForm.email}
            onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
          />
          <input
            aria-label="Password"
            placeholder="Password"
            type="password"
            value={loginForm.password}
            onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </main>
    )
  }

  return (
    <main className="rr-admin">
      <aside className="rr-sidebar">
        <button className="rr-sidebar-logo" onClick={() => setActivePanel('dashboard')} type="button">
          <img src="/assets/RR_Logo-1.png" alt="Raw Radicles" />
          <span>Admin Dashboard</span>
        </button>

        <p className="rr-sidebar-label">Content</p>
        <nav className="rr-sidebar-nav" aria-label="Admin navigation">
          {adminPanels.map((panel) => (
            <button
              className={activePanel === panel.id ? 'is-active' : ''}
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              type="button"
            >
              <SidebarIcon type={panel.id} />
              {panel.label}
            </button>
          ))}
        </nav>

        <div className="rr-sidebar-footer">
          <div className="rr-sidebar-user">
            <span className="rr-sidebar-avatar">{user.email?.[0]?.toUpperCase() || 'A'}</span>
            <span>
              <strong>{user.email}</strong>
              <small>Administrator</small>
            </span>
          </div>
          <button className="rr-sidebar-logout" onClick={logout} type="button">
            <SidebarIcon type="logout" />
            Logout
          </button>
        </div>
      </aside>

      <div className="rr-main-wrapper">
        <header className="rr-topbar">
          <div>
            <p>Raw Radicles CMS</p>
            <h1>{adminPanels.find((panel) => panel.id === activePanel)?.label || 'Dashboard'}</h1>
          </div>
          <a href="/" target="_blank" rel="noreferrer">View Storefront</a>
        </header>

        <section className="rr-admin-content">
          {activePanel === 'dashboard' ? (
            <>
              <div className="rr-dashboard-hero">
                <div>
                  <p>Content studio</p>
                  <h2>Raw Radicles dashboard</h2>
                  <span>Review store health, update content, and jump into the sections that need attention.</span>
                </div>
                <img src="/assets/RR_Logo-1.png" alt="Raw Radicles" />
              </div>

              <div className="rr-dashboard-actions" aria-label="Dashboard quick actions">
                <button onClick={() => setActivePanel('homepage')} type="button">Edit Homepage</button>
                <button onClick={() => { setActivePanel('products'); openAddProductModal(); }} type="button">Add Product</button>
                <button onClick={() => { addBlog(); setActivePanel('blog'); }} type="button">Write Blog</button>
                <a href="/" target="_blank" rel="noreferrer">View Storefront</a>
              </div>

              {/* ── KPI Summary Cards ───────────────────────────────────── */}
              <div className="kpi-cards-grid">
                <SparkCard
                  actionLabel="Open storefront"
                  icon={<AdminIcon type="views" />}
                  label="Store visits"
                  onClick={() => window.open('/', '_blank', 'noopener,noreferrer')}
                  value={analytics ? analytics.kpi.totalViews7.toLocaleString() : '—'}
                  trend={analytics ? analytics.kpi.viewsChange : 0}
                />
                <SparkCard
                  actionLabel="Review click data"
                  icon={<AdminIcon type="clicks" />}
                  label="Button clicks"
                  onClick={() => setActivePanel('dashboard')}
                  value={analytics ? analytics.kpi.totalClicks7.toLocaleString() : '—'}
                />
                <SparkCard
                  actionLabel="Check reading time"
                  icon={<AdminIcon type="time" />}
                  label="Average reading time"
                  onClick={() => setActivePanel('dashboard')}
                  value={analytics ? fmtTime(analytics.kpi.avgTimeSeconds) : '—'}
                />
                <SparkCard
                  actionLabel="Manage products"
                  icon={<AdminIcon type="products" />}
                  label="Products"
                  onClick={() => setActivePanel('products')}
                  value={productList.length}
                />
                <SparkCard
                  actionLabel="Manage users"
                  icon={<AdminIcon type="users" />}
                  label="Users"
                  onClick={() => setActivePanel('users')}
                  value={users.length}
                />
                <SparkCard
                  actionLabel="Open subscribers"
                  icon={<AdminIcon type="subscribers" />}
                  label="Subscribers"
                  onClick={() => setActivePanel('subscribed')}
                  value={subscribers.length}
                />
              </div>

              {/* ── Traffic Line Chart ──────────────────────────────────── */}
              <div className="kpi-row">
                <div className="kpi-panel kpi-panel--wide">
                  <div className="kpi-panel-header">
                    <h3>Store visits - last 14 days</h3>
                    <span className="kpi-badge">Visits</span>
                  </div>
                  {analyticsLoading ? (
                    <div className="kpi-loading">Loading…</div>
                  ) : analytics ? (
                    <LineChart
                      data={(analytics.days || []).map(d => ({ label: d.label, value: d.pageViews }))}
                      colorStroke="#e85d26"
                    />
                  ) : <div className="kpi-empty">No visit data yet. Open the storefront to confirm tracking is active.</div>}
                </div>
              </div>

              <div className="kpi-row">
                {/* ── Clicks Line Chart ───────────────────────────────── */}
                <div className="kpi-panel kpi-panel--wide">
                  <div className="kpi-panel-header">
                    <h3>Button clicks - last 14 days</h3>
                    <span className="kpi-badge kpi-badge--blue">Clicks</span>
                  </div>
                  {analytics ? (
                    <LineChart
                      data={(analytics.days || []).map(d => ({ label: d.label, value: d.clicks }))}
                      colorStroke="#3b82f6"
                    />
                  ) : <div className="kpi-empty">No click data yet. Click tracking will appear after visitors interact with the store.</div>}
                </div>
              </div>

              <div className="kpi-row kpi-row--split">
                {/* ── Top Pages ───────────────────────────────────────── */}
                <div className="kpi-panel">
                  <div className="kpi-panel-header">
                    <h3>Most viewed pages</h3>
                  </div>
                  {analytics && analytics.topPages.length > 0 ? (
                    <HBar
                      items={analytics.topPages.map(p => ({ label: p.label, value: p.views }))}
                      color="#e85d26"
                    />
                  ) : <div className="kpi-empty">No page data yet. Store visits will show up here once tracking records traffic.</div>}
                </div>

                {/* ── Avg Time Per Page ───────────────────────────────── */}
                <div className="kpi-panel">
                  <div className="kpi-panel-header">
                    <h3>Average reading time</h3>
                  </div>
                  {analytics && analytics.topPages.length > 0 ? (
                    <HBar
                      items={analytics.topPages.map(p => ({ label: p.label, value: p.avgTime }))}
                      color="#10b981"
                    />
                  ) : <div className="kpi-empty">No reading-time data yet. This appears after visitors spend time on pages.</div>}
                </div>
              </div>

              <div className="kpi-row kpi-row--split">
                {/* ── Top Clicked Elements ────────────────────────────── */}
                <div className="kpi-panel">
                  <div className="kpi-panel-header">
                    <h3>Top clicked elements</h3>
                  </div>
                  {analytics && analytics.topClicks.length > 0 ? (
                    <HBar
                      items={analytics.topClicks.map(c => ({ label: c.label, value: c.value }))}
                      color="#8b5cf6"
                    />
                  ) : <div className="kpi-empty">No click data yet. Product and marketplace clicks will appear here.</div>}
                </div>

                {/* ── Traffic Breakdown Donut ─────────────────────────── */}
                <div className="kpi-panel">
                  <div className="kpi-panel-header">
                    <h3>Click breakdown</h3>
                  </div>
                  {analytics && analytics.topClicks.length > 0 ? (() => {
                    const prodClicks = analytics.topClicks.filter(c => c.key.startsWith('product_'));
                    const mpClicks = analytics.topClicks.filter(c => c.key.startsWith('marketplace_'));
                    const ctaClicks = analytics.topClicks.filter(c => c.key.startsWith('cta_'));
                    const segments = [
                      { label: 'Products', value: prodClicks.reduce((s,c) => s + c.value, 0), color: '#e85d26' },
                      { label: 'Marketplaces', value: mpClicks.reduce((s,c) => s + c.value, 0), color: '#3b82f6' },
                      { label: 'CTA Buttons', value: ctaClicks.reduce((s,c) => s + c.value, 0), color: '#10b981' },
                    ].filter(s => s.value > 0);
                    return (
                      <div className="donut-wrap">
                        <DonutChart segments={segments} />
                        <div className="donut-legend">
                          {segments.map((s, i) => (
                            <div key={i} className="donut-legend-row">
                              <span className="donut-legend-dot" style={{ background: s.color }} />
                              <span className="donut-legend-label">{s.label}</span>
                              <span className="donut-legend-val">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })() : <div className="kpi-empty">No click breakdown yet. The chart will appear after product, marketplace, or CTA clicks.</div>}
                </div>
              </div>

              <div className="kpi-row kpi-row--split rr-dashboard-ops-row">
                <div className="kpi-panel">
                  <div className="kpi-panel-header">
                    <h3>Recent activity</h3>
                    <span className="kpi-badge">Latest</span>
                  </div>
                  <ul className="rr-dashboard-activity">
                    {activity.length > 0 ? activity.map((item, index) => (
                      <li key={`${item}-${index}`}>
                        <span className="rr-dashboard-activity-dot" />
                        <span>{item}</span>
                      </li>
                    )) : (
                      <li>
                        <span className="rr-dashboard-activity-dot" />
                        <span>No recent edits yet.</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="kpi-panel rr-dashboard-next">
                  <div className="kpi-panel-header">
                    <h3>Next best actions</h3>
                    <span className="kpi-badge">Shortcuts</span>
                  </div>
                  <button onClick={() => setActivePanel('homepage')} type="button">
                    Refresh homepage story
                  </button>
                  <button onClick={() => setActivePanel('products')} type="button">
                    Check product content
                  </button>
                  <button onClick={() => setActivePanel('subscribed')} type="button">
                    Review subscriber list
                  </button>
                </div>
              </div>

              {/* ── Product Performance Table ───────────────────────────── */}
              <div className="kpi-panel kpi-panel--table" style={{ marginTop: 0 }}>
                <div className="kpi-panel-header">
                  <h3>Product performance</h3>
                  <span className="kpi-badge kpi-badge--green">All time</span>
                </div>
                <table className="kpi-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Page Views</th>
                      <th>Card Clicks</th>
                      <th>Avg. Time</th>
                      <th>Top Marketplace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(prod => {
                      const pageKey = `/${prod.id}`;
                      const pageData = analytics?.topPages?.find(p => p.url === pageKey);
                      const clickKey = `product_${prod.id}`;
                      const clicks = analytics?.topClicks?.find(c => c.key === clickKey);
                      const mpKeys = ['blinkit','zepto','amazon','instamart','flipkart'];
                      const topMp = mpKeys.map(mp => ({
                        name: mp,
                        val: analytics?.topClicks?.find(c => c.key === `marketplace_${mp}`)?.value || 0
                      })).sort((a,b) => b.val - a.val)[0];
                      return (
                        <tr key={prod.id}>
                          <td>
                            <div className="kpi-prod-name">
                              {prod.image && <img src={prod.image.startsWith('data:') ? prod.image : `/${prod.image}`} alt={prod.name} className="kpi-prod-thumb" />}
                              <span>{prod.name}</span>
                            </div>
                          </td>
                          <td>{pageData ? pageData.views.toLocaleString() : '—'}</td>
                          <td>{clicks ? clicks.value.toLocaleString() : '—'}</td>
                          <td>{pageData ? fmtTime(pageData.avgTime) : '—'}</td>
                          <td>{topMp && topMp.val > 0 ? <span className="kpi-mp-badge">{topMp.name}</span> : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {activePanel === 'products' ? (
            <div className="rr-panel">
              <div className="rr-panel-header">
                <h2>Products</h2>
                <div className="rr-panel-actions">
                  <button onClick={openAddProductModal} type="button">Add New Product</button>
                </div>
              </div>
              <div className="rr-table-wrap">
                <table className="rr-products-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image.startsWith('assets') ? '/' + product.image : product.image}
                            alt={product.name}
                            style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#f6f2ec', borderRadius: '4px', display: 'block' }}
                          />
                        </td>
                        <td><code>{product.id}</code></td>
                        <td><strong>{product.name}</strong></td>
                        <td>₹{parseFloat(product.price).toFixed(2)}</td>
                        <td>
                          <button
                            onClick={() => openEditProductModal(product)}
                            type="button"
                            style={{ marginRight: '8px' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            type="button"
                            className="rr-btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activePanel === 'homepage' ? (
            <div className="rr-panel rr-homepage-panel">
              <div className="rr-panel-header">
                <h2>Homepage Content Editor</h2>
                <div className="rr-panel-actions">
                  {homepageHasChanges ? <span className="rr-unsaved-note">Unsaved changes</span> : null}
                  <button className="rr-btn-secondary" disabled={!homepageHasChanges} onClick={cancelHomepageChanges} type="button">Cancel</button>
                  <button disabled={!homepageHasChanges} onClick={saveHomepage} type="button">Save Changes</button>
                </div>
              </div>

              <div className="rr-product-tabs rr-homepage-tabs" role="tablist" style={{ marginTop: '0', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', background: '#FAF9F6', padding: '8px 16px 0' }}>
                <button className={activeHomepageTab === 'hero' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('hero')} type="button">Hero Slides</button>
                <button className={activeHomepageTab === 'video-hero' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('video-hero')} type="button">Video Hero</button>
                <button className={activeHomepageTab === 'experts' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('experts')} type="button">Experts</button>
                <button className={activeHomepageTab === 'testimonials' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('testimonials')} type="button">Testimonials</button>
                <button className={activeHomepageTab === 'faqs' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('faqs')} type="button">FAQs</button>
                <button className={activeHomepageTab === 'instagram' ? 'is-active' : ''} onClick={() => setActiveHomepageTab('instagram')} type="button">Instagram</button>
              </div>

              <div className="rr-homepage-form-wrapper" style={{ padding: '24px' }}>
                {activeHomepageTab === 'hero' && (
                  <div className="rr-homepage-section">
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0 0 20px' }}>
                      Configure the scrolling banner slides at the top of the home page.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {(homepage.hero?.slides || []).map((slide, i) => (
                        <div key={i} className="rr-feature-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px' }}>
                          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Slide {i + 1}</span>
                            <button
                              type="button"
                              className="rr-btn-danger"
                              style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px' }}
                              onClick={() => {
                                const slides = [...(homepage.hero?.slides || [])];
                                slides.splice(i, 1);
                                setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                              }}
                            >
                              Remove Slide
                            </button>
                          </div>
                          <div className="rr-admin-media-detail-layout">
                            <ImageField
                              label="Slide Image"
                              value={slide.image || ''}
                              onChange={(url) => {
                                const slides = [...(homepage.hero?.slides || [])];
                                slides[i] = { ...slide, image: url };
                                setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                              }}
                            />
                            <div className="rr-admin-media-detail-fields">
                              <label>
                                Slide Title
                                <input
                                  value={slide.title || ''}
                                  onChange={(e) => {
                                    const slides = [...(homepage.hero?.slides || [])];
                                    slides[i] = { ...slide, title: e.target.value };
                                    setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                                  }}
                                />
                              </label>
                              <label>
                                Slide Subtitle
                                <input
                                  value={slide.subtitle || ''}
                                  onChange={(e) => {
                                    const slides = [...(homepage.hero?.slides || [])];
                                    slides[i] = { ...slide, subtitle: e.target.value };
                                    setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                                  }}
                                />
                              </label>
                              <label>
                                Redirect Link
                                <input
                                  value={slide.link || ''}
                                  onChange={(e) => {
                                    const slides = [...(homepage.hero?.slides || [])];
                                    slides[i] = { ...slide, link: e.target.value };
                                    setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="rr-add-feature-btn"
                        onClick={() => {
                          const slides = [...(homepage.hero?.slides || [])];
                          slides.push({
                            index: slides.length,
                            title: 'Experience the Power of Dark',
                            subtitle: 'CHYAWANAPRASH',
                            link: '/cdarkc',
                            image: 'assets/banner1.jpg'
                          });
                          setHomepage({ ...homepage, hero: { ...homepage.hero, slides } });
                        }}
                      >
                        + Add Slide
                      </button>
                    </div>
                  </div>
                )}

                {activeHomepageTab === 'video-hero' && (
                  <div className="rr-homepage-section" style={{ display: 'grid', gap: '16px' }}>
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0 0 10px', gridColumn: 'span 2' }}>
                      Configure the full-width autoplaying video hero banner.
                    </p>
                    <div className="rr-admin-media-detail-layout">
                      <MediaField
                        label="Video File"
                        value={homepage.videoHero?.url || ''}
                        type="video"
                        accept="video/*"
                        onChange={(url) => setHomepage({ ...homepage, videoHero: { ...homepage.videoHero, url: url } })}
                      />
                      <div className="rr-admin-media-detail-fields">
                        <label>
                          Video Title
                          <input
                            value={homepage.videoHero?.title || ''}
                            onChange={(e) => setHomepage({ ...homepage, videoHero: { ...homepage.videoHero, title: e.target.value } })}
                          />
                        </label>
                        <label>
                          Video Subtitle
                          <input
                            value={homepage.videoHero?.subtitle || ''}
                            onChange={(e) => setHomepage({ ...homepage, videoHero: { ...homepage.videoHero, subtitle: e.target.value } })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeHomepageTab === 'experts' && (
                  <div className="rr-homepage-section">
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0 0 20px' }}>
                      Manage the expert panel profiles displayed under the Video Hero.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {(homepage.experts || []).map((expert, i) => (
                        <div key={i} className="rr-feature-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px' }}>
                          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Expert {i + 1}</span>
                            <button
                              type="button"
                              className="rr-btn-danger"
                              style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px' }}
                              onClick={() => {
                                const experts = [...(homepage.experts || [])];
                                experts.splice(i, 1);
                                setHomepage({ ...homepage, experts });
                              }}
                            >
                              Remove Expert
                            </button>
                          </div>
                          <div className="rr-admin-media-detail-layout">
                            <ImageField
                              label="Expert Photo"
                              value={expert.image || ''}
                              onChange={(url) => {
                                const experts = [...(homepage.experts || [])];
                                experts[i] = { ...expert, image: url };
                                setHomepage({ ...homepage, experts });
                              }}
                            />
                            <div className="rr-admin-media-detail-fields">
                              <label>
                                Expert Name
                                <input
                                  value={expert.name || ''}
                                  onChange={(e) => {
                                    const experts = [...(homepage.experts || [])];
                                    experts[i] = { ...expert, name: e.target.value };
                                    setHomepage({ ...homepage, experts });
                                  }}
                                />
                              </label>
                              <label>
                                Expert Role
                                <input
                                  value={expert.role || ''}
                                  onChange={(e) => {
                                    const experts = [...(homepage.experts || [])];
                                    experts[i] = { ...expert, role: e.target.value };
                                    setHomepage({ ...homepage, experts });
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="rr-add-feature-btn"
                        onClick={() => {
                          const experts = [...(homepage.experts || [])];
                          experts.push({
                            name: 'Dr. New Expert',
                            role: 'Ayurvedic Specialist',
                            image: 'assets/experts/doctor1.png'
                          });
                          setHomepage({ ...homepage, experts });
                        }}
                      >
                        + Add Expert
                      </button>
                    </div>
                  </div>
                )}

                {activeHomepageTab === 'testimonials' && (
                  <div className="rr-homepage-section">
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0 0 20px' }}>
                      Configure customer testimonial videos and their quick purchase card details.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {(homepage.testimonials?.videos || []).map((video, i) => (
                        <div key={i} className="rr-feature-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px' }}>
                          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Testimonial {i + 1}</span>
                            <button
                              type="button"
                              className="rr-btn-danger"
                              style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px' }}
                              onClick={() => {
                                const videos = [...(homepage.testimonials?.videos || [])];
                                videos.splice(i, 1);
                                setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                              }}
                            >
                              Remove Testimonial
                            </button>
                          </div>
                          <div className="rr-admin-media-detail-layout">
                            <div className="rr-admin-media-stack">
                              <MediaField
                                label="Testimonial Video"
                                value={video.url || ''}
                                type="video"
                                accept="video/*"
                                onChange={(url) => {
                                  const videos = [...(homepage.testimonials?.videos || [])];
                                  videos[i] = { ...video, url: url };
                                  setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                                }}
                              />
                              <ImageField
                                label="Product Thumbnail"
                                value={video.productImg || ''}
                                onChange={(url) => {
                                  const videos = [...(homepage.testimonials?.videos || [])];
                                  videos[i] = { ...video, productImg: url };
                                  setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                                }}
                              />
                            </div>
                            <div className="rr-admin-media-detail-fields">
                              <label>
                                Product Name
                                <input
                                  value={video.productName || ''}
                                  onChange={(e) => {
                                    const videos = [...(homepage.testimonials?.videos || [])];
                                    videos[i] = { ...video, productName: e.target.value };
                                    setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                                  }}
                                />
                              </label>
                              <label>
                                Selling Price (INR)
                                <input
                                  type="number"
                                  value={video.price || ''}
                                  onChange={(e) => {
                                    const videos = [...(homepage.testimonials?.videos || [])];
                                    videos[i] = { ...video, price: e.target.value };
                                    setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="rr-add-feature-btn"
                        onClick={() => {
                          const videos = [...(homepage.testimonials?.videos || [])];
                          videos.push({
                            id: `v${Date.now()}`,
                            url: 'assets/video/video-1.mp4',
                            productName: 'New Chocolate Bar',
                            price: '300',
                            productImg: 'assets/choco/cdark.png',
                            originalPrice: 350
                          });
                          setHomepage({ ...homepage, testimonials: { ...homepage.testimonials, videos } });
                        }}
                      >
                        + Add Testimonial
                      </button>
                    </div>
                  </div>
                )}

                {activeHomepageTab === 'faqs' && (
                  <div className="rr-homepage-section">
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0 0 20px' }}>
                      Configure the FAQs shown in the bottom accordions section of the homepage.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {(homepage.faqs || []).map((faq, i) => (
                        <div key={i} className="rr-feature-field-group" style={{ display: 'grid', gap: '12px', background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>FAQ {i + 1}</span>
                            <button
                              type="button"
                              className="rr-btn-danger"
                              style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px' }}
                              onClick={() => {
                                const faqs = [...(homepage.faqs || [])];
                                faqs.splice(i, 1);
                                setHomepage({ ...homepage, faqs });
                              }}
                            >
                              Remove FAQ
                            </button>
                          </div>
                          <label>
                            Question
                            <input
                              value={faq.question || ''}
                              onChange={(e) => {
                                const faqs = [...(homepage.faqs || [])];
                                faqs[i] = { ...faq, question: e.target.value };
                                setHomepage({ ...homepage, faqs });
                              }}
                            />
                          </label>
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            Answer
                            <textarea
                              style={{ height: '70px', resize: 'none', border: '1px solid #d8d2c8', borderRadius: '8px', fontSize: '13px', padding: '8px' }}
                              value={faq.answer || ''}
                              onChange={(e) => {
                                const faqs = [...(homepage.faqs || [])];
                                faqs[i] = { ...faq, answer: e.target.value };
                                setHomepage({ ...homepage, faqs });
                              }}
                            />
                          </label>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="rr-add-feature-btn"
                        onClick={() => {
                          const faqs = [...(homepage.faqs || [])];
                          faqs.push({
                            question: 'What is the question?',
                            answer: 'Provide answer here.'
                          });
                          setHomepage({ ...homepage, faqs });
                        }}
                      >
                        + Add FAQ
                      </button>
                    </div>
                  </div>
                )}

                {activeHomepageTab === 'instagram' && (
                  <div className="rr-homepage-section" style={{ display: 'grid', gap: '20px' }}>
                    <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0' }}>
                      Manage the Instagram gallery cards shown on the homepage.
                    </p>
                    <label style={{ gridColumn: 'span 2' }}>
                      Instagram Profile URL
                      <input
                        value={homepage.instagram?.profileUrl || ''}
                        onChange={(e) => setHomepage({ ...homepage, instagram: { ...homepage.instagram, profileUrl: e.target.value } })}
                      />
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {(homepage.instagram?.posts || []).map((post, i) => (
                        <div key={post.id || i} className="rr-feature-field-group" style={{ display: 'grid', gap: '16px', background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Instagram Post {i + 1}</span>
                            <button
                              type="button"
                              className="rr-btn-danger"
                              style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px' }}
                              onClick={() => {
                                const posts = [...(homepage.instagram?.posts || [])];
                                posts.splice(i, 1);
                                setHomepage({ ...homepage, instagram: { ...homepage.instagram, posts } });
                              }}
                            >
                              Remove Post
                            </button>
                          </div>
                          <div className="rr-admin-media-detail-layout">
                            <ImageField
                              label="Post Image"
                              value={post.image || ''}
                              onChange={(url) => {
                                const posts = [...(homepage.instagram?.posts || [])];
                                posts[i] = { ...post, image: url };
                                setHomepage({ ...homepage, instagram: { ...homepage.instagram, posts } });
                              }}
                            />
                            <div className="rr-admin-media-detail-fields">
                              <label>
                                Post ID
                                <input
                                  value={post.id || ''}
                                  onChange={(e) => {
                                    const posts = [...(homepage.instagram?.posts || [])];
                                    posts[i] = { ...post, id: e.target.value };
                                    setHomepage({ ...homepage, instagram: { ...homepage.instagram, posts } });
                                  }}
                                />
                              </label>
                              <label>
                                Post URL
                                <input
                                  value={post.postUrl || post.link || ''}
                                  onChange={(e) => {
                                    const posts = [...(homepage.instagram?.posts || [])];
                                    posts[i] = { ...post, postUrl: e.target.value };
                                    setHomepage({ ...homepage, instagram: { ...homepage.instagram, posts } });
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="rr-add-feature-btn"
                        onClick={() => {
                          const posts = [...(homepage.instagram?.posts || [])];
                          const profileUrl = homepage.instagram?.profileUrl || defaultInstagram.profileUrl;
                          posts.push({
                            id: `ig${Date.now()}`,
                            image: 'assets/instagram/choco1.png',
                            postUrl: profileUrl,
                          });
                          setHomepage({ ...homepage, instagram: { ...homepage.instagram, profileUrl, posts } });
                        }}
                      >
                        + Add Instagram Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {activePanel === 'product-cms' ? (
            <JsonPanel
              key={selectedProductId || 'product-cms-json'}
              title={`Product CMS${selectedProduct ? `: ${selectedProduct.name}` : ''}`}
              value={productCms}
              onChange={setProductCms}
              onSave={saveProductCms}
              onCancel={cancelProductCmsChanges}
              hasChanges={productCmsHasChanges}
              resetKey={productCmsEditorResetKey}
            >
              <select
                value={selectedProductId}
                onChange={(event) => setSelectedProductId(event.target.value)}
              >
                {productList.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </JsonPanel>
          ) : null}

          {activePanel === 'blog' ? (
            <div className="rr-panel rr-blog-panel">
              <div className="rr-panel-header">
                <div>
                  <h2>Blog Editor</h2>
                  <span>Add, edit, and upload photos for the public blog page.</span>
                </div>
                <div className="rr-panel-actions">
                  {blogsHaveChanges ? <span className="rr-unsaved-note">Unsaved changes</span> : null}
                  <button onClick={addBlog} type="button">Add Blog</button>
                  <button className="rr-btn-secondary" disabled={!blogsHaveChanges} onClick={cancelBlogChanges} type="button">Cancel</button>
                  <button disabled={!blogsHaveChanges} onClick={saveBlogs} type="button">Save Changes</button>
                </div>
              </div>

              <div className="rr-blog-list">
                {blogs.map((blog, index) => (
                  <div className="rr-blog-card" key={blog.draftKey || blog.createdAt || `blog-${index}`}>
                    <div className="rr-blog-card__header">
                      <div>
                        <span>Blog {index + 1}</span>
                        <strong>{blog.title || 'Untitled Blog'}</strong>
                      </div>
                      <button className="rr-btn-danger" onClick={() => removeBlog(index)} type="button">Delete</button>
                    </div>

                    <div className="rr-blog-form">
                      <div className="rr-admin-media-detail-layout rr-blog-field--wide">
                        <ImageField
                          label="Blog Photo"
                          value={blog.image || ''}
                          onChange={(url) => updateBlog(index, 'image', url)}
                        />
                        <div className="rr-admin-media-detail-fields">
                          <div className="rr-admin-two-column-fields">
                            <label>
                              Blog ID
                              <input
                                value={blog.id || ''}
                                onChange={(event) => updateBlog(index, 'id', event.target.value)}
                                placeholder="blog-title"
                              />
                            </label>
                            <label>
                              Category
                              <input
                                value={blog.category || ''}
                                onChange={(event) => updateBlog(index, 'category', event.target.value)}
                                placeholder="Ingredients"
                              />
                            </label>
                          </div>
                          <label>
                            Title
                            <input
                              value={blog.title || ''}
                              onChange={(event) => updateBlog(index, 'title', event.target.value)}
                              placeholder="Blog title"
                            />
                          </label>
                          <label>
                            Excerpt
                            <textarea
                              value={blog.excerpt || ''}
                              onChange={(event) => updateBlog(index, 'excerpt', event.target.value)}
                              placeholder="Short summary shown on the blog card"
                            />
                          </label>
                        </div>
                      </div>
                      <label className="rr-blog-field--wide">
                        Blog Content
                        <textarea
                          className="rr-blog-body-input"
                          value={blog.body || ''}
                          onChange={(event) => updateBlog(index, 'body', event.target.value)}
                          placeholder="Write the article content. Use blank lines to separate paragraphs."
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activePanel === 'subscribed' ? (
            <div className="rr-panel">
              <div className="rr-panel-header">
                <h2>Subscribed Users</h2>
                <span>{subscribers.length} total</span>
              </div>
              <div className="rr-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id || subscriber.email}>
                        <td>{subscriber.name || 'Anonymous'}</td>
                        <td>{subscriber.email}</td>
                        <td>{subscriber.phone || '-'}</td>
                        <td>{subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan="4">No subscribed users yet.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activePanel === 'users' ? (
            <div className="rr-panel">
              <div className="rr-panel-header">
                <h2>Users</h2>
                <div className="rr-panel-actions">
                  <button onClick={openAddUserModal} type="button">Add New User</button>
                </div>
              </div>
              <div className="rr-table-wrap">
                <table className="rr-users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr
                        key={item.id}
                        className={selectedUserId === item.id ? 'is-selected' : ''}
                        onClick={() => setSelectedUserId(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>
                          <span className={`rr-role-badge rr-role-${item.role}`}>
                            {item.role}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditUserModalFor(item)
                            }}
                            type="button"
                            style={{ marginRight: '8px' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteUser(item.id)
                            }}
                            type="button"
                            className="rr-btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {isUserModalOpen && (
        <div className="rr-modal-overlay" onClick={closeUserModal}>
          <div className="rr-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rr-modal-header">
              <h2>{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>
              <button className="rr-modal-close" onClick={closeUserModal} type="button">&times;</button>
            </div>
            <form onSubmit={handleSaveUser} className="rr-modal-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', gridColumn: 'span 2' }}>
                <label>
                  First Name
                  <input
                    required
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                  />
                </label>
                <label>
                  Last Name
                  <input
                    required
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                  />
                </label>
              </div>
              <label style={{ gridColumn: 'span 2' }}>
                Email
                <input
                  required
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                />
              </label>
              <label style={{ gridColumn: 'span 2' }}>
                Role
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="director">Director</option>
                </select>
              </label>
              <label style={{ gridColumn: 'span 2' }}>
                Password {modalMode === 'edit' && <span style={{ textTransform: 'none', color: '#888' }}>(blank to keep current)</span>}
                <input
                  type="password"
                  placeholder={modalMode === 'add' ? 'admin123' : '••••••••'}
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                />
              </label>
              {modalError ? <div className="rr-alert" style={{ gridColumn: 'span 2' }}>{modalError}</div> : null}
            </form>
          </div>
        </div>
      )}

      {isProductModalOpen && (
        <div className="rr-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
          <div className="rr-modal-card rr-product-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rr-modal-header rr-product-modal-header">
              <div className="rr-product-modal-title">
                <span>{productModalMode === 'add' ? 'New catalog item' : 'Product editor'}</span>
                <h2>{productModalMode === 'add' ? 'Add New Product' : productForm.name || 'Edit Product'}</h2>
                <p>{productModalMode === 'add' ? 'Create a product with catalog details, media, marketplace links, and product page content.' : `Editing ${productForm.id || 'selected product'}`}</p>
              </div>
              <button className="rr-modal-close" onClick={() => setIsProductModalOpen(false)} type="button">&times;</button>
            </div>

            <div className="rr-product-tabs" role="tablist" aria-label="Product editor sections">
              <button aria-selected={activeProductTab === 'basic'} className={activeProductTab === 'basic' ? 'is-active' : ''} onClick={() => setActiveProductTab('basic')} type="button">Basic Info</button>
              <button aria-selected={activeProductTab === 'media'} className={activeProductTab === 'media' ? 'is-active' : ''} onClick={() => setActiveProductTab('media')} type="button">Media</button>
              <button aria-selected={activeProductTab === 'marketplaces'} className={activeProductTab === 'marketplaces' ? 'is-active' : ''} onClick={() => setActiveProductTab('marketplaces')} type="button">Marketplaces</button>
              <button aria-selected={activeProductTab === 'features'} className={activeProductTab === 'features' ? 'is-active' : ''} onClick={() => setActiveProductTab('features')} type="button">Features</button>
              <button aria-selected={activeProductTab === 'specs'} className={activeProductTab === 'specs' ? 'is-active' : ''} onClick={() => setActiveProductTab('specs')} type="button">Specs & Quality</button>
            </div>

            <form onSubmit={handleSaveProduct} className="rr-modal-form rr-product-modal-form">
              {activeProductTab === 'basic' && (
                <div className="rr-tab-content">
                  <label>
                    Product ID
                    <input
                      required
                      disabled={productModalMode === 'edit'}
                      value={productForm.id}
                      placeholder="cdarkc"
                      onChange={(e) => setProductForm({ ...productForm, id: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                    />
                  </label>
                  <label>
                    Product Name
                    <input
                      required
                      value={productForm.name}
                      placeholder="e.g. Chyawanaprash Dark Chocolate"
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    Selling Price
                    <input
                      required
                      type="number"
                      value={productForm.price}
                      placeholder="300"
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    />
                  </label>
                  <label>
                    SKU
                    <input
                      required
                      value={productForm.sku}
                      placeholder="CB-CH-DK-60G"
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    />
                  </label>
                  <label>
                    Catalog Description
                    <input
                      required
                      value={productForm.description}
                      placeholder="Short line shown under the product name"
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    Product Page Tagline
                    <input
                      value={productForm.pageBadge}
                      placeholder="CHYAWANAPRASH DARK: IMMUNITY & VITALITY"
                      onChange={(e) => setProductForm({ ...productForm, pageBadge: e.target.value })}
                    />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    Catalog Card Badge
                    <input
                      value={productForm.badge}
                      placeholder="bestseller, new"
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    />
                  </label>
                </div>
              )}

              {activeProductTab === 'media' && (
                <div className="rr-tab-content rr-product-media-content">
                  <div className="rr-product-media-section">
                    <div className="rr-product-media-section__header">
                      <strong>Catalog Images</strong>
                      <span>Used on product listing cards.</span>
                    </div>
                    <div className="rr-product-media-grid">
                      <ImageField
                        label="Primary Image"
                        value={productForm.image}
                        onChange={(url) => setProductForm({ ...productForm, image: url })}
                      />
                      <ImageField
                        label="Hover Image"
                        value={productForm.hoverImage}
                        onChange={(url) => setProductForm({ ...productForm, hoverImage: url })}
                      />
                    </div>
                  </div>

                  <div className="rr-product-media-section">
                    <div className="rr-product-media-section__header">
                      <strong>Product Gallery</strong>
                      <span>Shown inside the product detail slider. Keep at least 4 images.</span>
                    </div>
                    <div className="rr-product-media-grid">
                      <ImageField
                        label="Gallery Image 1"
                        value={productForm.gallery[0]}
                        onChange={(url) => {
                          const g = [...productForm.gallery]; g[0] = url;
                          setProductForm({ ...productForm, gallery: g });
                        }}
                      />
                      <ImageField
                        label="Gallery Image 2"
                        value={productForm.gallery[1]}
                        onChange={(url) => {
                          const g = [...productForm.gallery]; g[1] = url;
                          setProductForm({ ...productForm, gallery: g });
                        }}
                      />
                      <ImageField
                        label="Gallery Image 3"
                        value={productForm.gallery[2]}
                        onChange={(url) => {
                          const g = [...productForm.gallery]; g[2] = url;
                          setProductForm({ ...productForm, gallery: g });
                        }}
                      />
                      <ImageField
                        label="Gallery Image 4"
                        value={productForm.gallery[3]}
                        onChange={(url) => {
                          const g = [...productForm.gallery]; g[3] = url;
                          setProductForm({ ...productForm, gallery: g });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeProductTab === 'marketplaces' && (
                <div className="rr-tab-content">
                  <p style={{ gridColumn: 'span 2', color: '#6f6a63', fontSize: '11px', margin: '0 0 10px' }}>
                    Provide buy links for active marketplaces. Empty links will automatically hide the corresponding button on the product page.
                  </p>
                  <label>
                    Blinkit URL
                    <input
                      value={productForm.marketplaces.blinkit}
                      placeholder="https://blinkit.com/..."
                      onChange={(e) => setProductForm({ ...productForm, marketplaces: { ...productForm.marketplaces, blinkit: e.target.value } })}
                    />
                  </label>
                  <label>
                    Zepto URL
                    <input
                      value={productForm.marketplaces.zepto}
                      placeholder="https://zeptonow.com/..."
                      onChange={(e) => setProductForm({ ...productForm, marketplaces: { ...productForm.marketplaces, zepto: e.target.value } })}
                    />
                  </label>
                  <label>
                    Amazon URL
                    <input
                      value={productForm.marketplaces.amazon}
                      placeholder="https://amazon.in/..."
                      onChange={(e) => setProductForm({ ...productForm, marketplaces: { ...productForm.marketplaces, amazon: e.target.value } })}
                    />
                  </label>
                  <label>
                    Swiggy Instamart URL
                    <input
                      value={productForm.marketplaces.instamart}
                      placeholder="https://swiggy.com/instamart/..."
                      onChange={(e) => setProductForm({ ...productForm, marketplaces: { ...productForm.marketplaces, instamart: e.target.value } })}
                    />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    Flipkart URL
                    <input
                      value={productForm.marketplaces.flipkart}
                      placeholder="https://flipkart.com/..."
                      onChange={(e) => setProductForm({ ...productForm, marketplaces: { ...productForm.marketplaces, flipkart: e.target.value } })}
                    />
                  </label>
                </div>
              )}

              {activeProductTab === 'features' && (
                <div className="rr-tab-content rr-tab-features-content" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '8px', gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ color: '#6f6a63', fontSize: '11px', margin: '0' }}>
                    Define the descriptive features that are displayed in the "Features" collapsible panel of the product page.
                  </p>
                  {productForm.features.map((feature, i) => (
                    <div key={i} className="rr-feature-field-group" style={{ background: '#fcfbf9', border: '1px solid rgba(28, 28, 28, 0.08)', borderRadius: '8px', padding: '16px', display: 'grid', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 28, 28, 0.08)', paddingBottom: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '11px', color: '#1c1c1c', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Feature {i + 1}
                        </span>
                        {productForm.features.length > 1 && (
                          <button
                            type="button"
                            className="rr-btn-danger"
                            style={{ fontSize: '9px', minHeight: '24px', height: '24px', padding: '0 8px', letterSpacing: '0.5px' }}
                            onClick={() => handleRemoveFeature(i)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <label style={{ fontWeight: 600, fontSize: '10px' }}>
                        Feature Title
                        <input
                          value={feature.title}
                          placeholder="e.g. 100% PURE COCOA"
                          onChange={(e) => {
                            const f = [...productForm.features];
                            f[i] = { ...f[i], title: e.target.value };
                            setProductForm({ ...productForm, features: f });
                          }}
                        />
                      </label>
                      <label style={{ fontWeight: 600, fontSize: '10px' }}>
                        Feature Description
                        <textarea
                          style={{ height: '70px', resize: 'none', border: '1px solid #d8d2c8', borderRadius: '8px', fontSize: '13px', padding: '8px' }}
                          value={feature.desc}
                          placeholder="Provide the detail description for this feature..."
                          onChange={(e) => {
                            const f = [...productForm.features];
                            f[i] = { ...f[i], desc: e.target.value };
                            setProductForm({ ...productForm, features: f });
                          }}
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="rr-add-feature-btn"
                    onClick={handleAddFeature}
                  >
                    + Add Feature
                  </button>
                </div>
              )}

              {activeProductTab === 'specs' && (
                <div className="rr-tab-content">
                  <label>
                    Series
                    <input
                      required
                      value={productForm.specs.series}
                      placeholder="e.g. Chyawanaprash"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, series: e.target.value } })}
                    />
                  </label>
                  <label>
                    Chocolate Type
                    <input
                      required
                      value={productForm.specs.chocolateType}
                      placeholder="e.g. 55% Dark Chocolate"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, chocolateType: e.target.value } })}
                    />
                  </label>
                  <label>
                    Key Herb/Ingredient
                    <input
                      required
                      value={productForm.specs.keyIngredient}
                      placeholder="e.g. Chyawanaprash Herbs Complex"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, keyIngredient: e.target.value } })}
                    />
                  </label>
                  <label>
                    Weight
                    <input
                      required
                      value={productForm.specs.weight}
                      placeholder="e.g. 60g"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, weight: e.target.value } })}
                    />
                  </label>
                  <label>
                    Storage Temperature
                    <input
                      required
                      value={productForm.specs.storage}
                      placeholder="18C - 24C"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, storage: e.target.value } })}
                    />
                  </label>
                  <label>
                    License & Certifications
                    <input
                      required
                      value={productForm.specs.license}
                      placeholder="e.g. FSSAI, GS-1, Made in India"
                      onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, license: e.target.value } })}
                    />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    Quality & Safety Certified
                    <textarea
                      required
                      style={{ height: '110px', resize: 'vertical', fontSize: '13px', border: '1px solid #d8d2c8', borderRadius: '8px', padding: '8px' }}
                      value={productForm.quality}
                      onChange={(e) => setProductForm({ ...productForm, quality: e.target.value })}
                    />
                  </label>
                </div>
              )}

              {productFormError ? (
                <div className="rr-alert" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                  {productFormError}
                </div>
              ) : null}

              <div className="rr-modal-actions rr-product-modal-actions">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="rr-btn-secondary">Cancel</button>
                <button type="submit">{productModalMode === 'add' ? 'Add Product' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {status ? <div className="rr-toast">{status}</div> : null}
    </main>
  )
}

function JsonPanel({ children, title, value, onChange, onSave, onCancel, hasChanges = true, resetKey = 0 }) {
  const [text, setText] = useState(JSON.stringify(value || {}, null, 2))
  const [error, setError] = useState('')

  useEffect(() => {
    setText(JSON.stringify(value || {}, null, 2))
    setError('')
  }, [resetKey])

  const applyText = (nextText) => {
    setText(nextText)

    try {
      onChange(JSON.parse(nextText))
      setError('')
    } catch {
      setError('JSON is not valid yet.')
    }
  }

  return (
    <div className="rr-panel rr-json-panel">
      <div className="rr-panel-header">
        <h2>{title}</h2>
        <div className="rr-panel-actions">
          {children}
          {hasChanges ? <span className="rr-unsaved-note">Unsaved changes</span> : null}
          {onCancel ? (
            <button className="rr-btn-secondary" disabled={!hasChanges} onClick={onCancel} type="button">Cancel</button>
          ) : null}
          <button disabled={!!error || !hasChanges} onClick={onSave} type="button">Save Changes</button>
        </div>
      </div>
      {error ? <div className="rr-alert">{error}</div> : null}
      <textarea value={text} onChange={(event) => applyText(event.target.value)} />
    </div>
  )
}

function MediaField({ label, value, onChange, type = "image", accept = "image/*" }) {
  const fileInputId = `file-input-${label.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingPreview, setPendingPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    };
  }, [pendingPreview]);

  const clearPendingFile = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview('');
    setIsUploading(false);
  };

  const confirmUpload = () => {
    if (!pendingFile) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${Date.now()}-${pendingFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
            base64Data: reader.result
          })
        }).then(res => res.json());

        if (response.success) {
          onChange(response.url);
          clearPendingFile();
        } else {
          alert('Upload failed: ' + (response.error || 'Unknown error'));
          setIsUploading(false);
        }
      } catch (err) {
        alert('Upload failed: ' + err.message);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      alert('Upload failed: Could not read selected file');
      setIsUploading(false);
    };
    reader.readAsDataURL(pendingFile);
  };

  const previewSrc = value 
    ? (value.startsWith('/') ? value : '/' + value)
    : '';
  const displaySrc = pendingPreview || previewSrc;
  const hasMedia = Boolean(displaySrc);

  return (
    <div className="rr-image-upload-field">
      <span className="rr-field-label">{label}</span>
      <div className={`rr-image-upload-box ${pendingFile ? 'is-pending' : ''}`}>
        {hasMedia ? (
          <div className="rr-image-preview-container">
            {type === "video" ? (
              <video src={displaySrc} className="rr-image-preview" controls style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f6f2ec' }} />
            ) : (
              <img src={displaySrc} alt="Preview" className="rr-image-preview" />
            )}
            {pendingFile ? (
              <div className="rr-upload-confirm-panel">
                <div className="rr-upload-file-meta">
                  <strong>{pendingFile.name}</strong>
                  <span>{Math.max(pendingFile.size / 1024 / 1024, 0.01).toFixed(2)} MB</span>
                </div>
                <div className="rr-upload-actions">
                  <button type="button" className="rr-upload-cancel" onClick={clearPendingFile} disabled={isUploading}>Cancel</button>
                  <button type="button" className="rr-upload-confirm" onClick={confirmUpload} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Confirm upload'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button type="button" className="rr-image-remove" onClick={() => onChange('')} aria-label={`Remove ${label}`}>&times;</button>
                <div className="rr-upload-existing-actions">
                  <label htmlFor={fileInputId} className="rr-upload-change">Change</label>
                </div>
              </>
            )}
          </div>
        ) : (
          <label htmlFor={fileInputId} className="rr-image-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            <span>Choose {type === "video" ? "Video" : "Image"}</span>
            <small>Preview before upload</small>
          </label>
        )}
        <input
          id={fileInputId}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

function ImageField(props) {
  return <MediaField {...props} type="image" accept="image/*" />;
}

export default AdminDashboard
