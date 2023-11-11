const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: '#303030',
          danger: '#DE350B',
        }
      }
    }
  }),
  require('tailwindcss-animated')],
};
