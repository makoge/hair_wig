"use client";
import ContactForm from "../components/ContactForm";


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
            <ContactForm/>
            
              <div
                id="form-status"
                style={{ marginTop: 10, color: "#ff4081" }}
              />
            
          </div>
        </section>
      </main>

      
    </>
  );
}
