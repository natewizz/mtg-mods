/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      typography: {
        DEFAULT: {
          css: {
            color: '#2C2E3A',
            a: {
              color: '#5A31F4',
              '&:hover': {
                color: '#4921D8',
              },
            },
            h1: {
              color: '#5A31F4',
            },
            h2: {
              color: '#2C2E3A',
            },
            h3: {
              color: '#2C2E3A',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 