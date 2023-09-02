/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
        Poppins: "Poppins",
        YsabeauInfant:"Ysabeau Infant" 
      },
      width: {
        700: "700px"
      },
      height:{
        30: "30rem"
      },
      flex:{
        4: "0.4",
        6: "0.6"
      },
      colors:{
        'ebony': {
          '50': '#f3f9fa',
          '100': '#d8eaef',
          '200': '#b1d2de',
          '300': '#82b2c6',
          '400': '#5791aa',
          '500': '#3e748e',
          '600': '#2f5b72',
          '700': '#294a5c',
          '800': '#253c4a',
          '900': '#22343f',
          '950': '#0c161d',
      },      
      },
      fontSize:{
        6:'1.6rem'
      },
      fontWeight:{
        bold: 700,
        extrabold: 800,
        black: 900
      }
    },
  },
  plugins: [],
}