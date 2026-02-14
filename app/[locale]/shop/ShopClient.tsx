"use client";

import Head from "next/head";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { products, type Product } from "@/app/data/products";
import ProductGrid from "@/app/components/ProductGrid";

type Filter = "all" | "lace" | "human" | "monofilament" | "stock";
type Sort = "default" | "price-asc" | "price-desc";

type Props = {
  initialFilter?: string; // used by /shop/[category]
};

const isFilter = (v: string | null): v is Filter =>
  v === "all" || v === "lace" || v === "human" || v === "monofilament" || v === "stock";

const isSort = (v: string | null): v is Sort =>
  v === "default" || v === "price-asc" || v === "price-desc";

export default function ShopClient({ initialFilter }: Props) {
  const t = useTranslations("shop");
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlFilterRaw = searchParams.get("filter");
  const urlSortRaw = searchParams.get("sort");

  const filter: Filter = isFilter(urlFilterRaw)
    ? urlFilterRaw
    : isFilter(initialFilter ?? null)
    ? (initialFilter as Filter)
    : "all";

  const sort: Sort = isSort(urlSortRaw) ? urlSortRaw : "default";

  const setParam = (key: "filter" | "sort", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // if user chooses defaults, keep URL clean
    if (key === "filter") {
      if (value === "all") params.delete("filter");
      else params.set("filter", value);
    }

    if (key === "sort") {
      if (value === "default") params.delete("sort");
      else params.set("sort", value);
    }

    const qs = params.toString();
    router.push(qs ? `?${qs}` : "?");
  };

  const clearAll = () => {
    router.push("?");
  };

  const filtered: Product[] = useMemo(() => {
    let list = [...products];

    // Filtering
    if (filter === "lace") list = list.filter((p) => p.category === "lace");
    if (filter === "human") list = list.filter((p) => p.category === "human");
    if (filter === "monofilament") list = list.filter((p) => p.category === "monofilament");
    if (filter === "stock") list = list.filter((p) => p.inStock);

    // Sorting
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [filter, sort]);

  const isQueryState = filter !== "all" || sort !== "default";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* SEO: prevent duplicate indexing of filter/sort query URLs */}
      {isQueryState ? (
        <Head>
          <meta name="robots" content="noindex,follow" />
          <link rel="canonical" href="https://confida.shop/shop" />
        </Head>
      ) : null}

      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#363434]">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm font-semibold text-[#363434]/70">
            Premium lace, human hair & monofilament wigs.
          </p>

          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-extrabold text-[#363434] shadow-sm">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Sort + Clear */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-[#363434]/80">
             {t.has("sort") ? t("sort") : "Sort"}
             </label>

            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#dda0dd]/40"
            >
             <option value="default">{t.has("default") ? t("default") : "Default"}</option>
<option value="price-asc">{t.has("lowHigh") ? t("lowHigh") : "Price: Low to High"}</option>
<option value="price-desc">{t.has("highLow") ? t("highLow") : "Price: High to Low"}</option>

            </select>
          </div>

          {isQueryState ? (
            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        {[
          { key: "all", label: t("all") },
          { key: "human", label: "Human Hair" },
          { key: "lace", label: "Lace Front" },
          { key: "monofilament", label: "Monofilament" },
          { key: "stock", label: t("stock") },
        ].map((item) => {
          const active = filter === (item.key as Filter);
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setParam("filter", item.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-extrabold transition",
                active
                  ? "bg-[#dda0dd] text-black shadow-lg shadow-[#dda0dd]/20"
                  : "border border-black/10 bg-white text-[#363434] hover:-translate-y-0.5 hover:shadow-md",
              ].join(" ")}
              aria-pressed={active}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}
