/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        'felixo-purple': '#C084FC',
        'felixo-purple-bright': '#A855F7',
      },
    },
  },
  plugins: [],
}
