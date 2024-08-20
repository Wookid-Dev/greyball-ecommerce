import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#1e293b",
          light: "#334155",
        },
        accent: {
          default: "#2563eb",
          hover: "#1d4ed8",
        },
        text: {
          default: "#f1f5f9",
          muted: "#e2e8f0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
