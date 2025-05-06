/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: "#5A31F4",
        "primary-dark": "#4921D8",
        background: "#F1F3FA",
        text: "#2C2E3A",
        dark: "#2C2E3A",
        accent: "#FF8661",
        accent1: "#FF8661",
        accent2: "#FFC145",
        supporting: "#3DA1C4",
        contrast: "#F4A261",
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
} 