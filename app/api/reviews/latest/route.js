import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs"; // keep it simple

export async function GET() {
  try {
    const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!url) {
      return NextResponse.json(
        { error: "Missing POSTGRES_URL (or DATABASE_URL) env var" },
        { status: 500 }
      );
    }

    const sql = neon(url);

    const rows = await sql`
      SELECT id, product_id, name, rating, comment, created_at
      FROM reviews
      ORDER BY created_at DESC
      LIMIT 6
    `;

    return NextResponse.json({ reviews: rows });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to load reviews", details: String(e) },
      { status: 500 }
    );
  }
}
