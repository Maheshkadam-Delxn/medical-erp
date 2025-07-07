import "./globals.css";

export const metadata = {
  title: "MediEase ERP",
  description: "Comprehensive pharmacy management solution",
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
