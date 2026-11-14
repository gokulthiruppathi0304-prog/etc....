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
        navy: {
          950: '#060913',
          900: '#0B0F19',
          850: '#0E1424',
          800: '#131B30',
          750: '#1A243F',
          700: '#222F52',
          600: '#2F406E',
        },
        brand: {
          cyan: '#06B6D4',
          blue: '#3B82F6',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          purple: '#A855F7',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.15)',
        'glow-md': '0 0 25px -5px rgba(139, 92, 246, 0.25)',
        'glow-lg': '0 0 40px -10px rgba(59, 130, 246, 0.35)',
      }
    },
  },
  plugins: [],
}
