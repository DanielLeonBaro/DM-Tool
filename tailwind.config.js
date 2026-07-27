/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/index.html",
    "./frontend/app.js"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0c0f",
        panel: "#13151a",
        line: "#282b33",
        parchment: "#e7dfcf",
        amber: "#d8a657"
      },
      boxShadow: {
        panel: "0 22px 60px rgba(0,0,0,.22)"
      }
    }
  },
  plugins: []
};
