import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#071e3f", 2: "#0d2d54" },
        teal: { DEFAULT: "#007b7e", dark: "#00676b" },
        mint: "#dcf5ef",
        ink: "#132b45",
        muted: "#526478",
        line: "#dde7ed",
        pale: "#f4f7f7",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;