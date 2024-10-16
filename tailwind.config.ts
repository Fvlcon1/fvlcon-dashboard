import { cssColors } from "./src/app/styles/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : cssColors,
      boxShadow: {
        'custom-shadow': '0px 6px 38px -10px rgba(0,0,0,1);',
      },
      backgroundImage: {
        'gradient-container': 'linear-gradient(to bottom, rgba(12,12,12,1) 0%, rgba(5,5,5,0) 80%)',
        'gradient-container-md': 'linear-gradient(to bottom, rgba(17,17,17,1) 0%, rgba(5,5,5,0) 100%)',
        'gradient-container-black': 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        'gradient-container-black-50': 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
        'gradient-border': 'linear-gradient(to bottom, rgba(28,28,30,1) 0%, rgba(28,28,30,0) 100%)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
