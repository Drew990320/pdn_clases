/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#007BFF',
          dark: '#00FF88'
        }
      }
    },
  },
  plugins: [],
}


