import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Picturing the War: Visual Representation on Telegram, 2022-2026",
  description:
    "A comparative study of how ten Russian and Ukrainian Telegram channels made the war visible between 2022 and 2026, covering channel content, frontline violence, technical means and the correlations between them.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${sourceSerif.variable} ${inter.variable}`}>
      <body className="relative min-h-full flex flex-col">
        <div className="relative z-10 flex flex-col flex-1">{children}</div>
      </body>
    </html>
  );
}
