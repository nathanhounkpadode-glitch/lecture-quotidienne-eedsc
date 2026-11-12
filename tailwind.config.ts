import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040914",
          900: "#071329",
          800: "#0E234B",
          700: "#1A3B7A",
        },
        gold: {
          100: "#FFF9DB",
          200: "#FFF2B2",
          300: "#FFE082",
          400: "#FFCA28",
          500: "#FFA000",
          600: "#D97706",
          700: "#B45309",
        },
      },
    },
  },
  plugins: [],
};
export default config;
