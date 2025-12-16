import { formatCurrency, updateCartCount, loadCart, cart_key, saveCart } from "./utils.js";



let cartItems = loadCart();



updateCartCount(cartItems);

//RENDER


const listEl = document.querySelector('.js-cart-list');
const subtotalEl = document.querySelector('.js-subtotal');

function computeSubtotal()
{
  return cartItems.reduce((sum, item) => {
    const unit = Number(item.price) || 0;
    
    return sum + unit * (item.qty || 1);
  }, 0);
}

function renderCart() {
  if (!listEl) return;

  if (!cartItems.length) {
    listEl.innerHTML = `<p>Your cart is empty.</p>`;
  } else{
    listEl.innerHTML = cartItems.map((it, idx) => {
      const unit = Number(it.price) || 0;
      const total = unit * (it.qty || 1);
      return `
      <div class="cart-item" data-key="${encodeURIComponent(it.sku)}" data-variant="${encodeURIComponent(it.variant || '')}">
      <img src="${it.img || ''}" alt="${(it.name || 'product')}${it.variant ? '-' + it.variant : ''}">
      <div>
      <div class="item-title">${it.name || 'product'}</div>
      <div class="item-meta">
      ${it.variant ? `<span>${it.variant}</span> .` : ''}
      <span>Unit: ${formatCurrency(unit)}</span>
      </div>
      <div class="qty-row">
      <button class="qty-btn" data-action="dec" aria-label="Decrease">-</button>
      <span class="qty-value">${it.qty || 1}</span>
      <button class="qty-btn" data-action="inc" aria-label="Increase">+</button>
      <button class="qty-btn" data-action="remove" aria-label="Remove"><i class="fa-solid fa-delete-left"></i></button>
      </div>
      </div>
      <div class="item-total" >${formatCurrency(total)}</div>
      </div>
      `;
    }).join('');
  }

  const subtotal = computeSubtotal();
  if(subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  updateCartCount(cartItems);
}

//MUTATIONS
function findIndex(cardEl) {
  const sku = decodeURIComponent(cardEl?.dataset.key || '');
  const variant = decodeURIComponent(cardEl?.dataset.variant || '');
  return cartItems.findIndex(i => i.sku === sku && (i.variant || '') === variant);
}
function incItem(cardEl){
  const idx = findIndex(cardEl);
  if (idx > -1) {
    cartItems[idx].qty = (cartItems[idx].qty || 1) + 1;
    saveCart(cartItems);
    renderCart();
  }
}

function decItem(cardEl) {
  const idx = findIndex(cardEl);
  if (idx > -1) {
    const next = (cartItems[idx].qty || 1) -1;
    if (next <= 0) {
      cartItems.splice(idx, 1);
    }else {
      cartItems[idx].qty = next;
    }
    saveCart(cartItems);
    renderCart();
  }
}

function removeItem(cardEl){
  const idx = findIndex(cardEl);
  if (idx > -1){
    cartItems.splice(idx, 1);
    saveCart(cartItems);
    renderCart();
  }
}
 
document.addEventListener('click', (e) => {
  const btnClear = e.target.closest('.js-clear-cart');
  if (btnClear) {
    e.preventDefault();
    cartItems = [];
    saveCart(cartItems);
    renderCart();
  }
});


document.addEventListener('click', (e) => {
  const card = e.target.closest('.cart-item');
  if (!card) return;

  if (e.target.closest('[data-action="inc"]'))  incItem(card);
  if (e.target.closest('[data-action="dec"]'))  decItem(card);
  if (e.target.closest('[data-action="remove"]'))  removeItem(card);
});


document.addEventListener('DOMContentLoaded', () => {
  cartItems = loadCart();
  renderCart();
  updateCartCount(cartItems);
});



