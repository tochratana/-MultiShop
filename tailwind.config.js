/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FFD333",
        secondaryColor: "#3D464C",
      },
      padding: {
        p4: "34px",
      },
      screens: {
        phone: "1030px",
      },
    },
  },
  plugins: [],
};
