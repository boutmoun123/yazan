/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#d7d6d2",
        ink: "#20201f"
      },
      fontFamily: {
        display: ["var(--font-sans)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        editorial: "0 30px 90px rgba(17, 16, 13, 0.12)"
      }
    }
  },
  plugins: []
};
