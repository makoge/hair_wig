"use client";



export default function ContactPage() {
  return (
      <>
      
      <main>
      <section className="contact-page">
      <h2>Contact us</h2>
      <p>Phone Number: 54535637</p>
      <p>Address: witoskila v8</p>
      <p>Email: manuvago@gmail.com</p>
    </section>
    <section className="contact-container">
          <div className="contact-img">
            <img src="/img/img4.jpg" alt="contact us" />
          </div>

          <div className="right-contact">
            <h3>Contact us</h3>
            <form
              id="contact-form"
            >
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" placeholder="enter your name" />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="enter your email"
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="write something"
                
              />

              <button type="submit" className="ctf-button">
                Send
              </button>
              <div
                id="form-status"
                style={{ marginTop: 10, color: "#ff4081" }}
              />
            </form>
          </div>
        </section>
      </main>

      
    </>
  );
}
