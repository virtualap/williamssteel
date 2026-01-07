/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Red-600
          dark: '#991B1B', // Red-800
          light: '#EF4444', // Red-500
        },
        secondary: {
          DEFAULT: '#1F2937', // Gray-800 (dark/black)
          dark: '#111827', // Gray-900
          light: '#374151', // Gray-700
        },
      },
    },
  },
  plugins: [],
}
