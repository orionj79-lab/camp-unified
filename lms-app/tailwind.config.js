/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E2330',
          secondary: '#3B71D0',
          accent: '#D4AF37',
          text: '#2D3748',
          soft: '#EBE9DF',
          background: '#F8F9FA',
          white: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#6B7280',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1rem',
        'xl': '0.75rem',
      }
    },
  },
  plugins: [],
}
