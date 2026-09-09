/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: '#6F4E37',
        cream: '#F5DEB3',
      },
    },
  },
  plugins: [],
};
