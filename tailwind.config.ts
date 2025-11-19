import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blafflix: {
          red: "#E50914",
          dark: "#141414"
        }
      }
    }
  },
  plugins: []
};

export default config;
