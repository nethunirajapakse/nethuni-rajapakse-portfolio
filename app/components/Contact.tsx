"use client";

import { useState, FormEvent } from "react";
import styles from "./Contact.module.css";
import { useInView } from "../hooks/useInView";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { ref, inView } = useInView<HTMLElement>();
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
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`section ${inView ? styles.inView : ""}`}
    >
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
          <div
            className={`${styles.reveal} ${styles.infoBox}`}
            style={{ "--delay": "0.05s" } as any}
          >
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
          <div
            className={`${styles.reveal} ${styles.formBox}`}
            style={{ "--delay": "0.15s" } as any}
          >
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
                  disabled={status === "loading"}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                disabled={status === "loading"}
                required
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                disabled={status === "loading"}
                required
              />

              <div className={styles.formFooter}>
                {status === "success" && (
                  <div className={styles.success}>
                    <i className="bi bi-check-circle" aria-hidden="true"></i>
                    <span>Message sent — I&apos;ll be in touch.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className={styles.error}>
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
