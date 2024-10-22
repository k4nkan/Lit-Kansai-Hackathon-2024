/* アプリのページ全体に共通するレイアウトや設定をここに */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "test",
  description: "this is my Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
