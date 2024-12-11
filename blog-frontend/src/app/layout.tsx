import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FooterPersonalized } from "@components/Footer";
import { ThemeModeScript } from "flowbite-react";
import Header from "@components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BONDLOG",
  description: "Stay updated with the latest from Bonded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-300 dark:bg-gray-900`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <FooterPersonalized />
      </body>
    </html>
  );
}
