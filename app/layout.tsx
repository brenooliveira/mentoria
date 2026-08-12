import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "../content/site";
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
  metadataBase: new URL(siteConfig.brand.domain),
  title: "Mentoria de Tecnologia e Negócios | Coders Zoom",
  description:
    "Mentoria individual para profissionais e fundadores de tecnologia que querem transformar capacidade técnica em uma oferta clara e um negócio consistente.",
  applicationName: "Coders Zoom",
  authors: [{ name: "Coders Zoom" }],
  creator: "Coders Zoom",
  publisher: "Coders Zoom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Coders Zoom",
    title: "Transforme sua capacidade técnica em um negócio de verdade.",
    description:
      "Mentoria individual para profissionais e fundadores de tecnologia.",
    images: [{ url: siteConfig.socialImage, width: 1200, height: 630, alt: "Mentoria Tech que Vira Negócio — Coders Zoom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentoria de Tecnologia e Negócios | Coders Zoom",
    description:
      "Transforme sua capacidade técnica em um negócio de verdade.",
    images: [siteConfig.socialImage],
  },
  icons: {
    icon: "/coderszoom.png",
    shortcut: "/coderszoom.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111014",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
