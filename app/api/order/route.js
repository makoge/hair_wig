import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();

    const { customer, items, totals } = body || {};
    if (!customer?.email || !customer?.name) {
      return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const orderId = `ORD-${Date.now()}`;

    // Build simple HTML summary
    const linesHtml = items
      .map((x) => {
        const color = x.product?.selectedColor ? ` (${x.product.selectedColor})` : "";
        return `<li>${x.product?.name || "Item"}${color} — qty ${x.qty} — €${Number(x.product?.price || 0).toFixed(2)}</li>`;
      })
      .join("");

    const customerHtml = `
      <h2>Thanks for your order, ${customer.name}!</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <ul>${linesHtml}</ul>
      <p><b>Total:</b> €${Number(totals?.total || 0).toFixed(2)}</p>
      <p>We’ll contact you shortly to confirm delivery.</p>
    `;

    const storeHtml = `
      <h2>New Confida order</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <p><b>Customer:</b> ${customer.name} (${customer.email})</p>
      <p><b>Phone:</b> ${customer.phone || "-"}</p>
      <p><b>Address:</b> ${customer.address || "-"}, ${customer.city || "-"}, ${customer.country || "-"}</p>
      <ul>${linesHtml}</ul>
      <p><b>Total:</b> €${Number(totals?.total || 0).toFixed(2)}</p>
    `;

    // Send emails (skip if no key)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const from = process.env.FROM_EMAIL || "Confida <onboarding@resend.dev>";
      const storeEmail = process.env.STORE_EMAIL;

      // customer confirmation
      console.log("RESEND_API_KEY?", !!process.env.RESEND_API_KEY);
console.log("FROM_EMAIL", process.env.FROM_EMAIL);
console.log("STORE_EMAIL", process.env.STORE_EMAIL);

      await resend.emails.send({
        from,
        to: customer.email,
        subject: `Your Confida order ${orderId}`,
        html: customerHtml,
      });

      // store notification
      if (storeEmail) {
        await resend.emails.send({
          from,
          to: storeEmail,
          subject: `New order ${orderId}`,
          html: storeHtml,
        });
      }
    }

    // (Optional) saving orders to a DB comes next — file saving isn’t reliable on production hosting.

    return NextResponse.json({ ok: true, orderId });
  } catch (e) {
    return NextResponse.json({ error: "Order failed", details: String(e) }, { status: 500 });
  }
}
