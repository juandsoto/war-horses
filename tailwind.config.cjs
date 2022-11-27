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
        success: "#10ac84",
        danger: "#ee5253",
        warning: "#fce205",
      },
    },
  },
  plugins: [],
};
