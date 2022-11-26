/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#222831",
        gray: "#393e46",
        primary: "#f96d00",
        light: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
