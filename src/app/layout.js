import "./globals.css";

export const metadata = {
  title: "MediEase ERP",
  description: "Comprehensive pharmacy management solution",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="min-h-screen flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
