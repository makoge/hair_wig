export const products =[
  {
    sku:"HW01",
    name:"straight human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"straight",
    img:"/img/straight-human-hair.jpeg",
    imgAlt:"human hair wigs",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/straight-human-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]
  },
  {
    sku:"HW02",
    name:"16 inch wavy human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"wavy",
    img:"/img/wavy-human-hair.jpeg",
    imgAlt:"wavy human hair",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/wavy-human-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]
    },

  {
    sku:"HW03",
    name:"wavy human hair",
    price:186,
    length:"13",
    category:"human hair",
    style:"wavy",
    img:"/img/wavy-hair.jpeg",
    imgAlt:"women wigs",
    badge:"Trending",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/wavy-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]

  },
  {
    sku:"HW04",
    name:"deep wave human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"straight",
    img:"/img/deep-wave.jpeg",
    imgAlt:"women wigs",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/deep-wave.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]

  },
  {
    sku:"HW05",
    name:"red straight wig",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/red-straight.jpeg",
    imgAlt:"straight human hair",
    badge:"Hot",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/black_straight.jpeg"
      },{
    color:"#4b2e1f", label:"Chocolate brown", img:"/img/red-straight.jpeg"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/honey_blonde_straight.jpeg"
  }]
  },
  {
    sku:"HW05",
    name:"red straight wig",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/straight_hair_wig.jpeg",
    imgAlt:"straight human hair",
    badge:"New",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/straight_hair_wig.jpeg"
      },{
    color:"#571e0fff", label:"Chocolate brown", img:"/img/hair_wig_red.jpeg"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"
  }]
  },
  {
  sku:"HW06",
    name:"red straight wig",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/product_1_chocolate.png",
    imgAlt:"straight human hair",
    badge:"New",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/product_1_black.png"
      },{
    color:"#571e0fff", label:"Chocolate brown", img:"/img/product_1_chocolate.png"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/product_1_honey.png"
  }]
  },
  {
  sku:"HW06",
    name:"lace front wave",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/product_2_honey.png",
    imgAlt:"straight human hair",
    badge:"New",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/product_2_black.png"
      },{
    color:"#571e0fff", label:"Chocolate brown", img:"/img/product_2_chocolate.png"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/product_2_honey.png"
  }]
  },
]

export const formatCurrency = (n, currency = "EUR", locale = "en-EE") =>
  new Intl.NumberFormat(locale, {style: "currency", currency}).format(n);



export const updateCartCount = ( cartItems=[]) => {
  const count = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartLink = document.querySelector('.header-right .bts') || document.querySelector('.bts');
  if (cartLink) cartLink.textContent = `cart(${count})`;
};



export const cart_key = 'confida_cart_v1';

export const loadCart = () => {
   try {return JSON.parse(localStorage.getItem(cart_key)) || [];}
   catch {return [];}
};

export const saveCart = (items) => localStorage.setItem(cart_key, JSON.stringify(items));

export const makeSwatches = (variants = []) => variants.map(v =>
  `<button class="swatch" type="button" title="${v.label}"
  aria-label="${v.label}" style="background:${v.color}" data-img="${v.img}"></button>`
).join("");

