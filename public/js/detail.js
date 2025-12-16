import { products, formatCurrency, updateCartCount, loadCart, cart_key, saveCart, makeSwatches } from "./utils.js";

let cartItems = loadCart();



updateCartCount(cartItems);

const $ = (sel) => document.querySelector(sel);

function renderDetails(){
 const params = new URLSearchParams (location.search);
 const sku =params.get('sku');
 const preVariant = params.get('variant');
 const product = products.find(p => p.sku === sku);
 if(!product){

  document.getElementById('pd-title').textContent = 'product not found';
 }else{
  document.getElementById('pd-title').textContent = product.name;
  document.getElementById('pd-price').textContent = formatCurrency(product.price);
  document.getElementById('pd-meta').textContent = `${product.length}"-${product.category}`;

  const gallery =[];
  if (product.img) gallery.push({img: product.img, label: product.name});
  (product.variants || []).forEach(v =>{
    if(v.img && !gallery.some(g => g.img === v.img)) gallery.push({img: v.img, label: v.label});
  });
  

  const mainImg = document.getElementById('pd-main-img');
  const initial = gallery.find(g=>g.label === preVariant) || gallery[0];
  if (initial){
    mainImg.src = initial.img;
    mainImg.alt = `${product.name} - ${initial.label || 'img'}`;
  }
  console.log('mainImg')

  const thumbs = document.getElementById('pd-thumbs');
  thumbs.innerHTML = gallery.map((g,i)=> `<button type="button" class="${(initial && initial.img===g.img)?'selected': ''}" data-img="${g.img}" title="${g.label || 'image'}">
   <img src="${g.img}" alt="${g.label || 'image'}">
   </button>
`).join("");

thumbs.addEventListener('click', (e) =>{
  const btn = e.target.closest('button[data-img]');
  if(!btn) return;
  const src = btn.dataset.img;
  const label = btn.title || 'image';
  if (src) {
    const preload = new Image();
    preload.onload = () =>{
      mainImg.src=src; mainImg.alt=`${product.name} - ${label}`;
    };
    preload.src= src;
  }
  thumbs.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
});


const colorsWrap = document.getElementById('pd-colors');
colorsWrap.innerHTML = (product.variants || []).map(v=>`
  <button class="swatch" type="button" title="${v.label}" aria-label="${v.label}" data-img="${v.img}"></button>`
).join("");

colorsWrap.addEventListener('click', (e)=>{
  const sw = e.target.closest('.swatch');
  if (!sw) return;
  const src = sw.dataset.img;
  const label = sw.getAttribute('title') || '';
  if (src) {
    const preload = new Image();
    preload.onload = () =>{
      mainImg.src = src;
      mainImg.alt = `${product.name} - ${label}`;
    };
    preload.src = src;
  }
  colorsWrap.querySelectorAll('.swatch').forEach(b=> b.classList.remove('selected'));
  sw.classList.add('selected');
 
});
 

 const addBtn = document.getElementById('pd-add');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();

    
      const selectedSwatch = colorsWrap?.querySelector('.swatch.selected');
      const variant =
        selectedSwatch?.getAttribute('title') ||
        preVariant ||
        (initial && initial.label) ||
        null;

      const imgSrc = mainImg?.src || product.img || '';

      // check if same sku+variant already in cart
      const existing = cartItems.find(
        item => item.sku === product.sku && (item.variant || null) === (variant || null)
      );

      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cartItems.push({
          sku: product.sku,
          name: product.name,
          price: product.price, // numeric
          img: imgSrc,
          variant,
          qty: 1
        });
      }

      saveCart(cartItems);
      updateCartCount(cartItems);

      addBtn.textContent = 'Added to cart';
      addBtn.classList.add('added');
      addBtn.setAttribute('aria-disabled', 'true');
    });
  }
}
}


 document.addEventListener("DOMContentLoaded", renderDetails);
 