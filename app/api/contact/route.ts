import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(v: unknown, max = 2000) {
  return String(v ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, max);
}

function cleanEmail(v: unknown) {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
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
    // ✅ FIX: handle FormData (not JSON)
    const formData = await req.formData();

    const website = cleanText(formData.get("website"), 200);
    if (website) {
      // honeypot triggered — bot
      return NextResponse.json({ ok: true });
    }

    const name = cleanText(formData.get("name"), 80);
    const email = cleanEmail(formData.get("email"));
    const message = cleanText(formData.get("message"), 4000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill all fields." },
        { status: 400 }
      );
    }

    if (!emailRe.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL;
    const admin = process.env.ADMIN_EMAIL;

    if (!apiKey || !from || !admin) {
      return NextResponse.json(
        { ok: false, error: "Server email not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `New contact message — ${name}`.slice(0, 140);

    const html = `
      <div style="font-family:ui-sans-serif,system-ui;line-height:1.5">
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:10px">
${escapeHtml(message)}
        </pre>
      </div>
    `;

    const text = `New Contact Message

Name: ${name}
Email: ${email}

${message}
`;

    const result = await resend.emails.send({
      from,
      to: admin,
      subject,
      replyTo: email,
      html,
      text,
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);

    return NextResponse.json(
      { ok: false, error: "Contact failed." },
      { status: 500 }
    );
  }
}


