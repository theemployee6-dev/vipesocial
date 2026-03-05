import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VipeSocial",
  description: "Desenvolvido por webWill",
  icons: {
    icon: [
      { url: "/assets/img/fav_icon/favicon.ico", sizes: "any" },
      {
        url: "/assets/img/fav_icon/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/assets/img/fav_icon/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/assets/img/fav_icon/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/assets/img/fav_icon/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: "/assets/img/fav_icon/apple-touch-icon.png",
    shortcut: "/assets/img/fav_icon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
