// app/data/products.js
export const products = [
  {
  id: "product-30",
  slug: "mono-part-wig",
  name: "Monofilament Part Wig",
  price: 210,
  length: ['16"', '18"', '20"'],
  texture: "loose wave",
  capType: "Mono Part",
  badge: "Popular",
  colors: ["#201f1f", "#5a3a2e"],
  images: ["/img/product-30-black.png","/img/product-30-cafe.png",],
    colorImages: {
      "#5a3a2e" : "/img/product-30-cafe.png",
      "#201f1f" :"/img/product-30-black.png",   
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Monofilament Part Wig features a realistic monofilament part that mimics natural hair growth at the scalp. Designed for easy styling and everyday comfort, this wig offers a natural look with lightweight construction, making it ideal for daily wear and effortless confidence.`,

  highlights: [
    "Realistic monofilament part for natural scalp appearance",
    "Lightweight and breathable for all-day comfort",
    "Natural movement and easy styling",
    "Ideal for everyday wear",
  ],

  care: [
    "Wash every 10–15 wears with a gentle, sulfate-free shampoo",
    "Air dry on a wig stand to preserve shape",
    "Use heat styling tools on low heat with protectant",
  ],

  description: `A natural-looking monofilament part wig designed for comfort, realism, and easy daily styling. Perfect for achieving a polished look with minimal effort.`,
},
{
  id: "product-23",
  slug: "lace-front-straight-wig",
  name: "Lace Front Straight Human Hair Wig",
  price: 220,
  length: ['18"', '20"', '22"', '24"', '26"'],
  texture: "straight",
  capType: "Lace Front",
  badge: "Best Seller",
  colors: ["#201f1f", "#3b2a1a", "#c68642"],
  images: ["/img/product-23-black.png","/img/product-23-cafe.png","/img/product-23-peru.png"],
    colorImages: {
      "#201f1f" :"/img/product-23-black.png",
      "#3b2a1a" : "/img/product-23-cafe.png",
      "#c68642" : "/img/product-23-peru.png"
    },
  category: "human",
  inStock: true,
  pageDescription: `The Lace Front Straight Human Hair Wig delivers a smooth, sleek look with a natural-looking hairline. Made from premium human hair, the lace front allows flexible styling while maintaining a realistic appearance. Perfect for everyday wear or polished, elegant styles.`,

  highlights: [
    "Natural-looking lace front hairline",
    "Premium straight human hair with smooth finish",
    "Soft texture with realistic movement",
    "Style versatility with parting flexibility",
  ],

  care: [
    "Wash gently every 10–12 wears using sulfate-free shampoo",
    "Condition lightly to maintain softness and shine",
    "Air dry or heat style on low settings with protectant",
  ],

  description: `A premium lace front straight human hair wig designed for a flawless, natural look. Ideal for daily wear, professional settings, and effortless styling.`,
},
  
  {
    id: "product-5",
    slug: "honey-blond-20",
    name: 'frontal honey blond',
    price: 160,
    length: '20"',
    texture: "Body wave",
    capType: "Lace front",
    badge: "Hot",
    colors: ["#d6a25a", "#f5d29a"],
    image: "/img/honey_blonde_straight.jpeg",
    category: "lace",
    inStock: false,
    pageDescription: `The Frontal Honey Blonde Wig features a warm, golden blonde tone with a natural-looking lace frontal for a flawless hairline. Designed to brighten the complexion, this wig offers soft movement, realistic density, and versatile styling for everyday or glam looks.`,

  highlights: [
    "Warm honey blonde shade with natural dimension",
    "Lace frontal for a realistic, face-framing hairline",
    "Soft texture with natural movement",
    "Easy to style for both casual and glam looks",
  ],

  care: [
    "Wash gently every 10–12 wears with color-safe shampoo",
    "Use purple or blonde-safe products to maintain tone",
    "Air dry or heat style on low with heat protectant",
  ],

  description: `A radiant frontal honey blonde wig designed to enhance your look with warmth, brightness, and a natural finish. Perfect for confident, everyday elegance.`,
  },
  {
    id: "product-6",
    slug: "frontal-wig-22",
    name: 'straight black wig',
    price: 180,
    length: '22"',
    texture: "Straight",
    capType: "Frontal",
    badge: "Limited",
    colors: ["#201f1f", "#4a2d2d"],
    image: "/img/frontal_wig.jpg",
    category: "human",
    inStock: true,
    pageDescription: `The Straight Black Wig offers a sleek, polished look with a smooth finish and natural movement. Designed for everyday wear, this wig delivers a timeless style that blends effortlessly for a realistic, elegant appearance.`,

  highlights: [
    "Classic straight black style with sleek finish",
    "Natural-looking movement and realistic density",
    "Comfortable fit suitable for daily wear",
    "Easy to style and maintain",
  ],

  care: [
    "Wash every 10–15 wears with sulfate-free shampoo",
    "Condition lightly to maintain smooth texture",
    "Air dry or heat style on low with heat protectant",
  ],

  description: `A versatile straight black wig designed for a natural, polished look. Perfect for everyday styling, professional wear, and effortless confidence.`,
  },
  {
    id: "product-1",
    slug: "short-wavy-wig-1",
    name: 'wavy wig 1',
    price: 180,
    length: '22"',
    texture: "wavy",
    capType: "Frontal",
    badge: "Limited",
    colors: ["#201f1f", "#4a2d2d"],
    image: "/img/product_1_black.png",
    images: ["/img/product_1_chocolate.png", "/img/product_1_honey.png"],
    colorImages: {
      "#4a2d2d": "/img/product_1_chocolate.png",
      "#201f1f": "/img/product_1_black.png"
    },
    category: "human",
    inStock: true,
    pageDescription: `The Short Wavy Wig offers a soft, textured wave with a lightweight feel for easy everyday wear. Designed for natural volume and movement, this wig delivers a fresh, stylish look with minimal effort.`,

  highlights: [
    "Soft wavy texture with natural movement",
    "Lightweight and breathable for all-day comfort",
    "Short length for easy styling and low maintenance",
    "Modern, flattering shape for everyday wear",
  ],

  care: [
    "Wash gently every 10–15 wears with mild shampoo",
    "Scrunch lightly and air dry to maintain waves",
    "Avoid excessive heat to preserve texture",
  ],

  description: `A stylish short wavy wig designed for effortless volume, comfort, and a natural finish. Perfect for everyday confidence with minimal styling.`,
  },
  {
    id: "product-7",
    slug: "long-wavy-wig",
    name: 'long wavy wig',
    price: 180,
    length: '22"',
    texture: "wavy",
    capType: "Frontal",
    badge: "Limited",
    colors: ["#201f1f", "#4a2d2d"],
    image: "/img/wavy-hair.jpeg",
    category:"lace",
    inStock: true,
    pageDescription: `The Long Wavy Wig features flowing waves and a soft, natural texture for an elegant, feminine look. Designed for realistic movement and comfortable wear, this wig adds volume and length while remaining easy to style for everyday or special occasions.`,

  highlights: [
    "Long length with soft, natural waves",
    "Full-bodied movement with realistic texture",
    "Comfortable fit suitable for extended wear",
    "Versatile styling for casual or elegant looks",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Detangle carefully and air dry to maintain waves",
    "Use heat tools sparingly with heat protectant",
  ],

  description: `A graceful long wavy wig designed to enhance your look with volume, length, and natural movement. Perfect for everyday wear or special occasions.`,
  },
  {
  id: "product-11",
  slug: "balayage-human-hair-wig",
  name: "Balayage Human Hair Wig",
  price: 250,
  length: ['20"', '22"', '24"', '26"'],
  texture: "loose wave",
  capType: "HD Lace",
  badge: "Premium",
  colors: ["#3b2a1a", "#d2a679"],
  images: ["/img/product-11-sandy.png","/img/product-11-dark-brown.png",],
    colorImages: {
      "#d2a679" : "/img/product-11-sandy.png",
      "#3b2a1a" :"/img/product-11-dark-brown.png",
       
    },
  category: "human",
  inStock: true,
  pageDescription: `The Balayage Human Hair Wig features a beautifully blended color transition that mimics natural sun-kissed hair. Made from premium human hair, this wig delivers soft movement, realistic depth, and a natural finish for effortless, modern styling.`,

  highlights: [
    "Natural-looking balayage color blend",
    "Premium human hair with soft, realistic movement",
    "Dimensional tones for a sun-kissed effect",
    "Versatile styling for everyday or elevated looks",
  ],

  care: [
    "Wash gently every 10–12 wears with color-safe shampoo",
    "Use moisturizing conditioner to maintain softness",
    "Style with heat tools on low settings using protectant",
  ],

  description: `A premium balayage human hair wig designed for natural dimension, soft texture, and effortless elegance. Perfect for a modern, polished look.`,
},
  {
    id: "product-8",
    slug: "short-red-wig",
    name: 'red frontal wig',
    price: 180,
    length: '22"',
    texture: "Straight",
    capType: "Frontal",
    badge: "Limited",
    colors: ["#201f1f", "#4a2d2d"],
    image: "/img/red-straight.jpeg",
    category: "human",
    inStock: true,
    pageDescription: `The Red Frontal Wig delivers a vibrant, head-turning shade with a natural-looking lace frontal for a seamless hairline. Designed for confident styling, this wig combines rich color, soft texture, and realistic movement for standout everyday or glam looks.`,

  highlights: [
    "Bold red shade with rich, even color",
    "Lace frontal for a natural, realistic hairline",
    "Soft texture with natural movement",
    "Perfect for statement styles and special occasions",
  ],

  care: [
    "Wash gently every 10–12 wears with color-safe shampoo",
    "Avoid excessive washing to preserve color vibrancy",
    "Use heat tools on low settings with protectant",
  ],

  description: `A striking red frontal wig designed for confident expression, natural blending, and bold, beautiful styling. Ideal for making a statement with a flawless finish.`,
  },
  {
    id: "product-2",
    slug: "short-wavy-wig-2",
    name: 'frontal wavy wig 2',
    price: 180,
    length: '22"',
    texture: "wavy",
    capType: "Frontal",
    badge: "Limited",
    colors: ["#201f1f", "#4a2d2d"],
    image: "/img/product_2_black.png",
    images: ["/img/product_2_chocolate.png","/img/product_2_honey.png"],
    colorImages: {
      "#4a2d2d":"/img/product_2_chocolate.png",
      "#201f1f" :"/img/product_2_black.png"
    },
    category: "lace",
    inStock: true,
    pageDescription: `The Frontal Wavy Wig features soft, flowing waves combined with a natural-looking lace frontal for a seamless hairline. Designed for realistic movement and comfortable wear, this wig delivers effortless volume and a polished, feminine look.`,

  highlights: [
    "Soft wavy texture with natural movement",
    "Lace frontal for a realistic, face-framing hairline",
    "Lightweight feel suitable for everyday wear",
    "Easy to style for casual or elegant looks",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Scrunch lightly and air dry to maintain wave pattern",
    "Use heat tools sparingly with heat protectant",
  ],

  description: `A versatile frontal wavy wig designed for natural volume, softness, and a flawless hairline. Perfect for everyday confidence or special occasions.`,
  },
  
{
  id: "product-22",
  slug: "hd-lace-body-wave-wig",
  name: "HD Lace Body Wave Human Hair Wig",
  price: 260,
  length: ['20"', '22"', '24"', '26"'],
  texture: "body wave",
  capType: "HD Lace",
  badge: "Premium",
  colors: ["#201f1f", "#4a2d2d", "#d2a679"],
  images: ["/img/product-22-black.png","/img/product-22-cafe.png","/img/product-22-sandy.png","/img/product-22.png"],
    colorImages: {
      "#201f1f" :"/img/product-22.png",
      "#4a2d2d" : "/img/product-22-cafe.png",
      "#d2a679" : "/img/product-22-sandy.png"
    },
  category: "human",
  inStock: true,
  pageDescription: `The HD Lace Body Wave Human Hair Wig features ultra-thin HD lace that melts into the scalp for an undetectable hairline. Crafted from premium human hair, the soft body wave texture delivers natural volume, bounce, and effortless elegance for everyday or glam wear.`,

  highlights: [
    "Ultra-thin HD lace for a seamless, natural hairline",
    "Soft body wave texture with natural bounce",
    "Premium human hair for realistic movement",
    "Comfortable fit ideal for daily or special occasions",
  ],

  care: [
    "Wash gently every 10–12 wears with sulfate-free shampoo",
    "Detangle carefully and air dry to maintain wave pattern",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A premium HD lace body wave human hair wig designed for flawless blending, natural volume, and long-lasting wear. Perfect for a polished, luxurious look.`,
},
{
  id: "product-21",
  slug: "curly-human-hair-wig",
  name: "Curly Human Hair Wig",
  price: 210,
  length: ['18"', '20"', '22"', '24"'],
  texture: "curly",
  capType: "Lace Front",
  badge: "Popular",
  colors: ["#201f1f", "#3a2a24"],
  images: ["/img/product-21-black.png","/img/product-21-choc.png",],
    colorImages: {
      "#201f1f" :"/img/product-21-black.png",
      "#3a2a24" : "/img/product-21-choc.png",
    },
  category: "human",
  inStock: true,
  pageDescription: `The Curly Human Hair Wig features beautifully defined curls with natural bounce and movement. Made from premium human hair, this wig delivers a realistic texture, full volume, and a soft feel for confident everyday or special-occasion styling.`,

  highlights: [
    "Defined curly texture with natural bounce",
    "Premium human hair for realistic movement",
    "Full volume with a soft, touchable feel",
    "Comfortable fit suitable for daily wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Apply curl-enhancing products to maintain definition",
    "Air dry or diffuse on low heat to preserve curls",
  ],

  description: `A premium curly human hair wig designed for natural texture, volume, and long-lasting definition. Perfect for bold, confident styling with a realistic finish.`,
},
{
  id: "product-20",
  slug: "deep-wave-human-hair-wig",
  name: "Deep Wave Human Hair Wig",
  price: 230,
  length: ['20"', '22"', '24"', '26"'],
  texture: "deep wave",
  capType: "Frontal",
  badge: "Hot",
  colors: ["#201f1f", "#4b3621"],
  images: ["/img/product-20-cafe.png","/img/product-20-black.png",],
    colorImages: {
      "#201f1f" :"/img/product-20-black.png",
      "#4a2d2d" : "/img/product-20-cafe.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The Deep Wave Human Hair Wig features rich, defined waves with deep texture for a full, luxurious look. Made from premium human hair, this wig offers natural shine, soft movement, and long-lasting wave definition for everyday wear or statement styling.`,

  highlights: [
    "Deep, defined wave pattern with natural texture",
    "Premium human hair for realistic movement and shine",
    "Full-bodied volume with soft, touchable feel",
    "Ideal for everyday wear or elevated looks",
  ],

  care: [
    "Wash gently every 10–12 wears with sulfate-free shampoo",
    "Use curl or wave-enhancing products to maintain definition",
    "Air dry or diffuse on low heat for best results",
  ],

  description: `A luxurious deep wave human hair wig designed for bold texture, natural movement, and long-lasting definition. Perfect for confident, high-impact styling.`,
},
{
  id: "product-19",
  slug: "loose-wave-human-hair-wig",
  name: "Loose Wave Human Hair Wig",
  price: 225,
  length: ['18"', '20"', '22"', '24"'],
  texture: "loose wave",
  capType: "Lace Front",
  badge: "",
  colors: ["#201f1f", "#5a3a2e"],
  images: ["/img/product-19-black.png","/img/product-19.png","/img/product-19-cafe.png","/img/product-19-back.png",],
    colorImages: {
      "#201f1f" :"/img/product-19.png",
      "#5a3a2e" : "/img/product-19-cafe.png", 
    },
  category: "human", 
  inStock: true,
  pageDescription: `The Loose Wave Human Hair Wig features soft, flowing waves with a natural, relaxed texture. Made from premium human hair, this wig offers effortless movement, lightweight volume, and a realistic finish perfect for everyday or elevated styling.`,

  highlights: [
    "Soft loose wave pattern with natural flow",
    "Premium human hair for realistic movement",
    "Lightweight volume with a relaxed texture",
    "Versatile style suitable for daily or special wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Scrunch lightly and air dry to maintain wave pattern",
    "Use heat tools sparingly with protectant",
  ],

  description: `A premium loose wave human hair wig designed for soft texture, natural movement, and effortless elegance. Perfect for a relaxed yet polished look.`,
},
{
  id: "product-18",
  slug: "bob-cut-human-hair-wig",
  name: "Bob Cut Human Hair Wig",
  price: 170,
  length: ['10"', '12"', '14"'],
  texture: "straight",
  capType: "Frontal",
  badge: "New",
  colors: ["#201f1f", "#c68642"],
  images: ["/img/product-18-black.png","/img/product-18.png","/img/product-18-peru.png",],
    colorImages: {
      "#201f1f" :"/img/product-18-black.png",
      "#c68642" : "/img/product-18-peru.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The Bob Cut Human Hair Wig delivers a sleek, timeless silhouette with natural movement and a polished finish. Crafted from premium human hair, this wig offers a flattering shape, lightweight comfort, and effortless styling for everyday elegance.`,

  highlights: [
    "Classic bob cut with clean, modern shape",
    "Premium human hair for smooth, realistic movement",
    "Lightweight and comfortable for daily wear",
    "Low-maintenance style with versatile appeal",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry or blow-dry on low heat for a smooth finish",
    "Use heat tools sparingly with heat protectant",
  ],

  description: `A sophisticated bob cut human hair wig designed for a clean, polished look with minimal effort. Perfect for everyday wear, professional settings, and timeless style.`,
},
{
  id: "product-9",
  slug: "blunt-bob-human-hair-wig",
  name: "Blunt Bob Human Hair Wig",
  price: 180,
  length: ['12"', '14"'],
  texture: "straight",
  capType: "Lace Front",
  badge: "Trending",
  colors: ["#201f1f", "#e6be8a"],
  images: ["/img/product-9-black.png","/img/product-9-peru.png",],
    colorImages: {
      "#201f1f" :"/img/product-9-black.png",
      "#e6be8a" : "/img/product-9-peru.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The Blunt Bob Human Hair Wig features a sharp, clean-cut silhouette with straight edges for a bold, modern look. Made from premium human hair, this wig delivers sleek movement, natural shine, and a polished finish that elevates everyday styling.`,

  highlights: [
    "Precision blunt cut with clean, straight edges",
    "Premium human hair for sleek, natural movement",
    "Smooth texture with a modern, confident look",
    "Easy to style and maintain",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Blow-dry or flat iron on low heat for a smooth finish",
    "Use heat protectant to maintain hair quality",
  ],

  description: `A bold blunt bob human hair wig designed for a sleek, structured look with natural shine and movement. Perfect for confident, fashion-forward styling.`,
},
{
  id: "product-10",
  slug: "highlight-human-hair-wig",
  name: "Highlight Human Hair Wig",
  price: 240,
  length: ['20"', '22"', '24"'],
  texture: "body wave",
  capType: "Lace Front",
  badge: "Luxury",
  colors: ["#201f1f", "#c68642", "#f1d4a3"],
  images: ["/img/product-10-black.png","/img/product-10-peru.png","/img/product-10-sandy.png"],
    colorImages: {
      "#201f1f" :"/img/product-10-black.png",
      "#e6be8a" : "/img/product-10-peru.png",
      "#f1d4a3" : "/img/product-10-sandy.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The Highlight Human Hair Wig features expertly blended lighter tones that add depth and dimension for a natural, sun-kissed look. Made from premium human hair, this wig delivers soft movement, realistic texture, and effortless everyday elegance.`,

  highlights: [
    "Natural-looking highlights for added dimension",
    "Premium human hair with soft, realistic movement",
    "Blended tones for a sun-kissed finish",
    "Versatile style suitable for daily or special wear",
  ],

  care: [
    "Wash gently every 10–12 wears with color-safe shampoo",
    "Use moisturizing conditioner to maintain softness",
    "Style on low heat with protectant to preserve color",
  ],

  description: `A premium highlight human hair wig designed to enhance your look with natural depth, shine, and effortless sophistication.`,
},
{
    id: "product-4",
    slug: "deep-wave-18",
    name: 'frontal deep wave',
    price: 145,
    length: '18"',
    texture: "Deep wave",
    capType: "Frontal",
    badge: "New",
    colors: ["#2b1a0f", "#5a3b24"],
    image: "/img/deep-wave.jpeg",
    category: "human",
    inStock: true,
    pageDescription: `The Frontal Deep Wave Wig features a rich, defined wave pattern paired with a natural-looking lace frontal for a seamless hairline. Designed for bold texture and realistic movement, this wig delivers volume, shine, and confident styling for everyday or statement looks.`,

  highlights: [
    "Deep, defined wave texture with natural bounce",
    "Lace frontal for a realistic, undetectable hairline",
    "Soft feel with full, luxurious volume",
    "Ideal for everyday wear or standout occasions",
  ],

  care: [
    "Wash gently every 10–12 wears with sulfate-free shampoo",
    "Use wave-enhancing products to maintain definition",
    "Air dry or diffuse on low heat with protectant",
  ],

  description: `A premium frontal deep wave wig designed for bold texture, natural blending, and long-lasting definition. Perfect for confident, high-impact styling.`,
  },

{
  id: "product-12",
  slug: "pixie-cut-human-hair-wig",
  name: "Pixie Cut Human Hair Wig",
  price: 150,
  length: ['6"', '8"'],
  texture: "straight",
  capType: "Full Cap",
  badge: "",
  colors: ["#201f1f", "#4a2d2d"],
  images: ["/img/product-12-choc.png","/img/product-12-black.png",],
    colorImages: {
      "#4a2d2d" : "/img/product-12-choc.png",
      "#201f1f" :"/img/product-12-black.png",
       
    },
  category: "human",
  inStock: true,
  pageDescription: `The Pixie Cut Human Hair Wig delivers a chic, modern look with a short, textured silhouette that highlights facial features. Made from premium human hair, this wig offers lightweight comfort, natural movement, and effortless styling for confident everyday wear.`,

  highlights: [
    "Stylish pixie cut with modern, flattering shape",
    "Premium human hair for realistic texture and movement",
    "Lightweight and breathable for all-day comfort",
    "Low-maintenance style with bold appeal",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Use light styling products to define texture",
    "Air dry or style on low heat with protectant",
  ],

  description: `A sleek pixie cut human hair wig designed for effortless confidence, comfort, and a bold, modern look. Perfect for everyday wear with minimal styling.`,
},
{
  id: "product-13",
  slug: "glueless-human-hair-wig",
  name: "Glueless Human Hair Wig",
  price: 260,
  length: ['20"', '22"', '24"'],
  texture: "body wave",
  capType: "Glueless",
  badge: "Comfort",
  colors: ["#201f1f", "#3a2a24"],
  images: ["/img/product-13-black.png","/img/product-13-brown.png",],
    colorImages: {
      "#201f1f" :"/img/product-13-black.png",
      "#3a2a24" : "/img/product-13-brown.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The Glueless Human Hair Wig is designed for effortless wear without the need for glue or adhesive. Made from premium human hair, this wig offers a secure fit, natural appearance, and all-day comfort, making it perfect for beginners and everyday use.`,

  highlights: [
    "Glueless design for easy, secure wear",
    "Premium human hair with natural movement",
    "Comfortable fit without adhesives",
    "Ideal for beginners and daily styling",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to maintain shape",
    "Use heat tools on low settings with protectant",
  ],

  description: `A premium glueless human hair wig designed for convenience, comfort, and a natural look. Perfect for quick styling and stress-free everyday wear.`,
},
{
  id: "product-14",
  slug: "360-lace-human-hair-wig",
  name: "360 Lace Human Hair Wig",
  price: 280,
  length: ['22"', '24"', '26"'],
  texture: "straight",
  capType: "360 Lace",
  badge: "Pro",
  colors: ["#201f1f", "#4b3621"],
  images: ["/img/product-14-black.png","/img/product-14-brown.png",],
    colorImages: {
      "#201f1f" :"/img/product-14-black.png",
      "#4b3621" : "/img/product-14-brown.png", 
    },
  category: "human",
  inStock: true,
  pageDescription: `The 360 Lace Human Hair Wig features lace around the entire perimeter for a natural hairline and versatile styling options. Crafted from premium human hair, this wig allows high ponytails, updos, and parting freedom while maintaining a realistic, seamless look.`,

  highlights: [
    "360 lace construction for full perimeter hairline",
    "Premium human hair with natural movement",
    "Allows versatile styling including updos and ponytails",
    "Secure and comfortable fit for all-day wear",
  ],

  care: [
    "Wash gently every 10–12 wears with sulfate-free shampoo",
    "Tie hair loosely or place on a wig stand when not in use",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A premium 360 lace human hair wig designed for complete styling flexibility, natural blending, and long-lasting comfort. Perfect for versatile, polished looks.`,
},
{
  id: "product-15",
  slug: "u-part-human-hair-wig",
  name: "U-Part Human Hair Wig",
  price: 200,
  length: ['18"', '20"', '22"', '24"'],
  texture: "straight",
  capType: "U-Part",
  badge: "",
  colors: ["#201f1f", "#3b2a1a"],
  images: ["/img/product-15-black.png","/img/product-15-brown.png",],
    colorImages: {
      "#3a2a24" : "/img/product-15-brown.png",
      "#201f1f" :"/img/product-15-black.png",
       
    },
  category: "human",
  inStock: true,
  pageDescription: `The U-Part Human Hair Wig features a U-shaped opening that allows you to blend your natural hair seamlessly with the wig for a realistic finish. Made from premium human hair, this wig offers breathable comfort, natural movement, and easy styling without lace or glue.`,

  highlights: [
    "U-part opening for natural hair blend",
    "Premium human hair with realistic movement",
    "No lace or glue required",
    "Breathable and comfortable for everyday wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Moisturize and care for your leave-out hair regularly",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A practical U-part human hair wig designed for seamless blending, comfort, and natural styling. Perfect for achieving a realistic look with minimal effort.`,
},
{
  id: "product-16",
  slug: "hd-lace-curly-human-hair-wig",
  name: "HD Lace Curly Human Hair Wig",
  price: 270,
  length: ['20"', '22"', '24"'],
  texture: "curly",
  capType: "HD Lace",
  badge: "Top Rated",
  colors: ["#201f1f", "#4a2d2d"],
  images: ["/img/product-16-black.png","/img/product-16-brown.png",],
    colorImages: {
      "#3a2a24" : "/img/product-16-brown.png",
      "#201f1f" :"/img/product-16-black.png",   
    },
  category: "human",
  inStock: true,
  pageDescription: `The HD Lace Curly Human Hair Wig features ultra-thin HD lace that melts seamlessly into the scalp for an undetectable hairline. Crafted from premium human hair, the defined curly texture delivers natural bounce, volume, and realistic movement for confident everyday or glam styling.`,

  highlights: [
    "Ultra-thin HD lace for a flawless, natural hairline",
    "Defined curly texture with natural bounce",
    "Premium human hair for realistic movement and softness",
    "Comfortable fit suitable for daily or special occasions",
  ],

  care: [
    "Wash gently every 10–12 wears with sulfate-free shampoo",
    "Apply curl-enhancing products to maintain definition",
    "Air dry or diffuse on low heat to preserve curls",
  ],

  description: `A premium HD lace curly human hair wig designed for seamless blending, natural curl definition, and long-lasting comfort. Perfect for bold, beautiful styling with a realistic finish.`,
},
{
  id: "product-26",
  slug: "mono-top-wig",
  name: "Monofilament Top Wig",
  price: 260,
  length: ['18"', '20"', '22"', '24"'],
  texture: "straight",
  capType: "Monofilament Top",
  badge: "Best Seller",
  colors: ["#201f1f","#3b2a1a", "#c68642"],
  images: ["/img/product-26-black.png","/img/product-26-choc.png","/img/product-26-sandy.png"],
    colorImages: {
      "#c68642" : "/img/product-26-sandy.png",
      "#201f1f" :"/img/product-26-black.png",
      "#3b2a1a" : "/img/product-26-choc.png", 
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Monofilament Top Wig features a finely crafted monofilament top that creates the appearance of natural hair growth at the scalp. Designed for comfort and realism, this wig allows flexible parting and delivers a lightweight, breathable feel for everyday wear.`,

  highlights: [
    "Monofilament top for natural scalp appearance",
    "Allows natural-looking parting and styling",
    "Lightweight and breathable construction",
    "Comfortable fit suitable for daily wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to maintain shape",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A realistic monofilament top wig designed for natural appearance, comfort, and easy everyday styling. Ideal for those seeking a lifelike look with minimal effort.`,
},
{
  id: "product-27",
  slug: "mono-lace-front-wig",
  name: "Monofilament Lace Front Wig",
  price: 290,
  length: ['20"', '22"', '24"'],
  texture: "body wave",
  capType: "Mono + Lace Front",
  badge: "Natural Look",
  colors: ["#201f1f", "#4a2d2d"],
  images: ["/img/product-27-black.png","/img/product-27-choc.png",],
    colorImages: {
      "#4a2d2d" : "/img/product-27-choc.png",
      "#201f1f" :"/img/product-27-black.png",   
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Monofilament Lace Front Wig combines a realistic monofilament top with a natural-looking lace front for a seamless scalp and hairline appearance. Designed for comfort and styling flexibility, this wig offers breathable wear and lifelike movement for everyday confidence.`,

  highlights: [
    "Monofilament top for natural scalp illusion",
    "Lace front for a seamless, realistic hairline",
    "Flexible parting with natural movement",
    "Comfortable and breathable for daily wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to preserve cap structure",
    "Style on low heat with heat protectant as needed",
  ],

  description: `A premium monofilament lace front wig designed for natural blending, comfort, and styling versatility. Perfect for achieving a realistic, polished look.`,
},
{
  id: "product-28",
  slug: "full-monofilament-wig",
  name: "Full Monofilament Wig",
  price: 340,
  length: ['18"', '20"', '22"'],
  texture: "straight",
  capType: "Full Monofilament",
  badge: "Luxury",
  colors: ["#201f1f", "#3a2a24"],
  images: ["/img/product-28-black.png","/img/product-28-choc.png",],
    colorImages: {
      "#3a2a24" : "/img/product-28.png",
      "#3a2a24" : "/img/product-28-choc.png",
      "#201f1f" :"/img/product-28-black.png",   
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Full Monofilament Wig features a complete monofilament cap that creates the illusion of natural hair growth across the entire scalp. Designed for ultimate realism and comfort, this wig allows multi-directional parting, lightweight wear, and a breathable feel ideal for daily use.`,

  highlights: [
    "Full monofilament cap for maximum scalp realism",
    "Multi-directional parting for styling flexibility",
    "Lightweight and breathable for all-day comfort",
    "Ideal for sensitive scalps and daily wear",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to maintain cap shape",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A premium full monofilament wig designed for lifelike appearance, exceptional comfort, and versatile styling. Perfect for those seeking the most natural wig experience.`,
},
{
  id: "product-29",
  slug: "mono-crown-wig",
  name: "Monofilament Crown Wig",
  price: 220,
  length: ['14"', '16"', '18"'],
  texture: "straight",
  capType: "Mono Crown",
  badge: "Comfort",
  colors: ["#201f1f", "#4b3621"],
  images: ["/img/product-29-black.png","/img/product-29-cafe.png",],
    colorImages: {
      "#4b3621" : "/img/product-29-cafe.png",
      "#201f1f" :"/img/product-29-black.png",   
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Monofilament Crown Wig features a finely constructed monofilament crown that creates a natural-looking part and scalp appearance at the top of the head. Designed for lightweight comfort and everyday wear, this wig delivers realistic movement with a breathable fit.`,

  highlights: [
    "Monofilament crown for natural scalp appearance",
    "Lightweight construction for comfortable daily wear",
    "Natural-looking part with realistic movement",
    "Easy to style and maintain",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to preserve shape",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A comfortable monofilament crown wig designed for realistic parting, lightweight wear, and effortless everyday styling. Ideal for a natural, polished look.`,
},

{
  id: "product-24",
  slug: "hand-tied-mono-wig",
  name: "Hand-Tied Monofilament Wig",
  price: 360,
  length: ['18"', '20"', '22"'],
  texture: "body wave",
  capType: "Hand-Tied Monofilament",
  badge: "Premium",
  colors: ["#201f1f", "#3b2a1a"],
  images: ["/img/product-24-black.png","/img/product-24-cafe.png",],
    colorImages: {
      "#201f1f" :"/img/product-24-black.png",
      "#3b2a1a" : "/img/product-24-cafe.png",    
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Hand-Tied Monofilament Wig is crafted with individually hand-tied strands and a monofilament top to create the illusion of natural hair growth. Designed for ultimate comfort and realism, this wig offers lightweight wear, natural movement, and flexible styling for everyday confidence.`,

  highlights: [
    "Individually hand-tied construction for natural movement",
    "Monofilament top for realistic scalp appearance",
    "Lightweight and breathable for sensitive scalps",
    "Flexible parting with all-day comfort",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Air dry on a wig stand to maintain cap shape",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A premium hand-tied monofilament wig designed for lifelike appearance, exceptional comfort, and effortless styling. Ideal for those seeking the most natural wig experience.`,
},
{
  id: "product-25",
  slug: "mono-top-wefted-wig",
  name: "Monofilament Top Wefted Wig",
  price: 240,
  length: ['18"', '20"', '22"'],
  texture: "straight",
  capType: "Mono Top + Wefted",
  badge: "Value Pick",
  colors: ["#201f1f", "#c68642"],
  images: ["/img/product-25-black.png","/img/product-25-peru.png",],
    colorImages: {
      "#201f1f" :"/img/product-25-black.png",
      "#c68642" : "/img/product-25-peru.png",    
    },
  category: "monofilament",
  inStock: true,
  pageDescription: `The Monofilament Top Wefted Wig is designed for a natural scalp appearance with breathable comfort. The monofilament top creates the illusion of natural hair growth, while the wefted back provides volume, durability, and an easy everyday fit. Ideal for women looking for realism without the cost of a fully hand-tied wig.`,

  highlights: [
    "Natural-looking monofilament top for realistic parting",
    "Wefted construction for lightweight volume and airflow",
    "Comfortable fit suitable for daily wear",
    "Easy to style and maintain",
  ],

  care: [
    "Wash gently every 10–15 wears with sulfate-free shampoo",
    "Allow to air dry on a wig stand to maintain shape",
    "Use heat tools on low settings with heat protectant",
  ],

  description: `A versatile monofilament top wefted wig that combines a realistic scalp look with comfort and durability. Perfect for everyday styling, long wear, and natural movement.`,
}

];
