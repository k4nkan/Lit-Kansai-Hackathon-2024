import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../../context/auth';

export const metadata: Metadata = {
  title: 'test',
  description: 'this is my Next.js app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
