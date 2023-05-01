/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#141414',
      darkPrimary: '#000000',
      lightPrimary: '#282828',
      secondary: '#3543e7',
      darkSecondary: '#1320a6',
      unpaidRed: '#F74B4B',
      paidGreen: '#66BB6A',
      textColor: '#FAFAFA',
      bgColor: '#1b2431',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      opensans: ['Open Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    backgroundImage: {
      'bubbles': "url('/bubbles_background.png')",
    }

  },
  plugins: [],
}
