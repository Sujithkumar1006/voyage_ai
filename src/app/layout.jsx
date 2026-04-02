import "./globals.css";

export const metadata = {
  title: "Voyage AI",
  description:
    "A clean AI conversation app built with Next.js, React and a secure server-side OpenAI integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="app-root">
      <body className="app-body">{children}</body>
    </html>
  );
}
