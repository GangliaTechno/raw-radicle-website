/**
 * product-cms-loader.js
 * Fetches and injects product-specific CMS data into the DOM.
 */
(function() {
  'use strict';

  function getProductId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || null;
  }

  async function initProductCMS() {
    const productId = getProductId();
    if (!productId) return;

    try {
      const res = await fetch(`/api/product-cms/${productId}`);
      const cms = await res.json();
      if (!cms || Object.keys(cms).length === 0) return;

      applyCMSData(cms, productId);
    } catch (e) {
      console.error('Failed to load product CMS:', e);
    }
  }

  function applyCMSData(cms, productId) {
    // 1. Gallery
    if (cms.gallery && cms.gallery.length > 0) {
      const thumbs = document.querySelectorAll('.Product__SlideshowNavScroller img');
      const mainSlides = document.querySelectorAll('.Product__Slideshow .AspectRatio img');
      
      cms.gallery.forEach((url, i) => {
        if (!url) return;
        if (thumbs[i]) thumbs[i].src = url;
        if (mainSlides[i]) {
          mainSlides[i].src = url;
          mainSlides[i].srcset = url;
        }
      });
    }

    // 2. Basic Info
    const bi = cms.basicInfo || {};
    if (bi.title && bi.title.trim()) {
      const titleEl = document.querySelector('.ProductMeta__Title');
      if (titleEl) titleEl.innerHTML = bi.title;
    }
    if (bi.subtitle && bi.subtitle.trim()) {
      const subtitleEl = document.querySelector('.ProductMeta__Title .u-h5');
      if (subtitleEl) subtitleEl.innerHTML = bi.subtitle;
    }
    if (bi.price && bi.price.trim()) {
      const priceEl = document.querySelector('.ProductMeta__Price .Price');
      if (priceEl) {
        const currentHtml = priceEl.innerHTML;
        const numericPrice = parseFloat(bi.price.replace(/[^0-9.]/g, ''));
        if (!isNaN(numericPrice)) {
          if (currentHtml.includes('MRP')) {
            priceEl.innerHTML = `MRP &#8377; ${numericPrice.toFixed(2)}<span class="Price__TaxNotice">${bi.taxNotice || '(inclusive of all taxes)'}</span>`;
          } else {
            priceEl.textContent = '₹' + numericPrice.toFixed(2);
          }
        }
      }
    }
    if (bi.badge && bi.badge.trim()) {
      const badgeEl = document.querySelector('.ProductBadge');
      if (badgeEl) badgeEl.innerHTML = bi.badge;
    }

    // 3. Details (Collapsibles)
    const details = cms.details || {};
    if (details.features && details.features.length > 0) {
      const featureItems = document.querySelectorAll('.Collapsible__Content .FeaturesList, .Collapsible__Content .Collapsible__ContentInner');
      if (featureItems.length > 0) {
        const featuresListEl = document.querySelector('.FeaturesList');
        if (featuresListEl) {
          featuresListEl.innerHTML = details.features.map(f => {
            if (!f.title && !f.desc) return '';
            return `
            <div class="FeatureItem">
              <strong class="FeatureTitle">${f.title || ''}</strong>
              <span class="FeatureDescription">${f.desc || ''}</span>
            </div>
          `}).join('');
        } else {
          featureItems[0].innerHTML = details.features.map(f => `<strong>${f.title || ''}</strong><br>${f.desc || ''}`).join('<br><br>');
        }
      }
    }
    
    if (details.specs && details.specs.length > 0) {
      const specsContent = document.querySelectorAll('.Collapsible__Content .Rte, .Collapsible__Content .Collapsible__ContentInner');
      const specsTable = document.querySelector('.Collapsible__Content table');
      if (specsTable) {
        specsTable.innerHTML = `
          <thead><tr style="border-bottom: 1px solid #e0e0e0;"><th style="text-align: left; padding: 12px 0; font-size: 15px; color: #1c1c1c; font-weight: 700;">Attribute</th><th style="text-align: left; padding: 12px 0; font-size: 15px; color: #1c1c1c; font-weight: 700;">Specification</th></tr></thead>
          <tbody>${details.specs.map(s => `<tr style="border-bottom: 1px solid #e0e0e0;"><td style="padding: 15px 0; font-size: 15px; font-weight: 700; color: #1c1c1c; width: 40%;">${s.title || ''}</td><td style="padding: 15px 0; font-size: 15px; color: #1c1c1c;">${s.desc || ''}</td></tr>`).join('')}</tbody>
        `;
      } else if (specsContent.length > 1) {
        const specsInner = document.querySelector('.Collapsible--large:nth-of-type(2) .Collapsible__ContentInner');
        if (specsInner) {
          specsInner.innerHTML = details.specs.map(s => `<strong>${s.title || ''}</strong>: ${s.desc || ''}`).join('<br>');
        } else {
          specsContent[1].innerHTML = details.specs.map(s => `<strong>${s.title || ''}</strong>: ${s.desc || ''}`).join('<br>');
        }
      }
    }

    if (details.quality && details.quality.trim()) {
      const collapsibles = document.querySelectorAll('.Collapsible');
      collapsibles.forEach(col => {
        const btn = col.querySelector('.Collapsible__Button');
        if (btn && (btn.textContent.includes('Quality') || btn.textContent.includes('Certified') || btn.textContent.includes('WARRANTY'))) {
          const content = col.querySelector('.Collapsible__ContentInner, .Collapsible__Content');
          if (content) content.innerHTML = details.quality;
        }
      });
    }

    // 4. Feature Section Highlights
    if (cms.featureGrid && cms.featureGrid.length > 0) {
      const gridItems = document.querySelectorAll('.ProductFeatures__Item');
      cms.featureGrid.forEach((f, i) => {
        if (!f || !gridItems[i]) return;
        const img = gridItems[i].querySelector('.ProductFeatures__Image');
        if (img && f.image && f.image.trim()) img.src = f.image;
        const title = gridItems[i].querySelector('.ProductFeatures__Title');
        if (title && f.title && f.title.trim()) title.textContent = f.title;
        const desc = gridItems[i].querySelector('.ProductFeatures__Description');
        if (desc && f.description && f.description.trim()) desc.textContent = f.description;
      });
    }

    // 5. Related Products
    if (cms.related && cms.related.length > 0) {
      const cards = document.querySelectorAll('.MvstProducts__Card');
      const container = document.querySelector('.MvstProducts__Carousel .flickity-slider') || document.querySelector('.MvstProducts__Carousel');
      
      if (cards.length > 0 && container) {
        cms.related.forEach((r, i) => {
          if (!r) return;
          let card = cards[i];
          if (!card) return;

          const img = card.querySelector('.MvstProducts__Image:not(.MvstProducts__Image--secondary)');
          const hoverImg = card.querySelector('.MvstProducts__Image--secondary');
          const title = card.querySelector('.MvstProducts__Name');
          const price = card.querySelector('.MvstProducts__Price');
          const link = card.querySelector('a');

          if (img && r.image && r.image.trim()) img.src = r.image;
          if (hoverImg && r.hoverImage && r.hoverImage.trim()) hoverImg.src = r.hoverImage;
          if (title && r.title && r.title.trim()) title.textContent = r.title;
          if (price && r.price && r.price.trim()) price.textContent = r.price;
          if (link && r.link && r.link.trim()) link.href = r.link;
        });
      }
    }

    // 6. Reviews
    if (cms.reviews && cms.reviews.length > 0) {
      const PRODUCT_NAMES = {
        'amilkc': 'Ashwagandha Milk Chocolate Slab',
        'adarkc': 'Ashwagandha Dark Chocolate Slab',
        'bmilkc': 'Brahmi Milk Chocolate Slab',
        'bdarkc': 'Brahmi Dark Chocolate Slab',
        'cmilkc': 'Chyawanaprash Milk Chocolate Slab',
        'cdarkc': 'Chyawanaprash Dark Chocolate Slab'
      };

      const productInfo = {
        title: PRODUCT_NAMES[productId] || (bi.title ? bi.title.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''),
        image: (cms.gallery && cms.gallery[0]) ? cms.gallery[0] : ''
      };
      renderReviews(cms.reviews, productInfo);
    }
  }

  function renderReviews(reviews, productInfo) {
    const list = document.querySelector('.ReviewSection__List');
    if (!list) return;

    // Check if we already have injected CMS reviews to avoid duplicates
    if (list.dataset.cmsLoaded) return;

    list.innerHTML = reviews.map(rev => `
      <div class="ReviewCard">
        <div class="ReviewCard__Inner">
          <div class="ReviewCard__Content">
            <div class="ReviewCard__AuthorRow">
              <span class="ReviewCard__Author">${rev.name}</span>
              <span class="ReviewCard__Verified"><svg viewBox="0 0 24 24" fill="#1c1c1c"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Verified</span>
            </div>
            <div class="ReviewCard__Date">${rev.date || new Date(rev.submittedAt).toLocaleDateString() || new Date().toLocaleDateString()}</div>
            <div class="ReviewCard__Stars">${generateStars(rev.rating)}</div>
            <div class="ReviewCard__Body">${rev.body}</div>
          </div>
        </div>
        <div class="ReviewCard__Variant">
          <img class="ReviewCard__VariantImg" src="${productInfo.image}" alt="${productInfo.title}">
          <span class="ReviewCard__VariantName">${rev.variant || productInfo.title}</span>
        </div>
      </div>
    `).join('');
    
    list.dataset.cmsLoaded = "true";
    
    const countEl = document.querySelector('.ReviewSection__CountNum');
    if (countEl) countEl.textContent = reviews.length + ' Reviews';

    // Update the top-level rating summary if it exists (e.g., "5.0 (3 REVIEWS)")
    const scoreTextEl = document.querySelector('.Rating__ScoreText');
    if (scoreTextEl) {
      const plural = reviews.length === 1 ? 'REVIEW' : 'REVIEWS';
      scoreTextEl.textContent = `5.0 (${reviews.length} ${plural})`;
    }
  }

  function generateStars(rating) {
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += i < rating 
        ? '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
        : '<svg viewBox="0 0 24 24" class="star--empty"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    return html;
  }

  document.addEventListener('DOMContentLoaded', initProductCMS);
})();
