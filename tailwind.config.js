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
      animation: {
        'card-glow': 'card-glow-breathe 3s ease-in-out infinite',
        'text-glow': 'text-glow-breathe 3.8s ease-in-out infinite',
      },
      keyframes: {
        'card-glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(192, 132, 252, 0.6)' },
        },
        'text-glow-breathe': {
          '0%, 100%': { textShadow: '0 0 10px rgba(192, 132, 252, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(192, 132, 252, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
