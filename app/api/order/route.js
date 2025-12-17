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

    const linesHtml = items
      .map((x) => {
        const color = x.product?.selectedColor ? ` (${x.product.selectedColor})` : "";
        return `<li>${x.product?.name || "Item"}${color} — qty ${x.qty} — €${Number(
          x.product?.price || 0
        ).toFixed(2)}</li>`;
      })
      .join("");

    const total = `€${Number(totals?.total || 0).toFixed(2)}`;

    const customerHtml = `
      <h2>Thanks for your order, ${customer.name}!</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <ul>${linesHtml}</ul>
      <p><b>Total:</b> ${total}</p>
      <p>We’ll contact you shortly to confirm delivery.</p>
    `;

    const storeHtml = `
      <h2>New Confida order</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <p><b>Customer:</b> ${customer.name} (${customer.email})</p>
      <p><b>Phone:</b> ${customer.phone || "-"}</p>
      <p><b>Address:</b> ${customer.address || "-"}, ${customer.city || "-"}, ${customer.country || "-"}</p>
      <ul>${linesHtml}</ul>
      <p><b>Total:</b> ${total}</p>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL || "Confida <onboarding@resend.dev>";
    const adminEmail = process.env.ADMIN_EMAIL; // <- use this

    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    if (!adminEmail) {
      return NextResponse.json({ error: "Missing ADMIN_EMAIL" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // 1) store notification (most important)
    const storeSend = await resend.emails.send({
      from,
      to: adminEmail,
      subject: `New order ${orderId}`,
      html: storeHtml,
    });
    if (storeSend.error) {
      console.error("Store email error:", storeSend.error);
      return NextResponse.json({ error: "Failed to notify store" }, { status: 500 });
    }

    // 2) customer confirmation
    const customerSend = await resend.emails.send({
      from,
      to: customer.email,
      subject: `Your Confida order ${orderId}`,
      html: customerHtml,
    });
    if (customerSend.error) {
      console.error("Customer email error:", customerSend.error);
      // still ok: store got it, don’t fail the order
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (e) {
    console.error("Order failed:", e);
    return NextResponse.json(
      { error: "Order failed", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
