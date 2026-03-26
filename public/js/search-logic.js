document.addEventListener('DOMContentLoaded', function () {
  const products = [
    { title: "Chyawanaprash Dark Chocolate", url: "pages/cdarkc.html", price: "₹250.00", image: "assets/chdc.png" },
    { title: "Chyawanaprash Milk Chocolate", url: "pages/cmilkc.html", price: "₹250.00", image: "assets/chmc.png" },
    { title: "Ashwagandha Dark Chocolate", url: "pages/adarkc.html", price: "₹250.00", image: "assets/aphdc.png" },
    { title: "Ashwagandha Milk Chocolate", url: "pages/amilkc.html", price: "₹250.00", image: "assets/aphmc.png" },
    { title: "Brahmi Milk Chocolate", url: "pages/bmilkc.html", price: "₹250.00", image: "assets/brmc.png" }
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
            // If we are in 'pages/', we don't need 'pages/' prefix for URLs within the same folder
            adjustedUrl = adjustedUrl.replace('pages/', '');
            // Image is in '../assets/'
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
});
