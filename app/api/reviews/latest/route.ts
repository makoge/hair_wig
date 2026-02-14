import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const revalidate = 60;

type ReviewRow = {
  id: string | number;
  product_id: string | number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export async function GET() {
  try {
    // Opinion: pick ONE env var and stick to it (less bugs)
    const url = process.env.DATABASE_URL;

    if (!url) {
      console.error("Missing DATABASE_URL in environment");
      return NextResponse.json(
        { ok: false, error: "Database not configured (missing DATABASE_URL)" },
        { status: 500 }
      );
    }

    const sql = neon(url);

    const rows = (await sql`
      SELECT id, product_id, name, rating, comment, created_at
      FROM reviews
      ORDER BY created_at DESC
      LIMIT 6
    `) as ReviewRow[];

    return NextResponse.json({ ok: true, reviews: rows });
  } catch (e) {
    console.error("Latest reviews error:", e);
    return NextResponse.json(
      { ok: false, error: "Failed to load latest reviews" },
      { status: 500 }
    );
  }
}
