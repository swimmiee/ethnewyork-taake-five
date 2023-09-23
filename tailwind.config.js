/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fafafa",
        secondary: "#E5E3D6",
        neutral: {
          50: "#F7F8F9",
          100: "#E8EBED",
          200: "#C9CDD2",
          400: "#9EA4AA",
          500: "#72787F",
          DEFAULT: "#72787F",
          600: "#454C53",
          800: "#26282B",
          900: "#1B1D1F",
          950: "#000000",
        },
        primary: {
          900: "#333300",
          800: "#666600",
          700: "#999900",
          600: "#CCCC00",
          500: "#FFFF00",
          DEFAULT: "#FFFF00",
          400: "#FFFF33",
          300: "#FFFF66",
          200: "#FFFF99",
          100: "#FFFFCC",
          50: "#FFFFE5",
        },
      },
    },
  },
  plugins: [],
};
