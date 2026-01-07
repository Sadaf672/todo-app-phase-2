/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Blue-500
          600: '#2563eb', // Blue-600
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          500: '#6b7280', // Gray-500
        },
        accent: {
          500: '#10b981', // Emerald-500
        },
        warning: {
          500: '#f59e0b', // Amber-500
        },
        danger: {
          500: '#ef4444', // Red-500
        },
        background: '#f9fafb', // Gray-50
        surface: '#ffffff',
        text: {
          primary: '#1f2937', // Gray-800
          secondary: '#6b7280', // Gray-500
        }
      },
      spacing: {
        'base': '4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class', // Enable dark mode with class strategy
}