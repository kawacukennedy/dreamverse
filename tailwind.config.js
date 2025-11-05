/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B61FF',
        'primary-hover': '#6A4EF0',
        accent: '#00F5A0',
        secondary: '#FF7AB6',
        'background-dark': '#0B0B0F',
        'text-light': '#FFFFFF',
        'text-muted': '#9AA0B0',
        'card-background': '#14141B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: '36px',
        h2: '28px',
        h3: '22px',
        body: '16px',
        small: '14px',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}