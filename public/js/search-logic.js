document.addEventListener('DOMContentLoaded', function () {
  const products = [
    { title: "Chyawanaprash Dark Chocolate", url: "pages/cdarkc.html", price: "₹250.00", image: "assets/cdark/cdark.png" },
    { title: "Chyawanaprash Milk Chocolate", url: "pages/cmilkc.html", price: "₹250.00", image: "assets/cmilk/cmilk.png" },
    { title: "Ashwagandha Dark Chocolate", url: "pages/adarkc.html", price: "₹250.00", image: "assets/adark/adark.png" },
    { title: "Ashwagandha Milk Chocolate", url: "pages/amilkc.html", price: "₹250.00", image: "assets/amilk/amilk.png" },
    { title: "Brahmi Dark Chocolate", url: "pages/bdarkc.html", price: "₹250.00", image: "assets/bdark/bdark.png" },
    { title: "Brahmi Milk Chocolate", url: "pages/bmilkc.html", price: "₹250.00", image: "assets/bmilk/bmilk.png" }
  ];

  const searchInput = document.getElementById('local-search-input');
  const resultsContainer = document.getElementById('search-results');

  if (searchInput && resultsContainer) {
    const isSubPage = window.location.pathname.includes('/pages/');

    searchInput.addEventListener('input', function (e) {
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
            // Subpages are in 'pages/', so URLs to other pages in 'pages/' need 'pages/' removed
            // and root-relative assets need to go up one level.
            adjustedUrl = adjustedUrl.replace('pages/', '');
            adjustedImg = '../' + adjustedImg;
          } else {
            // We are on root index.html. URLs to subpages are correct as 'pages/...'
            // and assets are correct as 'assets/...'
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
    });

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
  }

  // Mobile Search Toggle Logic
  const searchToggles = document.querySelectorAll('[data-action="toggle-search"]');
  const header = document.getElementById('section-header');

  searchToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (header) {
        header.classList.toggle('is-search-visible');
        
        // If we just showed the search, focus the input
        if (header.classList.contains('is-search-visible')) {
          if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
          }
        }
      }
    });
  });
});
