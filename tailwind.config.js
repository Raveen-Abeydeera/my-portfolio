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
        // --- Dark Mode Palette (Cosmic & Professional) ---
        'bg-dark': '#00171f',        // Ink Black (Main Background)
        'text-dark': '#f8fafc',      // White/Off-White (Main Text)
        'card-dark': '#003459',      // Deep Space Blue (Cards & Chat Bot)
        'muted-dark': '#94a3b8',     // Slate Grey (Secondary Text)

        // --- Light Mode Palette (Clean & Spacious) ---
        'bg-light': '#ffffff',       // Pure White
        'text-light': '#0f172a',     // Slate 900 (High Contrast Black)
        'card-light': '#f0f9ff',     // Very Light Sky (Cards)
        'muted-light': '#475569',    // Slate 600 (Secondary Text)

        // --- Accents (Shared) ---
        'accent-primary': '#00a8e8',         // Fresh Sky (Buttons, Highlights)
        'accent-hover': '#007ea7',           // Cerulean (Hover States)
        'accent-text-on-primary': '#ffffff', // White Text on Blue Buttons
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradientShift 15s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}