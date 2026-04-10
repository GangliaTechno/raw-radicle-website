/**
 * CMS Loader for Raw Radicles index.html
 * Fetches dynamic content from /api/homepage and /api/products
 * and updates the DOM elements tagged with data-cms-* attributes.
 */

(async function () {
    console.log('[CMS] Initializing dynamic content loader...');

    async function loadCMSData() {
        try {
            const [homeData, prodData] = await Promise.all([
                RRAuth.getHomePageData(),
                RRAuth.getProducts()
            ]);
            return { homeData, prodData };
        } catch (err) {
            console.error('[CMS] Failed to fetch data:', err);
            return null;
        }
    }

    const { homeData, prodData } = await loadCMSData() || {};
    if (!homeData) return;

    // 1. Update Hero Slides (Flickity)
    const heroSlider = document.querySelector('.Slideshow__Carousel');
    if (heroSlider && homeData.hero && homeData.hero.slides) {
        // We might need to wait for Flickity or re-init it
        // For now, let's just update the content if possible before it init
        // Or if it's already init, we'll try to update cells
        const slides = homeData.hero.slides;
        const slideEls = heroSlider.querySelectorAll('.Slideshow__Slide');
        slides.forEach((slide, i) => {
            if (slideEls[i]) {
                const img = slideEls[i].querySelector('.Slideshow__Image');
                const title = slideEls[i].querySelector('.SectionHeader__Heading');
                const subtitle = slideEls[i].querySelector('.SectionHeader__SubHeading');
                const link = slideEls[i].querySelector('.Slideshow__Content .Button');
                
                if (img) img.src = slide.image;
                if (title) title.textContent = slide.title;
                if (subtitle) subtitle.textContent = slide.subtitle;
                if (link) link.href = slide.link;
            }
        });
    }

    // 2. Update Static Banner
    const sb = homeData.staticBanner;
    if (sb) {
        const img = document.querySelector('[data-cms-key="staticBanner.image"]');
        const link = document.querySelector('[data-cms-key="staticBanner.link"]');
        if (img) img.src = sb.image;
        if (link) link.href = sb.link;
    }

    // 3. Update Video Hero
    const vh = homeData.videoHero;
    if (vh) {
        const vid = document.querySelector('[data-cms-key="videoHero.url"]');
        const title = document.querySelector('[data-cms-key="videoHero.title"]');
        const subtitle = document.querySelector('[data-cms-key="videoHero.subtitle"]');
        if (vid) {
            vid.src = vh.url;
            vid.load(); // Reload video source
        }
        if (title) title.textContent = vh.title;
        if (subtitle) subtitle.textContent = vh.subtitle;
    }

    // 4. Update Product Slider
    const prodSlider = document.querySelector('[data-cms-list="products"]');
    if (prodSlider && prodData) {
        // Define the product keys to look for
        const productIds = ['adark', 'amilk', 'cdark', 'cmilk', 'bmilk', 'bdark'];
        
        productIds.forEach(id => {
            const p = prodData[id + 'c'] || prodData[id]; 
            if (p) {
                const selector = `.MvstProducts__Card a[href*="${id}"]`;
                const cards = document.querySelectorAll(selector);
                console.log(`[CMS] Found ${cards.length} cards for product ${id}`, p);
                cards.forEach(card => {
                    const img = card.querySelector('.MvstProducts__Image');
                    const hoverImg = card.querySelector('.MvstProducts__Image--secondary');
                    const name = card.querySelector('.MvstProducts__Name');
                    const price = card.querySelector('.MvstProducts__Price');
                    if (img) img.src = p.image;
                    if (hoverImg && p.hoverImage) hoverImg.src = p.hoverImage;
                    if (name) name.textContent = p.name;
                    if (price) {
                        const numericPrice = parseFloat(p.price) || 0;
                        const formattedPrice = 'MRP ₹ ' + numericPrice.toFixed(2) + ' INR';
                        price.textContent = formattedPrice;
                        console.log(`[CMS] Updated price for ${id} to ${formattedPrice}`);
                    }
                });
            }
        });
    }

    // 5. Update Experts
    const expertsGrid = document.querySelector('[data-cms-list="experts"]');
    if (expertsGrid && homeData.experts) {
        expertsGrid.innerHTML = homeData.experts.map(exp => `
            <div class="ExpertCard">
                <div class="ExpertCard__ImageWrapper">
                    <img class="ExpertCard__Image" src="${exp.image}" alt="${exp.name}">
                </div>
                <span class="ExpertCard__Name">${exp.name}</span>
                <span class="ExpertCard__Role">${exp.role}</span>
            </div>
        `).join('');
    }

    // 6. Update Testimonials
    if (homeData.testimonials && homeData.testimonials.videos) {
        homeData.testimonials.videos.forEach(vid => {
            const container = document.getElementById(vid.id);
            if (container) {
                const videoEl = container.querySelector('video source');
                const videoParent = container.querySelector('video');
                const prodName = container.querySelector('.TestimonialsSection__ProductName');
                const price = container.querySelector('.TestimonialsSection__CurrentPrice');
                const img = container.querySelector('.VideoTestimonial__ProductImg');
                
                if (videoEl) videoEl.src = vid.url;
                if (videoParent) videoParent.load();
                if (prodName) prodName.textContent = vid.productName;
                if (price) {
                    const numericPrice = parseFloat(vid.price) || 0;
                    price.textContent = '₹ ' + Math.round(numericPrice);
                }
                if (img) img.src = vid.productImg;
            }
        });
    }

    // 7. Update Shop On
    const quickGrid = document.querySelector('[data-cms-list="shopOn.quickCommerce"]');
    if (quickGrid && homeData.shopOn && homeData.shopOn.quickCommerce) {
        quickGrid.innerHTML = homeData.shopOn.quickCommerce.map(item => `
            <a href="${item.link}" class="ShopOnSection__Link">
                <div class="ShopOnSection__IconCircle">
                      <img src="${item.logo}" alt="${item.name}" class="ShopOnSection__IconSVG">
                </div>
                <span class="ShopOnSection__IconText">${item.name}</span>
            </a>
        `).join('');
    }

    const ecomGrid = document.querySelector('[data-cms-list="shopOn.ecommerce"]');
    if (ecomGrid && homeData.shopOn && homeData.shopOn.ecommerce) {
        ecomGrid.innerHTML = homeData.shopOn.ecommerce.map(item => `
            <a href="${item.link}" class="ShopOnSection__Link">
                <div class="ShopOnSection__IconCircle">
                      <img src="${item.logo}" alt="${item.name}" class="ShopOnSection__IconSVG">
                </div>
                <span class="ShopOnSection__IconText">${item.name}</span>
            </a>
        `).join('');
    }

    // 8. Update FAQs
    const faqsContainer = document.querySelector('[data-cms-list="faqs"]');
    if (faqsContainer && homeData.faqs) {
        faqsContainer.innerHTML = homeData.faqs.map(faq => `
            <div class="faq-item" style="border-top: 1px solid #d8d8d8;">
                <button class="faq-question" onclick="toggleFAQ(this)"
                    style="display:flex; justify-content:space-between; align-items:center; width:100%; background:none; border:none; padding:22px 0; cursor:pointer; text-align:left; font-family:inherit; font-size:15px; font-weight:700; letter-spacing:0.02em;">
                    ${faq.question}
                    <span class="faq-plus" style="font-size:20px; font-weight:300; line-height:1; flex-shrink:0; margin-left:12px;">+</span>
                </button>
                <div class="faq-answer" style="display:none; padding-bottom:20px; font-size:14px; line-height:1.7; color:#555;">
                    ${faq.answer}
                </div>
            </div>
        `).join('');
    }

    console.log('[CMS] Dynamic content loaded successfully.');
})();
