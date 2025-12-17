"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  async function onSubscribe() {
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("error");
      setMsg("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: clean }),
    });

    if (res.ok) {
      setStatus("success");
      setMsg("Subscribed successfully!");
      setEmail("");
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setMsg(data.error || "Something went wrong. Try again.");
    }
  }

  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="first-footer">
          <h4>Join Confihair</h4>

          <div className="subscribe" id="js-subscribe">
            <input
              type="email"
              id="email-input"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubscribe()}
            />
            <button
              className="subscribe-button"
              onClick={onSubscribe}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Subscribe"}
            </button>
          </div>

          {msg && (
            <p className={`subscribe-msg ${status}`}>
              {msg}
            </p>
          )}

          {/* ...rest of footer */}
        </div>
      </div>
    </footer>
  );
}
