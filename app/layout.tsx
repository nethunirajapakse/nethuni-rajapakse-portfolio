import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nethuni Rajapakse - Portfolio",
  description:
    "Final-year IT Undergraduate and Software Developer. Building scalable systems and exploring AI-driven solutions.",
  keywords: [
    "Software Engineering",
    "Web Development",
    "Full Stack Developer",
    "Sri Lanka",
    "AI",
    "LLM",
    "RAG",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
