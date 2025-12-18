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
      setStatus("error");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <footer className="main-footer">
      <div className="footer-grid">

        {/* FIRST COLUMN */}
        <div className="first-footer">
          <h4>Join Confidahair</h4>

          <div className="subscribe">
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubscribe()}
            />
            <button onClick={onSubscribe} disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Subscribe"}
            </button>
          </div>

          {msg && <p className={`subscribe-msg ${status}`}>{msg}</p>}

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" aria-label="instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://x.com" target="_blank" aria-label="x">
              <i className="fab fa-x" />
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="facebook">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="youtube">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="second-footer">
          <h3>Help and Support</h3>
          <ul>
            <li><a href="#">Track my order</a></li>
            <li><a href="#">Returns & Exchange</a></li>
            <li><a href="#">Change & Cancel</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* THIRD COLUMN */}
        <div className="third-footer">
          <h4>About Confida</h4>
          <ul>
            <li><a href="#">Our Values</a></li>
            <li><a href="#">Innovation</a></li>
            <li><a href="#">24 hours support</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* FOURTH COLUMN */}
        <div className="fourth-footer">
          <h4>About Confida</h4>
          <ul>
            <li><a href="#">Our Values</a></li>
            <li><a href="#">Innovation</a></li>
            <li><a href="#">24 hours support</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* FIFTH COLUMN */}
      <p className="fifth-footer">© CONFIDA 2025</p>
    </footer>
  );
}

