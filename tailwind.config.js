/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  layers: {
    utilities: ["active"],
  },
  theme: {
    extend: {
      fontFamily: {
        custom: ["Roboto"],
        montserrat: ["Montserrat"],
        backgroundColor: ["active"],
      },
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
