/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        'grid-col' : "repeat(auto-fit, minmax(22rem, 1fr))",
      }
    },
  },
  plugins: [],
}
