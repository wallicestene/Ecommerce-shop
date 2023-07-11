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
      }
    },
  },
  plugins: [],
}