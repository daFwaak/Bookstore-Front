/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
      },
      animation: {
        flicker: 'flicker 0.5s infinite',
      },

    },
    screens: {
      'm2xl': { 'max': '1536px' },
      'mxl': { 'max': '1280px' },
      'mlg': { 'max': '1024px' },
      'mmd': { 'max': '768px' },
      'msm': { 'max': '640px' },
    },
  },
  plugins: [],
})

