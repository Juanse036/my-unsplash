/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {    
    extend: {
      fontFamily: {
        noto_sans: ["Noto Sans", 'normal'],
      },
    },
    keyframes: {
      navbarin: {
        '0%': {height: '36px'},
        '100%': {height: '180px'}        
      },
      navbarout: {
        '0%':  {height: '180px'},
        '100%':{height: '35px'}
      },
      hiddenmenu: {
        '0%': {opacity: '1'},
        '100%': {opacity: '0'}
      },
      displaymenu: {
        '0%': {opacity: '0'},
        '100%': {opacity: '1'}
      }

    },
    animation:{
      navbarin: 'navbarin 1s linear forwards',
      navbarout: 'navbarout 1s linear forwards',
      hiddenmenu: 'hiddenmenu 1s linear forwards',
      displaymenu: 'displaymenu 1s linear forwards'
    },
  },
  plugins: [],
}
