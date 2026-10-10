(function () {
  'use strict';
  const products = Array.isArray(window.NAILNEST_PRODUCTS) ? window.NAILNEST_PRODUCTS : [];
  const WHATSAPP_BASE = 'https://wa.me/27710331241';
  const grid = document.getElementById('product-grid');
  const featuredGrid = document.getElementById('featured-grid');
  const searchInput = document.getElementById('product-search');
  const categorySelect = document.getElementById('category-select');
  const categoryChips = document.getElementById('category-chips');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const resetButton = document.getElementById('reset-filters');
  const emptyReset = document.getElementById('empty-reset');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  let activeCategory = 'all';
  let searchTerm = '';

  function whatsappUrl(message) {
    return WHATSAPP_BASE + '?text=' + encodeURIComponent(message);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
    });
  }

  function orderMessage(product) {
    return product.whatsappMessage || 'Hello, I am interested in ordering ' + product.name + '. Please provide more information about the price, availability, and delivery.';
  }

  function categoryFromHashOrLink(category) {
    activeCategory = category || 'all';
    categorySelect.value = activeCategory;
    renderCategoryChips();
    renderProducts();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderFeatured() {
    const featured = products.filter(function (product) { return product.featured; }).slice(0, 4);
    const chosen = featured.length >= 4 ? featured : products.slice(19, 23);
    featuredGrid.innerHTML = chosen.map(function (product) {
      return '<article class="mini-product">' +
        '<a class="mini-product-image" href="#shop" data-product-category="' + escapeHtml(product.category) + '" aria-label="Browse ' + escapeHtml(product.name) + '">' +
          '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy" decoding="async">' +
          '<span class="mini-badge">Featured find</span>' +
        '</a>' +
        '<div class="mini-product-body"><div class="product-category">' + escapeHtml(product.category) + '</div>' +
          '<h3>' + escapeHtml(product.name) + '</h3>' +
          '<div class="mini-product-bottom"><span class="price-label">Price on enquiry</span>' +
          '<a class="mini-order" href="' + whatsappUrl(orderMessage(product)) + '" target="_blank" rel="noopener noreferrer">ASK US <span aria-hidden="true">↗</span></a></div>' +
        '</div></article>';
    }).join('');
  }

  function renderCategoryOptions() {
    const categories = Array.from(new Set(products.map(function (product) { return product.category; }))).sort(function (a, b) { return a.localeCompare(b); });
    categorySelect.innerHTML = '<option value="all">All categories</option>' + categories.map(function (category) {
      return '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + '</option>';
    }).join('');
    renderCategoryChips(categories);
  }

  function renderCategoryChips(categories) {
    categories = categories || Array.from(new Set(products.map(function (product) { return product.category; }))).sort(function (a, b) { return a.localeCompare(b); });
    const visibleCategories = categories;
    categoryChips.innerHTML = '<button class="category-chip" type="button" data-category="all" aria-pressed="' + (activeCategory === 'all') + '">All products</button>' + visibleCategories.map(function (category) {
      return '<button class="category-chip" type="button" data-category="' + escapeHtml(category) + '" aria-pressed="' + (activeCategory === category) + '">' + escapeHtml(category) + '</button>';
    }).join('');
  }

  function productCard(product) {
    const variant = product.variantNote ? '<p class="product-variant">' + escapeHtml(product.variantNote) + '</p>' : '';
    const price = product.price != null && product.price !== ''
      ? 'R ' + escapeHtml(Number(product.price).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      : 'Price on enquiry';
    return '<article class="product-card">' +
      '<div class="product-image-wrap"><img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy" decoding="async" width="700" height="700"><span class="product-number">ITEM ' + String(product.number).padStart(3, '0') + '</span></div>' +
      '<div class="product-info"><div class="product-category">' + escapeHtml(product.category) + '</div>' +
        '<h3 class="product-name">' + escapeHtml(product.name) + '</h3>' +
        '<p class="product-description">' + escapeHtml(product.description) + '</p>' + variant +
        '<div class="product-card-bottom"><div class="product-price">' + price + '<small>Confirm price &amp; availability with us</small></div>' +
        '<a class="order-button" href="' + whatsappUrl(orderMessage(product)) + '" target="_blank" rel="noopener noreferrer" aria-label="Order ' + escapeHtml(product.name) + ' on WhatsApp">ORDER ON WHATSAPP <span aria-hidden="true">↗</span></a></div>' +
      '</div></article>';
  }

  function renderProducts() {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    const filtered = products.filter(function (product) {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const searchable = [product.name, product.category, product.description, product.variantNote || ''].join(' ').toLocaleLowerCase();
      return matchesCategory && (!normalizedSearch || searchable.includes(normalizedSearch));
    });
    grid.innerHTML = filtered.map(productCard).join('');
    grid.hidden = filtered.length === 0;
    emptyState.hidden = filtered.length !== 0;
    resultsCount.textContent = 'Showing ' + filtered.length + ' of ' + products.length + ' products';
    Array.from(categoryChips.querySelectorAll('[data-category]')).forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.category === activeCategory));
    });
  }

  function resetFilters() {
    searchTerm = '';
    activeCategory = 'all';
    searchInput.value = '';
    categorySelect.value = 'all';
    renderCategoryChips();
    renderProducts();
  }

  searchInput.addEventListener('input', function (event) {
    searchTerm = event.target.value;
    renderProducts();
  });
  categorySelect.addEventListener('change', function (event) {
    activeCategory = event.target.value;
    renderCategoryChips();
    renderProducts();
  });
  categoryChips.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    categorySelect.value = activeCategory;
    renderCategoryChips();
    renderProducts();
  });
  document.querySelectorAll('[data-quick-category]').forEach(function (link) {
    link.addEventListener('click', function () {
      categoryFromHashOrLink(link.dataset.quickCategory);
    });
  });
  featuredGrid.addEventListener('click', function (event) {
    const link = event.target.closest('[data-product-category]');
    if (!link) return;
    event.preventDefault();
    categoryFromHashOrLink(link.dataset.productCategory);
  });
  resetButton.addEventListener('click', resetFilters);
  emptyReset.addEventListener('click', function () {
    resetFilters();
    searchInput.focus();
  });

  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  document.getElementById('current-year').textContent = String(new Date().getFullYear());
  renderCategoryOptions();
  renderFeatured();
  renderProducts();
})();
