import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nethuni Rajapakse — Software Developer",
  description: "Final-year IT undergraduate at University of Moratuwa. Software developer specializing in full-stack development and AI/LLM systems.",
  keywords: ["Software Developer", "Full Stack", "AI", "LLM", "RAG", "Sri Lanka", "University of Moratuwa"],
  authors: [{ name: "Nethuni Rajapakse" }],
  openGraph: {
    title: "Nethuni Rajapakse — Software Developer",
    description: "Final-year IT undergraduate. Building scalable software and exploring AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
