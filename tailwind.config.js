/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // You can extend the theme to match your MUI theme values
      fontSize: {
        "2xs": "0.625rem", // 10px - Extra extra small text for mobile
      },
      colors: {
        // These can be updated to match your MUI theme colors
        "bright-red": "#FF0033", // Adding bright red custom color
      },
    },
  },
  plugins: [],
};
