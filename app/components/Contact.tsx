"use client";

import { useState, FormEvent } from "react";
import { useInView } from "../hooks/useInView";
import ScrambleText from "./ScrambleText";
import { fx } from "../lib/fx";

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
      fx({ type: "warp" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-[var(--radius-card)] border bg-transparent px-4 py-3 text-body outline-none transition placeholder:text-body/40 focus:border-accent disabled:opacity-50";
  const inputStyle = {
    borderColor: "color-mix(in srgb, var(--color-body), transparent 88%)",
  };

  const contactItems = [
    { icon: "bi-geo-alt", label: "Location", value: "Colombo, Sri Lanka" },
    // { icon: "bi-envelope", label: "Email", value: "nethunirajapakse@gmail.com" },
    {
      icon: "bi-linkedin",
      label: "LinkedIn",
      value: "nethuni-rajapakse",
      href: "https://linkedin.com/in/nethuni-rajapakse/",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — contact
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            <ScrambleText text="Let's talk" />
          </h2>
          <p className="mt-3 leading-relaxed text-body/70">
            Have a role, a project, or an idea to discuss? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[5fr_7fr]">
          {/* Info */}
          <div
            className={`${inView ? "animate-reveal" : "opacity-0"} rounded-[var(--radius-card)] bg-surface p-8`}
            style={{ animationDelay: "0.05s", borderColor: "var(--line-color)" }}
          >
            <h3 className="font-display text-xl font-semibold text-heading">
              Contact info
            </h3>
            <p className="mt-2 text-body/70">
              Open to internships, collaborations, and interesting
              conversations.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-accent"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-accent), transparent 85%)",
                    }}
                  >
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-body/50">
                      {item.label}
                    </h4>
                    <p className="mt-1 break-words text-body">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className={`${inView ? "animate-reveal" : "opacity-0"} rounded-[var(--radius-card)] bg-surface p-8 shadow-xl`}
            style={{ animationDelay: "0.15s", borderColor: "var(--line-color)" }}
          >
            <h3 className="font-display text-xl font-semibold text-heading">
              Get in touch
            </h3>
            <p className="mt-2 text-body/70">
              Fill this out and I&apos;ll get back to you as soon as I can.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  className={inputCls}
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  className={inputCls}
                  style={inputStyle}
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
                className={inputCls}
                style={inputStyle}
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                disabled={status === "loading"}
                required
                className={`${inputCls} resize-y`}
                style={inputStyle}
              />

              <div className="mt-1 flex flex-col items-center gap-4">
                {status === "success" && (
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    <i className="bi bi-check-circle" aria-hidden />
                    <span>Message sent — I&apos;ll be in touch.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="w-full rounded-[var(--radius-card)] bg-[#df1529] px-4 py-3 text-center font-medium text-white">
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-[var(--radius-card)] bg-accent px-7 py-3 font-medium text-contrast transition hover:brightness-110 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
