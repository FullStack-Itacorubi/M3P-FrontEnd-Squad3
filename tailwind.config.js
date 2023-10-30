/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      width: {
        88: "22rem",
      },
      boxShadow: {
        "inner-right": "inset -4px 0 4px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
