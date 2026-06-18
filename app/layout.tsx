import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'АВТОФАРМ ОС - JARVIS A.I.',
  description: 'Система управління фермою Cherax quadricarinatus з штучним інтелектом',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000510" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
