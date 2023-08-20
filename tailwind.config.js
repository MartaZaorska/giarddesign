/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1440px'
    },
    colors: {
      'white': '#FFFFFF',
      'dark': '#111111',
      'light': '#F5F0EC',
      'green': '#1B5B31',
      'beige': '#DCC1AB',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        "btn": "0px 10px 4px rgb(0 0 0 / 0.2)",
        "card": "0px 15px 10px rgb(0 0 0 / 0.2)"
      }
    },
  },
  plugins: [],
}
