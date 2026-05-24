"use client";

import { useState, FormEvent } from "react";
import styles from "./Contact.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Placeholder: opens user's email client with prefilled content.
    // Replace this with a real API call (e.g. /api/contact route, Formspree, Resend, etc.)
    try {
      const mailto = `mailto:nethunirajapakse@gmail.com?subject=${encodeURIComponent(
        form.subject || "Portfolio contact"
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>
            Have a project in mind, an idea to discuss, or just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </div>

        <div className={styles.row}>
          {/* Info box */}
          <div className={styles.infoBox}>
            <h3>Contact Info</h3>
            <p>
              Open to internship opportunities, collaborations, and interesting
              conversations.
            </p>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <i className="bi bi-geo-alt"></i>
              </div>
              <div>
                <h4>Location</h4>
                <p>Colombo, Sri Lanka</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <h4>Email</h4>
                <p>nethunirajapakse@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <i className="bi bi-linkedin"></i>
              </div>
              <div>
                <h4>LinkedIn</h4>
                <p>
                  <a
                    href="https://linkedin.com/in/nethuni-rajapakse/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    nethuni-rajapakse
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formBox}>
            <h3>Get In Touch</h3>
            <p>Fill out the form and I&apos;ll get back to you as soon as I can.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <div className={styles.formFooter}>
                {status === "loading" && (
                  <div className={styles.loading}>Sending...</div>
                )}
                {status === "success" && (
                  <div className={styles.success}>
                    Thanks! Your email client should be open now.
                  </div>
                )}
                {status === "error" && (
                  <div className={styles.error}>
                    Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
