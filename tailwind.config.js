/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: '#0a0e27',
        'space-light': '#0f1628',
        orbital: '#2a3a52',
      },
    },
  },
  plugins: [],
}
