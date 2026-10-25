/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        construction: {
          50: '#fef9ee',
          100: '#fef1d6',
          200: '#fcdda8',
          300: '#f9c271',
          400: '#f69e38',
          500: '#f28113',
          600: '#d5620b',
          700: '#b1470c',
          800: '#8e3711',
          900: '#732f12',
        },
        steel: {
          850: '#151e2e',
          900: '#0f172a',
          950: '#080d1a',
        }
      }
    },
  },
  plugins: [],
}
