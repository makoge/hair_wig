"use client";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">

        {/* FIRST COLUMN */}
        <div className="first-footer">
          <h4>Join Confihair</h4>

          <div className="subscribe" id="js-subscribe">
            <input
              type="email"
              id="email-input"
              placeholder="enter your email"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>

          <div className="social-icons">
            <a href="https://instagram.com/" target="_blank" aria-label="instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://x.com/" target="_blank" aria-label="x">
              <i className="fab fa-x" />
            </a>
            <a href="https://facebook.com/" target="_blank" aria-label="facebook">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://youtube.com/" target="_blank" aria-label="youtube">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="second-footer">
          <h3>Help and Support</h3>
          <ul>
            <li><a href="/products/human_hair">Track my order</a></li>
            <li><a href="/products/lace_wig">Returns &amp; Exchange</a></li>
            <li><a href="/products/monofilament">Change &amp; Cancel</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* THIRD COLUMN */}
        <div className="third-footer">
          <h4>About Confida</h4>
          <ul>
            <li><a href="/products/human_hair">Our Values</a></li>
            <li><a href="/products/lace_wig">Innovation</a></li>
            <li><a href="/products/monofilament">24 hours support</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* FOURTH COLUMN */}
        <div className="fourth-footer">
          <h4>About Confida</h4>
          <ul>
            <li><a href="/products/human_hair">Our Values</a></li>
            <li><a href="/products/lace_wig">Innovation</a></li>
            <li><a href="/products/monofilament">24 hours support</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

      </div>

      <p className="fifth-footer">(@) CONFIDA 2025</p>
    </footer>
  );
}
