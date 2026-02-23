import type { Metadata } from "next";
import { Bangers, Inter, Permanent_Marker } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker" });

export const metadata: Metadata = {
  title: "Smack'em Bets — AI Sports Betting Intelligence | 68.3% Win Rate",
  description: "The sportsbooks use an AI. Now you do too. Farrah analyzes 37 data points per game with a documented 68.3% win rate across 835+ games. Daily picks at 3pm ET.",
  keywords: ["sports betting", "AI picks", "sports betting AI", "Farrah AI", "parlay builder", "live odds", "betting intelligence"],
  metadataBase: new URL("https://smackem-bets.vercel.app"),
  openGraph: {
    title: "Smack'em Bets — The Sportsbooks Use An AI. Do You?",
    description: "68.3% documented win rate. 37 data points per game. 835+ games analyzed. Your AI weapon against the books. $250/mo.",
    url: "https://smackem-bets.vercel.app",
    siteName: "Smack'em Bets",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smack'em Bets — AI Sports Betting Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smack'em Bets — The Sportsbooks Use An AI. Do You?",
    description: "68.3% win rate. 37 data points per game. Daily AI picks at 3pm ET. Your unfair advantage.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bangers.variable} ${marker.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
