import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voyage AI",
  description:
    "A clean AI conversation app built with Next.js, TypeScript and a secure server-side OpenAI integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
