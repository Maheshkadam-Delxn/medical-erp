import './globals.css';

export const metadata = {
  title: 'PharmaCare ERP',
  description: 'Comprehensive pharmacy management solution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}