/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#F7F5EF',
          100: '#F3F0E8',
          200: '#EBE6D8',
          300: '#DCD5C0',
        },
        ink: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#2B2B2B',
        },
        stonewarm: {
          500: '#77736C',
          600: '#5C5953',
          700: '#4A4844',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'editorial': '0.18em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'slow': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
