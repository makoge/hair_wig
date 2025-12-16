


import { products, formatCurrency, updateCartCount, loadCart, cart_key, saveCart, makeSwatches } from "./utils.js";










//add to cart code




let cartItems = loadCart();
let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<article class="product-card" data-sku="${product.sku}" data-length="${product.length}" data-style="body wave" data-cap="lace front"> 
     <div class="cart-media"  aria-label="human hair">
      <img src="${product.img}" alt="women-wigs" loading="lazy" width="500" height="500" >
       ${product.badge? `<span class="badge">${product.badge}</span>`: ""} 
     </div>
      <div class="cart-body">
        <div class="title-row"> 
        <h3 class="title">${product.name}</h3>
        <div class="price" data-price ="${product.price}">${formatCurrency(product.price)}</div>
        </div>
      
        <div class="meta">
          <span>Category</span>
          <span>${product.category}</span>
        </div>
        <div class="swatches" aria-label="available colors">
            ${makeSwatches(product.variants)}
        </div>
        
        <div class="cart-actions">
          <a class="btn-product" href="#" data-action="add-to-cart">Add to card</a>
          <a class="btn-product-ghost" href="#" data-action="details">Details</a>
        </div>
      </article>`
      
})

const grid = document.querySelector('.js-product-grid');
if (grid) {
 grid.innerHTML = productsHTML;
}else {
  console.warn('[products] .js-product-grid not found in DOM');
}



updateCartCount(cartItems);

const ensureViewCartLink = (actionsEl) => {
  if (!actionsEl) return;
  let view = actionsEl.querySelector('[data-action="view-cart"]');
  if(!view){
    view = document.createElement('a');
    view.className = 'btn-product-ghost';
    view.setAttribute('data-action', 'view-cart');
    view.href = 'cart.html';
    view.textContent = 'view cart';
    actionsEl.appendChild(view);
  } else{
    view.textContent = 'view cart';
    view.href = 'cart.html';
  }
};

const addToCart = (cardEl) => {
  const sku = cardEl.dataset.sku;
  const name = cardEl.querySelector('.title')?.textContent?.trim() || 'Product';
  const priceEl = cardEl.querySelector('.price');
  const price = Number(priceEl?.dataset.price ?? 0);
  const img = cardEl.querySelector('.cart-media img')?.getAttribute('src') || '';
  const selectedSwatch = cardEl.querySelector('.swatch.selected');
  const variant = selectedSwatch?.getAttribute('title') || null;

  const existing = cartItems.find(i => i.sku === sku && i.variant === variant);
  if (existing){
    existing.qty = (existing.qty || 1) + 1;
  }else{
    cartItems.push({sku, name, price, img, variant, qty: 1});
  }
  saveCart(cartItems);
  updateCartCount(cartItems);

  const addBtn = cardEl.querySelector('[data-action="add-to-cart"]');
  const actionsEl = cardEl.querySelector('.cart-actions');

  if (addBtn) {
    addBtn.textContent = 'Added to cart';
    addBtn.classList.add('added');
    addBtn.setAttribute('aria-disabled', 'true');
    addBtn.setAttribute('tabindex', '-1');
    addBtn.href = '#';

    addBtn.addEventListener('click', (e) => e.preventDefault(), { once: true});
  }
  if (actionsEl) ensureViewCartLink(actionsEl);
};


  
  
  const viewProduct = (sku, variant=null) => {
    const url = new URL('./detail.html', window.location.origin);
    url.searchParams.set('sku', sku);
    if(variant) url.searchParams.set('variant', variant);
    window.location.href = url.toString();
  };


document.addEventListener("click", (e) => {
  const swatch = e.target.closest(".swatch");
  if (swatch){

  const card = swatch.closest(".product-card");
  if(!card) return;

  const imgEl = card.querySelector(".cart-media img");
  const newSrc = swatch.dataset.img;
  const colorLabel = swatch.getAttribute("title") || "variant";

  if (newSrc && imgEl) {
    const preload = new Image();
    preload.onload = () => {imgEl.src = newSrc;};
    preload.src = newSrc;
    const title = card.querySelector(".title")?.textContent?.trim() || "product";imgEl.alt = `${title} - ${colorLabel}`;
  }

  const group = swatch.parentElement;
  if(group){
  group.querySelectorAll(".swatch").forEach(b => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
  });
  }
  swatch.classList.add("selected");
  swatch.setAttribute("aria-pressed", "true");
  return;
  }


  const addBtn = e.target.closest('[data-action="add-to-cart"]');
  if (addBtn) {
    e.preventDefault();
    const card = addBtn.closest('.product-card');
    if (card) addToCart(card);
    return;
  }

  const detailsBtn = e.target.closest('[data-action="details"]');
   if(detailsBtn){
    const card = detailsBtn.closest('.product-card');
    if(!card) return;
    const sku = card.dataset.sku;
    const selected = card.querySelector('.swatch.selected')?.getAttribute('title')  || null;
    viewProduct(sku, selected);
    e.preventDefault();
   }

   const mediaImg = e.target.closest('.cart-media img');
    if(mediaImg){
      const card = mediaImg.closest('.product-card');
      if(!card) return;
      const sku = card.dataset.sku;
      const selected = card.querySelector('.swatch.selected')?.getAttribute('title') || null;
      viewProduct(sku, selected);
      e.preventDefault();
      return;
    }
   
});

 