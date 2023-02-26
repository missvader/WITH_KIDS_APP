/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amarillo': '#eab308' ,
        'naranja' : '#F48A4C' ,
        'lila' : '#9B328B' ,
        'azul' : '#6986F6' ,
        'verde' : '#24CE81' ,
        'blanco' : '#fafafa',
        'dorado' : '#f5BA41',
        'amarilloCard':'#EEC64F',
        'lilaCard' : '#E890DB',
        'naranjaCard' : '#FAB741'
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '18px',
        /*'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',*/
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
