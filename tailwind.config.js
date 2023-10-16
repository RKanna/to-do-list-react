/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgray: "#ecedf6",
        btnclr: "#646ff0",
        cancelbtn: "#cccdde",
      },
    },
  },
  plugins: [],
};
