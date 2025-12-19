import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  const rows = await sql`
    select id, name, rating, comment, created_at
    from reviews
    where product_id = ${productId}
    order by created_at desc
  `;

  return NextResponse.json({ ok: true, reviews: rows });
}

export async function POST(req) {
  try {
    const { productId, name, rating, comment } = await req.json();

    const cleanName = String(name || "").trim();
    const cleanComment = String(comment || "").trim();
    const r = Number(rating);

    if (!productId || !cleanName || !cleanComment || !Number.isFinite(r)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (r < 1 || r > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }

    await sql`
      insert into reviews (product_id, name, rating, comment)
      values (${productId}, ${cleanName}, ${r}, ${cleanComment})
    `;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error", details: String(e) }, { status: 500 });
  }
}

