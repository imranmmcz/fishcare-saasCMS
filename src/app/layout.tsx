import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fish Care - বাংলাদেশের আধুনিক মাছচাষ প্ল্যাটফর্ম',
  description: 'মাছচাষ, মাছ বিক্রি, ওষুধ, বাজার মূল্য এবং আরও অনেক কিছুর জন্য সম্পূর্ণ প্ল্যাটফর্ম',
  keywords: 'মাছ, মাছচাষ, মাছের ওষুধ, মাছের বাজার, পুকুর ব্যবস্থাপনা',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}