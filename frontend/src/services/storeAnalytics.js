const cleanPath = (path = '/') => {
  const value = String(path || '/').split('?')[0].split('#')[0]
  return value || '/'
}

const productPaths = new Set(['/cdarkc', '/cmilkc', '/amilkc', '/adarkc', '/bdarkc', '/bmilkc'])
const marketplaceHosts = ['amazon.', 'flipkart.', 'blinkit.', 'zeptonow.', 'swiggy.']

const sendAnalyticsEvent = (payload) => {
  const body = JSON.stringify(payload)

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/event', new Blob([body], { type: 'application/json' }))
    return
  }

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}

export const trackStoreEvent = (type, payload = {}) => {
  sendAnalyticsEvent({ type, ...payload })
}

export const trackStorePageView = (location) => {
  trackStoreEvent('pageview', {
    page: cleanPath(`${location.pathname}${location.search}${location.hash}`),
  })
}

export const trackStoreTimeOnPage = (page, startedAt) => {
  const duration = Math.round((Date.now() - startedAt) / 1000)
  if (duration < 3) return
  trackStoreEvent('time_on_page', {
    page: cleanPath(page),
    duration: Math.min(duration, 1800),
  })
}

export const getClickDetail = (target) => {
  const link = target?.closest?.('a, button')
  if (!link) return ''

  const text = (link.textContent || link.getAttribute('aria-label') || link.getAttribute('title') || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 48)

  const href = link.getAttribute('href') || ''
  const pathname = href.startsWith('/') ? cleanPath(href) : ''

  if (pathname && productPaths.has(pathname)) {
    return `product_${pathname.slice(1)}`
  }

  if (href) {
    const host = marketplaceHosts.find((item) => href.toLowerCase().includes(item))
    if (host) return `marketplace_${host.replace('.', '')}`
  }

  if (link.classList.contains('StaticBanner__Button')) return 'cta_shop_now'
  if (link.classList.contains('MvstProducts__ViewAllBtn')) return 'cta_view_all_products'
  if (link.classList.contains('ProductQuickView__Link')) return 'cta_quick_view_details'
  if (text.includes('shop_now')) return 'cta_shop_now'
  if (text.includes('view_details')) return 'cta_view_details'
  if (text.includes('view_all')) return 'cta_view_all'

  return text ? `cta_${text}` : ''
}
