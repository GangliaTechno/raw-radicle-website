document.addEventListener('DOMContentLoaded', function () {
  const products = [
    { title: "Chyawanaprash Dark Chocolate", url: "pages/cdarkc.html", price: "₹250.00", image: "assets/cdark/cdark.png" },
    { title: "Chyawanaprash Milk Chocolate", url: "pages/cmilkc.html", price: "₹250.00", image: "assets/cmilk/cmilk.png" },
    { title: "Ashwagandha Dark Chocolate", url: "pages/adarkc.html", price: "₹250.00", image: "assets/adark/adark.png" },
    { title: "Ashwagandha Milk Chocolate", url: "pages/amilkc.html", price: "₹250.00", image: "assets/amilk/amilk.png" },
    { title: "Brahmi Dark Chocolate", url: "pages/bdarkc.html", price: "₹250.00", image: "assets/bdark/bdark.png" },
    { title: "Brahmi Milk Chocolate", url: "pages/bmilkc.html", price: "₹250.00", image: "assets/bmilk/bmilk.png" }
  ];

  const searchInputs = document.querySelectorAll('#local-search-input, .Search__Input');
  const resultsContainers = document.querySelectorAll('#search-results, .Search__Results');

  if (searchInputs.length > 0 && resultsContainers.length > 0) {
    const isSubPage = window.location.pathname.includes('/pages/');

    searchInputs.forEach((searchInput, index) => {
      // Find the corresponding results container
      // If we have multiple, we might need a better way to pair them, 
      // but usually there's only one desktop and one mobile overlay.
      const resultsContainer = resultsContainers[index] || resultsContainers[0];

      // Intercept and handle search to prevent theme.js conflicts
      const handleSearch = function (e) {
        // If it's an Enter key, let theme.js handle it if it wants (it might go to /search)
        // but our submit listener on the form already prevents default.
        if (e.keyCode !== 13) {
          e.stopImmediatePropagation();
        }

        if (e.type === 'input') {
          const query = e.target.value.toLowerCase().trim();
          resultsContainer.innerHTML = '';

          if (query.length === 0) {
            resultsContainer.style.display = 'none';
            return;
          }

          const matches = products.filter(product =>
            product.title.toLowerCase().includes(query)
          );

          if (matches.length > 0) {
            matches.forEach(product => {
              let adjustedUrl = product.url;
              let adjustedImg = product.image;

              if (isSubPage) {
                adjustedUrl = adjustedUrl.replace('pages/', '');
                adjustedImg = '../' + adjustedImg;
              }

              const item = document.createElement('a');
              item.href = adjustedUrl;
              item.className = 'search-result-item';
              item.innerHTML = `
                <img src="${adjustedImg}" class="search-result-image" alt="${product.title}">
                <div class="search-result-info">
                  <span class="search-result-title">${product.title}</span>
                  <span class="search-result-price">${product.price}</span>
                </div>
              `;
              resultsContainer.appendChild(item);
            });
            resultsContainer.style.display = 'block';
          } else {
            resultsContainer.innerHTML = '<div style="padding:20px; text-align:center; color:#888; font-size:14px;">No products found</div>';
            resultsContainer.style.display = 'block';
          }
        }
      };

      const searchEvents = ['input', 'keyup', 'keydown'];
      searchEvents.forEach(eventType => {
        searchInput.addEventListener(eventType, handleSearch, true); // Use capture phase to precede theme.js
      });

      // Special handling for mobile overlay search form
      const searchForm = searchInput.closest('form');
      if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
          e.preventDefault();
        });
      }

      // Hide results when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
          resultsContainer.style.display = 'none';
        }
      });

      // Show results when focusing back on input (if there's a query)
      searchInput.addEventListener('focus', function () {
        if (this.value.trim().length > 0) {
          resultsContainer.style.display = 'block';
        }
      });
    });
  }

  // Mobile Search Toggle Logic
  const searchToggles = document.querySelectorAll('[data-action="toggle-search"]');
  const closeSearchButtons = document.querySelectorAll('[data-action="close-search"]');
  const header = document.getElementById('section-header');
  const searchOverlay = document.getElementById('Search');

  function toggleSearch(show) {
    if (searchOverlay) {
      searchOverlay.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (show) {
        const mobileInput = document.getElementById('mobile-local-search-input') || document.querySelector('.Search__Input');
        if (mobileInput) {
          setTimeout(() => mobileInput.focus(), 100);
        }
      }
    }
    
    if (header) {
      header.classList.toggle('is-search-visible', show);
    }
  }

  searchToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isCurrentlyHidden = searchOverlay ? searchOverlay.getAttribute('aria-hidden') === 'true' : !header.classList.contains('is-search-visible');
      toggleSearch(isCurrentlyHidden);
    });
  });

  closeSearchButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      toggleSearch(false);
    });
  });
});
