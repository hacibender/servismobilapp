/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // Note the addition of App.{js,jsx,ts,tsx}
    './src/**/*.{js,jsx,ts,tsx}', 
    // Add more paths if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}