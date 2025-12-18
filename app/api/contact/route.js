import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanMsg = String(message || "").trim();

    if (!cleanName || !cleanEmail || !cleanMsg) {
      return NextResponse.json({ error: "Please fill all fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.FROM_EMAIL;       // e.g. Confida <orders@confida.shop>
    const admin = process.env.ADMIN_EMAIL;     // where YOU receive messages

    if (!from || !admin) {
      return NextResponse.json({ error: "Server email not configured." }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from,
      to: admin,
      subject: `New contact message from ${cleanName}`,
      // reply-to lets you hit "reply" to answer the customer
      replyTo: cleanEmail,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${cleanName}</p>
        <p><b>Email:</b> ${cleanEmail}</p>
        <p><b>Message:</b></p>
        <p style="white-space:pre-wrap">${cleanMsg}</p>
      `,
      text: `New Contact Message\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMsg}`,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Contact failed." }, { status: 500 });
  }
}
