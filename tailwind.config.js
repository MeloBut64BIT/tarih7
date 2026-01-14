/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        islamic: {
          dark: '#1a3a2a',
          green: '#2d5f3f',
          light: '#8b7355',
          beige: '#d4c4a8',
          cream: '#f5f0e8',
        }
      },
      fontFamily: {
        'freshman': ['Freshman', 'sans-serif'],
        'basketball': ['Basketball', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

