import { NextResponse } from "next/server";
import { Resend } from "resend";
import { products } from "@/app/data/products";
import type { Product } from "@/app/data/products";

export const runtime = "nodejs";

type Customer = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  notes?: string;
  // optional anti-spam honeypot field:
  website?: string;
};

type ClientCartItem = {
  variantKey: string;
  qty: number;
  selectedColor?: string;
  product: Pick<Product, "id" | "name" | "price"> & { selectedColor?: string };
};

type Body = {
  customer?: Customer;
  items?: ClientCartItem[];
  totals?: {
    total?: number;
    cartCount?: number;
  };
};

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function money(n: number): string {
  return `€${(Number(n) || 0).toFixed(2)}`;
}

function findProduct(id: string): Product | undefined {
  return products.find((p) => String(p.id) === String(id));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const customer = body.customer;
    const items = body.items;

    if (!customer?.name?.trim() || !customer?.email?.trim()) {
      return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
    }

    if (!isEmail(customer.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // optional honeypot: if customer.website is filled, likely bot
    if (customer.website && customer.website.trim().length > 0) {
      return NextResponse.json({ error: "Spam rejected" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // sanitize + validate cart items and recalc totals from server product data
    const normalized = items
      .map((x) => {
        const qty = Math.max(1, Math.min(99, Math.floor(Number(x.qty || 0))));
        const productId = String(x.product?.id || "").trim();
        if (!productId) return null;

        const p = findProduct(productId);
        if (!p) return null;

        const selectedColor =
          (x.selectedColor || x.product?.selectedColor || "").trim();

        return {
          qty,
          selectedColor,
          product: p,
        };
      })
      .filter(Boolean) as Array<{ qty: number; selectedColor: string; product: Product }>;

    if (normalized.length === 0) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 });
    }

    const computedCount = normalized.reduce((sum, x) => sum + x.qty, 0);
    const computedTotal = normalized.reduce(
      (sum, x) => sum + x.qty * (Number(x.product.price) || 0),
      0
    );

    const orderId = `ORD-${Date.now()}`;

    const linesHtml = normalized
      .map((x) => {
        const color = x.selectedColor ? ` <span style="opacity:.7">(${esc(x.selectedColor)})</span>` : "";
        return `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;">
              <div style="font-weight:800;color:#111;">${esc(x.product.name)}${color}</div>
              <div style="font-size:12px;opacity:.75;">Qty: ${x.qty}</div>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;font-weight:800;color:#111;">
              ${money((Number(x.product.price) || 0) * x.qty)}
            </td>
          </tr>
        `;
      })
      .join("");

    const safeName = esc(customer.name.trim());
    const safeEmail = esc(customer.email.trim());

    const safePhone = esc((customer.phone || "-").trim());
    const safeAddress = esc((customer.address || "-").trim());
    const safeCity = esc((customer.city || "-").trim());
    const safeCountry = esc((customer.country || "-").trim());
    const safeNotes = esc((customer.notes || "-").trim());

    const totalStr = money(computedTotal);

    const brand = "#dda0dd";
    const ink = "#363434";

    const wrap = (content: string) => `
      <div style="background:#f1eded;padding:24px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eee;">
          <div style="padding:18px 22px;background:${ink};color:#fff;">
            <div style="font-weight:900;letter-spacing:.2px;">Confida</div>
            <div style="font-size:12px;opacity:.85;">confida.shop</div>
          </div>
          <div style="padding:22px;">
            ${content}
          </div>
          <div style="padding:18px 22px;background:#fafafa;border-top:1px solid #eee;font-size:12px;color:#666;">
            If you didn’t place this order, reply to this email.
          </div>
        </div>
      </div>
    `;

    const customerHtml = wrap(`
      <h2 style="margin:0 0 8px;color:#111;">Thanks, ${safeName} 💜</h2>
      <p style="margin:0 0 14px;color:#444;">We received your order and we’ll confirm delivery shortly.</p>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:0 0 14px;">
        <span style="display:inline-block;background:${brand};color:#111;padding:6px 10px;border-radius:999px;font-weight:800;">
          Order: ${esc(orderId)}
        </span>
        <span style="display:inline-block;background:#111;color:#fff;padding:6px 10px;border-radius:999px;font-weight:800;">
          Total: ${totalStr}
        </span>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        ${linesHtml}
        <tr>
          <td style="padding-top:12px;font-weight:900;color:#111;">Total</td>
          <td style="padding-top:12px;text-align:right;font-weight:900;color:#111;">${totalStr}</td>
        </tr>
      </table>
    `);

    const storeHtml = wrap(`
      <h2 style="margin:0 0 8px;color:#111;">New Confida order</h2>
      <p style="margin:0 0 14px;color:#444;">
        <b>Order ID:</b> ${esc(orderId)}<br/>
        <b>Customer:</b> ${safeName} (${safeEmail})
      </p>

      <p style="margin:0 0 14px;color:#444;">
        <b>Phone:</b> ${safePhone}<br/>
        <b>Address:</b> ${safeAddress}, ${safeCity}, ${safeCountry}<br/>
        <b>Notes:</b> ${safeNotes}
      </p>

      <table style="width:100%;border-collapse:collapse;">
        ${linesHtml}
        <tr>
          <td style="padding-top:12px;font-weight:900;color:#111;">Total</td>
          <td style="padding-top:12px;text-align:right;font-weight:900;color:#111;">${totalStr}</td>
        </tr>
      </table>

      <p style="margin:14px 0 0;color:#666;font-size:12px;">
        Cart count: ${computedCount}
      </p>
    `);

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL || "Confida <onboarding@resend.dev>";
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    if (!adminEmail) {
      return NextResponse.json({ error: "Missing ADMIN_EMAIL" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // store notification first (most important)
    const storeSend = await resend.emails.send({
      from,
      to: adminEmail,
      subject: `New order ${orderId} • ${totalStr}`,
      html: storeHtml,
    });

    if (storeSend.error) {
      console.error("Store email error:", storeSend.error);
      return NextResponse.json({ error: "Failed to notify store" }, { status: 500 });
    }

    // customer confirmation (best effort)
    const customerSend = await resend.emails.send({
      from,
      to: customer.email,
      subject: `Your Confida order ${orderId}`,
      html: customerHtml,
    });

    if (customerSend.error) {
      console.error("Customer email error:", customerSend.error);
      // don't fail the order; store already got it
    }

    return NextResponse.json({
      ok: true,
      orderId,
      totals: { cartCount: computedCount, total: computedTotal },
    });
  } catch (e) {
    console.error("Order failed:", e);
    return NextResponse.json(
      { error: "Order failed", details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
