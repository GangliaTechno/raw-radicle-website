var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-category');
  const productsContainer = document.querySelector('.ProductList--grid');
  const sortButtons = document.querySelectorAll('[data-action="sort-value"]');

  // Filter Logic
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.getAttribute('data-type');
      filterButtons.forEach(btn => {
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
    });
  });

  // Sort Logic
  sortButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const sortBy = this.getAttribute('data-value');
      
      // Update UI state
      sortButtons.forEach(btn => btn.classList.toggle('is-selected', btn === this));
      
      // Update label in the toolbar if possible
      const sortLabel = document.querySelector('.CollectionToolbar__Item--sort');
      if (sortLabel) {
        // We could update the text here but user didn't explicitly ask for it
      }

      // Perform Sort
      const items = Array.from(productsContainer.querySelectorAll('.Grid__Cell[data-type]'));
      items.sort((a, b) => {
        if (sortBy.includes('title')) {
          const valA = a.querySelector('.ProductItem__Title a').textContent.trim().toLowerCase();
          const valB = b.querySelector('.ProductItem__Title a').textContent.trim().toLowerCase();
          return sortBy === 'title-ascending' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (sortBy.includes('price')) {
          const priceA = parseFloat(a.querySelector('.transcy-money').textContent.replace(/[^\d.]/g, '')) || 0;
          const priceB = parseFloat(b.querySelector('.transcy-money').textContent.replace(/[^\d.]/g, '')) || 0;
          return sortBy === 'price-ascending' ? priceA - priceB : priceB - priceA;
        }
        return 0;
      });

      // Re-append items
      items.forEach(item => productsContainer.appendChild(item));

      // Close popover
      const popover = document.getElementById('collection-sort-popover');
      if (popover) {
        popover.setAttribute('aria-hidden', 'true');
      }
    });
  });
});
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