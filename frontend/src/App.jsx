import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminDashboard from './AdminDashboard.jsx'
import Footer from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ScrollToTop } from './components/ScrollToTop.jsx'
import { SearchOverlay } from './components/SearchOverlay.jsx'

import { AboutPage } from './pages/AboutPage.jsx'
import { AuthPage } from './pages/AuthPage.jsx'
import { BlogPage } from './pages/BlogPage.jsx'

import { ContactPage } from './pages/ContactPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { trackPageView } from './services/firebaseAnalytics.js'
import { getClickDetail, trackStorePageView, trackStoreTimeOnPage, trackStoreEvent } from './services/storeAnalytics.js'
import { asset } from './utils/assets.js'

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('rr-preloader-seen') !== 'true'
  })
  const location = useLocation()

  useEffect(() => {
    if (!showPreloader) return undefined

    document.body.classList.add('rr-preloader-active')
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('rr-preloader-seen', 'true')
      document.body.classList.remove('rr-preloader-active')
      setShowPreloader(false)
    }, 1200)

    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('rr-preloader-active')
    }
  }, [showPreloader])

  useEffect(() => {
    trackPageView(location)
    trackStorePageView(location)
  }, [location])

  useEffect(() => {
    const page = `${location.pathname}${location.search}${location.hash}`
    const startedAt = Date.now()

    return () => {
      trackStoreTimeOnPage(page, startedAt)
    }
  }, [location])

  useEffect(() => {
    const handleTrackedClick = (event) => {
      const detail = getClickDetail(event.target)
      if (!detail) return
      trackStoreEvent('click', {
        page: `${location.pathname}${location.search}${location.hash}`,
        detail,
      })
    }

    document.addEventListener('click', handleTrackedClick, { capture: true })
    return () => document.removeEventListener('click', handleTrackedClick, { capture: true })
  }, [location])

  useEffect(() => {
    const isHome = location.pathname === '/'
    const innerLogoPaths = ['/about', '/blog', '/contact', '/products', '/login', '/register', '/cdarkc', '/cmilkc', '/amilkc', '/adarkc', '/bdarkc', '/bmilkc']
    const shouldLowerInnerLogo = innerLogoPaths.includes(location.pathname)
    document.body.classList.add('rr-home-logo-scroll')
    document.body.classList.toggle('rr-logo-scroll-home', isHome)

    let currentProgress = 0
    let targetProgress = Math.min(Math.max(window.scrollY / 220, 0), 1)
    let scrollFrameId = null

    const applyLogoProgress = (progress) => {
      const easedProgress = progress * progress * (3 - 2 * progress)
      const isCompactHeader = window.innerWidth <= 1000
      const scale = 1.75 - easedProgress * 0.75
      const translate = isHome
        ? 46 + easedProgress * 9
        : shouldLowerInnerLogo
          ? 32 - easedProgress * 32
          : 0
      const mobileScale = isCompactHeader ? 1.5 - easedProgress * 0.5 : 1
      const mobileTranslate = isCompactHeader ? 8 - easedProgress * 8 : 0

      document.documentElement.style.setProperty(
        '--rr-home-logo-progress',
        easedProgress.toFixed(3),
      )
      document.documentElement.style.setProperty('--rr-home-logo-scale', scale.toFixed(3))
      document.documentElement.style.setProperty('--rr-home-logo-translate', `${translate}px`)
      document.documentElement.style.setProperty('--rr-mobile-logo-scale', mobileScale.toFixed(3))
      document.documentElement.style.setProperty('--rr-mobile-logo-translate', `${mobileTranslate}px`)
    }

    const animateLogo = () => {
      const distance = targetProgress - currentProgress

      const smoothFactor = window.innerWidth <= 1000 ? 0.16 : 0.1
      currentProgress += distance * smoothFactor

      if (Math.abs(distance) < 0.001) {
        currentProgress = targetProgress
        applyLogoProgress(currentProgress)
        scrollFrameId = null
        return
      }

      applyLogoProgress(currentProgress)
      scrollFrameId = window.requestAnimationFrame(animateLogo)
    }

    const updateLogoProgress = () => {
      targetProgress = Math.min(Math.max(window.scrollY / 220, 0), 1)

      if (!scrollFrameId) {
        scrollFrameId = window.requestAnimationFrame(animateLogo)
      }
    }

    window.addEventListener('scroll', updateLogoProgress, { passive: true })
    window.addEventListener('resize', updateLogoProgress)
    applyLogoProgress(targetProgress)

    return () => {
      window.removeEventListener('scroll', updateLogoProgress)
      window.removeEventListener('resize', updateLogoProgress)
      if (scrollFrameId) {
        window.cancelAnimationFrame(scrollFrameId)
      }
      document.body.classList.remove('rr-home-logo-scroll')
      document.body.classList.remove('rr-logo-scroll-home')
      document.documentElement.style.removeProperty('--rr-home-logo-progress')
      document.documentElement.style.removeProperty('--rr-home-logo-scale')
      document.documentElement.style.removeProperty('--rr-home-logo-translate')
      document.documentElement.style.removeProperty('--rr-mobile-logo-scale')
      document.documentElement.style.removeProperty('--rr-mobile-logo-translate')
    }
  }, [location.pathname])



  const isAdmin = location.pathname === '/admin'
  return (
    <>
      <ScrollToTop />
      {!isAdmin && (
        <Header
          onSearch={() => setSearchOpen(true)}
        />
      )}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      {!isAdmin && showPreloader ? (
        <div className="rr-site-preloader" aria-label="Loading Raw Radicles" aria-live="polite">
          <div className="rr-site-preloader-mark">
            <img src={asset('assets/RR_logo embossed_tm.png')} alt="Raw Radicles" />
          </div>
        </div>
      ) : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
         <Route path="/:productId" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
