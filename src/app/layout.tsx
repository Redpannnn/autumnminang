import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gv",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cg",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-pd",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Maestro & Farida",
  description:
    "Undangan pernikahan Maestro & Farida — Sabtu, 10 Juli 2027. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.",
  keywords: ["undangan pernikahan", "Maestro", "Farida", "wedding invitation"],
  openGraph: {
    title: "Undangan Pernikahan Maestro & Farida",
    description:
      "Sabtu, 10 Juli 2027 — Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
