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
      {
        url: "/assets/img/logo/logo_V_sem_fundo.png",
        type: "image/png",
        sizes: "1024x1536",
      },

      {
        url: "/assets/img/fav_icon/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: "/assets/img/fav_icon/apple-touch-icon.png",
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
