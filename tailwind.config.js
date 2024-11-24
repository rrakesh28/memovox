/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        neutral: "#D8D4C8",
        "accent-highlight": "#743600",
        "primary-button": "#2D3142",
        "soft-beige": "#CEC8B9",
        "highlighted-box": "#B5AD97",
      },
      spacing: {
        "1/7": "14.2857%", // 100% / 7 = 14.2857%
      },
    },
  },
  plugins: [],
};
