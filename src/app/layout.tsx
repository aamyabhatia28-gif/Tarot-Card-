import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Oracle — Tarot Readings",
  description: "Ask your question and receive guidance from the cards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
