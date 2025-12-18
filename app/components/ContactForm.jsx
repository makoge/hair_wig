"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      form.reset();
      setStatus("Message sent ✅");
    } else {
      setStatus(data.error || "Something went wrong.");
    }
  }

  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" placeholder="enter your name" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" placeholder="enter your email" />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="write something"
        rows={5}
      />

      <button type="submit" className="ctf-button">
        Send
      </button>

      {status && (
        <div id="form-status" style={{ marginTop: 10, color: "#ff4081" }}>
          {status}
        </div>
      )}
    </form>
  );
}
