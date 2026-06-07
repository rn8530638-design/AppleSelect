/** @type {import('tailwindcss').Config} */
// Tokens mirror the original AppleSelect design CSS variables.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        ink: '#1d1d1f',
        white: '#ffffff',
        paper: '#fbfbfd',
        card: '#f5f5f7',
        muted: '#86868b',
        blue: '#007aff',
      },
      borderRadius: {
        card: '24px',
        img: '20px',
        pill: '50px',
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
