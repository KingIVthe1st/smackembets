import type { Metadata } from "next";
import { Bangers, Inter, Permanent_Marker } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker" });

export const metadata: Metadata = {
  title: "Smack'em Bets",
  description: "Premium AI sports picks by Farrah. 68.3% win rate across 835+ games."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bangers.variable} ${marker.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
