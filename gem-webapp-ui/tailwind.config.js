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
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
    },
  },
  plugins: [],
};
