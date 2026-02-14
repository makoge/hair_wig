import { NextResponse, type NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const revalidate = 0;

type ReviewRow = {
  id: string | number;
  name: string;
  rating: number;
  comment: string;
  created_at: string | null;
};

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  return neon(url);
}

function cleanText(v: unknown, max: number) {
  return String(v ?? "").replace(/\0/g, "").trim().slice(0, max);
}

function clampRating(v: unknown) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return NaN;
  return Math.max(1, Math.min(5, n));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = cleanText(searchParams.get("productId"), 80);

    if (!productId) {
      return NextResponse.json({ ok: false, error: "Missing productId" }, { status: 400 });
    }

    const sql = getSql();

    const rows = await sql`
      SELECT id, product_id, name, rating, comment, created_at
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ ok: true, reviews: rows });
  } catch (e) {
    console.error("GET /api/reviews failed:", e);
    return NextResponse.json({ ok: false, error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      productId?: unknown;
      name?: unknown;
      rating?: unknown;
      comment?: unknown;
      website?: unknown; // optional honeypot if you want it
    };

    // optional honeypot
    const website = cleanText(body.website, 200);
    if (website) return NextResponse.json({ ok: true });

    const productId = cleanText(body.productId, 80);
    const name = cleanText(body.name, 80);
    const comment = cleanText(body.comment, 2000);
    const rating = clampRating(body.rating);

    if (!productId || !name || !comment || !Number.isFinite(rating)) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ ok: false, error: "Rating must be 1-5" }, { status: 400 });
    }

    const sql = getSql();

    await sql`
      INSERT INTO reviews (product_id, name, rating, comment)
      VALUES (${productId}, ${name}, ${rating}, ${comment})
    `;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/reviews failed:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
