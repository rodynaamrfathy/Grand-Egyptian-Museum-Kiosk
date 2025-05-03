/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'marquee-slow': 'marquee 60s linear infinite',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        mariam: ['Mariam', 'sans-serif'],
        averia: ['Averia Libre', 'sans-serif'],
        greta: ['Greta Arabic AR LT', 'sans-serif'],
        gretaPro: ['Greta Pro', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
      fontSize: {
        // Overlay Text (for Image Overlay Reuse)
        'overlay-text': ['1.4rem', { lineHeight: '1.75rem' }],
        'overlay-text-sm': ['1.5rem', { lineHeight: '2rem' }],
        'overlay-text-md': ['2rem', { lineHeight: '2.5rem' }],

        // Overlay Date Text
        'overlay-date': ['0.7rem', { lineHeight: '1rem' }],
        'overlay-date-sm': ['1rem', { lineHeight: '1.25rem' }],
        'overlay-date-md': ['1.5rem', { lineHeight: '1.75rem' }],
      },
      colors: {
        overlayDate: '#393939', // reusable color
      },
    },
  },
  plugins: [],
};
