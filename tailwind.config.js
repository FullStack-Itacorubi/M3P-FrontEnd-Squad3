/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-right": "inset -4px 0 4px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
