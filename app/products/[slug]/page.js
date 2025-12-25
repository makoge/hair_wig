import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import Lightbox from "@/app/components/Lightbox";
import Reviews from "@/app/components/Reviews";
import RelatedProducts from "@/app/components/RelatedProducts";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";

export async function generateMetadata({ params }) {
  const p = params?.then ? await params : params;
  const slug = p?.slug;

  const product = products.find((x) => x.slug === slug);
  if (!product) return {};

  const title = `${product.name} | Confida Hair`;
  const description =
    product.seoDescription ||
    `${product.name} by Confida Hair. Premium quality, natural look, comfortable fit. Fast delivery in Europe.`;

  const images = (product.images?.length ? product.images : [product.image])
    .filter(Boolean)
    .map((src) => ({ url: src }));

  return {
    title,
    description,
   alternates: { canonical: `https://confida.shop/products/${product.slug}` },

    openGraph: {
      title,
      description,
      type: "website",
      url: `/products/${product.slug}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images[0]?.url ? [images[0].url] : [],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const p = params?.then ? await params : params;
  const slug = p?.slug;

  const product = products.find((x) => x.slug === slug);
  if (!product) return notFound();

  const imgs = product.images?.length ? product.images : [product.image];
  const price = Number(product.price || 0);

  // ✅ Product JSON-LD (Google loves this)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: imgs,
    sku: String(product.id),
    brand: { "@type": "Brand", name: "Confida Hair" },
    description:
      product.seoDescription ||
      `Buy ${product.name} from Confida Hair. Premium hair, natural look, comfortable fit, easy styling.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://confida.shop/products/${product.slug}`, 
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",

  shippingDetails: [
    {
      "@type": "OfferShippingDetails",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: [
          "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
          "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"
        ],
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "d",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 2,
          maxValue: 7,
          unitCode: "d",
        },
      },
    },
  ],

  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    // set this to what you actually do:
    returnFees: "https://schema.org/FreeReturn",
  },
    },
  };

  return (
    <main className="pd-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pd-grid">
        <div>
          <Lightbox images={imgs} />
        </div>
  <div className="pd-det">
  <h2>Product details</h2>

  <p>
    {product.pageDescription ||
      `${product.name} by Confida Hair. Designed for a natural scalp appearance, comfortable daily wear, and effortless styling. Ideal for anyone looking for a realistic, premium wig.`}
  </p>

  {!!product.highlights?.length && (
    <>
      <h3>Key features</h3>
      <ul>
        {product.highlights.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </>
  )}

  {!!product.care?.length && (
    <>
      <h3>Care instructions</h3>
      <ul>
        {product.care.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </>
  )}
</div>


        <div className="pd-info">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-price">€{price.toFixed(2)}</div>

          <div className="pd-meta">
            {product.length && <span>{product.length}</span>}
            {product.texture && <span>• {product.texture}</span>}
            {product.capType && <span>• {product.capType}</span>}
            <span className={`pd-stock ${product.inStock ? "ok" : ""}`}>
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <ProductDetailsClient product={product} />

          <div className="pd-desc">
            <h2>Product description</h2>
            <p>
              {product.description ||
                `Premium quality hair with a natural finish. Comfortable cap, easy styling, and long-lasting wear. Perfect for everyday confidence.`}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Customer reviews">
        <Reviews product={product} />
      </section>

      <section aria-label="Related products">
        <RelatedProducts current={product} products={products} />
      </section>
    </main>
  );
}
