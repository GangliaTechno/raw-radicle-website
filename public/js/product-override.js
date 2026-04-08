/**
 * product-override.js
 * Loaded on every product page. Applies admin-saved overrides from localStorage
 * so user-facing pages reflect changes made in the admin dashboard.
 */
(function () {
  const PRODUCTS_KEY = 'rr_product_overrides';

  function getOverrides() {
    try { return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '{}'); }
    catch { return {}; }
  }

  // Detect current product from URL
  function getProductId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || null;
  }

  function applyOverride() {
    const productId = getProductId();
    if (!productId) return;

    const overrides = getOverrides();
    const override = overrides[productId];
    if (!override) return;

    // Update product name in title & h1/h2 elements
    if (override.name) {
      // Title
      const titleSelectors = [
        '.ProductMeta__Title',
        '.product-title',
        'h1.ProductMeta__Title',
        'h1[itemprop="name"]',
        '[data-product-title]',
      ];
      titleSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { el.textContent = override.name; });
      });
      document.title = override.name + ' | Raw Radicles';
    }

    // Update price
    if (override.price) {
      const priceSelectors = [
        '.ProductMeta__Price .Price',
        '.ProductMeta__Price',
        '.price',
        '[data-product-price]',
        '.ProductForm__Price .Price',
      ];
      priceSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          // Only update if it contains a price-like value
          if (el.childElementCount === 0 || el.querySelector('.transcy-money')) {
            const priceEl = el.querySelector('.transcy-money') || el;
            if (priceEl) priceEl.textContent = '₹' + override.price.toFixed(2);
          }
        });
      });
    }

    // Update description
    if (override.description) {
      const descSelectors = [
        '.ProductMeta__Description',
        '.product-description',
        '[itemprop="description"]',
      ];
      descSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.querySelector('.Collapsible')) { // Don't overwrite accordion sections
            el.textContent = override.description;
          }
        });
      });
    }

    // Update primary product images
    if (override.imageDataUrl || override.imageUrl) {
      const newSrc = override.imageDataUrl || override.imageUrl;
      const imgSelectors = [
        '.ProductGallery img',
        '.Product__SlideshowImages img',
        '.slideshow__image',
        '.ProductGallery__MainImageWrapper img',
        'img[data-product-image]',
      ];
      imgSelectors.forEach(sel => {
        const imgs = document.querySelectorAll(sel);
        if (imgs.length > 0) {
          imgs[0].src = newSrc;
          imgs[0].srcset = newSrc;
        }
      });
    }

    // Show admin indicator bar if admin is logged in
    try {
      const session = JSON.parse(localStorage.getItem('rr_session') || 'null');
      if (session && session.role === 'admin') {
        _injectAdminBar(productId, override);
      }
    } catch (e) {}
  }

  function _injectAdminBar(productId, override) {
    if (document.getElementById('rr-admin-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'rr-admin-bar';
    bar.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
      background: #1c1b1b; color: #fff;
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 24px; font-family: 'Montserrat', sans-serif;
      font-size: 12px; font-weight: 500; border-top: 2px solid #f6a429;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.25);
    `;
    bar.innerHTML = `
      <span>🔑 <strong>Admin Mode</strong> — Viewing as administrator &nbsp;|&nbsp; This product has custom overrides applied.</span>
      <div style="display:flex; gap:10px;">
        <a href="/admin.html" style="color:#f6a429; text-decoration:none; font-weight:600;">⚙ Edit in Admin</a>
        <span style="color:rgba(255,255,255,0.4);">|</span>
        <span style="color:rgba(255,255,255,0.6);">Last updated: ${override.updatedAt ? new Date(override.updatedAt).toLocaleString() : 'N/A'}</span>
      </div>
    `;
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '48px';
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyOverride);
  } else {
    applyOverride();
  }

  // Also re-apply when storage changes (cross-tab sync)
  window.addEventListener('storage', function(e) {
    if (e.key === PRODUCTS_KEY) applyOverride();
  });
})();
