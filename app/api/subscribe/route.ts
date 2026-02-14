import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  email?: unknown;
  website?: unknown; // honeypot (optional)
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanEmail(v: unknown) {
  return String(v ?? "").trim().toLowerCase().slice(0, 254);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    // ✅ honeypot (if you add it on the client)
    const website = String(body.website ?? "").trim();
    if (website) return NextResponse.json({ ok: true });

    const email = cleanEmail(body.email);
    if (!emailRe.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL; // e.g. "Confida <hello@confida.shop>"
    const admin = process.env.ADMIN_EMAIL;

    if (!apiKey || !from || !admin) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1) notify admin
    const adminSend = await resend.emails.send({
      from,
      to: admin,
      subject: "New Confida subscriber",
      html: `<p>New subscriber: <b>${escapeHtml(email)}</b></p>`,
      replyTo: email,
    });

    if (adminSend.error) {
      return NextResponse.json({ ok: false, error: adminSend.error.message }, { status: 500 });
    }

    // 2) confirm subscriber (don’t fail if this one errors)
    const userSend = await resend.emails.send({
      from,
      to: email,
      subject: "You’re subscribed 🎉",
      html: `<p>Thanks for subscribing to Confida. We’ll email you soon.</p>`,
    });

    if (userSend.error) {
      console.error("Subscriber confirmation email error:", userSend.error);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return NextResponse.json({ ok: false, error: "Subscribe failed." }, { status: 500 });
  }
}
