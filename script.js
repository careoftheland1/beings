(function () {
  const index = document.getElementById('animal-index');
  const landing = document.getElementById('landing');
  const landingDismiss = document.getElementById('landing-dismiss');
  if (index) {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const renderIndex = filter => {
      const visibleProducts = filter === 'All' ? products : products.filter(product => product.taxon === filter);
      index.innerHTML = visibleProducts.map(product => `<article class="animal"><a class="animal-link" href="product.html?product=${encodeURIComponent(product.slug)}">${product.name}</a><a href="product.html?product=${encodeURIComponent(product.slug)}"><img class="animal-image" src="${product.image}" alt="${product.name} embroidered hat placeholder"></a></article>`).join('');
      filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    };
    filterButtons.forEach(button => button.addEventListener('click', () => renderIndex(button.dataset.filter)));
    renderIndex('All');
  }
  if (landing) { const dismiss = () => { landing.classList.add('is-gone'); landingDismiss?.classList.add('is-gone'); }; landingDismiss?.addEventListener('click', dismiss, { once: true }); document.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === 'Escape') dismiss(); }); landing.focus(); }
  const root = document.getElementById('product-root');
  if (!root) return;
  const slug = new URLSearchParams(location.search).get('product'); const product = products.find(item => item.slug === slug) || products[0]; let color = product.colors[0]; document.title = `${product.name} — beings on the land`;
  root.innerHTML = `<article class="product"><img class="product-image" src="${product.image}" alt="${product.name} embroidered hat placeholder"><div class="product-info"><h1>${product.name}</h1><p class="price">$${product.price}.00</p><fieldset><legend>color</legend><div class="color-options">${product.colors.map((c,i) => `<button type="button" data-color="${c}" aria-pressed="${i === 0}">${c}</button>`).join('')}</div></fieldset><button class="add-button" type="button">add to cart</button></div></article>`;
  root.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => { color = button.dataset.color; root.querySelectorAll('[data-color]').forEach(item => item.setAttribute('aria-pressed', item === button)); }));
  root.querySelector('.add-button').addEventListener('click', () => { window.cart.add(product, color); window.cart.open(); });
})();
