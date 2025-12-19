import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const clean = String(email || "").trim().toLowerCase();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    if (!ok) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Confida subscriber",
      html: `<p>New subscriber: <b>${clean}</b></p>`,
      replyTo: clean,
    });

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: clean,
      subject: "You’re subscribed 🎉",
      html: `<p>Thanks for subscribing to Confida. We’ll email you soon.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
