/** @type {import('tailwindcss').Config} */
module.exports = {
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
        greta: ["'Greta Arabic AR LT'", "sans-serif"],
      },
      fontWeight: {
        // Add these if you want to use Tailwind's font-weight classes
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
