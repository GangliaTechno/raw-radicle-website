/**
 * CMS Synchronization Script
 * Dynamically updates static HTML pages with data from the server-side CMS.
 */

const CMSSync = (() => {
  const API_PRODUCTS = '/api/products';
  const API_HOMEPAGE = '/api/homepage';

  const fetchData = async (url) => {
    try {
      const resp = await fetch(url);
      return resp.ok ? await resp.json() : null;
    } catch (e) {
      console.error(`CMS Sync: Failed to fetch from ${url}`, e);
      return null;
    }
  };

  const syncProducts = (products) => {
    if (!products) return;

    // 1. Sync all product-specific elements (names, prices, images)
    // Format: <el data-cms-product-id="bmilkc" data-cms-key="name">...</el>
    document.querySelectorAll('[data-cms-product-id]').forEach(el => {
      const productId = el.getAttribute('data-cms-product-id');
      const key = el.getAttribute('data-cms-key');
      const product = products[productId];

      if (product && product[key] !== undefined) {
        const type = el.getAttribute('data-cms-type');
        if (type === 'html') {
          el.innerHTML = product[key];
        } else if (key === 'image' || el.tagName === 'IMG') {
          el.src = product[key];
          if (el.hasAttribute('srcset')) el.removeAttribute('srcset'); // Remove responsive srcset to force CMS image
        } else if (key === 'price') {
          // Check if it's a price container that might need formatting
          const price = parseFloat(product[key]);
          if (!isNaN(price)) {
            el.textContent = `MRP ₹ ${price.toFixed(2)} INR`;
          }
        } else if (key === 'mrp') {
          const mrp = parseFloat(product[key]);
          if (!isNaN(mrp)) {
            el.textContent = `MRP ₹ ${mrp.toFixed(2)}`;
          }
        } else {
          el.textContent = product[key];
        }
      }
    });
  };

  const syncHomePage = (homeData) => {
    if (!homeData) return;

    // Format: <el data-cms-home-key="hero.slides.0.title">...</el>
    document.querySelectorAll('[data-cms-home-key]').forEach(el => {
      const path = el.getAttribute('data-cms-home-key');
      const value = path.split('.').reduce((acc, part) => acc && acc[part], homeData);

      if (value !== undefined && value !== null) {
        if (path === 'instagram') {
          renderInstagram(el, value);
        } else {
          const type = el.getAttribute('data-cms-type');
          if (type === 'html') {
            el.innerHTML = value;
          } else if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'SOURCE') {
            el.src = value;
            if (el.tagName === 'VIDEO') el.load();
          } else if (el.tagName === 'A') {
            el.href = value;
          } else if (el.hasAttribute('data-cms-is-bg')) {
            el.style.backgroundImage = `url(${value})`;
          } else if (path.includes('.price')) {
            const priceValue = parseFloat(value);
            if (!isNaN(priceValue)) {
              el.textContent = `₹ ${Math.round(priceValue)}`;
            }
          } else {
            el.textContent = value;
          }
        }
      }
    });
  };

  const renderInstagram = (container, data) => {
    const posts = data.posts || [];
    const profileUrl = data.profileUrl || 'https://www.instagram.com/rawradicles';
    const placeholders = [
      'assets/instagram/choco1.png',
      'assets/instagram/choco2.png',
      'assets/instagram/choco3.png',
      'assets/instagram/choco4.png',
      'assets/instagram/choco5.png',
      'assets/instagram/choco6.png',
      'assets/instagram/choco7.png',
      'assets/instagram/choco8.webp'
    ];

    let html = '';
    for (let i = 0; i < 8; i++) {
      const post = posts[i];
      const imgSrc = post ? post.imageUrl : placeholders[i % placeholders.length];
      const link = post ? post.link : profileUrl;

      html += `
        <div class="InstaSection__Item">
          <a href="${link}" target="_blank" rel="noopener">
            <img class="InstaSection__Image" src="${imgSrc}" alt="Raw Radicles Instagram">
            <div class="InstaSection__Overlay"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="#fff"
                  stroke-width="1.5" />
                <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="1.5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
              </svg></div>
          </a>
        </div>
      `;
    }
    container.innerHTML = html;
  };


  const init = async () => {
    console.log('CMS Sync: Initializing...');
    const [products, homeData] = await Promise.all([
      fetchData(API_PRODUCTS),
      fetchData(API_HOMEPAGE)
    ]);

    syncProducts(products);
    syncHomePage(homeData);
    console.log('CMS Sync: Complete.');
  };

  return { init };
})();

// Auto-init on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', CMSSync.init);
} else {
  CMSSync.init();
}

window.CMSSync = CMSSync;
