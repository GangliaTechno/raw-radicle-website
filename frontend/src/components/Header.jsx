import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { asset } from '../utils/assets.js'

export function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsExpanded, setProductsExpanded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur()
    }
  }, [location])

  const handleLinkClick = (e) => {
    e.currentTarget.blur()
  }
  const isHome = location.pathname === '/'
  const productPaths = ['/products', '/cdarkc', '/cmilkc', '/amilkc', '/adarkc', '/bdarkc', '/bmilkc']

  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      hasMegaMenu: true,
      subItems: [
        { label: 'CHYAWANAPRASH DARK', href: '/cdarkc' },
        { label: 'CHYAWANAPRASH MILK', href: '/cmilkc' },
        { label: 'ASHWAGANDHA MILK', href: '/amilkc' },
        { label: 'ASHWAGANDHA DARK', href: '/adarkc' },
        { label: 'BRAHMI DARK', href: '/bdarkc' },
        { label: 'BRAHMI MILK', href: '/bmilkc' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const activeHeaderClass = isHome ? 'Header Header--logoLeft Header--transparent' : 'Header Header--logoLeft'
  const isNavItemActive = (item) => {
    if (item.href === '/') return location.pathname === '/'
    if (item.href === '/products') return productPaths.includes(location.pathname)
    return location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
  }

  return (
    <>
      {/* Mobile Drawer Menu */}
      <section
        id="sidebar-menu"
        className="SidebarMenu Drawer Drawer--small Drawer--fromLeft"
        aria-hidden={!menuOpen}
        style={{ transition: 'transform 0.4s ease', zIndex: 1000 }}
      >
        <header className="Drawer__Header">
          <button
            aria-label="Close navigation"
            className="Drawer__Close Icon-Wrapper--clickable"
            type="button"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
              <path d="M15 0L1 14m14 0L1 0" fill="none" stroke="currentColor" />
            </svg>
          </button>
        </header>

        <div className="Drawer__Content">
          <div className="Drawer__Main" data-scrollable="">
            <div className="Drawer__Container">
              <nav aria-label="Sidebar navigation" className="Collapsible">
                <ul className="Linklist Linklist--spacingLoose">
                  {navItems.map((item) => (
                    <li className="Linklist__Item" key={item.label}>
                      {item.hasMegaMenu ? (
                        <>
                          <button
                            className={`Collapsible__Button Heading u-h6 ${isNavItemActive(item) ? 'is-active' : ''}`}
                            type="button"
                            aria-expanded={productsExpanded}
                            onClick={() => setProductsExpanded(!productsExpanded)}
                            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '12px 0' }}
                          >
                            {item.label}
                            <span className="Collapsible__Plus" />
                          </button>
                          <div
                            className="Collapsible__Inner"
                            style={{
                              height: productsExpanded ? 'auto' : '0px',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease',
                            }}
                          >
                            <div className="Collapsible__Content" style={{ paddingLeft: '15px' }}>
                              <div className="Linklist__SubItem">
                                <p className="Linklist__SubHeading Heading u-h7">CHOCOLATE</p>
                                <ul className="Linklist">
                                  {item.subItems.map((sub) => (
                                    <li className="Linklist__Item" key={sub.label}>
                                      <Link
                                        className="Link Link--secondary"
                                        to={sub.href}
                                        onClick={() => setMenuOpen(false)}
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          className={`Linklist__Link Heading u-h6 ${isNavItemActive(item) ? 'is-active' : ''}`}
                          to={item.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <aside className="Drawer__Footer">
            <ul className="HorizontalList HorizontalList--spacingLoose">
              <li className="HorizontalList__Item">
                <a
                  aria-label="Instagram"
                  className="Link Link--primary"
                  href="https://www.instagram.com/rawradicles?igsh=eXZlbzdidDF4eGwz"
                  rel="noopener"
                  target="_blank"
                >
                  <span className="Icon-Wrapper--clickable">
                    <svg className="Icon Icon--instagram" role="presentation" viewBox="0 0 32 32" style={{ width: '18px', height: '18px' }}>
                      <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
      {menuOpen && <div className="Drawer__Backdrop" onClick={() => setMenuOpen(false)} style={{ zIndex: 900 }} />}

      {/* Main Header */}
      <div className="shopify-section shopify-section--header" id="shopify-section-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <header className={activeHeaderClass} id="section-header" role="banner">
          <div className="Header__Wrapper">
            
            {/* Left/Center Logo */}
            <div className="Header__FlexItem Header__FlexItem--logo">
              <h1 className="Header__Logo">
                <Link className="Header__LogoLink" to="/">
                  <img
                    alt="Raw Radicles"
                    className="Header__LogoImage Header__LogoImage--primary"
                    src={asset('assets/RR_Logo-1.png')}
                    style={{ maxHeight: '48px', objectFit: 'contain' }}
                  />
                  {isHome && (
                    <img
                      alt="Raw Radicles"
                      className="Header__LogoImage Header__LogoImage--transparent"
                      src={asset('assets/RR_Logo-1.png')}
                      style={{ maxHeight: '48px', objectFit: 'contain' }}
                    />
                  )}
                </Link>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="Header__FlexItem Header__FlexItem--fill notranslate">
              <nav aria-label="Main navigation" className="Header__MainNav hidden-pocket hidden-lap">
                <ul className="HorizontalList HorizontalList--spacingExtraLoose">
                  {navItems.map((item) => {
                    const isActive = isNavItemActive(item)
                    return (
                      <li
                        key={item.label}
                        aria-haspopup={item.hasMegaMenu ? 'true' : 'false'}
                        className={`HorizontalList__Item ${isActive ? 'is-active' : ''}`}
                      >
                        <Link className={`Heading u-h6 ${isActive ? 'is-active' : ''}`} to={item.href} aria-current={isActive ? 'page' : undefined} onClick={handleLinkClick}>
                          {item.label}
                          <span className="Header__LinkSpacer">{item.label}</span>
                        </Link>

                        {item.hasMegaMenu && (
                          <div aria-hidden="true" className="MegaMenu MegaMenu--products">
                            <div className="MegaMenu__Inner">
                              <div className="MegaMenu__Item MegaMenu__Item--fit MegaMenu__Item--productsList">
                                <Link className="MegaMenu__Title Heading Text--subdued u-h7" to="/products" onClick={handleLinkClick}>
                                  CHOCOLATE
                                </Link>
                                <ul className="Linklist">
                                  {item.subItems.map((sub) => (
                                    <li className="Linklist__Item" key={sub.label}>
                                      <Link className="Link Link--secondary" to={sub.href} onClick={handleLinkClick}>
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="MegaMenu__Item MegaMenu__Item--fit MegaMenu__Item--push hidden-pocket">
                                <div className="MegaMenu__Push">
                                  <Link to="/cdarkc" className="MegaMenu__PushImageWrapper" onClick={handleLinkClick}>
                                    <img src={asset('assets/choco/cdark.png')} alt="Chyawanaprash Dark" />
                                  </Link>
                                  <p className="MegaMenu__PushHeading Heading u-h6">CHYAWANAPRASH DARK</p>
                                </div>
                              </div>
                              <div className="MegaMenu__Item MegaMenu__Item--fit MegaMenu__Item--push hidden-pocket">
                                <div className="MegaMenu__Push">
                                  <Link to="/adarkc" className="MegaMenu__PushImageWrapper" onClick={handleLinkClick}>
                                    <img src={asset('assets/choco/adark.png')} alt="Ashwagandha Dark" />
                                  </Link>
                                  <p className="MegaMenu__PushHeading Heading u-h6">ASHWAGANDHA DARK</p>
                                </div>
                              </div>
                              <div className="MegaMenu__Item MegaMenu__Item--fit MegaMenu__Item--push hidden-pocket">
                                <div className="MegaMenu__Push">
                                  <Link to="/bdarkc" className="MegaMenu__PushImageWrapper" onClick={handleLinkClick}>
                                    <img src={asset('assets/choco/bdark.png')} alt="Brahmi Dark" />
                                  </Link>
                                  <p className="MegaMenu__PushHeading Heading u-h6">BRAHMI DARK</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Right-side Actions */}
            <div className="Header__FlexItem Header__FlexItem--fill">
              {/* Mobile Menu Toggle Button */}
              <button
                aria-expanded={menuOpen}
                aria-label="Open navigation"
                className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk"
                type="button"
                onClick={() => setMenuOpen(true)}
              >
                <span className="hidden-tablet-and-up">
                  <svg className="Icon Icon--nav" role="presentation" viewBox="0 0 20 14" style={{ width: '20px', height: '14px' }}>
                    <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor" />
                  </svg>
                </span>
                <span className="hidden-phone">
                  <svg className="Icon Icon--nav-desktop" role="presentation" viewBox="0 0 24 16" style={{ width: '24px', height: '16px' }}>
                    <path d="M0 15.985v-2h24v2H0zm0-9h24v2H0v-2zm0-7h24v2H0v-2z" fill="currentColor" />
                  </svg>
                </span>
              </button>

              {/* Search Toggle Button */}
              <button
                aria-label="Search"
                className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable"
                type="button"
                onClick={onSearch}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <span className="hidden-tablet-and-up">
                  <svg className="Icon Icon--search" role="presentation" viewBox="0 0 18 17" style={{ width: '18px', height: '17px' }}>
                    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="square" transform="translate(1 1)">
                      <path d="M16 16l-5.0752-5.0752" />
                      <circle cx="6.4" cy="6.4" r="6.4" />
                    </g>
                  </svg>
                </span>
                <span className="hidden-phone">
                  <svg className="Icon Icon--search-desktop" role="presentation" viewBox="0 0 21 21" style={{ width: '21px', height: '21px' }}>
                    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="square" strokeWidth="2" transform="translate(1 1)">
                      <path d="M18 18l-5.7096-5.7096" />
                      <circle cx="7.2" cy="7.2" r="7.2" />
                    </g>
                  </svg>
                </span>
              </button>

              {/* Account/Admin Login Link */}
              <Link
                id="header-account-link"
                to="/login"
                aria-label="Account"
                title="Login / My Account"
                className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable"
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg
                  role="presentation"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '21px', height: '21px' }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>

          </div>
        </header>
      </div>
    </>
  )
}
