/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peacock-blue': '#1E3A8A',
        'royal-blue': '#0F52BA',
        'golden-yellow': '#D4AF37',
        'soft-cream': '#FFF8E7',
      },
    },
  },
  plugins: [],
}
