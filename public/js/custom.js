var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function initProductsLogic() {
  const sidebarFilters = document.querySelectorAll('.CollectionInner__Sidebar .filter-category');
  const productsContainer = document.querySelector('.ProductList--grid');
  const sortButtons = document.querySelectorAll('[data-action="sort-value"]');
  const categoryTrigger = document.querySelector('.CollectionToolbar__Item--category');
  const categoryPopover = document.getElementById('collection-category-popover');
  const categoryFilters = document.querySelectorAll('[data-action="filter-category"]');

  if (!productsContainer) return;


  // Sidebar Filter Logic (Existing)
  sidebarFilters.forEach(button => {
    button.onclick = function(e) {
      e.preventDefault();
      const category = this.getAttribute('data-type');
      sidebarFilters.forEach(btn => {
        btn.classList.toggle('is-active', btn === this);
        btn.style.color = (btn === this) ? 'var(--text-color)' : 'var(--text-color-light)';
      });
      const products = productsContainer.querySelectorAll('.Grid__Cell[data-type]');
      products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-type') === category) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
    };
  });



  categoryFilters.forEach(button => {
    button.onclick = function(e) {
      e.preventDefault();
      const value = this.getAttribute('data-value').toLowerCase();
      
      categoryFilters.forEach(btn => btn.classList.toggle('is-selected', btn === this));
      
      const products = productsContainer.querySelectorAll('.Grid__Cell');
      products.forEach(product => {
        const titleElement = product.querySelector('.ProductItem__Title');
        if (!titleElement) return;
        const title = titleElement.textContent.toLowerCase();
        
        if (value === 'all') {
          product.style.display = '';
        } else {
          const keywords = value.split(' ');
          const matches = keywords.every(kw => title.includes(kw));
          product.style.display = matches ? '' : 'none';
        }
      });

      closePopovers();
    };
  });

  // Sort Logic (Existing)
  sortButtons.forEach(button => {
    button.onclick = function(e) {
      e.preventDefault();
      const sortBy = this.getAttribute('data-value');
      
      sortButtons.forEach(btn => btn.classList.toggle('is-selected', btn === this));
      
      const items = Array.from(productsContainer.querySelectorAll('.Grid__Cell'));
      items.sort((a, b) => {
        const titleA = a.querySelector('.ProductItem__Title a');
        const titleB = b.querySelector('.ProductItem__Title a');
        if (!titleA || !titleB) return 0;

        if (sortBy.includes('title')) {
          const valA = titleA.textContent.trim().toLowerCase();
          const valB = titleB.textContent.trim().toLowerCase();
          return sortBy === 'title-ascending' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (sortBy.includes('price')) {
          const getPrice = (el) => {
            const priceEl = el.querySelector('.ProductItem__Price');
            if (!priceEl) return 0;
            const text = priceEl.textContent;
            const match = text.match(/₹\s*([\d.]+)/);
            return match ? parseFloat(match[1]) : 0;
          };
          const priceA = getPrice(a);
          const priceB = getPrice(b);
          return sortBy === 'price-ascending' ? priceA - priceB : priceB - priceA;
        }
        return 0;
      });

      items.forEach(item => productsContainer.appendChild(item));
      closePopovers();
    };
  });

  // Helper to close all popovers
  function closePopovers() {
    document.querySelectorAll('.Popover').forEach(p => {
      p.setAttribute('aria-hidden', 'true');
      p.style.display = 'none';
      p.style.visibility = 'hidden';
      p.style.opacity = '0';
    });
    document.querySelectorAll('[aria-controls]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  // Position Helper
  function positionPopover(trigger, popover) {
    // We must show the popover first to get its actual width (offsetWidth)
    popover.style.display = 'block';
    popover.style.visibility = 'visible';
    popover.style.opacity = '1';
    
    const rect = trigger.getBoundingClientRect();
    const popoverWidth = popover.offsetWidth || 300; // Fallback if still 0
    
    popover.style.position = 'fixed';
    popover.style.top = rect.bottom + 'px'; // Fixed position is viewport relative, no scrollY needed
    popover.style.left = (rect.right - popoverWidth) + 'px';
    popover.style.zIndex = '2147483647';
  }

  // Toolbar Category Dropdown Logic
  if (categoryTrigger && categoryPopover) {
    categoryTrigger.onclick = function(e) {
      e.stopPropagation();
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      closePopovers();
      if (!isExpanded) {
        positionPopover(this, categoryPopover);
        this.setAttribute('aria-expanded', 'true');
        categoryPopover.setAttribute('aria-hidden', 'false');
      }
    };
  }

  // Sort Trigger Logic
  const sortTriggerNode = document.querySelector('.CollectionToolbar__Item--sort');
  const sortPopoverNode = document.getElementById('collection-sort-popover');
  if (sortTriggerNode && sortPopoverNode) {
    sortTriggerNode.onclick = function(e) {
      e.stopPropagation();
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      closePopovers();
      if (!isExpanded) {
        positionPopover(this, sortPopoverNode);
        this.setAttribute('aria-expanded', 'true');
        sortPopoverNode.setAttribute('aria-hidden', 'false');
      }
    };
  }

  // Close popovers on click outside (Capturing phase)
  document.addEventListener('click', function(e) {
    const popover = e.target.closest('.Popover');
    const trigger = e.target.closest('.CollectionToolbar__Item--category') || e.target.closest('.CollectionToolbar__Item--sort');
    
    if (!popover && !trigger) {
      closePopovers();
    }
  }, true);

  // Fallback: Close on scroll or resize to prevent alignment issues
  window.addEventListener('scroll', closePopovers, { passive: true });
  window.addEventListener('resize', closePopovers, { passive: true });

  // Close buttons in popovers
  document.querySelectorAll('.Popover__Close').forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closePopovers();
    };
  });
}

window.initProductsLogic = initProductsLogic;
document.addEventListener('DOMContentLoaded', initProductsLogic);
//# sourceMappingURL=/s/files/1/0013/2146/8022/t/45/assets/custom.js.map?v=183944157590872491501684244781

}
/*
     FILE ARCHIVED ON 18:54:25 May 19, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:48:58 Jan 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.646
  exclusion.robots: 0.079
  exclusion.robots.policy: 0.068
  esindex: 0.009
  cdx.remote: 11.203
  LoadShardBlock: 212.244 (3)
  PetaboxLoader3.datanode: 272.739 (5)
  load_resource: 191.55
  PetaboxLoader3.resolve: 73.691
  loaddict: 22.045
*/