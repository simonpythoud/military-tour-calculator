/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          green: '#4B5320',
          brown: '#8B7355',
        }
      }
    },
  },
  plugins: [],
}

