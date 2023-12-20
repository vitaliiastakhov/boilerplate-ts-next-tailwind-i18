const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Corsa Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: 'oklch(53.57% 0.185 267.56 / <alpha-value>)',
        },
      },
      transitionProperty: {
        multiple:
          'width , height , backgroundColor, opacity, transform, grid-template-columns',
      },
    },
  },
  plugins: [],
};
