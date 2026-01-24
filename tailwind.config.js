/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B8458",
          1: "#EBFFF5",
          2: "##20FFA6",
          3: "#68C9D2",
        },
        secondary: { DEFAULT: "#FFB820", 1: "##FF5A54" },
        textPrimary: "#000000",
        textSecondary: "#A1A1A1",
      },
    },
  },
};
