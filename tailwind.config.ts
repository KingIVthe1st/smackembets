import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#FF0000",
          yellow: "#FFD700",
          blue: "#0055FF"
        },
        comic: {
          black: "#0A0A0A",
          paper: "#FFF9D9"
        },
        accent: {
          cyan: "#00FFFF",
          magenta: "#FF00FF",
          green: "#7CFC00"
        },
        bg: {
          primary: "#0A0A0A",
          secondary: "#141414"
        },
        text: {
          primary: "#0A0A0A",
          muted: "#2F2F2F"
        },
        card: {
          bg: "#FFFFFF",
          border: "#0A0A0A"
        }
      },
      fontFamily: {
        bangers: ["var(--font-bangers)", "cursive"],
        marker: ["var(--font-marker)", "cursive"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      keyframes: {
        "thwip-pop": {
          "0%": { transform: "scale(0.88) rotate(-2deg)", opacity: "0" },
          "70%": { transform: "scale(1.04) rotate(1deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" }
        },
        "panel-wipe": {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          "100%": { clipPath: "inset(0 0 0 0)", opacity: "1" }
        }
      },
      animation: {
        "thwip-pop": "thwip-pop 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards",
        "panel-wipe": "panel-wipe 0.9s ease-out forwards"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
