/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        'grid-col': 'repeate(auto-fit, minmax(6rem, 1fr))'
      }
    },
  },
  plugins: [],
}
