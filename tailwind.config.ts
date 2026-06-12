import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#f0d080",
          400: "#d4a840",
          500: "#c9a84c",
          600: "#b8860b",
        },
        mystic: {
          950: "#08080f",
          900: "#0d0d1a",
          800: "#13102a",
          700: "#1e1545",
          600: "#2d1b69",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        body: ["EB Garamond", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "star-twinkle": "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201, 168, 76, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(201, 168, 76, 0.7)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
